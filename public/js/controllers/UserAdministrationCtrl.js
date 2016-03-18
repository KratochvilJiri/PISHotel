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
}]);