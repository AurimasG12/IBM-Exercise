const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Session = new Schema(
    {
        date: {
            type: Number,
        },
    },
    { collection: 'Sessions' },
);
module.exports = mongoose.model('Session', Session);
