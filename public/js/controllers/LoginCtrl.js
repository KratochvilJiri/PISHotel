angular.module('LoginCtrl', []).controller('LoginController', ['$scope','$state', '$location','AuthorizationService', function ($scope, $state, $location, AuthorizationService) {

    $scope.user = {};

    $scope.authorize = function () {
        AuthorizationService.authorize($scope.user)
        .success(function (data) {
            if(data.isValid){
                $state.go('home.dashboard');
            }
            else{
                // to do - error function
                console.log("wrong pass/login - to do - print error function");
            }
            
        });
    }
}]);