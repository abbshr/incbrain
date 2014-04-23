#!/usr/bin/env node

/*
* see all application's custom Configures in "./conf/config.json" 
*/

// Express common dependencies modules
var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , app     = express();

// Storage modules
// MongoDB session store for Connect/Express
var MongoStore = require('connect-mongo')(express)
  , flash      = require('connect-flash');

// Routers & Custom modules
var router = require('./routes/index.js');

// custom config files
var CONFIG = require('./conf/config.json');

/*
* @key: cookie name defaulting to connect.sid
* @store: session store instance
* @secret: session cookie is signed with this secret to prevent tampering
* @cookie: session cookie settings, defaulting to { path: '/', httpOnly: true, maxAge: null }
*/
var session = {
  secret: CONFIG.cookieSecret,
  key: CONFIG.dbname,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  store: new MongoStore({ db: CONFIG.dbname })
};

// middlewares
var middlewares = {
  'favicon'       : express.favicon(path.join(__dirname, 'public', 'images', CONFIG.favicon)),
//'bodyParser'    : express.bodyParser(),
  'json'          : express.json(),
  'urlencoded'    : express.urlencoded(),
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

/* middlewares stack */
// NOTICE the middlewares' order in stack!
app.use(middlewares['staticPath']);
app.use(middlewares['logger']);
app.use(middlewares['flash']);
app.use(middlewares['favicon']);
//app.use(middlewares['bodyParser']);
app.use(middlewares['json']);
app.use(middlewares['urlencoded']);
app.use(middlewares['methodOverride']);
/*
* Session data is not saved in the cookie itself, however
* cookies are used, so we must use the cookieParser()
* middleware before session().
*/
app.use(middlewares['cookieParser']);
app.use(middlewares['session']);
app.use(middlewares['router']);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// config routers
router(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});