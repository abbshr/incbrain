#!/bin/env node

// Express common dependencies modules
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , app     = express();

// Storage modules
var MongoStore = require('connect-mongo')(express)
  , flash      = require('connect-flash')

// Routers & Custom modules
var router = require('./routes/index.js');

// custom config files
var CONFIG = require('./conf/config.json');
var session = {
  secret: CONFIG.cookieSecret,
  key: CONFIG.db,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  store: new MongoStore({
    db: CONFIG.db
  })
};

// middlewares
var middlewares = {
  'favicon'       : express.favicon(),
  'bodyParser'    : express.logger('dev'),
  'methodOverride': express.bodyParser(),
  'logger'        : express.methodOverride(),
  'cookieParser'  : express.cookieParser(),
  'flash'         : flash(),
  'session'       : express.session(session)
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(middlewares['flash']);
app.use(middlewares['favicon']);
app.use(middlewares['bodyParser']);
app.use(middlewares['logger']);
app.use(middlewares['methodOverride']);
app.use(middlewares['cookieParser']);
app.use(middlewares['session']);

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(router).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});