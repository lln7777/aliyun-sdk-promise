var AliSdk, cms, ecs, ess, options, ram, rds, slb, sts;

AliSdk = require('../index');

options = {
  AccessKeyId: '9pu26eqUtqTusLGz',
  AccessKeySecret: 'XL2gAGNolBTJTHZcXMj5jYZXEabxYp'
};

ecs = new AliSdk.Client('ECS', options);

rds = new AliSdk.Client('RDS', options);

slb = new AliSdk.Client('SLB', options);

ess = new AliSdk.Client('ESS', options);

cms = new AliSdk.Client('CMS', options);

ram = new AliSdk.Client('RAM', options);

sts = new AliSdk.Client('STS', options);

ecs.get('DescribeInstances', {
  RegionId: 'cn-hangzhou'
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});

rds.get('DescribeDBInstances', {
  RegionId: 'cn-hangzhou'
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});

ram.get('ListUsers').then(function(body) {
  return console.log(body.Users.User);
})["catch"](function(err) {
  return console.log(err);
});

slb.get('DescribeLoadBalancers', {
  RegionId: 'cn-hangzhou'
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});

ess.get('DescribeScalingGroups', {
  RegionId: 'cn-hangzhou'
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});
