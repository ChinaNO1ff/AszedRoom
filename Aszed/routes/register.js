var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var Utils = require('../utils/utils');
var MSMClient = require('../utils/MSMClient');

/* GET register listing. */
router.get('/', (req, res, next) => {
	res.render('register', { title: '用户注册' });
});
/* POST register listing. */
router.post('/', (req, res, next) => {

	var md5 = crypto.createHash("md5");
	var pwd = md5.update(req.body.userPwd).digest("hex");
	Utils.insertIntoUsers({
		userName: req.body.userName,
		userPwd: pwd,
		userPhone: req.body.userPhone,
		created: Date.now()
	}, (err, doc) => {
		if (doc) {
			console.log('register success');
			res.send('ok');
		} else {
			console.log('register failed');
			res.send('no');
		}
	});
})
// 用户名是否重复
router.post('/nameused', (req, res, next) => {
	Utils.getOneUserByName(req.body.userName, (err, docs) => {
		if (docs) {
			res.send('yes');
		} else {
			res.send('no');
		}
	});
})
// 获取验证码和检查手机号码是否重复
router.post('/getcode', (req, res, next) => {
	var obj = {};
	var phone = req.body.number;
	Utils.getOneUserByPhone(phone, (err, docs) => {
		if (err) {
			console.log('some error happened: ' + err);
		} else {
			if (docs) {
				obj.used = true;
				res.send(obj);
			} else {
				obj.used = false;

				var code = Utils.createRandom();
				var md5 = crypto.createHash('md5');
				var md5Code = md5.update(code).digest("hex");
				console.log('before md5: ' + code);
				obj.code = md5Code;
				res.send(obj);

				// var code = Utils.createRandom();
				// var md5 = crypto.createHash('md5');
				// var md5Code = md5.update(code).digest("hex");

				// MSMClient.sendSMS({
				// 	PhoneNumbers: phone,
				// 	SignName: '袁伟民',
				// 	TemplateCode: 'SMS_141597364',
				// 	TemplateParam: `{"code": ${code}}`
				// }).then(doc => {
				// 	obj.code = md5Code;
				// 	console.log('send success: ' + doc)
				// 	res.send(obj);
				// }, err => {
				// 	obj.code = 'no';
				// 	console.log('send error: ' + err);
				// 	res.send(obj);
				// });
			}
		}
	});
});

module.exports = router;
