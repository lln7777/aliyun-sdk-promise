"use strict"
cryptoLib = require("crypto")
Buffer = require("buffer").Buffer
fs = require("fs")
urlHelper = require("url")
uuid = require('uuid')

# 针对阿里的的几个字符的特殊处理
exports.aliEscape = (str) ->
  encodeURIComponent(str).replace(/\+/g, "%20").replace(/\*/g, "%2A").replace /%7E/g, "~"


# opensearch和pop所用的签名机制
exports.commonEscape = (clearString) ->
  encodeURIComponent(clearString)
    .replace(/\!/g, "%21")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")


# 按阿里云文档对特殊字符escape
exports.uriEscape = uriEscape = (string) ->
  output = encodeURIComponent(string)
  output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape)

  # percent-encodes some extra non-standard characters in a URI
  output = output.replace(/\*/g, (ch) ->
    "%" + ch.charCodeAt(0).toString(16).toUpperCase()
  )
  output

exports.uriEscapePath = uriEscapePath = (string) ->
  parts = []
  string.split("/").forEach (part) ->
    parts.push exports.uriEscape(part)

  parts.join "/"

exports.urlParse = urlParse = (url) ->
  urlHelper.parse url

exports.urlFormat = urlFormat = (url) ->
  urlHelper.format url

exports.queryParamsToString = queryParamsToString = (params) ->
  items = []
  escape = exports.uriEscape
  sortedKeys = Object.keys(params).sort()
  sortedKeys.forEach (name) ->
    value = params[name]
    ename = escape(name)
    result = ename
    if Array.isArray(value)
      vals = []
      value.forEach (item) ->
        vals.push escape(item)

      result = ename + "=" + vals.sort().join("&" + ename + "=")
    else result = ename + "=" + escape(value)  if value isnt `undefined` and value isnt null
    items.push result

  items.join "&"

exports.readFileSync = readFileSync = (path) ->
  fs.readFileSync path, "utf-8"

exports.base64Encode = encode64 = (string) ->
  new Buffer(string).toString "base64"

exports.base64Decode = decode64 = (string) ->
  new Buffer(string, "base64").toString()

exports.hmac = hmac = (key, string, digest, fn) ->
  digest = "binary"  unless digest
  digest = `undefined`  if digest is "buffer"
  fn = "sha256"  unless fn
  string = new Buffer(string)  if typeof string is "string"
  cryptoLib.createHmac(fn, key).update(string).digest digest

exports.md5 = md5 = (data, digest) ->
  digest = "binary"  unless digest
  digest = `undefined`  if digest is "buffer"
  data = new Buffer(data)  if typeof data is "string"
  cryptoLib.createHash("md5").update(data).digest digest

exports.sha256 = sha256 = (string, digest) ->
  digest = "binary"  unless digest
  digest = `undefined`  if digest is "buffer"
  string = new Buffer(string)  if typeof string is "string"
  cryptoLib.createHash("sha256").update(string).digest digest

exports.toHex = toHex = (data) ->
  out = []
  i = 0

  while i < data.length
    out.push ("0" + data.charCodeAt(i).toString(16)).substr(-2, 2)
    i++
  out.join ""

exports.createHash = createHash = (algorithm) ->
  cryptoLib.createHash algorithm

exports.uuid = ()->
  uuid.v1()

exports.specialEncode = (str) ->
  encodeURIComponent(str).replace(/\+/g, "%20").replace(/\*/g, "%2A").replace /%7E/g, "~"

exports.params2queryArr = (params)->
  specialEncode = exports.specialEncode
  keysSorted = Object.keys(params).sort()
  result = []
  i = 0
  len = keysSorted.length
  while i < len
    result.push specialEncode(keysSorted[i]) + "=" + specialEncode(params[keysSorted[i++]])
  result
