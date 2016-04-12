administrationModule
.controller('RoomsAdministrationController', ['$scope', 'RoomService', function ($scope, RoomService) {
    // Init variables
    $scope.rooms = [];

    // getAll rooms - every page-load
    var loadRooms = function () {
        RoomService.getAll().success(function (data) {
            if (data.isValid)
                $scope.rooms = data.data;
            else
                $scope.showError(data.errors);
        });
    }

    // remove room by _id
    $scope.remove = function (roomID) {
        // Confirmation dialog
        if (!confirm("Opravdu chcete smazat pokoj?"))
            return;

        RoomService.delete(roomID).success(function (data) {
            if (data.isValid) {
                loadRooms();
                $scope.showSuccess("Pokoj byl úspěšně odstraněn");
            } else {
                $scope.showError(data.errors);
            }
        });
    }


    // Load rooms
    loadRooms();
}]);