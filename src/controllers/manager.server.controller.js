var mongoose = require('mongoose')
var _ = require('lodash')
var errorHandler = require('./errors.server.controller')
var Film = mongoose.model('Film')
var crypto = require('crypto')
var async = require('async')
var logger = require('../models/logger.server.model')

exports.index = function(req, res) {
  return res.render('manager/manager', {
    title: '管理'
  });
};

