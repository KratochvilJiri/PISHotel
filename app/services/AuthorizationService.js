// Load required modules
var UserModel = require('./../models/UserModel');
var ValidationResult = require('./../models/ValidationResultStructure');
var Permissions = require('./../security/Permissions');

module.exports = {
    // Deauthorize user
    deauthorize: function (session, callback)  {
        // Init validation
        var validation = new ValidationResult({});

        // Set user to null
        session.user = null;

        // Return validation
        return validation;
    },
    // Authorize user
    authorize: function (user, session, callback) {
        // Init validation
        validation = this.validate(user);

        // Check validation
        if (!validation.isValid) {
            callback(validation);
            return;
        }
        
        // Find user given by login
        UserModel.findOne({
            login: user.login
        }, function (err, dbUser) {
            // Check for mongo error
            if (err || !dbUser) {
                validation.addError('Neexistující uživatel nebo špatné heslo');
                callback(validation);
                return;
            }

            // Check if passwords match
            if (dbUser.password != user.password) {
                validation.addError('Neexistující uživatel nebo špatné heslo');
                callback(validation);
                return;
            }

            // All passed, so set session TODO: Permissions
            session.user = { 
                name: dbUser.name,
                role: dbUser.role,
                _id: dbUser._id,
                permissions: Permissions[0]
            }
            

            // Return validation, but remove password just to be sure
            validation.data.password = "";
            callback(validation);
            return;
        })
    },
    // Validate object
    validate: function (user) {
        // Init validation
        var validation = new ValidationResult(user);

        // Validation
        validation.checkIsDefinedAndNotEmpty('login', 'Uživatelské jméno musí být zadáno');
        validation.checkIsDefinedAndNotEmpty('password', 'Heslo musí být zadáno');

        // Return validation
        return validation;
    }
}