
/* middleware for user sessions checkout */
exports.checkSession_exist = function (req, res, next) {
  if (!req.session) req.flash('error', '请先登录'), res.redirect('back');
  else next();
};

/* middleware for user session not null */
exports.checkSession_null = function (req, res, next) {
  if (!!req.session) req.flash('error', '会话存在'), res.redirect('back');
  else next();
};

/* middleware for checking registy/signin information valid */
exports.checkRegSign_valid = function (req, res, next) {
  // TODO: via RegExp, judge on login/signup information
};

/* middleware for checking other information valid */
exports.checkOther_valid = function (req, res, next) {
  // TODO: via RegExp, judge on records data
};

