module.exports = {
  Protocol: 'https',
  CommonOptions: {
    Format: 'JSON',
    Version: '',
    AccessKeyId: '',
    Signature: '',
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: '',
    SignatureVersion: '1.0',
    SignatureNonce: ''
  },
  Servers: {
    ECS: {
      Domain: 'ecs.aliyuncs.com',
      Version: '2014-05-26'
    },
    RDS: {
      Domain: 'rds.aliyuncs.com',
      Version: '2014-08-15'
    },
    SLB: {
      Domain: 'slb.aliyuncs.com',
      Version: '2014-05-15'
    },
    ESS: {
      Domain: 'ess.aliyuncs.com',
      Version: '2014-08-28'
    },
    CMS: {
      Domain: 'metrics.aliyuncs.com',
      Version: '2015-10-20'
    },
    RAM: {
      Domain: 'ram.aliyuncs.com',
      Version: '2015-05-01'
    },
    STS: {
      Domain: 'sts.aliyuncs.com',
      Version: '2015-04-01'
    }
  }
};
