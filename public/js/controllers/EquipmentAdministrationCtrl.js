administrationModule
.controller('EquipmentAdministrationController', ['$scope', 'EquipmentService', function ($scope, EquipmentService) {
    // Init new item
    $scope.newItem = {
        name: ""
    };
    $scope.equipment = [];
    
    // Save item
    $scope.save = function (equipment) {
        EquipmentService.save(equipment)
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    $scope.newItem.name = "";
                    loadEquipment();
                } else {
                    $scope.showError(data.errors);
                }
            })
            .error(function (data, status) {
                console.error('Error: ', status, data.error);
            });
    }
    
    // Remove item
    $scope.remove = function (equipment) {
        EquipmentService.delete(equipment._id)
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    loadEquipment();
                } else {
                    $scope.showError(data.errors);
                }
            })
            .error(function (data, status) {
                console.error('Error: ', status, data.error);
            });
    }
    
    // Load all equipment
    var loadEquipment = function () {
        EquipmentService.getAll()
            .success(function (data, status, headers, config) {
                $scope.equipment = data.data;
            })
            .error(function (data, status) {
                console.error('Error: ', status, data.error);
            });
    }
    
    loadEquipment();
    
}]);