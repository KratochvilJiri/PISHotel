var mongoose = require('mongoose');
var contactStructure = require('./ContactStructure');

//
// Customer model
//
module.exports = mongoose.model('Customer', {
    // LOGIN
    ID: {
        type: String,
        required: true,
        unique: true
    },
    // NAME
    name: {
        type: String,
        required: true
    },
    // ADDRESS
    address: {
        type: String
    },
    // CONTACT
    contact: [contactStructure]
});