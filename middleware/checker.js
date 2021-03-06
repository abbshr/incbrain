var isSpace = require('../utils').isSpace;

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

/* @author: HowdyGeek, Ran
*  @date: 2014-4-22
*
* middleware for checking registy/signin information valid */
exports.checkRegSign_valid = function (req, res, next) {
  var emailReg    = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
      pwdReg      = /^[a-zA-Z]\w{5,17}$/;
  var email       = req.body.email,
      pwd         = req.body.pwd,
      repwd       = req.body.repwd;
  var email_valid = isSpace(email) || !emailReg.test(email),
      pwd_valid   = isSpace(pwd) || !pwdReg.test(pwd),
      repwd_valid = isSpace(repwd) || pwd !== repwd;

  if(email_valid) req.flash('error', 'Email格式错误'), res.redirect('back');
  else if(pwd_valid) req.flash('error', '密码应以字母开头，长度在6~18之间，只能包含字符、数字和下划线。'), res.redirect('back');
  else if(repwd_valid) req.flash('error', '两次输入密码不一致'), res.redirect('back');
  else next();
};

/* middleware for checking other information valid */
exports.checkOther_valid = function (req, res, next) {
  // TODO: via RegExp, judge on records data
  next();
};

