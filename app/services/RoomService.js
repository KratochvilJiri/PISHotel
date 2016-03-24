// Load required modules
var RoomModel = require('./../models/RoomModel');
var ValidationResult = require('./../models/ValidationResultStructure');
var RoomTypes = require('./../configurations/RoomType');
var ReservationService = require('./ReservationService');

module.exports = {
    // Save room
    save: function (room, callback) {
        // Validate room before saving
        var validation = this.validate(room);

        // If validation is not valid, return it
        if (!validation.isValid) {
            callback(validation);
            return;
        }

        // Check if _id is set
        if (room._id) {
            // It is, so we are updating existing one
            RoomModel.findById(room._id, function (err, dbRoom) {
                // Check for error
                if (err) {
                    validation.addError("Pokoj se nezdařilo nalézt v databázi");
                    callback(validation);
                    return;
                }

                // Update room and save it
                dbRoom.ID = room.ID;
                dbRoom.price = room.price;
                dbRoom.roomType = room.roomType;

                // If premises is set, update it
                dbRoom.premises = room.premises;

                // Save room
                dbRoom.save(function (err) {
                    if (err) {
                        validation.addError("Pokoj se nezdařilo uložit");
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
            RoomModel.create(room, function (err, dbRoom) {
                // Something went wrong
                if (err) {
                    validation.addError("Pokoj se nezdařilo uložit");
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
    validate: function(room)    {
        // Init validation
        var validation = new ValidationResult(room);

        // Check all required properties
        validation.checkIsDefinedAndNotEmpty('ID', "Identifikátor je povinný");
        validation.checkIsDefinedAndNotEmpty('price', "Cena je povinná");
        validation.checkIsDefinedAndNotEmpty('roomType', "Typ je povinný");

        // Return validation
        return validation;
    },
    // Get availabel rooms for given period
    getAvailableRooms(filter, callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Prepare queryFilter
        var queryFilter = {
            $and: [
                {
                    $or: [
                        { dateFrom: { $gt: filter.period.dateFrom } },
                        { dateTo: { $gt: filter.period.dateFrom } }
                    ]
                },
                {
                    $or: [
                        { dateFrom: { $lt: filter.period.dateTo } },
                        { dateTo: { $lt: filter.period.dateTo } }
                    ]
                }
            ]
        };

        // If reservation is set, add it to filter
        if (filter.reservation)
            queryFilter.$and.push({
                _id: { $ne: filter.reservation }
            });

        // First get rooms, that are in given period
        ReservationService.getFilteredList(queryFilter, 0, ['room'], [], function (reservationValidation) {
            // Check validation of reservation
            if (!validation.append(reservationValidation)) {
                callback(validation);
                return;
            }

            // Now get all rooms, that are free
            RoomModel.find({
                _id: {
                    $nin: reservationValidation.data.map(function (item) {
                        return item.room;
                    })
                }
            }).exec(function (err, rooms) {
                // Check for error
                if (err) {
                    validation.addError("Nezdařilo se získat seznam pokojů");
                    callback(validation);
                    return;
                }

                // Set data and return result
                validation.data = rooms;
                callback(validation);
                return;
            });
        });
    },
    // Get room types
    getTypes: function (callback) {
        // Init validation
        var validation = new ValidationResult(RoomTypes.get());
        // And return it
        callback(validation);

    },
    // Get list of rooms
    getList: function (callback) {
        // Init validation
        var validation = new ValidationResult([]);

        // Find all of them
        RoomModel.find(function (err, rooms) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se získat seznam pokojů");
                callback(validation);
                return;
            }

            // No error, so set data
            validation.data = rooms;

            // Return validation
            callback(validation);
            return;
        });
    },
    // Get room
    get: function (room, callback) {
        // Init validation
        var validation = new ValidationResult(room);

        // Check if _id is set
        if (!validation.checkIsDefinedAndNotEmpty('_id', "Nelze získat pokoj bez identifikátoru")) {
            callback(validation);
            return;
        }

        // Load room
        RoomModel.findById(room._id).populate('premises.equipment').exec(function (err, dbRoom) {
            // Check for error
            if (err) {
                validation.addError("Pokoj se nezdařilo nalézt v databázi");
                callback(validation);
                return;
            }

            // Return data
            validation.data = dbRoom;
            callback(validation);
            return;
        })
    },
    // Remove room
    remove: function (room, callback) {
        // Init validation
        var validation = new ValidationResult(room);

        // We need _id for this operation
        if (!room._id) {
            validation.addError("Nelze smazat položku bez identifikátoru");
            callback(validation);
            return;
        }

        // Remove room
        RoomModel.remove(room, function (err, dbRoom) {
            // Something went wrong
            if (err) {
                validation.addError("Nezdařilo se odebrat pokoj");
                callback(validation);
                return;
            }

            // Call user callback
            callback(validation);
        });
    }
}