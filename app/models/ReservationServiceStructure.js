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
    service: {
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
    }
};