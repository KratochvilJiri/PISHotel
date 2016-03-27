module.exports = function (app) {
    var AuthorizationService = require('./../services/AuthorizationService');
    
    // Authorize user
    app.post("/api/authorization/authorize", function (req, res) {
        AuthorizationService.authorize(req.body, req.session, function (validation) {
            res.json(validation);
        });
    });

    // Deauthorize user
    app.get("/api/authorization/deauthorize", function (req, res) {
        AuthorizationService.authorize(req.session, function (validation) {
            res.json(validation);
        });
    });
};