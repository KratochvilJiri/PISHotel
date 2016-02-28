var mongoose = require('mongoose');
var reservationModel = require('./ReservationModel');

// Extend reservation model
var roomReservationModel = reservationModel;
roomReservationModel.prototype = {
    // TODO: See note
}

//
// Room reservation model
//
module.exports = mongoose.model('RoomReservation',
    roomReservationModel
);

// NOTE:
// http://stackoverflow.com/questions/7810892/node-js-creating-relationships-with-mongoose
//
