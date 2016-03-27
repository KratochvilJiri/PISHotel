// Load required modules
var ValidationResult = require('./../models/ValidationResultStructure');

module.exports = {
    // Is set function
    isSet: function (session, callback) {
        // Init validation
        var validation = new ValidationResult({});

        // CHeck if user is set
        if (session.user) {
            callback(validation);
            return;
        }

        // Set validation to false
        validation.isValid = false;
        callback(validation);
    },
    // Update information about current user
    update: function (session, callback) {
        // Init validation
        var validation = new ValidationResult(session.user);

        // Check validation data
        if (!validation.data) {
            validation.addError("Žádný uživatel není přihlášen");
        }

        // Return validation
        callback(validation);
    }
}