var mongoose = require('mongoose');
var typeStructure = require('./TypeStructure');

//
// Room reservation model
//
module.exports = mongoose.model('RoomReservation', {
    // CUSTOMER
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    // ROOM
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    // DATE FROM
    dateFrom: {
        type: Date,
        required: true
    },
    // DATE TO
    dateTo: {
        type: Date,
        required: true
    },
    // SERVICES
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }],
    // PENSION TYPE
    pensionType: {
        type: typeStructure,
        required: true
    },
    // ADULTS
    numberOfAdults: {
        type: Number,
        required: true
    },
    // CHILDREN
    numberOfChildren: {
        type: Number,
        required: true
    },
    // PAYMENT TYPE
    paymentType: {
        type: typeStructure,
        required: true
    }
});
