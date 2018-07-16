
/*
  调用方式：
  doRequest 'ecs.CreateInstance', options, cb
  doRequest 'ecs:CreateInstance', options, cb
*/
var Client, Promise, _, config, doRequest, request, server, topSigner, util;

util = require('./libs/util');

config = require('./config');

server = require('./libs/servers');

topSigner = require('./libs/signers/top');

request = require('request');

Promise = require('bluebird');

_ = require('lodash');

doRequest = function(action, options) {
  var domain, method, protocol, querys, ref, ref1, ref2, reqOptions, secret, self;
  self = this;
  options.Action = action;
  options.Timestamp = (new Date).toISOString().replace(/\.\d{3}/, '');
  options.SignatureNonce = util.uuid();
  options = _.extend({}, config.CommonOptions, options);
  // 提取不需要签名的方法
  domain = options.Domain;
  delete options.Domain;
  method = options.Method != null ? options.Method : 'GET';
  delete options.Method;
  protocol = (ref = (ref1 = options.Protocol) != null ? ref1 : config.Protocol) != null ? ref : 'http';
  delete options.Protocol;
  // 签名
  delete options.Signature;
  secret = options.AccessKeySecret;
  delete options.AccessKeySecret;
  options.Signature = topSigner.sign(options, secret);
  // 参数排序
  querys = util.params2queryArr(options);
  // 定义request的参数
  reqOptions = {
    method: method,
    json: (ref2 = options.json) != null ? ref2 : true,
    uri: `${protocol}://${domain}`
  };
  // 区分get和post
  if (method.toUpperCase() === 'GET') {
    reqOptions.uri += "?" + querys.join('&');
  } else {
    reqOptions.form = options;
  }
  // 定义callback
  return new Promise(function(resolve, reject) {
    request(reqOptions, function(err, res, body) {
      if (err != null) {
        return reject(err);
      } else {
        if ((self.after != null) && (typeof self.after === 'function')) {
          self.after(body);
        }
        return resolve(body);
      }
    });
  });
};

Client = class Client {
  constructor(serverName, options) {
    this.serverName = serverName.toUpperCase();
    this.options = options;
    // 检查config里面有没有相关产品的配置
    if (config.Servers[this.serverName] != null) {
      this.options = _.extend({}, config.Servers[this.serverName], this.options);
    }
  }

  get(action, options) {
    var _options;
    _options = _.extend({}, this.options, options);
    return doRequest.call(this, action, _options);
  }

};

exports.Client = Client;
