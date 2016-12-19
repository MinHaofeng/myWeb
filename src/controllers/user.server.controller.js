var mongoose = require('mongoose')
var _ = require('lodash')
var errorHandler = require('./errors.server.controller')
var User = mongoose.model('User')
var crypto = require('crypto')
var async = require('async')
var logger = require('../models/logger.server.model')

function sha1(tobeHash) {
  return crypto.createHash('sha1').update(tobeHash).digest('hex');
}

function md5(tobeHash) {
  return crypto.createHash('md5').update(tobeHash).digest('hex');
}

exports.userByID = function(req, res, next, uid) {
  return User.findById(Object(uid)).exec(function(err, user) {
    if (err) {
      return res.status(500).send({
        status: "fail"
      });
    }
    if (user == null) {
      return res.status(404).send({
        message: "user not fould"
      });
    }
    req.user = user;
    return next();
  });
};

exports.getUserBoxes = function(req, res) {
  return BoxUnionUser.find({
    userId: req.user.id
  }).exec(function(err, boxUnionUsers) {
    return res.json(boxUnionUsers || []);
  });
};


exports.requiresLogin = function(req, res, next) {
  var token;
  if (req.cookies.token == null) {
    return res.redirect('/login');
  }
  token = req.cookies.token;
  return User.findOne({
    token: token
  }).exec(function(err, user) {
    if (err) {
      return res.status(500).send({
        status: "fail"
      });
    }
    if (!((user != null) && user.token === token)) {
      return res.redirect('/login');
    }
    req.currentUser = user;
    return next();
  });
};

exports.index = function(req, res) {
  var authority;
  authority = {};
  _.each(req.currentUser.authority, function(auth) {
    return authority[auth] = true;
  });
  res.render('user', {
    user: req.user || null,
    request: req,
    title: '用户',
    authority: authority
  })
}

exports.adminReset = function(req, res) {
  User.findOneAndUpdate({name: 'admin'}, {
    password: md5('admin'),
    type: 'admin'
  }, function(err, admin) {
    if (err) {
      return res.json({
        status: "fail",
        result: "未知错误"
      });
    }
    res.json(admin)
  })
}

exports.newUser = function(req, res) {
  return User.findOne({
    name: req.body.name
  }).exec(function(err, user) {
    if (err) {
      return res.json({
        status: "fail"
      });
    }
    if (user != null) {
      return res.status(409).json({
        status: "fail",
        msg: "用户已存在"
      });
    }
    User.create(req.body, function(err, user) {
      if (err) {
        return res.status(500).send({
          status: "fail"
        });
      }
      logger.info(User.getCurrentUserName(req) + ("添加用户 " + user.name + " 成功"), {
        'action': logger.action.add,
        'source': logger.source.user
      });
      user.id = user._id.toString();
      user.token = user._id.toString();
      return user.save(function(err) {
        if (err) {
          return res.status(500).send({
            status: "fail"
          });
        }
        return res.json(user);
      });
    });
  });
};

exports.deleteuser = function(req, res) {
  var user;
  user = req.user;
  return user.remove(function(err) {
    if (err) {
      return res.send({
        status: "fail"
      });
    }
    return res.json({
      status: "success"
    });
  });
};

exports.deleteusers = function(req, res) {
  return async.each(req.body, function(user, cb) {
    return User.remove(req.user, function(err) {
      if (err) {
        return res.send({
          status: "fail"
        });
      }
      return cb(null);
    });
  }, function(err) {
    if (err) {
      return res.send({
        status: "fail"
      });
    }
    return res.json({
      status: "success"
    });
  });
};

exports.getUsers = function(req, res) {
  return User.find({
    type: 'normal'
  }).exec(function(err, users) {
    var x;
    if (err) {
      return res.json({
        status: "fail"
      });
    }
    users = users || [];
    x = _.map(users, function(each) {
      each = _.pick(each, '_id', 'id', 'name', 'password', 'type', 'description', 'activated', 'boxes');
      if (each.id === '') {
        each.id = each._id.toString();
      }
      return each;
    });
    return res.json(x);
  });
};

exports.userinfo = function(req, res) {
  return res.json({
    result: {
      result: req.user
    }
  });
};

exports.updateUser = function(req, res) {
  var user;
  user = req.user;
  return user.update(req.body).exec(function(err, user) {
    if (err) {
      return res.send({
        status: "fail"
      });
    }
    return res.json({
      status: "success"
    });
  });
};

exports.changePassword = function(req, res) {
  User.findById(Object(req.user.id)).exec(function(err, user) {
    if (err) {
      return res.status(500).send({
        status: "fail"
      });
    }


    if (user.password != req.body.oldpassword) {
      return res.json({
        status: "fail",
        msg: "password error"
      })
    }

    user.password = req.body.newpassword

    user.save(function(err, user){
      if (err) {
        return res.json({
          status: "fail",
          msg: "unexception error"
        })
      }

      res.json({
        status: "success"
      });

    })

  });
};

exports.authorize = function(req, res) {
  return BoxUnionUser.find({
    userId: req.user.id
  }).exec(function(err, boxUnionUsers) {
    if (err) {
      return res.json({
        status: "fail"
      });
    }
    return async.each(boxUnionUsers(function(buu, callback) {
      return buu.remove(function(err) {
        if (err) {
          return callback('remove buu fail');
        }
        return callback(null);
      });
    }, function(err) {
      if (err) {
        return res.json({
          status: "fail",
          message: err
        });
      }
      return async.each(req.body(function(boxId, callback) {
        return BoxUnionUser.create({
          userId: req.user.id,
          boxId: boxId
        }, function(err, buu) {
          if (err) {
            return callback('create buu fail');
          }
          return callback(null);
        });
      }, function(err) {
        if (err) {
          return res.json({
            status: "fail",
            message: err
          });
        }
        return res.json({
          status: 'success',
          result: ''
        });
      }));
    }));
  });
};
