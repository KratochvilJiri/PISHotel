customers
.controller('CustomersListController', ['$scope', 'CustomerService', function ($scope, CustomerService) {
    $scope.filter = "";
    $scope.customers = [];

    $scope.$watch('filter', function (value) {
        loadCustomers();
    });

    // getAll customers - every page-load
    var loadCustomers = function () {
        CustomerService.getFiltered({
            filter: {
                $or: [
                    {
                        name: {
                            "$regex": $scope.filter,
                            "$options": "i"
                        }
                    },
                    {
                        ID: {
                            "$regex": $scope.filter,
                            "$options": "i"
                        }
                    }
                ]
            },
            limit: 0
        })
        .success(function (data, status, headers, config) {
            if (data.isValid)
                $scope.customers = data.data;
            else
                $scope.showError(data.errors);
        })
        .error(function (data, status) {
            console.error('Error: ', status, data.error);
        });
    }

    // remove Customer by ID
    $scope.remove = function (customerID) {
        // Confirmation dialog
        if (!confirm("Opravdu chcete smazat zákazníka?"))
            return;

        CustomerService.delete(customerID)
 		.success(function (data) {
 		    if (data.isValid) {
 		        loadCustomers();
 		        $scope.showSuccess("Zákazník byl úspěšně odstraněn");
 		    } else {
 		        $scope.showError(data.errors);
 		    }
 		})
 		.error(function (data, status) {
 		    console.error('Error: ', status, data);
 		});
    }

    loadCustomers();
}]);