var querystring = require('querystring');
var Utils = require('../utils/utils');
var io = require('socket.io')();
	
function getName(str) {
	var cookie = querystring.parse(str.replace(/\s|\xA0/g,""), ";");
	return cookie.userName;
}
function getId(str) {
	var arr = str.split('/');
	return arr[arr.length-1];
}

io.on('connection', socket => {
	var room = {};
	room.roomid = getId(socket.request.headers.referer);
	room.username = getName(socket.request.headers.cookie);


	// 进入指定房间
	socket.join(room.roomid, () => {
		// 更新在线人数
		Utils.getRoomById(room.roomid, (err, doc) => {
			if (doc) {
				var arr = [];
				for (let ele of doc.online) {
					if (ele === room.username) {
						continue;
					} else {
						arr.push(ele);
					}
				}
				arr.push(room.username);
				room.online = arr;
				room.time = Date.now();
				io.to(room.roomid).emit('user connect', room);
				Utils.updateOnline({roomId: room.roomid}, {online: room.online}, ()=>{});
			}
		});

		// 接收消息并广播到所有客户端

		socket.on('message', res => {

			socket.to(room.roomid).emit('message', {
				message: res.message,
				username: room.username,
				time: Date.now()
			})
		});
		// io接收者包括自己
		// socket不包括自己
		socket.to(room.roomid).on('disconnect', () => {
			Utils.getRoomById(room.roomid, (err, doc) => {
				if (doc) {
					var arr = [];
					for (let ele of doc.online) {
						if (ele === room.username) {
							continue;
						} else {
							arr.push(ele);
						}
					}
					room.online = arr;
					room.time = Date.now();
					io.to(room.roomid).emit('user leave', room);
					Utils.updateOnline({roomId: room.roomid}, {online: room.online}, ()=>{});
				}
			});
		})
	})
});


module.exports = server => {
	io.listen(server);
}