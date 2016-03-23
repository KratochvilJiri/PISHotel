var mongoose = require('mongoose');

//
// Room service structure
//
module.exports = {
    // COUNT
    count: {
        type: Number,
        required: true
    },
    // SERVICE
    service:    {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
};