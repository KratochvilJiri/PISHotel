var mongoose = require('mongoose');

//
// Premises model
//
module.exports = mongoose.model('Premises', {
    // PREMISES TYPE
    premisesType: {
        type: Number,
        required: true
    },
    // ROOM
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    // EQUIPMENT
    equipment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment'
        }
    ]
});