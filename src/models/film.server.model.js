var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var FilmSchema = new Schema({
  id: {
    type: String,
    "default": ''
  },
  name: {
    type: String,
    "default": ''
  },
  createtime: {
    type: String,
    "default": ''
  },
  createtimeshow: {
    type: String,
    "default": ''
  },
  publishtime: {
    type: String,
    "default": ''
  },
  country: {
    type: String,
    "default": ''
  },
  construction: {
    type: String,
    "default": ''
  },
  mainactor: {
    type: Array,
    "default": ['']
  },
  groupid: {
    type: String,
    "default": ''
  }
});


mongoose.model('Film', FilmSchema);

