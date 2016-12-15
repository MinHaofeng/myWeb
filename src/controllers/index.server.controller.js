var formidable = require('formidable')

var mongoose = require('mongoose')
var User = mongoose.model('User')
exports.index = function(req, res) {
  return res.render('index', {
    title: '首页'
  });
};

exports.file = function(req, res) {
  return res.render('file', {
    title: '上传'
  });
};

exports.upload = function(req, res) {
  var obj ={};
  var form = new formidable.IncomingForm({
    encoding:"utf-8",
    uploadDir:"public/upload",  //文件上传地址
    keepExtensions:true  //保留后缀
  });
  form.parse(req)
      .on('field', function(name, value) {  // 字段
        obj[name] = value;
      })
      .on('file', function(name, file) {  //文件
        obj[name] = file;
      })
      .on('error', function(error) {  //结束
        return res.json({
          'status' : '0',
          'message' : error
        })
      })
      .on('end', function() {  //结束
        return res.json({
          'status' : '1',
          'message' : 'success'
        })
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
      res.cookie('token', user.token, 30);
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
