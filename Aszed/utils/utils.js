const User = require('../models/userModel');

module.exports = {
	// query user by userName
	getOneUserByName ( name ,callback ) {
		console.log('get user by name');
		User.findOne({ userName: name }, (err, docs) => {
			if (err) {
				return ;
			} else {
				console.log('the docs is :' + docs);
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
	createRandom () {
		let code = '';
		for(let i=0;i<6;i++){
			code += Math.floor(Math.random()*10);
		}
		return code;
	}
}