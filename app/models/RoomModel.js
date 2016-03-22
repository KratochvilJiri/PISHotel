var mongoose = require('mongoose');
var premisesStructure = require('./PremisesStructure');
var typeStructure = require('./TypeStructure');

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
    },
    // PREMISES
    premises: [typeStructure]
});

