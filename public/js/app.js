// public/js/app.js

var app = angular.module('receptionist', ['ui.router',
	'MainCtrl',
    'LoginCtrl',
    'DashboardCtrl',
    'ANewUserCtrl',
    'ReservationsCtrl',
    'CustomersCtrl',
    'AdministrationCtrl',
    'UserSrvc']);


app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function () {
        $timeout(function () {
            $('.ui.dropdown').dropdown();
            $('.ui.tabular .item').tab();
        }, 500);
    })
});
