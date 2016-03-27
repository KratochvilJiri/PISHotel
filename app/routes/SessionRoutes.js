module.exports = function (app) {
    var SessionService = require('./../services/SessionService');

    //isSet
    app.get('/api/session', function (req, res) {
        SessionService.isSet(req.session, function (validation) {
            res.json(validation);
        });
    });

    // update
    app.get('/api/session/update', function (req, res) {
        SessionService.update(req.session, function (validation) {
            res.json(validation);
        });
    });

}; 