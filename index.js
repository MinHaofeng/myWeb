var http = require('http')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')
var crypto = require('crypto')
var async = require('async')
var swig = require('swig')
var lessMiddleware = require('less-middleware')
var config = require('./src/config/default.config')
var _ = require('lodash')

// 全局变量
express = _.extend(express, {
    TMP_DIR: 'files/tmp',
    MEDIA_STORAGE: 'files/media',
    SCREENSHOTS_STORAGE: 'public/Screenshots',
    LOGFILE_STORAGE: 'files/log',
    PACKAGE_STORAGE: 'files/package',
    DB: config.db
})

// 加载服务
//var serviceEntry = require('./src/services/serviceEntry')
// 加载Model
var models = require(path.join(__dirname, './src/models/index.server.model'))

// 创建app
var app = module.exports = express();

// 设置app模板引擎
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
// 通用中间件
app.use(morgan(config.log.format, config.log.options))
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/*+json'}))
app.use(bodyParser.json({type: 'text/html'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(lessMiddleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
// 自定义中间件
app.use(require(path.join(__dirname, './src/libs/connectdb')))
app.use(require(path.join(__dirname, './src/libs/checkinstall')))
// 路由中间件
app.use(require(path.join(__dirname, './src/routes/index.server.routes')))
app.use(require(path.join(__dirname, './src/routes/film.server.routes')))

// 错误处理中间件
app.use(require(path.join(__dirname, './src/libs/err500')))
app.use(require(path.join(__dirname, './src/libs/err404')))
// 启动app
//serviceEntry.serviceManager.run()
app.listen(config.port, function(){
    console.log('GBVISION started, listening on port ' + config.port)
})