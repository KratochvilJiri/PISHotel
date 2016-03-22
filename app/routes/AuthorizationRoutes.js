module.exports = function (app) {
    var User = require('./../models/UserModel');
    var Permissions = require('./../security/Permissions');   
    
    app.post("/api/authorization/authorize", function (req, res) {
        User.findOne({ 'login': req.body.login }, function (err, user) {
            if (err){
              //throw err;
              res.json({isValid: false, data: null, error: err }); 
            } 
            
            // user not found
            if(!user){
                res.json({isValid: false, data: null, error: ["User not found."] });
            }
            else if(user){
                // check if password matches
                if(user.password != req.body.password){
                    res.json({isValid: false, data: null, error: ["Wrong password."]});
                }
                // user found and password is right
                else{
                    req.session.name = user.name;
                    req.session.role = user.role;
                    req.session._id = user._id;
                    req.session.permissions = Permissions[req.session.role];
                    res.json({isValid: true, data: true, error: null});
                    
                }    
            }
        });     
    });

    app.get("/api/authorization/deauthorize", function (req, res) {
        req.session.name = null;
        req.session.role = null;
        req.session.permissions = null;
        res.json({isValid: true, data: null, error: null});
    });
};