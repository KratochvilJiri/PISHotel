customers
.controller('CustomerController', ['$scope', '$state', '$stateParams', 'CustomerService', function ($scope, $state, $stateParams, CustomerService) {
    // define customer for binding
    $scope.customer = {};

    // Load current customer if state params is set
    if ($stateParams.customerId) {
        CustomerService.get($stateParams.customerId)
            .success(function (data, status, headers, config) {
                if (data.isValid) {
                    $scope.customer = data.data;
                }
                else {
                    $scope.showError(data.errors);
                }
            })
		    .error(function (data, status) {
		        console.error('Error', status, data);
		    });
    }

    // save
    $scope.save = function () {
        CustomerService.save($scope.customer)
		.success(function (data, status, headers, config) {
		    if (data.isValid) {
		        $state.go('home.customers.list');
		    }
		    else {
		        $scope.showError(data.errors);
		    }
		})
		.error(function (data, status) {
		    console.error('Error', status, data);
		});
    }

    $scope.addContact = function (type) {
        // Init contact array if it is not set
        if (!$scope.customer.contact)
            $scope.customer.contact = [];

        // Add new contact
        $scope.customer.contact.push({
            contactType: type
        });
    }

    $scope.removeContact = function (index) {
        // Remove contact from list
        $scope.customer.contact.splice(index, 1);
    }
}]);