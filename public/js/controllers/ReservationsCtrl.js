var reservations = angular.module('ReservationsCtrl', [])
.controller('ReservationsController', ['$scope', 'ReservationService', function ($scope, ReservationService) {
    // Init variables
    $scope.reservations = [];

    // getAll reservations - every page-load
    var loadReservations = function () {
        ReservationService.getAll().success(function (data) {
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


    // Load reservations
    loadReservations();
}]);