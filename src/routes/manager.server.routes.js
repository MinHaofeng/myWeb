var express = require('express');
var film = require('../controllers/film.server.controller');
var manager = require('../controllers/manager.server.controller');

var app = module.exports = express.Router();

app.route('/manager/index')
    .get(manager.index)

app.route('/manager/addFilm')
    .get(film.addFilmContent)

app.route('/manager/showFilmGroup')
    .get(film.filmGroupContent)
