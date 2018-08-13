$(document).ready(function(){
	var socket = io.connect();
	var chat = new Chat(socket);

	var $input = $('#input');
	var $main = $('#main');
	$input.focus();

	chat.socket.on('user connect', res => {
		$main.append($(`
			<li class="tip list-group-item">${res.username} 加入了聊天室 ${chat.formatTime(res.time)}</li>
		`));
		chat.updateList($(res.online));
		chat.goBottom();
	});
	chat.socket.on('user leave', res => {
		$main.append($(`
			<li class="tip list-group-item">${res.username} 离开了聊天室 ${chat.formatTime(res.time)}</li>
		`));
		chat.updateList($(res.online));
		chat.goBottom();
	});
	// 接收消息
	chat.socket.on('message', res => {
		$main.append($(`
			<li class="received list-group-item">[${res.username}]> ${res.message}</li>
		`));
		chat.goBottom();
	});
	// 发送消息
	$('#send').click(function(){
		var text = $input.val().trim();
		if (text !== "") {
			chat.sendMessage(text);
			$main.append($(`
				<li class="send list-group-item">${text}</li>
			`));
			chat.goBottom();
			$input.val('').focus();
		} else {
			$input.val('').focus();
		}
	});
	$(document).keydown(function(event){
	  	if(event.keyCode ==13){
    		var text = $input.val().trim();
			if (text !== "") {
				chat.sendMessage(text);
				$main.append($(`
					<li class="send list-group-item">${text}</li>
				`));
				chat.goBottom();
				$input.val('').focus();
			} else {
				$input.val('').focus();
			}
	  	}
	});
});