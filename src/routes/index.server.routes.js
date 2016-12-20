var express = require('express')
var index = require('../controllers/index.server.controller')
var user = require('../controllers/user.server.controller')

var app = module.exports = express.Router()

app.route('/')
    .get(index.index)

app.route('/index')
    .get(index.index)

app.route('/login')
    .get(index.login)

app.route('/login')
    .post(index.postLogin)

app.route('/logout')
    .get(index.logout)

app.route('/file')
    .get(index.file)

app.route('/upload')
    .post(index.upload)

