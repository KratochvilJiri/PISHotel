administrationModule
.controller('RoomAdministrationController', ['$scope', '$state', '$stateParams', 'RoomService', 'EquipmentService', function ($scope, $state, $stateParams, RoomService, EquipmentService) {
    // init variables
    $scope.room = {};
    $scope.roomTypes = [];
    $scope.equipment = [];
    $scope.premisesType = StatUtility.Premises.getTypes();

    // Load room types
    RoomService.getTypes().success(function (data) {
        // Check if data are valid
        if (data.isValid) {
            $scope.roomTypes = data.data;
        }
        else {
            $scope.showError(data.errors);
        }
    });

    // Load equipment
    EquipmentService.getAll().success(function (data) {
        // Check if data are valid
        if (data.isValid) {
            $scope.equipment = data.data;
        }
        else {
            $scope.showError(data.errors);
        }
    });

    // Load room if id is set
    if ($stateParams.roomId) {
        RoomService.get($stateParams.roomId).success(function (data) {
            // Check if data are valid
            if (data.isValid) {
                $scope.room = data.data;
            }
            else {
                $scope.showError(data.errors);
            }
        });
    }

    // Save room function
    $scope.save = function () {
        RoomService.save($scope.room).success(function (data) {
            // Check if data are valid
            if (data.isValid) {
                $scope.showSuccess("Pokoj byl úspěšně uložen");
                $state.go('home.administration.rooms');
            }
            else {
                $scope.showError(data.errors);
            }
        });
    }

    // Add premises into array
    $scope.addPremises = function (type) {
        // Init premises array if is not
        if (!$scope.room.premises)
            $scope.room.premises = [];

        // Add new one into array
        $scope.room.premises.push({
            premisesType: type,
            equipment: []
        });
    }

    // Remove premises from room
    $scope.removePremises = function (index) {
        $scope.room.premises.splice(index, 1);
    }
}]);