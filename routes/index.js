
/*
 * all route handlers logic go here
 */

module.exports = function (app) {
  app.get('/', function (req, res) {
    var session_user = req.session && req.session.user;
    if (session_user) res.render('index', { user: session_user, title: session_user.name + '-incbrain' });
    else res.render('index', { user: null, title: 'incbrain, fork your ideas' });
  });
  /*app.get('/explorer', function (req, res) {
    if (req.session)
    // get hot ideas from storage
    else res.redirect('/'); 
  });
  //app.get('/signup');
  //app.get('/login');
  //app.get('/idea');
  //app.post('/');
  //app.post('/signup');
  //app.post('/login');*/
  app.all('*', function (req, res) {
    res.render('404', { content: 'r u serious?' });
  });
};