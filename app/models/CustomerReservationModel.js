var mongoose = require('mongoose');

//
// Customer reservation model
//
module.exports = mongoose.model('CustomerReservation', {
    // PENSION TYPE
    pensionType: {
        type: String,
        required: true
    },
    // IS CHILD
    isChild: {
        type: Boolean,
        required: true
    }
});

// TODO: Relations