
/* custom RegExp for string filter */
var filter = {};
module.exports = filter;

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