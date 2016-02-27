var stat = require('./StatModel');

//
// Prototype for 
//
module.exports = {
    dateFrom: {
        type: Date
    },
    dateTo: {
        type: Date
    },
    state: {
        type: Number,
        required: true
    },
    paymentType: {
        type: Number,
        required: true
    }
}