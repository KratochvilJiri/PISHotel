// public/js/appRoutes.js

app.config(function ($stateProvider, $urlRouterProvider) {

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
        .state('home.profile', {
            url: 'profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        .state('home.customers', {
            url: 'customers',
            abstract: true,
            templateUrl: 'views/customers',
            controller: 'CustomersController'
        })
        .state('home.customers.list', {
            url: '',
            templateUrl: 'views/customers/customers.html',
            controller: 'CustomersListController'
        })
        .state('home.customers.detail', {
            url: '/customer/{customerId}',
            templateUrl: 'views/customers/customer.html',
            controller: 'CustomerController'
        })
        .state('home.customers.new', {
            url: '/customer',
            templateUrl: 'views/customers/customer.html',
            controller: 'CustomerController'
        })
        .state('home.reservations', {
            url: 'reservations',
            abstract: true,
            templateUrl: 'views/reservations/',
            controller: 'ReservationsController'
        })
        .state('home.reservations.rooms', {
            url: '',
            templateUrl: 'views/reservations/rooms.html',
            controller: 'RoomsReservationsController'
        })
        .state('home.reservations.new', {
            url: '/reservation',
            templateUrl: 'views/reservations/room.html',
            controller: 'RoomReservationController'
        })
        .state('home.reservations.services', {
            url: '/service',
            templateUrl: 'views/reservations/services.html',
            controller: 'ServicesReservationsController'
        })
        .state('home.administration', {
            url: 'administration',
            templateUrl: 'views/administration/',
            controller: 'AdministrationController'
        })
        .state('home.administration.rooms', {
            url: '/rooms',
            templateUrl: 'views/administration/rooms.html',
            controller: 'RoomsAdministrationController'
        })
        .state('home.administration.equipment', {
            url: '/equipment',
            templateUrl: 'views/administration/equipment.html',
            controller: 'EquipmentAdministrationController'
        })
        .state('home.administration.room', {
            url: '/room',
            templateUrl: 'views/administration/room.html',
            controller: 'RoomAdministrationController'
        })
        .state('home.administration.room-detail', {
            url: '/room/{roomId}',
            templateUrl: 'views/administration/room.html',
            controller: 'RoomAdministrationController'
        })
        .state('home.administration.services', {
            url: '/services',
            templateUrl: 'views/administration/services.html',
            controller: 'ServicesAdministrationController'
        })
        .state('home.administration.users', {
            url: '/users',
            templateUrl: 'views/administration/users.html',
            controller: 'UsersAdministrationController'
        })
        .state('home.administration.user', {
            url: '/user',
            templateUrl: 'views/administration/user.html',
            controller: 'UserAdministrationController'
        })
        .state('home.administration.user-detail', {
            url: '/user/{userId}',
            templateUrl: 'views/administration/user.html',
            controller: 'UserAdministrationController'
        });
    // $locationProvider.html5Mode(true);

});