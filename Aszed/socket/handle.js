var io = require('socket.io')();

io.on('connection', socket => {
	// console.log('someone come')
	socket.on('sendUser', res => {
		console.log(res);
	})
});

module.exports = server => {
	io.listen(server);
}