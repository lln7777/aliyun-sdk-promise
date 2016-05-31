var AliSdk, ecs, ecsOptions;

AliSdk = require('../index');

ecsOptions = {
  Domain: 'ecs.aliyuncs.com',
  Version: '2014-05-26',
  AccessKeyId: 'xxxxx',
  AccessKeySecret: 'xxxxxxxxxxxx'
};

ecs = new AliSdk.Client('ecs', ecsOptions);

ecs.get('DescribeInstances', {
  RegionId: 'cn-hangzhou'
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});
