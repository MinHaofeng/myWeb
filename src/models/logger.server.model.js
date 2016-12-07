var express = require('express')
var path = require('path')
var winston = require('winston')
var moment = require('moment')

var JsonData = (function() {
  function JsonData(timestamp, level, msg, action, source) {
    this.timestamp = timestamp;
    this.level = level;
    this.msg = msg;
    this.action = action;
    this.source = source;
  }

  return JsonData;

})();

var Logger = (function() {
  Logger.prototype.log = {};

  function Logger() {
    this.action = {
      add: 'add',
      edit: 'edit',
      "delete": 'delete',
      request: 'request'
    };
    this.source = {
      user: 'user',
      box: 'box',
      playlist: 'playlist',
      schedule: 'schedule',
      tast: 'task',
      media: 'media',
      url: 'url',
      weathercnService: 'weathercn service',
      pm25inService: 'pm25in service',
      serviceManager: 'service manager'
    };
    this.log = new winston.Logger({
      transports: [
        new winston.transports.File({
          filename: path.join(express.LOGFILE_STORAGE, '/gbvision.log'),
          timestamp: function() {
            return new moment().format('YYYY-MM-DD HH:mm:ss');
          },
          json: true,
          maxsize: 8 * 1024 * 1024
        })
      ],
      exitOnError: false,
      levels: this.levels,
      level: 'info'
    });
    return this;
  }

  Logger.prototype.level = function(arg) {
    return this.log.transports.file.level = arg;
  };

  Logger.prototype.info = function(message, meta) {
    if (this.levels.info >= this.getLevels(this.log.transports.file.level)) {
      return this.log.info(new JsonData('info', this.log.transports.file.timestamp(), message, meta.action, meta.source));
    }
  };

  Logger.prototype.error = function(message, meta) {
    if (this.levels.error >= this.getLevels(this.log.transports.file.level)) {
      return this.log.error(new JsonData('error', this.log.transports.file.timestamp(), message, meta.action, meta.source));
    }
  };

  Logger.prototype.warn = function(message, meta) {
    if (this.levels.warn >= this.getLevels(this.log.transports.file.level)) {
      return this.log.warn(new JsonData('warn', this.log.transports.file.timestamp(), message, meta.action, meta.source));
    }
  };

  Logger.prototype.debug = function(message, meta) {
    if (this.levels.debug >= this.getLevels(this.log.transports.file.level)) {
      return this.log.debug(new JsonData('debug', this.log.transports.file.timestamp(), message, meta.action, meta.source));
    }
  };

  Logger.prototype.getLevels = function(arg) {
    switch (arg) {
      case 'debug':
        return 0;
      case 'warn':
        return 1;
      case 'info':
        return 2;
      default:
        return 3;
    }
  };

  Logger.prototype.levels = {
    debug: 0,
    warn: 1,
    info: 2,
    error: 3
  };

  return Logger;

})();

exports = module.exports = new Logger;

