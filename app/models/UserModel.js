var mongoose = require('mongoose');
var contactStructure = require('./ContactStructure');

// user model
module.exports = mongoose.model('User', {
    // LOGIN
    login: {
        type: String,
        required: true,
        unique: true
    },
    // PASSWORD
    password: {
        type: String,
        required: true
    },
    // ROLE
    role: {
        type: Number,
        required: true
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