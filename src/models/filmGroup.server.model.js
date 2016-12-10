var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var FilmGroupSchema = new Schema({
  id: {
    type: String,
    "default": ''
  },
  name: {
    type: String,
    "default": ''
  },
  type: {
    type: String,
    "default": ''
  }
});


mongoose.model('FilmGroup', FilmGroupSchema);

