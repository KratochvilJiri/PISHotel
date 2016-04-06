module.exports = function (app) {

    var CustomerService = require('./../services/CustomerService');
    var PermissionService = require('./../services/PermissionService');
    var ValidationResult = require('./../models/ValidationResultStructure');
    var PermissionModule = require('./../models/StatModel').PermissionModule;
    var PermissionType = require('./../models/StatModel').PermissionType;

    // save customer
    app.post('/api/customer', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.CUSTOMER, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        CustomerService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get all customers
    app.get('/api/customer', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.CUSTOMER, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        CustomerService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get customers based in filter
    app.post('/api/customer/filtered', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.CUSTOMER, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        CustomerService.getFilteredList(
            req.body.filter,
            req.body.limit,
            req.body.select,
            req.body.populate,
            function (validation) {
                res.json(validation);
            })
    });

    // get customer
    app.get('/api/customer/:customer_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.CUSTOMER, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        CustomerService.get({
            _id: req.params.customer_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete customer
    app.delete('/api/customer/:customer_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.CUSTOMER, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
        }

        CustomerService.remove({
            _id: req.params.customer_id
        }, function (validation) {
            res.json(validation);
        });
    });


};