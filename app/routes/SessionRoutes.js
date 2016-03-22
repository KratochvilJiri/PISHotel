module.exports = function (app) {
    var User = require('./../models/UserModel');

    //isSet
    app.get('/api/session', function (req, res) {
        // sesssion is set - true
        if (req.session.role) {
             res.json({ isValid: true, data: null, error: null });
        }
        // session is not set - false
        else {
            res.json({ isValid: false, data: null, error: null });
        }
    });

    // update
    app.get('/api/session/update', function (req, res) {
        
        // if session is set, return role and name in data
        if (req.session.role) {
            res.json({
                isValid: true,
                data: {
                    name: req.session.name,
                    role: req.session.role,
                    _id: req.session._id
                }, error: null
            });
        }
        // if not, return data - false
        else {
            res.json({ isValid: true, data: false, error: null });
        }
    });

}; 