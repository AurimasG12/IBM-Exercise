const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors'),
    config = require('./DB');
var request = require('request');
var parser = require('xml2json-light');
const CurrencyListRoute = require('./routes/CurrencyList.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {},
    err => {},
);
let Currency = require('./models/Currency');
const CurrencyListItem = require('./models/CurrencyListItem');
CurrencyListItem.count().then(result => {
    if (result === 0) {
        request.get(
            {
                url: 'https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList',
            },
            function(error, res, body) {
                let objects = parser.xml2json(body);
                var currencyList = objects.CcyTbl.CcyNtry;
                currencyList.forEach(item => {
                    new CurrencyListItem({ code: item.Ccy, nameInLt: item.CcyNm[0]['_@ttribute'], nameInEn: item.CcyNm[1]['_@ttribute'] })
                        .save()
                        .catch(error => console.log(error));
                });
            },
        );
    }
});
Currency.count().then(count => {
    if (count === 0) {
        request.post({ url: 'https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates', form: { tp: 'EU' } }, function(
            err,
            response,
            body,
        ) {
            if (err) {
                return;
            }
            var objects = parser.xml2json(body);

            var rates = objects.FxRates.FxRate;

            rates.forEach(res => {
                new Currency({ currencyCode: res.CcyAmt[1].Ccy, proportion: res.CcyAmt[1].Amt }).save().catch(err => console.log(err));
            });
        });
    }
});
app.use(cors());
app.use('/currencyList', CurrencyListRoute);
app.listen(3000, function() {
    console.log('listening on 3000');
});
