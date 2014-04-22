/* Utils modules */

/* util: whether the given string is a space or null */
exports.isSpace = function (str) {
  return /^\s+$/.test(str)
};

/*
* random string genaretor
* @addon usage: use "randomStr.base = xxx;" to reset the base for random mode :)
* ex.
* ranStr.base = 16
*/
exports.randomStr = function (len) {
  var str = '';
  if (len) {
    for (str; str.length < len; str += Math.random().toString(16 ? ranStr.base : (ranStr.base > 32 | ranStr.base < 2 )).substr(2));
    str = str.substr(0, len);
  } else
    str = Math.random().toString(16).substr(2);
  return str;
}

/* filter modules */

/* custom RegExp for string filter */
var filter = {};
exports.filter = filter;

/* filter: return uniq Array */
filter.uniqArr = function (arr) {
  var newarr = [];
  var hash = {};
  for (var i = 0; arr[i]; i++) uniqCb(hash, arr);
  return newarr;
}

filter.rmSpace;
filter.getByFilter;

function uniqCb(hash, arr) {
  var item = arr[i];
  !hash[item] && (newarr.push(item), hash[item] = true);
}