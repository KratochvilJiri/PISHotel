﻿angular.module("CustomerSrvc", []).factory("CustomerService", ["$http", function ($http) {

    return {
        save: function (customer) {
            return $http.post("/api/customer", customer);
        },

        getAll: function () {
            return $http.get("/api/customer");
        },
        // Get filtered customers
        getFiltered: function (query) {
            return $http.post("/api/customer/filtered", query);
        },
        delete: function (customerID) {
            return $http.delete("/api/customer/" + customerID);
        },
        get: function (customerID) {
            return $http.get("/api/customer/" + customerID);
        }
    }

}]);