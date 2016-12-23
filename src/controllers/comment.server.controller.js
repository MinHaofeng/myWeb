var mongoose = require('mongoose')
var _ = require('lodash')
var errorHandler = require('./errors.server.controller')
var Film = mongoose.model('Film')
var Comment = mongoose.model('Comment')
var crypto = require('crypto')
var async = require('async')
var logger = require('../models/logger.server.model')

exports.getComments = function(req,res){
  var type = req.query.type;
  Comment.find({'type':type}).sort({'createtime':-1}).exec(function(err,comments){
    if(err){
      return res.json({
        'status': '0',
        'message': 'can not find comments'
      })
    }
    return res.json({
      'status': '1',
      'data': comments
    })
  })
}
