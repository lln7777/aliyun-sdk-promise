AliSdk = require '../index'

# 请替换成自己的KEY
options =
  AccessKeyId: 'xxxxxxxxxxxx'
  AccessKeySecret: 'xxxxxxxxxxxxxxx'

ecs = new AliSdk.Client 'ECS', options
rds = new AliSdk.Client 'RDS', options
slb = new AliSdk.Client 'SLB', options
ess = new AliSdk.Client 'ESS', options
cms = new AliSdk.Client 'CMS', options
ram = new AliSdk.Client 'RAM', options
sts = new AliSdk.Client 'STS', options

# ecs.after = (body)->
#   console.log body

ecs.get 'DescribeInstances', {RegionId: 'cn-hangzhou'}
.then (body)->
  console.log body
.catch (err)->
  console.log err

rds.get 'DescribeDBInstances', {RegionId: 'cn-hangzhou'}
.then (body)->
  console.log body
.catch (err)->
  console.log err

ram.get 'ListUsers'
.then (body)->
  console.log body.Users.User
.catch (err)->
  console.log err

slb.get 'DescribeLoadBalancers', {RegionId: 'cn-hangzhou'}
.then (body)->
  console.log body
.catch (err)->
  console.log err

ess.get 'DescribeScalingGroups', {RegionId: 'cn-hangzhou'}
.then (body)->
  console.log body
.catch (err)->
  console.log err
