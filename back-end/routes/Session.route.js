const express = require('express');
const app = express();
const sessionRoute = express.Router();
let Session = require('../models/Session');
let FormatResult = require('../models/FormatResult');
sessionRoute.route('/createSession').post(function(req, res) {
    new Session(req.body).save().then(item => res.json(item));
});
sessionRoute.route('/add-result').post(function(req, res) {
    new FormatResult(req.body).save().then(item => res.json(item));
});
sessionRoute.route('/get-results/:id').get(function(req, res) {
    FormatResult.find({ sessionId: req.params.id }, function(error, result) {}).then(items => res.json(items));
});
module.exports = sessionRoute;
