module.exports = function (app) {

    var ReservationService = require('./../services/ReservationService');
    var RoomService = require('./../services/RoomService');
    var ServiceService = require('./../services/ServiceService');
    var PermissionService = require('./../services/PermissionService');
    var ValidationResult = require('./../models/ValidationResultStructure');
    var PermissionModule = require('./../models/StatModel').PermissionModule;
    var PermissionType = require('./../models/StatModel').PermissionType;

    // save reservation
    app.post('/api/reservation', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ReservationService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get available rooms
    app.post('/api/reservation/rooms', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        RoomService.getAvailableRooms(req.body, function (validation) {
            res.json(validation);
            return;
        });
    });

    // get all services
    app.get('/api/reservation/service', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ServiceService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get pension types
    app.get('/api/reservation/pensions', function (req, res) {
        ReservationService.getPensionTypes(function (validation) {
            res.json(validation);
        });
    });

    // get payment types
    app.get('/api/reservation/payments', function (req, res) {
        ReservationService.getPaymentTypes(function (validation) {
            res.json(validation);
        });
    });

    // get reservations based in filter
    app.post('/api/reservation/filtered', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ReservationService.getFilteredList(
            req.body.filter,
            req.body.limit,
            req.body.select,
            req.body.populate,
            function (validation) {
            res.json(validation);
        })
    });

    // get all reservations
    app.get('/api/reservation', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ReservationService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get reservation
    app.get('/api/reservation/:reservation_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.READ)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ReservationService.get({
            _id: req.params.reservation_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete reservation
    app.delete('/api/reservation/:reservation_id', function (req, res) {
        // Check if user has permissions
        if (!PermissionService.check(true, req.session, PermissionModule.RESERVATION, PermissionType.WRITE)) {
            var validation = new ValidationResult({});
            validation.addError('Uživatel nemá oprávnění ke zvolené operaci');
            res.json(validation);
            return;
        }

        ReservationService.remove({
            _id: req.params.reservation_id
        }, function (validation) {
            res.json(validation);
        });
    });


};