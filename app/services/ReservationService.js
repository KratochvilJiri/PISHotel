// Load required modules
var ReservationModel = require('./../models/ReservationModel');
var ValidationResult = require('./../models/ValidationResultStructure');
var PensionTypes = require('./../configurations/PensionType');
var PaymentTypes = require('./../configurations/PaymentType');
var ReservationState = require('../models/StatModel').ReservationState;
var CustomerService = require('./../services/CustomerService');

function saveRes(reservation){
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
                dbReservation.customer = reservation.customer;
                dbReservation.paymentType = reservation.paymentType;
                dbReservation.pensionType = reservation.pensionType;
                dbReservation.dateFrom = reservation.dateFrom;
                dbReservation.dateTo = reservation.dateTo;
                dbReservation.room = reservation.room;
                dbReservation.numberOfAdults = reservation.numberOfAdults;
                dbReservation.numberOfChildren = reservation.numberOfChildren;

                // If premises is set, update it
                dbReservation.services = reservation.services;

                // Save reservation
                dbReservation.save(function (err) {
                    if (err) {
                        validation.addError("Rezervaci se nezdařilo uložit");
                        callback(validation);
                        return;
                    }

                    // Call user function
                    //callback(validation);
                    //return;
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
                
            });
        }
    }

ReservationService = {                                                   

    // check reservation state transition
    checkStateTransition: function (newState, oldState) {
        // Allow to update reservation
        if (newState == oldState)
            return true;

        // Check old state
        switch (oldState) {
            // CREATED
            case ReservationState.CREATED:
                // -> CONFIRMED
                if (newState == ReservationState.CONFIRMED)
                    return true;
                // -> CANCELED
                else if (ewState == ReservationState.CANCELED)
                    return true
                
                // None
                break;

            // CONFIRMED
            case ReservationState.CONFIRMED:
                // -> CALCULATED
                if (newState == ReservationState.CALCULATED)
                    return true;

                // None
                break;

            // CALCULATED
            case ReservationState.CALCULATED:
                // -> COMPLETED
                if (newState == ReservationState.COMPLETED)
                    return true;

                // None
                break;

            // Default
            default:
                break;
        }

        // Invalid transition    
        return false;
    },

    // Save reservation
    save: function(reservation, callback) {
    
        
        // Validate reservation before saving
        var validation = this.validate(reservation);
        // If validation is not valid, return it
        if (!validation.isValid) {
            callback(validation);
            return;
        }
        // check if we need to save customer
        if (reservation.disNewCust == true){
              //var pomCustomer = new CustomerModel();
              var pomCustomer = {
                 name: "",
                 ID: "",
                 address: "" 
              }
               //reservation.customer =  reservation.newCustomerID;
               
               pomCustomer.name = reservation.newCustomerName;
               pomCustomer.ID = reservation.newCustomerID;
               pomCustomer.address = reservation.newCustomerAdress;
               
              //reservation.customer.name = reservation.newCustomerName;
              CustomerService.save(pomCustomer, function (val, dbCustomer){
                // Something went wrong
                if (!val.isValid) {
                    validation.addError("Zakaznik se neulozil");
                    callback(validation);
                    return;
                } 
                reservation.customer = dbCustomer._id;
                

               saveRes(reservation);
              callback(validation);
              return;
        });
                 
         }
         else{
            saveRes(reservation);
            callback(validation);
            return;
         }
        
    },

    // Validate
    validate: function(reservation) {
        // Init validation
        var validation = new ValidationResult(reservation);

        // Check all required properties
        //validation.checkIsDefinedAndNotEmpty('customer', "Zákazník je povinný");
        if (reservation.customer == null){
          validation.checkIsDefinedAndNotEmpty('newCustomerName', "Zákazník je povinný - Při vytváření nového je třba zadat Jméno");
          validation.checkIsDefinedAndNotEmpty('newCustomerID', "Zákazník je povinný - Při vytváření nového je třba zadat Číslo OP");
          /*if (reservation.newCustomerName == null || reservation.newCustomerName ==""){
            validation.addError("Zákazník je povinný");
          }
          if (reservation.newCustomerName == null || reservation.newCustomerName ==""){
            validation.addError("Zákazník je povinný");
          }*/
        }
        validation.checkIsDefinedAndNotEmpty('room', "Pokoj je povinný");
        validation.checkIsDefinedAndNotEmpty('dateFrom', "Datum od je povinné");
        validation.checkIsDefinedAndNotEmpty('dateFrom', "Datum do je povinné");
        validation.checkIsDefinedAndNotEmpty('pensionType', "Typ stravování je povinný");
        validation.checkIsDefinedAndNotEmpty('paymentType', "Typ platby je povinný");

        // Return validation
        return validation;
    },
    // Get pension types
    getPensionTypes: function(callback) {
        // Init validation
        var validation = new ValidationResult(PensionTypes.get());
        // And return it
        callback(validation);

    },
    // Get payment types
    getPaymentTypes: function(callback) {
        // Init validation
        var validation = new ValidationResult(PaymentTypes.get());
        // And return it
        callback(validation);

    },
    // Get filtered list
    getFilteredList: function(filter, limit, select, populate, callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Prepare query
        var query = ReservationModel.find(filter);

        // Check for select
        if (select && select.length > 0) {
            query.select(select.join(" "));
        }

        // Check for populate
        if (populate && populate.length > 0) {
            query.populate(populate.join(" "));
        }

        // Check for limit
        if (limit > 0) {
            query.limit(limit);
        }

        // Execute query
        query.exec(function(err, result) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam rezervací");
                callback(validation);
                return;
            }

            // Set data
            validation.data = result;

            // Return validation
            callback(validation);
        });
    },
    // Get list of reservations
    getList: function(callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        ReservationModel.find().populate('room customer').exec(function(err, reservations) {
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
    get: function(reservation, callback) {
        // Init validation
        var validation = new ValidationResult(reservation);

        // Check if _id is set
        if (!validation.checkIsDefinedAndNotEmpty('_id', "Nelze získat rezervaci bez identifikátoru")) {
            callback(validation);
            return;
        }

        // Load reservation
        ReservationModel.findById(reservation._id).populate('room customer').exec(function(err, dbReservation) {
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
    remove: function(reservation, callback) {
        // Init validation
        var validation = new ValidationResult(reservation);

        // We need _id for this operation
        if (!reservation._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }


        // Remove reservation
        ReservationModel.remove(reservation, function(err, dbReservation) {
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

// Export object
module.exports = ReservationService;