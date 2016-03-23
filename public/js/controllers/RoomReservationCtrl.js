reservations
.controller('RoomReservationController', [
    '$scope', '$state', '$stateParams', 'CustomerService', 'RoomService', 'ReservationService', 'ServiceService',
    function ($scope, $state, $stateParams, CustomerService, RoomService, ReservationService, ServiceService) {
    $scope.reservation = {};
    $scope.customers = [];
    $scope.services = [];
    $scope.rooms = [];
    $scope.pensionTypes = [];
    $scope.paymentTypes = [];
    $scope.newReservationService = {};

    // Load reservation if id is set
    if ($stateParams.reservationId) {
        ReservationService.get($stateParams.reservationId).success(function (data) {
            // Check if data are valid
            if (data.isValid) {
                $scope.reservation = data.data;
            }
            else {
                $scope.showError(data.errors);
            }
        });
    }

    // Watch for reservation change
    $scope.$watch('reservation', function (newVal, oldVal) {
        // Check if dates are set
        if (!newVal.dateFrom || !newVal.dateTo)
            return;

        // Check if value changed
        if (newVal.dateFrom == oldVal.dateFrom && newVal.dateTo == oldVal.dateTo)
            return;

        // Invalid date
        if (newVal.dateFrom > newVal.dateTo)
            return;

        // Load available rooms based on date
        loadAvailableRooms();
    }, true);

    // Set customer for reservation
    $scope.setCustomer = function (customer) {
        $scope.reservation.customer = customer;
    }

    // Add service
    $scope.addService = function (service) {
        // Values have to be set
        if (!service.service || !service.count || service.count == 0)
            return;

        // Init array if is not
        if (!$scope.reservation.services)
            $scope.reservation.services = [];

        // Reset new item
        $scope.newReservationService = {};

        // add service to list
        $scope.reservation.services.push(service);
    }

    // Remove service
    $scope.removeService = function (index) {
        $scope.reservation.services.splice(index, 1);
    }


    // Save reservation
    $scope.save = function () {
        ReservationService.save($scope.reservation)
		.success(function (data, status, headers, config) {
		    if (data.isValid) {
		        $state.go('home.reservations.rooms');
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
    var loadAvailableRooms = function () {
        RoomService.getAvailable({
            dateFrom: $scope.reservation.dateFrom,
            dateTo: $scope.reservation.dateTo
        })
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.rooms = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    };

        // Load services TODO: based on filter
    var loadServices = function () {
        ServiceService.getAll()
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.services = data.data;
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
    loadServices();
}]);