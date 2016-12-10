var mongoose = require('mongoose')
var path = require('path')

var models = module.exports = {}

models.logger = require(path.join(__dirname, './logger.server.model'))
models.user = require(path.join(__dirname, './user.server.model'))
models.film = require(path.join(__dirname, './film.server.model'))
models.filmgroup = require(path.join(__dirname, './filmGroup.server.model'))
