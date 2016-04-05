administrationModule.controller('UserAdministrationController', ['$scope', '$state', '$stateParams', 'UserService', function ($scope, $state, $stateParams, UserService) {

	// define user for binding
    $scope.user = {};
    $scope.roles = StatUtility.Security.getRoles();

    // Load current user if state params is set
    if ($stateParams.userId) {
        UserService.get($stateParams.userId)
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    $scope.user = data.data;
                }
                else {
                    $scope.showError(data.errors);
                }
            })
		    .error(function (data, status) {
		        console.error('Error', status, data);
		    });
    }


	// save
	$scope.save = function () {
	    UserService.save($scope.user)
		.success(function (data, status, headers, config) {
		    if (data.isValid) {
		        $state.go('home.administration.users');
		        $scope.showSuccess("Uživatel byl úspěšně uložen");
		    }
		    else {
		        $scope.showError(data.errors);
		    }
		})
		.error(function (data, status) {
		    console.error('Error', status, data);
		});
	}

	$scope.addContact = function (type) {
        // Init contact array if it is not set
	    if (!$scope.user.contact)
	        $scope.user.contact = [];

	    // Add new contact
	    $scope.user.contact.push({
            contactType: type
	    });
	}

	$scope.removeContact = function (index) {
	    // Remove contact from list
	    $scope.user.contact.splice(index, 1);
	}
}]);