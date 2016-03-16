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
        }, 500);
    })
});

// session check
app.run(['$rootScope', '$location', 'SessionService', function ($rootScope, $location, SessionService) {
    // location to change
    $rootScope.$on('$stateChangeStart', function (event, next) {
        
        $rootScope.session = SessionService;

        // is session set?
        SessionService.isSet()
            .success(function (data) {
                // server session is set, client session not
                if(data.data && $rootScope.session.currentUser == null){
                    SessionService.updateCurrentUser();                 
                }
                // session is not set
                else if(!data.data){
                    $location.path('/login');
                }
                // server and client sessiont is set
                else{
                    console.log("nic");
                }
            });
    });
}]);

