
$(document).ready(function(){
	if ($.cookie('roomPwd') === md5('')) {
		alert('join success');
	} else {
		alert('enter pwd');
	}

	// var socket = io.connect();
	// var chat = new Chat(socket);
	// chat.socket.on('a', (res) => {
	// 	console.log(res)
	// });
});