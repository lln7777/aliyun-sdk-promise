var _, config, request, topSigner;

config = require('../../config');

_ = require('lodash');

request = require('request');

topSigner = require('../signers/top');

exports.request = function(serverName, options, cb) {
  var _options, secret;
  _options = _pick(_.extend({}, config.commonOptions, config.servers[serverName], options), '');
  secret = _options.AccessKeySecret;
  return _options.Signature = topSigner.sign(_options, secret);
};
