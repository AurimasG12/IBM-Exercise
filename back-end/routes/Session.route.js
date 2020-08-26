const express = require('express');
const app = express();
const sessionRoute = express.Router();
let Session = require('../models/Session');
sessionRoute.route('/create').post(function(req, res) {
    new Session(req.body).save().then(item => res.json(item));
});
module.exports = sessionRoute;
