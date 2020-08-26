const express = require('express');
const app = express();
const currencyListRoute = express.Router();
let CurrencyListItem = require('../models/CurrencyListItem');
let Currency = require('../models/Currency');
currencyListRoute.route('/').get(function(req, res) {
    CurrencyListItem.find(function(err, items) {
        if (err) {
        } else {
            res.json(items);
        }
    });
});
currencyListRoute.route('/currencies').get(function(req, res) {
    Currency.find(function(err, items) {
        if (err) {
        } else {
            res.json(items);
        }
    });
});

module.exports = currencyListRoute;
