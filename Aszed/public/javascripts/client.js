$(document).ready(function(){
	var socket = io.connect();
	var chat = new Chat(socket);
	var name = '';
	chat.socket.on('user connect', res => {
		name = res.username;
		$('#main').append($(`
			<h3>${res.username} 加入了聊天室</h3>
		`));
		chat.updateList($(res.online));
		chat.goBottom();
	});
	chat.socket.on('user leave', res => {
		$('#main').append($(`
			<h3>${res.username} 离开了聊天室</h3>
		`));
		chat.updateList($(res.online));
		chat.goBottom();
	});
	chat.socket.on('message', res => {
		console.log(res)
		$('#main').append($(`
			<p>[${name}]> ${res.message}</p>
		`));
	});
	$('#send').click(function(){
		var text = $('#input').val().trim();
		chat.sendMessage(text);
		$('#main').append($(`
			<p>${text}</p>
		`));
	});
});