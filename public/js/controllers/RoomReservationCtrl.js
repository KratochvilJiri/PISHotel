reservations
.controller('RoomReservationController', ['$scope', '$state', 'CustomerService', 'RoomService', 'ReservationService', function ($scope, $state, CustomerService, RoomService, ReservationService) {
    $scope.reservation = {};
    $scope.customers = [];
    $scope.rooms = [];
    $scope.pensionTypes = [];
    $scope.paymentTypes = [];

    // Set customer for reservation
    $scope.setCustomer = function (customer) {
        $scope.reservation.customer = customer;
    }


    // Save reservation
    $scope.save = function () {
        ReservationService.save($scope.reservation)
		.success(function (data, status, headers, config) {
		    if (data.isValid) {
		        $state.go('home.reservation.rooms');
		    }
		    else {
		        $scope.showError(data.errors);
		    }
		})
		.error(function (data, status) {
		    console.error('Error', status, data);
		});
    }

    // Load customers TODO: based on filter
    var loadCustomers = function () {
        CustomerService.getAll()
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.customers = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    }

    // Load rooms TODO: just available ones
    var loadRooms = function () {
        RoomService.getAll()
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.rooms = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    }

    // Customer to string
    $scope.customerToString = function (customer) {
        return StatUtility.Customer.toString(customer);
    }

    // Load pension types
    var loadPensions = function () {
        ReservationService.getPensionTypes()
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.pensionTypes = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    }

    // Load payment types
    var loadPayments = function () {
        ReservationService.getPaymentTypes()
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.paymentTypes = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    }

    // Load all needed
    loadPayments();
    loadPensions();
    loadCustomers();
    loadRooms();
}]);