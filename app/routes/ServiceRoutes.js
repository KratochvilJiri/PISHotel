module.exports = function (app) {

    var ServiceService = require('./../services/ServiceService');
    var PermissionService = require('./../services/PermissionService');
    var ValidationResult = require('./../models/ValidationResultStructure');
    var PermissionModule = require('./../models/StatModel').PermissionModule;
    var PermissionType = require('./../models/StatModel').PermissionType;

    // save service
    app.post('/api/service', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_SERVICE, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ServiceService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get all services
    app.get('/api/service', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_SERVICE, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ServiceService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get service
    app.get('/api/service/:service_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_SERVICE, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ServiceService.get({
            _id: req.params.service_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete service
    app.delete('/api/service/:service_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_SERVICE, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ServiceService.remove({
            _id: req.params.service_id
        }, function (validation) {
            res.json(validation);
        });
    });


};