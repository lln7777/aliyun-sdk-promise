###
Author: Ansel Chen
Thanks xiaoshan5733
###
crypto = require("crypto")
util = require('../util')

# 针对阿里的的几个字符的特殊处理
specialEncode = (str) ->
  encodeURIComponent(str)
  .replace /[!'()*+]/g, (c)->
    '%' + c.charCodeAt(0).toString(16)

handleParams = (params)->
  keysSorted = Object.keys(params).sort()
  result = []
  i = 0
  len = keysSorted.length
  while i < len
    result.push specialEncode(keysSorted[i]) + "=" + specialEncode(params[keysSorted[i]])
    i++
  result

sign = (params, secret) ->
  keysHandled = handleParams(params)
  queryString = keysHandled.join("&")
  signString = "GET&%2F&" + specialEncode(queryString)
  hmac = crypto.createHmac("sha1", secret + "&")
  hmac.update signString
  ret = hmac.digest "base64"
  ret

# 签名方法
exports.sign = sign