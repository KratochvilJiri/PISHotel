var mongoose = require('mongoose');

//
// Service model
//
module.exports = mongoose.model('Service', {
    // NAME
    name: {
        type: String,
        required: true
    },
    // LIMIT
    limit: {
        type: Number
    },
    // PRICE
    price: {
        type: Number
    },
    // AVAILABLE
    available: {
        type: Boolean
    }
});