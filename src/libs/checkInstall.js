
var mongoose = require('mongoose')
var User = mongoose.model('User')
var md5 = require('./md5')

var installed = false

module.exports = function(req, res, next) {

  if (installed) {
    return next()
  }


  User.findOne({name: 'admin'}).exec(function(err, user) {
    if (err) {
      return res.render('error', {
        error: "unexception error"
      })
    }

    if (user) {
      installed = true
      return next()
    }

    User.create({
      name: 'admin',
      password: md5('admin'),
      type: 'admin'
    }, function(err, admin) {
      if (err) {
        return res.render('error', {
          error: "初始化失败"
        })
      }
      admin.id = String(admin._id)
      admin.token = String(admin._id)
      admin.save(function(err) {
        if (err) {
          return res.render('error')
        }
        installed = true
        next()
      })
    })

  })


}