// public/js/appRoutes.js

    app.config( function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider

        // login to app
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .state('home', {
            url: '/',
            abstract: true,
            templateUrl: 'views/home.html'
        })
        .state('home.dashboard', {
            url: '',
            templateUrl: 'views/dashboard.html'
        })
        .state('home.customers', {
            url: 'customers',
            templateUrl: 'views/customers.html',
            controller: 'CustomersController'
        })
        .state('home.administration', {
            url: 'administration',
            templateUrl: 'views/administration.html',
            controller: 'AdministrationController'
        })
        .state('home.reservations', {
            url: 'reservations',
            templateUrl: 'views/reservations.html',
            controller: 'ReservationsController'
        })
        .state('home.users',{
            url: 'users',
            templateUrl: 'views/a_users.html'
        })

        .state('home.user',{
            url: 'user',
            templateUrl: 'views/a_newUser.html'
        });
   // $locationProvider.html5Mode(true);

});