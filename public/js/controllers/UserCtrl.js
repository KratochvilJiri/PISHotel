angular.module('UserCtrl',[]).controller('UserController', ['$location','$scope', 'UserService', function($location, $scope, UserService){

	// define user for binding
	$scope.user = {};

	// clear form
	// $scope.formData = {};

	// create new User
	$scope.createUser = function () {
		
        console.log($scope.user);
        UserService.create($scope.user)
		.success(function(data, status, headers, config){
			$location.path('administration/users');
		})
		.error(function(data, status){
			console.error('Error', status, data);
		 });
	}
}]);