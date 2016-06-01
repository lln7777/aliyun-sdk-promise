util      = require './libs/util'
config    = require './config'
server    = require './libs/servers'
topSigner = require './libs/signers/top'
request   = require 'request'
Promise   = require 'bluebird'
_         = require 'lodash'

###
  调用方式：
  doRequest 'ecs.CreateInstance', options, cb
  doRequest 'ecs:CreateInstance', options, cb
###
doRequest = (action, options)->
  self = this
  options.Action = action
  options.Timestamp = (new Date).toISOString().replace(/\.\d{3}/, '')
  options.SignatureNonce = util.uuid()
  options = _.extend {}, config.CommonOptions, options

  # 提取不需要签名的方法
  domain = options.Domain
  delete options.Domain
  method = if options.Method? then options.Method else 'GET'
  delete options.Method
  protocol = options.Protocol ? config.Protocol ?'http'
  delete options.Protocol
  # 签名
  delete options.Signature
  secret = options.AccessKeySecret
  delete options.AccessKeySecret
  options.Signature = topSigner.sign options, secret
  # 参数排序
  querys = util.params2queryArr options

  # 定义request的参数
  reqOptions =
    method: method
    json: options.json ? true
    uri: "#{protocol}://#{domain}"

  # 区分get和post
  if method.toUpperCase() is 'GET'
    reqOptions.uri += "?" + querys.join '&'
  else
    reqOptions.form = options
  # 定义callback
  return new Promise (resolve, reject)->
    request reqOptions, (err, res, body)->
      if err?
        reject err
      else
        if self.after? and (typeof self.after is 'function')
          self.after body
        resolve body
    return

class Client
  constructor: (serverName, options)->
    @serverName = serverName.toUpperCase()
    @options = options
    # 检查config里面有没有相关产品的配置
    if config.Servers[@serverName]?
      @options = _.extend {}, config.Servers[@serverName], @options
  get: (action, options)->
    _options = _.extend {}, @options, options
    doRequest.call(this, action, _options)

exports.Client = Client
