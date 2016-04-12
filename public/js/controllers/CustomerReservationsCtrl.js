reservations.controller('CustomerReservationsController', ['$scope', '$stateParams', 'ReservationService', function ($scope, $stateParams, ReservationService) {
    // Init variables
    $scope.reservations = [];

    // get reservations - every page-load
    var loadReservations = function () {
        ReservationService.getFiltered({
            filter: {
                "customer": $stateParams.customerId
            },
            populate: ['room', 'customer'],
            limit: 0
        }).success(function (data) {
            if (data.isValid)
                $scope.reservations = data.data;
            else
                $scope.showError(data.errors);
        });
    }

    // remove reservation by _id
    $scope.remove = function (reservationID) {
        // Confirmation dialog
        if (!confirm("Opravdu chcete smazat rezervaci?"))
            return;

        ReservationService.delete(reservationID).success(function (data) {
            if (data.isValid) {
                loadReservations();
                $scope.showSuccess("Rezervace byla úspěšně odstraněna");
            } else {
                $scope.showError(data.errors);
            }
        });
    }


    // Load reservations
    loadReservations();
}]);