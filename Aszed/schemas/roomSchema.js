const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	roomId: {
		type: String,
		unique: true
	},
	roomPwd: {
		type: String,
		default: 'd41d8cd98f00b204e9800998ecf8427e'
	},
	roomTitle: {
		type: String,
		unique: true
	},
	roomPic: {
		type: String,
		default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533894296425&di=7d8e10fe0f411efba2d4032457b34bf3&imgtype=0&src=http%3A%2F%2Fimg3.xiazaizhijia.com%2Fwalls%2F20160808%2Fmid_c3553328f472d54.jpg'
	},
	online: {
		type: [String],
		default: []
	},
	created: {
		type: Date,
		default: Date.now()
	}
}, {
	versionKey: false
});