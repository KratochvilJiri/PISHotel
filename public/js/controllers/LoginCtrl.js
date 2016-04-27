angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$state', '$location', 'AuthorizationService', function ($scope, $state, $location, AuthorizationService) {

    $scope.user = {};

    $scope.authorize = function () {
        AuthorizationService.authorize($scope.user)
            .success(function (data) {
                if (data.isValid) {
                    $state.go('home.dashboard');
                }
                else {
                    // to do - error function
                    $scope.showError(["Neplatné přihlašovací údaje."]);
                }

            });
    }

    $scope.showError = function (errors) {
        $scope.errors = errors;
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        $('.message.status-alert').fadeIn();
    }
}]);