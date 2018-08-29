const mongoose = require('mongoose');
const personSchema = require('../schemas/personSchema');

module.exports = mongoose.model('detail', personSchema);
