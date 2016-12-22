var mongoose = require('mongoose')
var _ = require('lodash')
var errorHandler = require('./errors.server.controller')
var Film = mongoose.model('Film')
var crypto = require('crypto')
var async = require('async')
var logger = require('../models/logger.server.model')
var FilmGroup = mongoose.model('FilmGroup')

exports.index = function(req, res) {
  return res.render('films/film', {
    title: '电影专区'
  });
};

exports.getSpecialPage = function(req, res) {
  var filmid = req.query.filmid;
  if(!filmid){
    return res.render('error', {
      error: '未获取到页面！'
    });
  }
  Film.findById(Object(filmid)).exec(function(err,film){
    var filmName = film.name;
    var filmId = film.id;
    var mainActorArray = film.mainactor;
    var publishtime = film.publishtime;
    var publisharea = film.country;
    var summary = film.construction;
    var mainActor = '';
    for(var i=0;i<mainActorArray.length;i++){
      mainActor += mainActorArray[i].actor + '[' + mainActorArray[i].role + ']';
      if(i < mainActorArray.length-1){
        mainActor += ', ';
      }
    }
    return res.render('films/filmSpecial', {
      title: '电影专区-' + filmName,
      name: filmName,
      filmId: filmId,
      mainActor: mainActor,
      time: publishtime,
      area: publisharea,
      summary: summary
    });
  })

};

exports.addFilm = function(req, res) {
  var _film = req.body;
  if(!_film){
    return res.json({
      status:'0',
      message:'no data accepted!'
    })
  }
  var nowdate = new Date();
  var createTime = formatTime(nowdate,'-',true);
  _film.createtime = createTime;
  _film.createtimeshow = createTime.split(' ')[0]
  Film.create(_film, function(err, film) {
    if (err) {
      return res.status(500).send({
        status: "fail"
      });
    }
    film.id = film._id;
    return film.save(function(err,newFilm) {
      if (err) {
        return res.status(500).send({
          status: "fail"
        });
      }
      return res.json({
        'status' : '1',
        'data' : newFilm
      });
    });
  });
};

exports.getFilms = function(req, res) {
  var queryData = {}
  var groupid = '';
  if(req.query.group){
    groupid = req.query.group;
    queryData.groupid = groupid;
  }
  if(req.query.groupid){
    groupid = req.query.groupid
    queryData.groupid = { $ne : groupid}
  }
  Film.find(queryData).exec(function(err,films){
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

exports.getFilm = function(req, res) {
  var filmid = req.query.filmid;
  if(!filmid){
    return res.json({
      'status' : '0',
      'message' : 'id not acepted!'
    })
  }
  return res.render('films/filmDetail', {
    id: filmid
  });
};

exports.getFilmsInGroup = function(req, res) {
  var queryData = {}
  var groupid = '';
  if(!req.query.groupid){
    return res.json({
      'status' : '0',
      'message' : 'groupid not accepted!'
    })
  }
  Film.find({'groupid':req.query.groupid}).exec(function(err,films){
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

exports.addGroup = function(req,res) {
  FilmGroup.create({'name':'2016必看电影','type':'film'},function(err,group){
    if (err) {
      return res.status(500).send({
        status: "fail"
      });
    }
    group.id = group._id;
    return group.save(function(err,newgroup) {
      if (err) {
        return res.status(500).send({
          status: "fail"
        });
      }
      return res.json({
        'status' : '1',
        'data' : newgroup
      });
    });
  })
}

exports.addToGroup = function(req,res) {
  var data = req.body;
  if(!data){
    return res.json({
      'status' : '0',
      'message' : 'no data acepted!'
    })
  }
  Film.findById(Object(data.filmid)).exec(function(err,film){
    film.groupid = data.groupid;
    film.save(function(err,newfilm){
      if(err){
        return res.json({
          'status' : '0',
          'message' : 'group info save failed!'
        })
      }
      return Film.find({'groupid' : { $ne : data.groupid }}).exec(function(err,films){
        if(err){
          return res.json({
            'status' : '0',
            'message' : 'new list cant not get!'
          })
        }

        return res.json({
          'status' : '1',
          'data' : films
        })
      })
    })
  })
}

exports.removeFromGroup = function(req,res) {
  var data = req.body;
  if(!data){
    return res.json({
      'status' : '0',
      'message' : 'no data acepted!'
    })
  }
  Film.findById(Object(data.filmid)).exec(function(err,film){
    if(film.groupid != data.groupid){
      return res.json({
        'status' : '0',
        'message' : 'film is not in the group!'
      })
    }
    film.groupid = '';
    film.save(function(err,newfilm){
      if(err){
        return res.json({
          'status' : '0',
          'message' : 'group info save failed!'
        })
      }
      return Film.find({'groupid' : data.groupid}).exec(function(err,films){
        if(err){
          return res.json({
            'status' : '0',
            'message' : 'new list cant not get!'
          })
        }

        return res.json({
          'status' : '1',
          'data' : films
        })
      })
    })
  })
}

exports.addFilmContent = function(req,res){
  return res.render('films/addFilm')
}

exports.getListPage = function(req,res){
  return res.render('films/filmList')
}

exports.filmGroupContent = function(req,res){
  return res.render('films/filmGroup')
}

exports.getGroups = function(req, res) {
  FilmGroup.find().sort({'index':1}).exec(function(err,groups){
    if(err){
      return res.json({
        'status' : '0',
        'message' : 'Failed to find films!'
      })
    }
    return res.json({
      'status' : '1',
      'data' : groups
    })
  })
};

exports.getList = function(req,res){
  Film.find().sort({'createtime' : -1}).exec(function(err,films){
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
}

exports.getFilmDetail = function(req,res){
  var filmid = req.query.filmid;
  if(!filmid){
    return res.json({
      'status' : '0',
      'message' : 'id not acepted'
    })
  }
  Film.findById(Object(filmid)).exec(function(err,film){
    if(err){
      return res.json({
        'status' : '0',
        'message' : 'Failed to find the film!'
      })
    }
    return res.json({
      'status' : '1',
      'data' : film
    })

  })
}

/*
 * 格式化时间，nowdate参数必须为date格式——new Date()方法创建的时间对象
 *          separator参数是string类型，规定年月日之间的分隔符,长度为1,如果长度不符，默认使用'/'
 * */
function formatTime(nowdate,separator,long){
  if(separator.length > 1){
    separator = '/';
  }
  var year = nowdate.getFullYear();
  var month = nowdate.getMonth()+1;
  month = month >= 10 ? month : '0' + month;
  var day = nowdate.getDate();
  day = day >= 10 ? day : '0' + day;
  var hour = nowdate.getHours();
  hour = hour >= 10 ? hour : '0' + hour;
  var minutes = nowdate.getMinutes();
  minutes = minutes >= 10 ? minutes : '0' + minutes;
  var seconds = nowdate.getSeconds();
  seconds = seconds >= 10 ? seconds : '0' + seconds;
  if(long){
    var str_date = '' + year + separator + month + separator + day + ' ' + hour + ':' + minutes + ':' + seconds;
    return str_date;
  }else{
    var str_date = '' + year + separator + month + separator + day;
    return str_date;
  }

}
