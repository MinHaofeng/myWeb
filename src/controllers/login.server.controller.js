var mongoose = require('mongoose');
var _ = require('lodash');
var errorHandler = require('./errors.server.controller');
var User = mongoose.model('User');

exports.index = function(req, res) {
  return res.render('login', {
    title: '登陆'
  });
};

exports.postlogin = function(req, res) {
  if ((req.body.name != null) && (req.body.password != null)) {
    return User.findOne({
      name: req.body.name
    }).exec(function(err, result) {
      if (err) {
        return res.json({
          status: "fail"
        });
      }
      if (result && result.password === req.body.password) {
        res.cookie('token', result.token, 30);
        res.cookie('name', result.name, 30);
        res.cookie('type', result.type, 30);
        return res.json({
          status: 'success'
        });
      } else {
        return res.json({
          status: "fail",
          result: "用户密码不匹配"
        });
      }
    });
  } else {
    return res.json({
      status: "fail",
      result: "用户名和密码不能为空"
    });
  }
};

exports.logout = function(req, res) {
  res.clearCookie('token');
  res.clearCookie('name');
  res.clearCookie('type');
  return res.redirect('/login');
};
