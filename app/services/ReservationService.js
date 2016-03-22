// Load required modules
var ReservationModel = require('./../models/ReservationModel');
var ValidationResult = require('./../models/ValidationResultStructure');
var PensionTypes = require('./../configurations/PensionType');
var PaymentTypes = require('./../configurations/PaymentType');

module.exports = {
    // Save reservation
    save: function (reservation, callback) {
        // Validate reservation before saving
        var validation = this.validate(reservation);

        // If validation is not valid, return it
        if (!validation.isValid) {
            callback(validation);
            return;
        }

        // Check if _id is set
        if (reservation._id) {
            // It is, so we are updating existing one
            ReservationModel.findById(reservation._id, function (err, dbReservation) {
                // Check for error
                if (err) {
                    validation.addError("Rezervaci se nezdařilo nalézt v databázi");
                    callback(validation);
                    return;
                }

                // Update reservation and save it
                dbReservation.ID = reservation.ID;
                dbReservation.price = reservation.price;
                dbReservation.reservationType = reservation.reservationType;

                // If premises is set, update it
                dbReservation.premises = reservation.premises;

                // Save reservation
                dbReservation.save(function (err) {
                    if (err) {
                        validation.addError("Rezervaci se nezdařilo uložit");
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
            ReservationModel.create(reservation, function (err, dbReservation) {
                // Something went wrong
                if (err) {
                    validation.addError("Rezervaci se nezdařilo uložit");
                    console.log(err);
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
    validate: function (reservation) {
        // Init validation
        var validation = new ValidationResult(reservation);

        // Check all required properties
        validation.checkIsDefinedAndNotEmpty('customer', "Zákazník je povinný");
        validation.checkIsDefinedAndNotEmpty('room', "Pokoj je povinný");
        validation.checkIsDefinedAndNotEmpty('dateFrom', "Datum od je povinné");
        validation.checkIsDefinedAndNotEmpty('dateFrom', "Datum do je povinné");
        validation.checkIsDefinedAndNotEmpty('pensionType', "Typ stravování je povinný");
        validation.checkIsDefinedAndNotEmpty('paymentType', "Typ platby je povinný");

        // Return validation
        return validation;
    },
    // Get pension types
    getPensionTypes: function (callback) {
        // Init validation
        var validation = new ValidationResult(PensionTypes.get());
        // And return it
        callback(validation);

    },
    // Get payment types
    getPaymentTypes: function (callback) {
        // Init validation
        var validation = new ValidationResult(PaymentTypes.get());
        // And return it
        callback(validation);

    },
    // Get list of reservations
    getList: function (callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        ReservationModel.find(function (err, reservations) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam rezervací");
                callback(validation);
                return;
            }

            // No error, so set data
            validation.data = reservations;

            // Return validation
            callback(validation);
            return;
        });
    },
    // Get reservation
    get: function (reservation, callback) {
        // Init validation
        var validation = new ValidationResult(reservation);

        // Check if _id is set
        if (!validation.checkIsDefinedAndNotEmpty('_id', "Nelze získat rezervaci bez identifikátoru")) {
            callback(validation);
            return;
        }

        // Load reservation
        ReservationModel.findById(reservation._id).populate('services room customer').exec(function (err, dbReservation) {
            // Check for error
            if (err) {
                validation.addError("Rezervaci se nezdařilo nalézt v databázi");
                callback(validation);
                return;
            }

            // Return data
            validation.data = dbReservation;
            callback(validation);
            return;
        })
    },
    // Remove reservation
    remove: function (reservation, callback) {
        // Init validation
        var validation = new ValidationResult(reservation);

        // We need _id for this operation
        if (!reservation._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }

        // Remove reservation
        ReservationModel.remove(reservation, function (err, dbReservation) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se odebrat rezervaci");
                callback(validation);
                return;
            }

            // Call user callback
            callback(validation);
        });
    }
}