const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    config = require('./DB');
var request = require('request');
var parser = require('xml2json-light');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {},
    err => {},
);
let Currency = require('./models/Currency');
Currency.count().then(count => {
    if (count === 0) {
        request.post({ url: 'https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates', form: { tp: 'EU' } }, function(
            err,
            response,
            body,
        ) {
            if (err) {
                console.log(err);
            }
            var objects = parser.xml2json(body);

            var rates = objects.FxRates.FxRate;

            rates.forEach(res => {
                new Currency({ currencyCode: res.CcyAmt[1].Ccy, proportion: res.CcyAmt[1].Amt }).save().catch(err => console.log(err));
            });
        });
    }
});

app.listen(3000, function() {
    console.log('listening on 3000');
});
