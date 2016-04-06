module.exports = function (app) {

    var RoomService = require('./../services/RoomService');
    var PermissionService = require('./../services/PermissionService');
    var ValidationResult = require('./../models/ValidationResultStructure');
    var PermissionModule = require('./../models/StatModel').PermissionModule;
    var PermissionType = require('./../models/StatModel').PermissionType;

    // save room
    app.post('/api/room', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_ROOM, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        RoomService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get room types
    app.get('/api/room/types', function (req, res) {
        RoomService.getTypes(function (validation) {
            res.json(validation);
        });
    })

    // get all rooms
    app.get('/api/room', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_ROOM, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        RoomService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get room
    app.get('/api/room/:room_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_ROOM, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        RoomService.get({
            _id: req.params.room_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete room
    app.delete('/api/room/:room_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.ADMINISTRATION_ROOM, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        RoomService.remove({
            _id: req.params.room_id
        }, function (validation) {
            res.json(validation);
        });
    });


};