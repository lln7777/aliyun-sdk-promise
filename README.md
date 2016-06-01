# aliyun-sdk-promise

阿里云API全线产品的轻量级的Promise SDK, 目前支持所有POP形式接口阿里云API
示例见test目录

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
