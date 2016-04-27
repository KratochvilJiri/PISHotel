// Load required modules
var UserModel = require('./../models/UserModel');
var ValidationResult = require('./../models/ValidationResultStructure'); 

var UserService = {
    // Save user
    save: function (user, callback) {
        // Validate user before saving
        var validation = this.validate(user);

        // If validation is not valid, return in
        if (!validation.isValid) {
            callback(validation);
            return;
        }

        // Check if _id is set
        if (user._id) {
            // It is, so we are updating existing one
            UserModel.findById(user._id, function (err, dbUser) {
                // Check for error
                if (err) {
                    validation.addError("Uživatele se nezdařilo nalézt v databázi");
                    callback(validation);
                    return;
                }

                // Update user and save it
                dbUser.name = user.name;
                dbUser.role = user.role;
                dbUser.login = user.login;
                dbUser.address = user.address;

                // If password is set, change it
                if (user.password)
                    dbUser.password = user.password;
                // If contact is set, change it
                if (user.contact)
                    dbUser.contact = user.contact;

                // Save user
                dbUser.save(function (err) {
                    if (err) {
                        validation.addError("Uživatele se nezdařilo uložit");
                        callback(validation);
                        return;
                    }

                    // Call user function
                    callback(validation);
                    return;
                });
            })
        }
            // We are creating new
        else {
            UserModel.create(user, function (err, dbUser) {
                // Something went wrong
                if (err) {
                    validation.addError("Uživatele se nezdařilo uložit");
                    callback(validation);
                    return;
                }

                // Call user function
                callback(validation);
                return;
            });
        }
    },
    // Validate
    validate: function (user) {
        // Init validation
        validation = new ValidationResult(user);

        // Check required values
        validation.checkIsDefinedAndNotEmpty('login', "Uživatelské jméno je povinné");
        validation.checkIsDefinedAndNotEmpty('name', "Jméno uživatele je povinné");
        validation.checkIsDefinedAndNotEmpty('role', "Role uživatele je povinná");

        // Check password only if saving new
        if (!validation.data._id)
            validation.checkIsDefinedAndNotEmpty('password', "Heslo je povinné");

        // If contacts array is not empty, check if data are set
        if (validation.data.contact) {
            // Check each contact
            validation.data.contact.forEach(function (item) {
                if (!item.data) {
                    validation.addError("Kontaktní údaj musí obsahovat hodnotu");
                }
            });
        }

        // Return validation
        return validation;
    },
    // Get list of users
    getList: function (callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        UserModel.find(function (err, users) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam uživatelů");
                callback(validation);
                return;
            }

            // No error, so set data
            validation.data = users;

            // Return validation
            callback(validation);
            return;
        });
    },
    // Get user
    get: function(user, callback)   {
        // Init validation
        var validation = new ValidationResult(user);

        // Check if _id is set
        if (!validation.checkIsDefinedAndNotEmpty('_id', "Nelze získat uživatele bez identifikátoru")) {
            callback(validation);
            return;
        }

        // Load user
        UserModel.findById(user._id, function (err, dbUser) {
            // Check for error
            if (err) {
                validation.addError("Uživatele se nezdařilo nalézt v databázi");
                callback(validation);
                return;
            }

            // Remove password
            dbUser.password = "";
            validation.data = dbUser;
            callback(validation);
            return;
        })
    },
    // Remove user
    remove: function(user, callback) {
        // Init validation
        var validation = new ValidationResult(user);

        // We need _id for this operation
        if (!user._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }

        // Remove equipment
        UserModel.remove(user, function (err, dbUser) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se odebrat uživatele");
                callback(validation);
                return;
            }

            // Call user callback
            callback(validation);
        });
    },
    // Initialize db with superuser
    _init: function (user) {
        // First check if user does not already exist
        UserModel.count({
            login: user.login
        }, function (err, count) {
            if (err)
                console.log(err);

            // Admin is already there, so keep going
            if (count > 0)
                return;

            // Save user
            UserService.save(user, function (validation) {
                if (!validation.isValid)
                    console.log(validation.errors);
            });
        });
    }
}

// Export object
module.exports = UserService;