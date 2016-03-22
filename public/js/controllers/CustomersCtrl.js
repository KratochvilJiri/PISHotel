angular.module('CustomersCtrl', []).controller('CustomersController', ['$scope', 'CustomerService', function ($scope, CustomerService) {
    // getAll customers - every page-load
    var loadCustomers = function () {
        CustomerService.getAll()
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