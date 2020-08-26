const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CurrencyListItem = new Schema(
    {
        code: { type: String },
        nameInLt: {
            type: String,
        },
        nameInEn: {
            type: String,
        },
    },
    { collection: 'CurrencyListItem' },
);
module.exports = mongoose.model('CurrencyListItem', CurrencyListItem);
