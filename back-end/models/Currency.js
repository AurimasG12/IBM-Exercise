const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Currency = new Schema(
    {
        proportion: {
            type: Number,
        },
        currencyCode: {
            type: String,
        },
    },
    { collection: 'Currencies' },
);
module.exports = mongoose.model('Currency', Currency);
