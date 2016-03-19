var mongoose = require('mongoose');

//
// Premises structure
//
module.exports = {
    // PREMISES TYPE
    premisesType: {
        type: Number,
        required: true
    },
    // EQUIPMENT
    equipment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment'
        }
    ]
};