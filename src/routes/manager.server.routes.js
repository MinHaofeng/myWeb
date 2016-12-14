var express = require('express');
var film = require('../controllers/film.server.controller');
var manager = require('../controllers/manager.server.controller');
var user = require('../controllers/user.server.controller')

var app = module.exports = express.Router();

app.route('/manager/index')
    .get(user.requiresLogin,manager.index)

app.route('/manager/addFilm')
    .get(user.requiresLogin,film.addFilmContent)

app.route('/manager/showFilmGroup')
    .get(user.requiresLogin,film.filmGroupContent)
