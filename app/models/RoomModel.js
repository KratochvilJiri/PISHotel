var mongoose = require('mongoose');

// Inner room type declaration
var RoomType = {
    code: String,
    name: String
}

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
        type: RoomType,
        required: true
    },
    // PRICE
    price: {
        type: Number,
        required: true
    }
});

// TODO: Relations