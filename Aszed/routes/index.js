var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var Utils = require('../utils/utils');

/* GET home page. */
router.get('/', (req, res, next) => {
	if (req.cookies.userName) {
		res.render( 'user', { userName: req.cookies.userName } );
	} else {
		res.render( 'index', { title: 'Aszed chatroom' , userName: '' } );
	}
});
router.post('/', (req, res, next) => {
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
						maxAge: 100000
					});
				}
			} else {
				console.log('login failed');
			}
			res.redirect('/');
		}
	});
})

module.exports = router;
