
/*
 * all route handlers logic go here
 */

module.exports = function (app) {
  app.get('/', function (req, res) {
    if (req.session) res.render('index', { user: req.session.user });
    else res.render('index', { user: null });
  });
  app.get('/explorer', function (req, res) {
    if (req.session)
    // get hot ideas from storage
    else res.redirect('/'); 
  });
  app.get('/signup');
  app.get('/login');
  app.get('/idea');
  app.post('/');
  app.post('/signup');
  app.post('/login');
  app.all('*', function () {
    res.render('404');
  });
};