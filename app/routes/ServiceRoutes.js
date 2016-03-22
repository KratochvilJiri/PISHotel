module.exports = function (app) {

    var ServiceService = require('./../services/ServiceService');

    // save service
    app.post('/api/service', function (req, res) {
        ServiceService.save(req.body, function (validation) {
            res.json(validation);
        });
    });

    // get all services
    app.get('/api/service', function (req, res) {
        ServiceService.getList(function (validation) {
            res.json(validation);
        });
    });

    // get service
    app.get('/api/service/:service_id', function (req, res) {
        ServiceService.get({
            _id: req.params.service_id
        }, function (validation) {
            res.json(validation);
        });
    });

    // delete service
    app.delete('/api/service/:service_id', function (req, res) {
        ServiceService.remove({
            _id: req.params.service_id
        }, function (validation) {
            res.json(validation);
        });
    });


};