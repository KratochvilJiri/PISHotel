// Load required modules
var EquipmentModel = require('./../models/EquipmentModel');
var ValidationResult = require('./../models/ValidationResultStructure'); 

module.exports = {
    // Save given equipment into database
    save: function (equipment, callback) {
        // Validate equipment before saving
        var validation = this.validate(equipment);

        // Check validation
        if (!validation.isValid) {
            callback(validation);
            return;
        }

        // Check if _id is set
        if (equipment._id) {
            // It is, so we are updating existing one
            EquipmentModel.findById(equipment._id, function (err, dbEquipment) {
                // Check for error
                if (err) {
                    validation.addError("Vybavení se nezdařilo nalézt v databázi");
                    callback(validation);
                    return;
                }

                // Update equipment and save it
                dbEquipment.name = equipment.name;
                dbEquipment.save(function (err) {
                    if (err) {
                        validation.addError("Vybavení se nezdařilo uložit");
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
            EquipmentModel.create(equipment, function (err, dbEquipment) {
                // Something went wrong
                if (err) {
                    validation.addError("Vybavení se nezdařilo uložit");
                    callback(validation);
                    return;
                }

                // Call user function
                callback(validation);
                return;
            });
        }
    },
    // Get list of all equipment
    getList: function (callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        EquipmentModel.find(function (err, equipment) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam vybavení");
                callback(validation);
                return;
            }

            // No error, so set data
            validation.data = equipment;

            // Return validation
            callback(validation);
            return;
        });
    },
    // Validate equipment
    validate: function (equipment) {
        // Init validation
        var validation = new ValidationResult(equipment);

        // Name has to be set
        if (!equipment.name)
            validation.addError("Název vybavení musí být zadán");

        // Return validation
        return validation;
    },
    // Delete equipment
    remove: function (equipment, callback) {
        // Init validation
        var validation = new ValidationResult(equipment);

        // We need _id for this operation
        if (!equipment._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }

        // Remove equipment
        EquipmentModel.remove(equipment, function (err, dbEquipment) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se odebrat vybavení");
                callback(validation);
                return;
            }

            // Call user callback
            callback(validation);
        });
    }
}