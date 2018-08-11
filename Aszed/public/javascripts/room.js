$(document).ready(function(){

	function tips(str)  {
        $('#content').html(str);
        $('#model').modal();
    }
    // 密码不为空时，提示输入密码
	if ($.cookie('roomPwd') !== md5('')) {
		// 显示输入框
		$('#pass').modal({backdrop: 'static', keyboard: false});
		$('#sub').click(function(){
			if(md5($('#psd').val()) === $.cookie('roomPwd')){
				$('#pass').modal('hide')
			} else {
				tips('密码错误');
			}
		});
		$(document).keydown(function(event){
		  	if(event.keyCode ==13){
	    		return false;
		  	}
		});
	}
});