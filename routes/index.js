/* import mongodb */
var mongoClient = require('../conf/mongo.js');

/* Session checkout modules dependience */
var checker = require('../middleware').checker;
var checkSession_exist = checker.checkSession_exist,
    checkSession_null  = checker.checkSession_null,
    checkRegSign_valid = checker.checkRegSign_valid;

/* all route handlers logic go here */
module.exports = appRouter;

function appRouter(app) {
  app.get('/', 
  function (req, res) {
    if (req.session.user) 
    res.render('index', { 
      user: req.session.user, 
      title: req.session.user.name + '-incbrain' 
    });
    else 
    res.render('index', { 
      user: null, 
      title: 'incbrain, fork your ideas' 
    });
  });
  app.get('/####', function (req, res) {

  });
  /*app.get('/explorer', 
  function (req, res) {
    if (req.session.user)
    // get hot ideas from storage
    else res.redirect('/'); 
  });*/
  /*app.get('/signup', 
    checkSession_null, 
  function (req, res) {
    // TODO: query DB for exist user and get result
    // in callback
    res.render('signup', {
      user: result,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.get('/login', 
    checkSession_null, 
  function (req, res) {
    // TODO: query DB for exist user and get result
    // in callback
    res.render('login', {
      user: result,
      success: req.flash('success').toString(),
      error: req.flash('error').toString() 
    });
  });
  app.get('/logout', 
    checkSession_exist, 
  function (req, res) {
    res.session.user = null;
    req.flash('success', '已结束会话');
    res.redirect('/');
  });
  //app.get('/idea');

  //app.post('/');*/
  app.post('/signup',
    checkSession_exist,
    checkRegSign_valid,
  function (req, res) {
    var user = {
      email: req.body.email,
      pwd: req.body.pwd
    };
    mongoClient(function (err, db) {
      db.collection('users', function (err, collection) {
        collection.insert(user, function (err, result_arr) {
          res.session.user = result_arr[0];
          res.redirect('/');
        });
      });
    });
  });
  app.post('/login',
    checkSession_exist,
    checkRegSign_valid, 
  function (req, res) {
    var user = {
      email: req.body.email,
    };
    mongoClient(function (err, db) {
      db.collection('users', function (err, collection) {
        collection.get(user, function (err, result) {
          res.session.user = result;
          res.redirect('/');
        });
      });
    });
  });
  app.all('*', function (req, res) {
    res.render('404', { content: '...' });
  });
};