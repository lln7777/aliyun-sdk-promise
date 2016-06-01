AliSdk = require '../index'

############# ECS
ecsOptions =
  Domain: 'ecs.aliyuncs.com'
  Version: '2014-05-26'
  AccessKeyId: 'xxxxx'
  AccessKeySecret: 'xxxxxxxxxxxx'
ecs = new AliSdk.Client 'ecs', ecsOptions

ecs.after = (body)->
  console.log body

ecs.get 'DescribeInstances', {RegionId: 'cn-hangzhou'}
.then (body)->
  console.log body
.catch (err)->
  console.log err
#
############# RDS
#rdsOptions =
#  Domain: 'rds.aliyuncs.com'
#  Version: '2014-08-15'
#  RegionId: 'cn-hangzhou'
#  AccessKeyId: 'xxxxx'
#  AccessKeySecret: 'xxxxxxxxxxxx'
#rds = new AliSdk.Client 'rds', rdsOptions
#
#rds.get 'DescribeDBInstances', null, (err, body)->
#  console.log err, body
