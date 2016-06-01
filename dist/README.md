# aliyun-sdk-promise

阿里云API全线产品的轻量级的Promise SDK, 目前支持所有POP形式接口阿里云API
示例见test目录

# 声明
此库还在开发中，不建议大家在实际的项目中使用，暂时只支持ECS。其他产品和ECS签名方法一致，用法一致的可以快速支持。有兴趣的朋友可以帮忙看看代码，提提意见，谢谢！

# 用法
## 简单用法
```javascript
var AliSdk = require('../index');

var ecsOptions = {
  AccessKeyId: 'xxxxx',
  AccessKeySecret: 'xxxxxxxxxxxx'
};

var ecs = new AliSdk.Client('ecs', ecsOptions);

ecs.after = function(body) {
  return console.log(body);
};

ecs.get('DescribeInstances', {
  RegionId: 'cn-hangzhou'
}).then(function(body) {
  return console.log(body);
})["catch"](function(err) {
  return console.log(err);
});


```
## 其他用法
Coming soon...
