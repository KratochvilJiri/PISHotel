administrationModule.controller('ServicesAdministrationController', ['$scope', 'ServiceService', function ($scope, ServiceService) {
    // Init new item
    $scope.newItem = {
        name: ""
    };
    $scope.services = [];

    // Save item
    $scope.save = function (service) {
        ServiceService.save(service)
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    $scope.newItem.name = "";
                    $scope.newItem.price = null;
                    $scope.showSuccess("Položka byla úspěšně uložena");
                    loadService();
                } else {
                    $scope.showError(data.errors);
                }
            })
            .error(function (data, status) {
                console.error('Error: ', status, data.error);
            });
    }

    // Remove item
    $scope.remove = function (service) {
        // Confirmation dialog
        if (!confirm("Opravdu chcete smazat rezervaci?"))
            return;

        ServiceService.delete(service._id)
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    $scope.showSuccess("Položka byla úspěšně odstraněna");
                    loadService();
                } else {
                    $scope.showError(data.errors);
                }
            })
            .error(function (data, status) {
                console.error('Error: ', status, data.error);
            });
    }

    // Load all services
    var loadService = function () {
        ServiceService.getAll()
            .success(function (data, status, headers, config) {
                $scope.services = data.data;
            })
            .error(function (data, status) {
                console.error('Error: ', status, data.error);
            });
    }

    loadService();

}]);