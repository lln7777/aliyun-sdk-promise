var Client, Promise, _, config, doRequest, request, server, topSigner, util;

util = require('./libs/util');

config = require('./config');

server = require('./libs/servers');

topSigner = require('./libs/signers/top');

request = require('request');

Promise = require('bluebird');

_ = require('lodash');


/*
  调用方式：
  doRequest 'ecs.CreateInstance', options, cb
  doRequest 'ecs:CreateInstance', options, cb
 */

doRequest = function(action, options) {
  var domain, method, protocol, querys, ref, reqOptions, secret, self;
  self = this;
  options.Action = action;
  options.Timestamp = (new Date).toISOString().replace(/\.\d{3}/, '');
  options.SignatureNonce = util.uuid();
  options = _.extend({}, config.commonOptions, options);
  domain = options.Domain;
  delete options.Domain;
  method = options.Method != null ? options.Method : 'GET';
  delete options.Method;
  protocol = options.Protocol != null ? options.Protocol : 'http';
  delete options.Protocol;
  delete options.Signature;
  secret = options.AccessKeySecret;
  delete options.AccessKeySecret;
  options.Signature = topSigner.sign(options, secret);
  querys = util.params2queryArr(options);
  reqOptions = {
    method: method,
    json: (ref = options.json) != null ? ref : true,
    uri: protocol + "://" + domain
  };
  if (method.toUpperCase() === 'GET') {
    reqOptions.uri += "?" + querys.join('&');
  } else {
    reqOptions.form = options;
  }
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

Client = (function() {
  function Client(serverName, options) {
    this.serverName = serverName.toLowerCase();
    this.options = options;
    if (config.servers[this.serverName] != null) {
      this.options = _.extend({}, config.servers[this.serverName], this.options);
    }
  }

  Client.prototype.get = function(action, options) {
    var _options;
    _options = _.extend({}, this.options, options);
    return doRequest.call(this, action, _options);
  };

  return Client;

})();

exports.Client = Client;
