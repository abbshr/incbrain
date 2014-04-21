#!/usr/bin/env node

// Express common dependencies modules
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , app     = express();

// Storage modules
var MongoStore = require('connect-mongo')(express)
  , flash      = require('connect-flash');

// Routers & Custom modules
var router = require('./routes/index.js');

// mongodb conf
var mongoClient = require('./conf/mongo.js');

// custom config files
var CONFIG = require('./conf/config.json');
var session = {
  secret: CONFIG.cookieSecret,
  key: CONFIG.dbname,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  store: new MongoStore({
    db: CONFIG.dbname
  })
};

// middlewares
var middlewares = {
  'favicon'       : express.favicon(path.join(__dirname, 'favicon.ico')),
  'bodyParser'    : express.bodyParser(),
  'methodOverride': express.methodOverride(),
  'logger'        : express.logger('dev'),
  'cookieParser'  : express.cookieParser(),
  'flash'         : flash(),
  'session'       : express.session(session),
  'staticPath'    : express.static(path.join(__dirname, 'public')),
  'router'        : app.router
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middlewares stack
app.use(middlewares['staticPath']);
app.use(middlewares['logger']);
app.use(middlewares['flash']);
app.use(middlewares['favicon']);
app.use(middlewares['bodyParser']);
app.use(middlewares['methodOverride']);
app.use(middlewares['cookieParser']);
app.use(middlewares['session']);
app.use(middlewares['router']);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// config routers
router(app);

// init database collections
/*
*  hahahaha~, this shape so fun~ ;)
*  but we dont need it ~~
*/
mongoClient(function (err, db) {
  db.createCollection('igods', {strict:true}
  function (err, collection) {
    if (err) console.info('God heaven exists... ', 'ok, it means this is not the first time that u run the app');
    else console.info("setup Gods database first, xixi~~, we r gods :)");
    db.close();
    runServer();
  });
});

function runServer() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}