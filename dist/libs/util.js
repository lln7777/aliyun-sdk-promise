"use strict";
var Buffer, createHash, cryptoLib, decode64, encode64, fs, hmac, md5, queryParamsToString, readFileSync, sha256, toHex, uriEscape, uriEscapePath, urlFormat, urlHelper, urlParse, uuid;

cryptoLib = require("crypto");

Buffer = require("buffer").Buffer;

fs = require("fs");

urlHelper = require("url");

uuid = require('uuid');

exports.aliEscape = function(str) {
  return encodeURIComponent(str).replace(/\+/g, "%20").replace(/\*/g, "%2A").replace(/%7E/g, "~");
};

exports.commonEscape = function(clearString) {
  return encodeURIComponent(clearString).replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
};

exports.uriEscape = uriEscape = function(string) {
  var output;
  output = encodeURIComponent(string);
  output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);
  output = output.replace(/\*/g, function(ch) {
    return "%" + ch.charCodeAt(0).toString(16).toUpperCase();
  });
  return output;
};

exports.uriEscapePath = uriEscapePath = function(string) {
  var parts;
  parts = [];
  string.split("/").forEach(function(part) {
    return parts.push(exports.uriEscape(part));
  });
  return parts.join("/");
};

exports.urlParse = urlParse = function(url) {
  return urlHelper.parse(url);
};

exports.urlFormat = urlFormat = function(url) {
  return urlHelper.format(url);
};

exports.queryParamsToString = queryParamsToString = function(params) {
  var escape, items, sortedKeys;
  items = [];
  escape = exports.uriEscape;
  sortedKeys = Object.keys(params).sort();
  sortedKeys.forEach(function(name) {
    var ename, result, vals, value;
    value = params[name];
    ename = escape(name);
    result = ename;
    if (Array.isArray(value)) {
      vals = [];
      value.forEach(function(item) {
        return vals.push(escape(item));
      });
      result = ename + "=" + vals.sort().join("&" + ename + "=");
    } else {
      if (value !== undefined && value !== null) {
        result = ename + "=" + escape(value);
      }
    }
    return items.push(result);
  });
  return items.join("&");
};

exports.readFileSync = readFileSync = function(path) {
  return fs.readFileSync(path, "utf-8");
};

exports.base64Encode = encode64 = function(string) {
  return new Buffer(string).toString("base64");
};

exports.base64Decode = decode64 = function(string) {
  return new Buffer(string, "base64").toString();
};

exports.hmac = hmac = function(key, string, digest, fn) {
  if (!digest) {
    digest = "binary";
  }
  if (digest === "buffer") {
    digest = undefined;
  }
  if (!fn) {
    fn = "sha256";
  }
  if (typeof string === "string") {
    string = new Buffer(string);
  }
  return cryptoLib.createHmac(fn, key).update(string).digest(digest);
};

exports.md5 = md5 = function(data, digest) {
  if (!digest) {
    digest = "binary";
  }
  if (digest === "buffer") {
    digest = undefined;
  }
  if (typeof data === "string") {
    data = new Buffer(data);
  }
  return cryptoLib.createHash("md5").update(data).digest(digest);
};

exports.sha256 = sha256 = function(string, digest) {
  if (!digest) {
    digest = "binary";
  }
  if (digest === "buffer") {
    digest = undefined;
  }
  if (typeof string === "string") {
    string = new Buffer(string);
  }
  return cryptoLib.createHash("sha256").update(string).digest(digest);
};

exports.toHex = toHex = function(data) {
  var i, out;
  out = [];
  i = 0;
  while (i < data.length) {
    out.push(("0" + data.charCodeAt(i).toString(16)).substr(-2, 2));
    i++;
  }
  return out.join("");
};

exports.createHash = createHash = function(algorithm) {
  return cryptoLib.createHash(algorithm);
};

exports.uuid = function() {
  return uuid.v1();
};

exports.specialEncode = function(str) {
  return encodeURIComponent(str).replace(/\+/g, "%20").replace(/\*/g, "%2A").replace(/%7E/g, "~");
};

exports.params2queryArr = function(params) {
  var i, keysSorted, len, result, specialEncode;
  specialEncode = exports.specialEncode;
  keysSorted = Object.keys(params).sort();
  result = [];
  i = 0;
  len = keysSorted.length;
  while (i < len) {
    result.push(specialEncode(keysSorted[i]) + "=" + specialEncode(params[keysSorted[i++]]));
  }
  return result;
};
