administrationModule
.controller('RoomAdministrationController', ['$scope', '$state', '$stateParams', 'RoomService', function ($scope, $state, $stateParams, RoomService) {
    // init variables
    $scope.room = {};
    $scope.roomTypes = [];
    $scope.premises = [];
    $scope.premisesType = StatUtility.Premises.getTypes();
    console.log($scope.premisesType);

    // Load room types
    RoomService.getTypes().success(function (data) {
        // Check if data are valid
        if (data.isValid) {
            $scope.roomTypes = data.data;
        }
        else {
            $scope.showError(data.errors);
        }
    })

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

    $scope.addPremises = function (type) {
        // Add new one into array
        $scope.premises.push({
            premisesType: type,
            equipment: []
        });
    }
}]);