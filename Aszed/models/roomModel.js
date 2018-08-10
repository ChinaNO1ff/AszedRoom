const mongoose = require('mongoose');
const roomSchema = require('../schemas/roomSchema');

module.exports = mongoose.model('room', roomSchema);