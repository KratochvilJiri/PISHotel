var mongoose = require('mongoose');

//
// Premises model
//
module.exports = mongoose.model('Premises', {
    // PREMISES TYPE
    premisesType: {
        type: Number,
        required: true
    }
});