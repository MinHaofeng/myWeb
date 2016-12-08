var mongoose = require('mongoose')
var _ = require('lodash')
var errorHandler = require('./errors.server.controller')
var Film = mongoose.model('Film')
var crypto = require('crypto')
var async = require('async')
var logger = require('../models/logger.server.model')

exports.index = function(req, res) {
  return res.render('films/film', {
    title: '电影专区'
  });
};

exports.addFilm = function(req, res) {
  if(!req.body){
    return res.json({
      status:'0',
      message:'no data acepted!'
    })
  }
  Film.create(req.body, function(err, film) {
    if (err) {
      return res.status(500).send({
        status: "fail"
      });
    }
    film.id = film._id;
    return film.save(function(err) {
      if (err) {
        return res.status(500).send({
          status: "fail"
        });
      }
      return res.json(film);
    });
  });
};

exports.getFilms = function(req, res) {
  Film.find().exec(function(err,films){
    if(err){
      return res.json({
        'status' : '0',
        'message' : 'Failed to find films!'
      })
    }
    return res.json({
      'status' : '1',
      'data' : films
    })

  })
};

exports.addFilmContent = function(req,res){
  return res.render('films/addFilm')
}
