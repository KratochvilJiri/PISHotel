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
    // PRICE
    price: {
        type: Number,
        required: true
    }
});