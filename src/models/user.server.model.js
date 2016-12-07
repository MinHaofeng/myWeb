var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var UserSchema = new Schema({
  id: {
    type: String,
    "default": ''
  },
  name: {
    type: String,
    "default": ''
  },
  token: {
    type: String,
    "default": ''
  },
  password: {
    type: String,
    "default": ''
  },
  type: {
    type: String,
    "default": ''
  },
  description: {
    type: String,
    "default": ''
  },
  authority: {
    type: Array,
    "default": []
  },
  activated: {
    type: Boolean,
    "default": false
  }
});

UserSchema.statics.getCurrentUserName = function(token) {
  return this.model('User').findOne({
    token: token
  }).exec(function(err, user) {
    if (err != null) {
      return '';
    }
    if (user != null) {
      return user.name;
    }
    return '';
  });
};

mongoose.model('User', UserSchema);

