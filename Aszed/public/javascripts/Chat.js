var Chat = function(socket){
	this.socket = socket;
};

Chat.prototype.updateList = function(obj){
	var str = '';
		$(obj).each(function(index, item){
		str += `
			<li>${item}</li>
		`;
	});
	$('#onlineList').html($(str));
}

Chat.prototype.goBottom = function(){
	$('#main').scrollTop($('#main').prop('scrollHeight'));
}

Chat.prototype.sendMessage = function(text){
	var msg = {
		message: text,
	}
	this.socket.emit('message', msg);
}