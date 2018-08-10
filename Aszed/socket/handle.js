var io = require('socket.io')();
var Utils = require('./utils');

io.on('connection', socket => {
	// Utils.msg(socket);
});


module.exports = server => {
	io.listen(server);
}