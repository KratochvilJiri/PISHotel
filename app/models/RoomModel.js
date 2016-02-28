var mongoose = require('mongoose');

//
// Room model
//
module.exports = mongoose.model('Room', {
    // ID
    ID: {
        type: String,
        required: true,
        unique: true
    },
    // ROOM TYPE
    roomType: {
        type: Number /* ? */,
        required: true
    },
    // PRICE
    price: {
        type: Number,
        required: true
    }
});

// TODO: Relations