$(document).ready(function() {

	function tips(str) {
		$('#content').html(str);
		$('#model').modal();
	}
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
	$('#getcode').click(function(){
		var number = $('#phone').val().trim();
		if (isPhone(number)) {
			$.ajax({
				type: 'POST',
				url: '/register/getcode',
				data: {
					number: number
				},
				success: function(res) {
					if (res.used) {
						tips('该号码已被注册');
					} else {
						if (res.code === 'no') {
							tips('发送验证码失败');
						} else {
							tips('发送验证码成功');
							$.cookie('code', res.code);
							$('#code').attr('disabled', false);
							$('#getcode').attr('disabled', true);
							setTimeout(function() {
								$('#getcode').attr('disabled', false);
							}, 60000);
						}
					}
				}
			});
		} else {
			tips('请输入合法的号码');
		}
	});
	// 检查用户名是否重复
	$('#name').blur(function(){
		if (getVal($('#name')).length >= 8) {
			tips('用户名太长，限制8个字符');
			$('#name').val('');
		} else {
			$.ajax({
				type: 'POST',
				url: '/register/nameused',
				data: {
					userName: getVal($('#name'))
				},
				success: function(res) {
					if (res === 'yes') {
						tips('该用户名已被使用');
					} else {
						
					}
				}
			});
		}
	});
	// 检查密码是否合法
	$('#psd').blur(function(){
		if (!isWhite($('#psd'))) {
			if(getVal($('#psd')).length < 6 || getVal($('#psd')).length >10) {
				tips('密码长度限制为6到10个字符');
				$('#psd').val('');
			}
		}
	});
	// 提交
	$('#sub').click(function() {
		if (isWhite($('#phone')) || isWhite($('#name')) || isWhite($('#code')) || isWhite($('#psd')) || isWhite($('#rep'))) {
			tips('请输入完整的信息');
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
								tips('注册成功');
								$.cookie('code', '', {
									expires: -1
								});
								window.location.href = '/';
							} else {
								tips('注册失败');
								window.location.href = '/register';
							}
						}
					});
				} else {
					tips('密码不一致');
				}
			} else {
				tips('验证码错误');
			}
		}
	});
	// 重置
	$('#ret').click(function() {
		window.location.href = '/register';
	});
});