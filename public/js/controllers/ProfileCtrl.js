angular.module('ProfileCtrl', []).controller('ProfileController', ['$scope', '$state', 'SessionService', 'UserService', function ($scope, $state, SessionService, UserService) {

    // define user for binding
    $scope.session = SessionService;
    $scope.user = {};
    $scope.roles = StatUtility.Security.getRoles();

    // Load profile from session
    $scope.$watch('session.currentUser', function (value) {
        // Only if is set
        if (!value)
            return;

        // Load user
        loadUser(value);
    });


    var loadUser = function(user)   {
        UserService.get(user._id)
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
		        $scope.showSuccess("Profil byl úspěšně uložen");
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