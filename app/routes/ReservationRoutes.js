module.exports = function (app) {

    var ReservationService = require('./../services/ReservationService');

    // save reservation
    app.post('/api/reservation', function (req, res) {
        ReservationService.save(req.body, function (validation) {
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
        ReservationService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get reservation
    app.get('/api/reservation/:reservation_id', function (req, res) {
        ReservationService.get({
            _id: req.params.reservation_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete reservation
    app.delete('/api/reservation/:reservation_id', function (req, res) {
        ReservationService.remove({
            _id: req.params.reservation_id
        }, function (validation) {
            res.json(validation);
        });
    });


};