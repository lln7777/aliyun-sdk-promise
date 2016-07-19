# aliyun-sdk-promise

阿里云API全线产品的轻量级的Promise SDK, 目前支持所有POP形式接口阿里云API
示例见test目录

## 声明

阿里官方已经有了SDK，本人并不喜欢重复造轮子，但是出于以下几个目的，写了这个简单的库（称之为模块，是因为它并不满足传统意义上SDK一些基本要求），用来替代官方的SDK：

1. 阿里云官方的SDK并不支持Promise模式，而且用现有的Promise框架，如Bluebird的内置函数promisify对官方的SDK进行Promise化也无法成功。
1. 阿里云官方的SDK对阿里云的每个Action都做了方法映射以及参数校验。但是阿里云的产品API变动太大了，这样的设定反而限制了用户的使用，API的变动并不能立即从SDK上反应出来。

此库只是简单做了签名算法，请求完全参考阿里云API的Acton定义。没有方法映射，对阿里云的API变动可以灵活处理。也没有方法参数校验，因为阿里云API本身会做一次校验，没必要做重复的工作，使用的过程中只需要对返回的错误做可读性翻译就行了。

## 目前支持以下产品或功能

* 云服务器ECS
* 云存储RDS
* 负载均衡SLB
* 云监控CMS
* 权限控制(RAM和STS)
* 弹性伸缩ESS
* 云市场镜像查询

## 用法

使用的过程中，请注意RAM和STS只支持HTTPS方法，参数Protocal请设置成https

#### 简单用法
```javascript
var AliSdk, cms, ecs, ess, options, ram, rds, slb, sts, market;

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

market = new AliSdk.Client('MARKET', options);

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

market.get('queryMarketCategories')
.then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});

market.get('queryMarketImages', {
  Param: {
    Region: 'cn-hangzhou',
    ImagePurchaseType: 'Package',
    CategoryCode: 'market_category',
    CategoryId: 10001
  }
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});

```
#### 阿里云资源编排
请使用 [aliyun-ros](https://www.npmjs.com/package/aliyun-ros)

#### 其他用法
Coming soon...
