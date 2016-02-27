var mongoose = require('mongoose');
var reservationModel = require('./ReservationModel');

// Extend reservation model
var serviceReservationModel = reservationModel;
serviceReservationModel.prototype = {
    customer: {
        type: Number
    },
    roomReservation: {
        type: Number
    },
    service: {
        type: Number,
        required: true
    }
}

//
// Service reservation model
//
module.exports = mongoose.model('ServiceReservation',
    serviceReservationModel
);

// NOTE:
// http://stackoverflow.com/questions/7810892/node-js-creating-relationships-with-mongoose
//
