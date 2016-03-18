// public/js/app.js

var app = angular.module('receptionist', ['ui.router',
	'MainCtrl',
    'LoginCtrl',
    'DashboardCtrl',
    'UserCtrl',
    'ReservationsCtrl',
    'CustomersCtrl',
    'AdministrationCtrl',
    'HomeCtrl',
    'AuthorizationSrvc',
    'UserSrvc',
    'SessionSrvc',
    'EquipmentSrvc']);

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            $('.ui.dropdown').dropdown();
            $('.ui.tabular .item').tab();
            $('.message .close').on('click', function () {
                $(this).closest('.message').fadeOut(200);
            });
        }, 500);
    })
});

// session check
app.run(['$rootScope', '$state', 'SessionService', function ($rootScope, $state, SessionService) {
    // location to change
    $rootScope.$on('$stateChangeStart', function (event, next) {
        
        // is session set?
        SessionService.isSet()
            .success(function (data) {
                // server session is set, client session not
                if(data.isValid && SessionService.currentUser == null){
                    SessionService.updateCurrentUser();                 
                }
                // session is not set
                else if(!data.isValid){
                    $state.go('login');
                }
            });
    });
}]);



