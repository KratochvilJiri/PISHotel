﻿// Load required modules
var CustomerModel = require('./../models/CustomerModel');
var ValidationResult = require('./../models/ValidationResultStructure');

module.exports = {
    // Save customer
    save: function (customer, callback) {
        // Validate customer before saving
        var validation = this.validate(customer);

        // If validation is not valid, return in
        if (!validation.isValid) {
            callback(validation);
            return;
        }

        // Check if _id is set
        if (customer._id) {
            // It is, so we are updating existing one
            CustomerModel.findById(customer._id, function (err, dbCustomer) {
                // Check for error
                if (err) {
                    validation.addError("Zákazníka se nezdařilo nalézt v databázi");
                    callback(validation);
                    return;
                }

                // Update customer and save it
                dbCustomer.name = customer.name;
                dbCustomer.address = customer.address;
                dbCustomer.ID = customer.ID;

                // If contact is set, change it
                if (customer.contact)
                    dbCustomer.contact = customer.contact;

                // Save customer
                dbCustomer.save(function (err) {
                    if (err) {
                        validation.addError("Zákazníka se nezdařilo uložit");
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
            CustomerModel.create(customer, function (err, dbCustomer) {
                // Something went wrong
                if (err) {
                    validation.addError("Zákazníka se nezdařilo uložit");
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
    validate: function (customer) {
        // Init validation
        validation = new ValidationResult(customer);

        // Check required values
        validation.checkIsDefinedAndNotEmpty('ID', "Číslo občanského průkazu je povinné");
        validation.checkIsDefinedAndNotEmpty('name', "Jméno je povinné");

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
    // Get list of customers
    getList: function (callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        CustomerModel.find(function (err, customers) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam zákazníků");
                callback(validation);
                return;
            }

            // No error, so set data
            validation.data = customers;

            // Return validation
            callback(validation);
            return;
        });
    },
    // Get customer
    get: function (customer, callback) {
        // Init validation
        var validation = new ValidationResult(customer);

        // Check if _id is set
        if (!validation.checkIsDefinedAndNotEmpty('_id', "Nelze získat zákazníka bez identifikátoru")) {
            callback(validation);
            return;
        }

        // Load customer
        CustomerModel.findById(customer._id, function (err, dbCustomer) {
            // Check for error
            if (err) {
                validation.addError("Zákazníka se nezdařilo nalézt v databázi");
                callback(validation);
                return;
            }

            // Remove password
            dbCustomer.password = "";
            validation.data = dbCustomer;
            callback(validation);
            return;
        })
    },
    // Remove customer
    remove: function (customer, callback) {
        // Init validation
        var validation = new ValidationResult(customer);

        // We need _id for this operation
        if (!customer._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }

        // Remove equipment
        CustomerModel.remove(customer, function (err, dbCustomer) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se odebrat zákazníka");
                callback(validation);
                return;
            }

            // Call user callback
            callback(validation);
        });
    }
}