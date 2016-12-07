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
  User.find({'name':oUser.name}).exec(function(err,user){
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
      user = user[0];
      if(user.password != oUser.password){
        return res.json({
          'status' : '0',
          'message' : 'Password wrong!'
        })
      }
      res.cookie('name', user.name, 30);
      res.cookie('type', user.type, 30);
      return res.json({
        'status' : '1',
        'data' : user
      })
    }
  })
};

exports.logout = function(req, res) {
  res.clearCookie('name');
  res.clearCookie('type');
  return res.redirect('/index');
};
