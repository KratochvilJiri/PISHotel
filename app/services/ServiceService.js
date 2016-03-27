// Load required modules
var ServiceModel = require('./../models/ServiceModel');
var ValidationResult = require('./../models/ValidationResultStructure');

module.exports = {
    // Save service
    save: function (service, callback) {
        // Validate service before saving
        var validation = this.validate(service);

        // If validation is not valid, return in
        if (!validation.isValid) {
            callback(validation);
            return;
        }

        // Check if _id is set
        if (service._id) {
            // It is, so we are updating existing one
            ServiceModel.findById(service._id, function (err, dbService) {
                // Check for error
                if (err) {
                    validation.addError("Službu se nezdařilo nalézt v databázi");
                    callback(validation);
                    return;
                }

                // Update service and save it
                dbService.name = service.name;
                dbService.price = service.price;

                // If contact is set, change it
                if (service.contact)
                    dbService.contact = service.contact;

                // Save service
                dbService.save(function (err) {
                    if (err) {
                        validation.addError("Službu se nezdařilo uložit");
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
            ServiceModel.create(service, function (err, dbService) {
                // Something went wrong
                if (err) {
                    validation.addError("Službu se nezdařilo uložit");
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
    validate: function (service) {
        // Init validation
        validation = new ValidationResult(service);

        // Check required values
        validation.checkIsDefinedAndNotEmpty('name', "Název služby je povinný");

        // Return validation
        return validation;
    },
    // Get list of services
    getList: function (callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        ServiceModel.find(function (err, services) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam služeb");
                callback(validation);
                return;
            }

            // No error, so set data
            validation.data = services;

            // Return validation
            callback(validation);
            return;
        });
    },
    // Get service
    get: function (service, callback) {
        // Init validation
        var validation = new ValidationResult(service);

        // Check if _id is set
        if (!validation.checkIsDefinedAndNotEmpty('_id', "Nelze získat službu bez identifikátoru")) {
            callback(validation);
            return;
        }

        // Load service
        ServiceModel.findById(service._id, function (err, dbService) {
            // Check for error
            if (err) {
                validation.addError("Službu se nezdařilo nalézt v databázi");
                callback(validation);
                return;
            }

            validation.data = dbService;
            callback(validation);
            return;
        })
    },
    // Remove service
    remove: function (service, callback) {
        // Init validation
        var validation = new ValidationResult(service);

        // We need _id for this operation
        if (!service._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }

        // Remove equipment
        ServiceModel.remove(service, function (err, dbService) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se odebrat službu");
                callback(validation);
                return;
            }

            // Call user callback
            callback(validation);
        });
    }
}