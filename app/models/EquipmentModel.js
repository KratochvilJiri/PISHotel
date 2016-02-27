var mongoose = require('mongoose');

//
// Equipment model
//
module.exports = mongoose.model('Equipment', {
    // NAME
    name: {
        type: String,
        required: true
    }
});