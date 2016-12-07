var express = require('express');
var film = require('../controllers/film.server.controller');

var app = module.exports = express.Router();

app.route('/film/index')
    .get(film.index)

app.route('/film/addFilm')
    .post(film.addFilm)

app.route('/film/getFilms')
    .get(film.getFilms)