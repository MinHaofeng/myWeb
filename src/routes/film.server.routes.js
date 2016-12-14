var express = require('express');
var film = require('../controllers/film.server.controller');
var user = require('../controllers/user.server.controller')

var app = module.exports = express.Router();

app.route('/film/index')
    .get(film.index)

app.route('/film/addFilm')
    .post(user.requiresLogin,film.addFilm)

app.route('/film/getFilms')
    .get(film.getFilms)

app.route('/film/getFilmsInGroup')
    .get(film.getFilmsInGroup)

//test
app.route('/film/addgroup')
    .post(user.requiresLogin,film.addGroup)

app.route('/film/addtogroup')
    .post(user.requiresLogin,film.addToGroup)

app.route('/film/removefromgroup')
    .post(user.requiresLogin,film.removeFromGroup)

app.route('/film/getgroups')
    .get(film.getGroups)