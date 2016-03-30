//
// Calculation structure
//
module.exports = {
    sum: {
        type: Number,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        sum: {
            type: Number,
            required: true
        }
    }]
};