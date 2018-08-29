const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    userIcon: {
        type: String,
        default: ''
    },
    userSex: {
        type: String,
        default: ''
    },
    userPhone: {
        type: String,
        default: ''
    },
    userEmail: {
        type: String,
        default: ''
    },
    userFriends: {
        type: [String],
        default: []
    }
}, {
	versionKey: false
});
