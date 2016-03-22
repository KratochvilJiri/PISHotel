angular.module("ServiceSrvc", []).factory("ServiceService", ["$http", function ($http) {

    return {
        save: function (service) {
            return $http.post("/api/service", service);
        },

        getAll: function () {
            return $http.get("/api/service");
        },

        delete: function (serviceID) {
            return $http.delete("/api/service/" + serviceID);
        },
        get: function (serviceID) {
            return $http.get("/api/service/" + serviceID);
        }
    }

}]);