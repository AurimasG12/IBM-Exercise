const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    config = require('./DB');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {},
    err => {},
);
let Currency = require('./models/Currency');
Currency.count().then(res => {
    if (res === 0) {
        const currency = {
            proportion: 20.001,
            currencyCode: 'AUD',
        };
        new Currency(currency).save().catch(error => console.log(error));
    }
});
app.listen(3000, function() {
    console.log('listening on 3000');
});
