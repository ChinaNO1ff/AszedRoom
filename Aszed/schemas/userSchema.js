const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	userName: {
		type: String,
		unique: true
	},
	userPwd: {
		type: String
	},
	userPhone: {
		type: String,
		unique: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
}, {
	versionKey: false
});