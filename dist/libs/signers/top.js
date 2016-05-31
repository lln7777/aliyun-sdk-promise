
/*
Author: Ansel Chen
Thanks xiaoshan5733
 */
var crypto, handleParams, sign, specialEncode, util;

crypto = require("crypto");

util = require('../util');

specialEncode = function(str) {
  return encodeURIComponent(str).replace(/\+/g, "%20").replace(/\*/g, "%2A").replace(/%7E/g, "~");
};

handleParams = function(params) {
  var i, keysSorted, len, result;
  keysSorted = Object.keys(params).sort();
  result = [];
  i = 0;
  len = keysSorted.length;
  while (i < len) {
    result.push(specialEncode(keysSorted[i]) + "=" + specialEncode(params[keysSorted[i]]));
    i++;
  }
  return result;
};

sign = function(params, secret) {
  var hmac, keysHandled, queryString, ret, signString;
  keysHandled = handleParams(params);
  queryString = keysHandled.join("&");
  signString = "GET&%2F&" + specialEncode(queryString);
  hmac = crypto.createHmac("sha1", secret + "&");
  hmac.update(signString);
  ret = hmac.digest("base64");
  return ret;
};

exports.sign = sign;
