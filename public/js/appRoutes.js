// public/js/appRoutes.js

app.config(function($stateProvider, $urlRouterProvider) {

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
            templateUrl: 'views/home.html',
            controller: 'HomeController'
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
        .state('home.reservations', {
            url: 'reservations',
            templateUrl: 'views/reservations.html',
            controller: 'ReservationsController'
        })
        .state('home.administration', {
            url: 'administration',
            templateUrl: 'views/administration.html',
            controller: 'AdministrationController'
        })
        .state('home.administration.rooms', {
            url: '/rooms',
            templateUrl: 'views/rooms.html',
            controller: 'RoomsAdministrationController'
        })
        .state('home.administration.equipment', {
            url: '/equipment',
            templateUrl: 'views/equipment.html',
            controller: 'EquipmentAdministrationController'
        })
        .state('home.administration.room-new', {
            url: '/room/new',
            templateUrl: 'views/room_detail.html',
            controller: 'RoomDetailAdministrationController'
        })
        .state('home.administration.services', {
            url: '/services',
            templateUrl: 'views/services.html',
            controller: 'ServicesAdministrationController'
        })
        .state('home.administration.users', {
            url: '/users',
            templateUrl: 'views/users.html',
            controller: 'UsersAdministrationController'
        })
        .state('home.administration.user', {
            url: '/user',
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })
        ;
    // $locationProvider.html5Mode(true);

});