reservations.controller('RoomsReservationsController', ['$scope', 'ReservationService', function ($scope, ReservationService) {
    // Init variables
    $scope.reservations = [];
    $scope.states = StatUtility.Reservation.getStates();
    $scope.filter = {
        states: []
    }

    // Load reservations after filter change
    $scope.$watch('filter', function (filter) {
        if (!filter)
            return;

        loadReservations();
    }, true);

    // get reservations - every page-load
    var loadReservations = function () {
        // Init filter object
        var filterObject = {
            filter: {
            },
            populate: ['room', 'customer'],
            limit: 0
        };

        // If states is set, use it
        if ($scope.filter.states.length > 0) {
            filterObject.filter.state = {
                $in: $scope.filter.states
            }
        }

        ReservationService.getFiltered(filterObject).success(function (data) {
            if (data.isValid)
                $scope.reservations = data.data;
            else
                $scope.showError(data.errors);
        });
    }

    // remove reservation by _id
    $scope.remove = function (reservationID) {
        ReservationService.delete(reservationID).success(function (data) {
            if (data.isValid) {
                loadReservations();
                $scope.showSuccess("Rezervace byla úspěšně odstraněna");
            } else {
                $scope.showError(data.errors);
            }
        });
    }

    // Get string for state
    $scope.stateToString = function (state) {
        return StatUtility.Reservation.toString(state);
    }

    // Load reservations
    loadReservations();
}]);