var mongoose = require('mongoose')
var User = mongoose.model('User')
exports.index = function(req, res) {
  return res.render('index', {
    title: '首页'
  });
};

exports.login = function(req, res) {
  return res.render('login', {
  });
};

exports.postLogin = function(req, res) {
  if(!req.body){
    return res.json({
      'status' : '0',
      'message' : 'no user acepted'
    })
  }
  var oUser = req.body;
  User.findOne({'name':oUser.name}).exec(function(err,user){
    if(err){
      return res.json({
        'status' : '0',
        'message' : 'Error!'
      })
    }
    if(user.length > 1){
      return res.json({
        'status' : '0',
        'message' : 'Userame is not only!'
      })
    }else if(user.length < 1){
      return res.json({
        'status' : '0',
        'message' : 'Userame is not exist!'
      })
    }else{
      if(user.password != oUser.password){
        return res.json({
          'status' : '0',
          'message' : 'Password wrong!'
        })
      }
      return res.json({
        'status' : '1',
        'message' : 'success'
      })
    }
  })
};
