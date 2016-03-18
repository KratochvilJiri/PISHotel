angular.module('HomeCtrl',[]).controller('HomeController',['$scope','SessionService','AuthorizationService' ,function($scope, SessionService, AuthorizationService){
    $scope.errors = [];
    $scope.session = SessionService;
    
   $scope.deauthorize = function () {
         AuthorizationService.deauthorize()
        .success(function (data) {
            SessionService.removeCurrentUser()
        })
        .error(function(data, status){
			console.error('Error', status, data.error);
		 });
   }

   $scope.showError = function (errors) {
       $scope.errors = errors;
       $('html,body').animate({ scrollTop: 0 }, 'slow');
       $('.message.status-alert').fadeIn();
   }

   $scope.showSuccess = function (message) {
       $scope.message = message;
       $('html,body').animate({ scrollTop: 0 }, 'slow');
       $('.message.status-success').fadeIn().delay(1200).fadeOut();
   }
    
}]);