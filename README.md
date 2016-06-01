# aliyun-sdk-promise

阿里云API全线产品的轻量级的Promise SDK, 目前支持所有POP形式接口阿里云API
示例见test目录

# 声明
此库还在开发中，使用的过程中可能不稳定。其他产品和ECS签名方法一致，用法一致的可以快速支持。有兴趣的朋友可以帮忙看看代码，提提意见，谢谢！

# 目前支持以下产品或功能

* 云服务器ECS
* 云存储RDS
* 负载均衡SLB
* 云监控CMS
* 权限控制(RAM和STS)
* 弹性伸缩ESS

# 用法
## 简单用法
```javascript
var AliSdk, cms, ecs, ess, options, ram, rds, slb, sts;

AliSdk = require('../index');

options = {
  AccessKeyId: 'xxxxxxxxxxxx',
  AccessKeySecret: 'xxxxxxxxxxxxxxx'
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
```

## 其他用法
Coming soon...
