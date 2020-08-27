const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let FormatResult = new Schema(
    {
        sessionId: {
            type: String,
        },
        result: {
            type: Number,
        },
        currencyCode: {
            type: String,
        },
    },
    { collection: 'FormatResults' },
);
module.exports = mongoose.model('FormatResult', FormatResult);
