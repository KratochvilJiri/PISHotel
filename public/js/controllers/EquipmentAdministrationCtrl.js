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
                if (data.validation) {
                    $scope.newItem.name = "";
                    loadEquipment();
                } else {
                    // TODO: Show error message
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
                if (data.validation) {
                    loadEquipment();
                } else {
                    // TODO: Show error message
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