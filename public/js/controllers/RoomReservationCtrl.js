reservations
.controller('RoomReservationController', [
    '$scope', '$state', '$stateParams', 'CustomerService', 'ReservationService',
    function ($scope, $state, $stateParams, CustomerService, ReservationService) {
    $scope.reservation = {};
    $scope.customers = [];
    $scope.services = [];
    $scope.rooms = [];
    $scope.pensionTypes = [];
    $scope.paymentTypes = [];
    $scope.newReservationService = {};
    $scope.newCustomer = false;

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
    
    // change reservation state
    $scope.reservationStateChanged = function (reservationState){
        $scope.reservation.state = reservationState;
        console.log($scope.reservation);
        ReservationService.save($scope.reservation)
		.success(function (data, status, headers, config) {
		    if (data.isValid) {
		        $scope.showSuccess("Stav rezervace byl úspešně změněn");
		    }
		    else {
		        $scope.showError(data.errors);
		    }
		})
		.error(function (data, status) {
		    console.error('Error', status, data);
		});
    }     
        
        
    // Watch for reservation change
    $scope.$watch('reservation', function (newVal, oldVal) {
        // Check if dates are set
        if (!newVal.dateFrom || !newVal.dateTo)
            return;

        // Invalid date
        if (newVal.dateFrom > newVal.dateTo)
            return;

        // Check if value changed
        if (newVal.dateFrom == oldVal.dateFrom && newVal.dateTo == oldVal.dateTo)
            return;

        // Load available rooms based on date
        loadAvailableRooms();
    }, true);

    // Set customer for reservation
    $scope.setCustomer = function (customer) {
        $scope.reservation.customer = customer;
        $scope.newCustomer = false;
    }

    // New customer
    $scope.createNewCustomer = function () {
        $scope.newCustomer = true;
        $scope.reservation.customer = {};
    }

    // Set room for reservation
    $scope.setRoom = function (room) {
        $scope.reservation.room = room;
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
        // new reservation --> state = CREATED
        if(!$scope.reservation._id)
            $scope.reservation.state = 0;
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

    // Load customers
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

    // Load rooms
    var loadAvailableRooms = function () {
        // Set reservation id, if we are on detail
        var reservation = "";
        if ($stateParams.reservationId)
            reservation = $stateParams.reservationId;

        // Get available rooms
        ReservationService.getAvailableRooms({
            period: {
                dateFrom: $scope.reservation.dateFrom,
                dateTo: $scope.reservation.dateTo
            },
            reservation: reservation
        })
        .success(function (data, status, headers, config) {
            if (data.isValid) {
                $scope.rooms = data.data;
            }
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    };

        // Load services
    var loadServices = function () {
        ReservationService.getServices()
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

    // Room to string
    $scope.roomToString = function (room) {
        return StatUtility.Room.toString(room);
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