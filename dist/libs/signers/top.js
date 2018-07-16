/*
Author: Ansel Chen
Thanks xiaoshan5733
*/
var crypto, handleParams, sign, specialEncode, util;

crypto = require("crypto");

util = require('../util');

// 针对阿里的的几个字符的特殊处理
specialEncode = function(str) {
  return encodeURIComponent(str).replace(/[!'()*+]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
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

// 签名方法
exports.sign = sign;
