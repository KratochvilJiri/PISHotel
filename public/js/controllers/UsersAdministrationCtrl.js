administrationModule.controller('UsersAdministrationController', ['$scope', 'UserService', function ($scope, UserService) {
    // getAll users - every page-load
    var loadUsers = function () {
        UserService.getAll()
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.users = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    }

    // remove user by ID
    $scope.remove = function (userID) {
        UserService.delete(userID)
 		.success(function (data) {
 		    if (data.isValid) {
 		        loadUsers();
 		        $scope.showSuccess("Uživatel byl úspěšně odstraněn");
 		    } else {
 		        $scope.showError(data.errors);
 		    }
 		})
 		.error(function (data, status) {
 		    console.error('Error: ', status, data);
 		});
    }

    // Get string representation of role
    $scope.roleToString = function (role) {
        return StatUtility.Security.roleToString(role);
    }

    loadUsers();
}]);