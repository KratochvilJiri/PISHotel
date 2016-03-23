angular.module("RoomSrvc", []).factory("RoomService", ["$http", function ($http) {

    return {
        // Save room
        save: function (room) {
            return $http.post("/api/room", room);
        },
        // Get all rooms
        getAll: function () {
            return $http.get("/api/room");
        },
        // Get all rooms
        getAvailable: function (period) {
            return $http.post("/api/room/available", period);
        },
        // Get room types
        getTypes: function () {
            return $http.get("/api/room/types");
        },
        // Delete room
        delete: function (roomID) {
            return $http.delete("/api/room/" + roomID);
        },
        // Get room
        get: function (roomID) {
            return $http.get("/api/room/" + roomID);
        }
    }

}]);