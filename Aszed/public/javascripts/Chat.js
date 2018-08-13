var Chat = function(socket){
	this.socket = socket;
};

Chat.prototype.updateList = function(obj){
	var str = '';
		$(obj).each(function(index, item){
		str += `
			<li class="list-group-item">${item}</li>
		`;
	});
	$('#onlineList').html($(str));
}

Chat.prototype.goBottom = function(){
	$('#main').scrollTop($('#main').prop('scrollHeight'));
}

Chat.prototype.formatTime = function(val){
	function add0(m){
		return m<10?'0'+m : m;
	}
	var time = new Date(val);
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	return `${add0(h)}:${add0(m)}:${add0(s)}`;
}

Chat.prototype.sendMessage = function(text){
	var msg = {
		message: text,
	}
	this.socket.emit('message', msg);
}