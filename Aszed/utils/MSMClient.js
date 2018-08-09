const config = require('../config/smsConfig');
const SMSClient = require('@alicloud/sms-sdk');

module.exports = new SMSClient({
	accessKeyId: config.AccessKeyID,
	secretAccessKey: config.AccessKeySecret
});