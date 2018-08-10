var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var Utils = require('../utils/utils');

/* GET home page. */
router.get('/', (req, res, next) => {
	if (req.cookies.userName) {
		res.render( 'loginIndex', { userName: req.cookies.userName } );
	} else {
		res.render( 'index' );
	}
});

router.post('/', (req, res, next) => {
	// 此处可以截取用户名和登录密码，保存到本地文件中
	var md5 = crypto.createHash("md5");
	var name = req.body.userName;
	var pwd = md5.update(req.body.userPwd).digest("hex");

	Utils.getOneUserByName(name, (err, docs) => {
		if (err) {
			console.log('some error happened');
		} else {
			if (docs) {
				if (docs.userPwd === pwd) {
					console.log('login success');
					res.cookie('userName', name, {
						maxAge: 10000000
					});
					res.send('ok');
				} else {
					res.send('no');
				}
			} else {
				console.log('login failed');
				res.send('no');
			}
		}
	});
})

module.exports = router;
