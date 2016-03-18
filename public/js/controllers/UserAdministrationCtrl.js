administrationModule.controller('UserAdministrationController', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {

	// define user for binding
	$scope.user = {};

	// clear form
	// $scope.formData = {};

	// save
	$scope.save = function () {
	    UserService.create($scope.user)
		.success(function (data, status, headers, config) {
		    if (data.isValid) {
		        $state.go('home.administration.users');
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