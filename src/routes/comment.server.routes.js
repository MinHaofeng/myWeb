var express = require('express');
var film = require('../controllers/film.server.controller');
var user = require('../controllers/user.server.controller')
var comment = require('../controllers/comment.server.controller')

var app = module.exports = express.Router();

app.route('/comment/getComments')
    .get(comment.getComments)
