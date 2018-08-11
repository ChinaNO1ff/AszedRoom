const User = require('../models/userModel');
const Room = require('../models/roomModel');

module.exports = {
	// query user by userName
	getOneUserByName ( name ,callback ) {
		User.findOne({ userName: name }, (err, docs) => {
			if (err) {
				return ;
			} else {
				callback(null, docs);
			}
		})
	},
	// query user by phone
	getOneUserByPhone ( phone ,callback ) {
		User.findOne({ userPhone: phone }, (err, docs) => {
			if (err) {
				return ;
			} else {
				callback(null, docs);
			}
		})
	},
	// if falied return false, else return true
	insertIntoUsers ( obj, callback ) {
		new User(obj).save((err, doc) => {
			if (err) {
				callback(null, false);
			} else {
				callback(null, true)
			}
		});
	},
	createId () {
		function add0(m){
			return m<10?'0'+m : m;
		}
		var time = new Date();
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		return y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s)+(Math.floor(Math.random()*10));
	},
	createRandom () {
		let code = '';
		for(let i=0;i<6;i++){
			code += Math.floor(Math.random()*10);
		}
		return code;
	},
	createRoom (obj, callback) {
		new Room(obj).save((err, doc) => {
			if (err) {
				callback(null, false);
			} else {
				callback(null, true)
			}
		});
	},
	getAllRoom (callback) {
		Room.find({}, (err, docs) => {
			if (err) {
				return ;
			} else {
				callback(null, docs);
			}
		});
	},
	getRoomById (id, callback) {
		Room.findOne({ roomId: id }, (err, docs) => {
			if (err) {
				return ;
			} else {
				callback(null, docs);
			}
		})
	},
	updateOnline (old, val, callback) {
		Room.update(old, val, (err, docs) => {
			if (err) {
				callback(null, false);
			} else {
				callback(null, true)
			}
		});
	}
}