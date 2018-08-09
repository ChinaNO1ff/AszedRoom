$(document).ready(function() {

	// 验证手机号码合法性
	function isPhone(str) {
		var patt = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/;
		return patt.test(str);
	}

	function isWhite(obj) {
		var str = obj.val().trim();
		if (str === '') {
			return true;
		} else {
			return false;
		}
	}

	function getVal(obj) {
		return obj.val().trim();
	};

	$('#phone').focus();
	// 获取验证码
	$('#getcode').on('click', function() {
		var number = $('#phone').val().trim();
		if (isPhone(number)) {
			$.ajax({
				type: 'POST',
				url: '/register/getcode',
				data: {
					number: number
				},
				success: function(res) {
					alert('success');
					if (res.used) {
						alert('该号码已被注册');
					} else {
						if (res.code === 'no') {
							alert('发送验证码失败');
						} else {
							alert('发送验证码成功');
							console.log('cookie: ' + res.code);
							$.cookie('code', res.code);
							$('#code').attr('disabled', false);
							$('#getcode').attr('disabled', true);
							setTimeout(function() {
								// 一分钟后允许点击
								$('#getcode').attr('disabled', false);
							}, 60000);
						}
					}
				}
			});
		} else {
			alert('请输入合法的号码');
		}
	});
	// 检查用户名是否重复
	$('#name').blur(function(){
		if (getVal($('#name')) === '') {
			alert('请输入用户名');
		} else {
			$.ajax({
				type: 'POST',
				url: '/register/nameused',
				data: {
					userName: getVal($('#name'))
				},
				success: function(res) {
					if (res === 'yes') {
						alert('该用户名已被使用');
					} else {
						
					}
				}
			});
		}
	});
	// 提交
	$('#sub').click(function() {
		if (isWhite($('#phone')) || isWhite($('#name')) || isWhite($('#code')) || isWhite($('#psd')) || isWhite($('#rep'))) {
			alert('请输入完整的信息');
		} else {
			if ($.cookie('code') === md5($('#code').val())) {
				if (getVal($('#psd')) === getVal($('#rep'))) {
					$.ajax({
						type: 'POST',
						url: '/register',
						data: {
							userName: getVal($('#name')),
							userPwd: getVal($('#psd')),
							userPhone: getVal($('#phone'))
						},
						success: function(res) {
							if (res === 'ok') {
								alert('注册成功');
								$.cookie('code', '', {
									expires: -1
								});
								window.location.href = '/';
							} else {
								alert('注册失败');
								window.location.reload();
							}
						}
					});
				} else {
					alert('密码不一致');
				}
			} else {
				alert('验证码错误');
			}
		}
	});
	// 重置
	$('ret').click(function() {
		window.location.reload();
	});
});