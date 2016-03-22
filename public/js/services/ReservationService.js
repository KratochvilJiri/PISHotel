angular.module("ReservationSrvc", []).factory("ReservationService", ["$http", function ($http) {

    return {
        // Save reservation
        save: function (reservation) {
            return $http.post("/api/reservation", reservation);
        },
        // Get all reservations
        getAll: function () {
            return $http.get("/api/reservation");
        },
        // Get payment types
        getPaymentTypes: function () {
            return $http.get("/api/reservation/payments");
        },
        // Get pension types
        getPensionTypes: function () {
            return $http.get("/api/reservation/pensions");
        },
        // Delete reservation
        delete: function (reservationID) {
            return $http.delete("/api/reservation/" + reservationID);
        },
        // Get reservation
        get: function (reservationID) {
            return $http.get("/api/reservation/" + reservationID);
        }
    }

}]);