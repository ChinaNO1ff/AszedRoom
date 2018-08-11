var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var Utils = require('../utils/utils');

router.get('/', (req, res, next) => {
	if (req.cookies.userName) {
		res.render('rooms', { userName: req.cookies.userName });
	} else {
		res.render('index');
	}
});
// 进入指定id的房间
router.get('/:id', (req, res, next) => {
	var username = req.cookies.userName;
	var roomid = req.params.id;
	if (username) {
		Utils.getRoomById(roomid, (err, doc) => {
			if (doc) {
				res.cookie('roomPwd', doc.roomPwd, {
					maxAge: 100000000
				});
				res.render('chatroom', {
					roomId: roomid,
					roomTitle: doc.roomTitle,
					userName: username
				});	
			} else {
				res.render('error');
			}
		});
	} else {
		res.render('index');
	}
});

// 获取房间列表信息
router.post('/getrooms', (req, res, next) => {
	Utils.getAllRoom((err, doc) => {
		if (err) {
			res.send({});
		} else {
			res.send(doc);
		}
	});
});

// 创建房间
router.post('/createroom', (req, res, next) => {
	var md5 = crypto.createHash("md5");
	var pwd = md5.update(req.body.roomPwd).digest("hex");
	if (req.body.roomPic === '') {
		Utils.createRoom({
			roomId: Utils.createId(),
			roomPwd: pwd,
			online: [],
			roomTitle: req.body.roomTitle,
			created: Date.now()
		}, (err, doc) => {
			if (doc) {
				res.send('ok');
			} else {
				res.send('no');
			}
		});
	} else {
		Utils.createRoom({
			roomId: Utils.createId(),
			roomPwd: pwd,
			roomPic: req.body.roomPic,
			roomTitle: req.body.roomTitle,
			created: Date.now()
		}, (err, doc) => {
			if (doc) {
				res.send('ok');
			} else {
				res.send('no');
			}
		});
	}
});

module.exports = router;