var _, config, request, topSigner;

config = require('../../config');

_ = require('lodash');

request = require('request');

topSigner = require('../signers/top');

exports.request = function(serverName, options, cb) {
  var _options, secret;
  // config 获取基本的配置，根据请求的method，拼装请求的参数
  // 先签名，然后请求
  _options = _pick(_.extend({}, config.commonOptions, config.servers[serverName], options), '');
  secret = _options.AccessKeySecret;
  return _options.Signature = topSigner.sign(_options, secret);
};
