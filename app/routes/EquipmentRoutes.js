module.exports = function (app) {

    var EquipmentService = require('./../services/EquipmentService');
    var PermissionService = require('./../services/PermissionService');
    var ValidationResult = require('./../models/ValidationResultStructure');
    var PermissionModule = require('./../models/StatModel').PermissionModule;
    var PermissionType = require('./../models/StatModel').PermissionType;

    // save equipment
    app.post('/api/equipment', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_EQUIPMENT, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        // Save equipment
        EquipmentService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get all equipment
    app.get('/api/equipment', function (req, res) {
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_EQUIPMENT, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        EquipmentService.getList(function (validation) {
            res.json(validation);
        });
    });

    // delete equipment by ID
    app.delete('/api/equipment/:equipment_id', function (req, res) {
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_EQUIPMENT, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        EquipmentService.remove({
            _id: req.params.equipment_id
        }, function (validation) {
            res.json(validation);
        });
    });


};