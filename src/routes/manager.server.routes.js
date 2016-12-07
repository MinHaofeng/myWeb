var express = require('express');
var film = require('../controllers/film.server.controller');

var app = module.exports = express.Router();

app.route('/manager/index')
    .get(manager.index)
