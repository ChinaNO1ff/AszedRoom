var express = require('express');
var router = express.Router();
var Utils = require('../utils/utils');

router.get('/', (req, res, next) => {
	res.render('users', { userName: req.cookies.userName });
});

module.exports = router;