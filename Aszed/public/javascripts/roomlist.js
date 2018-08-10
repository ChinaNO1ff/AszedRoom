$(function(){

    function tips(str)  {
        $('#content').html(str);
        $('#model').modal();
    }

    function isUrl(str) {
        var patt = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
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

    $.ajax({
        type: 'POST',
        url: '/rooms/getrooms',
        success: function(res) {
            $(res).each(function(index, item){
                var str = `
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <a href="/rooms/${item.roomId}" class="thumbnail btn">
                            <img src="${item.roomPic}">
                            <div class="caption">
                                <p>标题：${item.roomTitle}</p>
                                <p>在线人数: ${item.online.length}</p>
                                <p>创建于：${(new Date(item.created)).toLocaleString()}</p>
                            </div>
                        </a>
                    </div>
                `;
                $(str).appendTo($('#list'));
            });
        }
    });
    // 呼出创建表单
    $('#create').click(function(){
        $('#newroom').modal();
    });

    $('#roomPwd').blur(function(){
        if (!isWhite($('#roomPwd'))) {
            if (getVal($('#roomPwd')).length <3 || getVal($('#roomPwd')).length >8) {
                tips('密码限制3到8个字符');
            }
        }
    });
    $('#roomPic').blur(function(){
        if (!isWhite($('#roomPic'))) {
            if (!isUrl(getVal($('#roomPic')))) {
                tips('图片地址不合法');
            }
        }
    });
    // 提交表单
    $('#sub').click(function(){
        if (isWhite($('#roomTitle'))) {
            tips('请输入房间标题');
        } else {
            if (getVal($('#roomTitle')).length > 12) {
                tips('标题长度要小于12个字符');
            } else {
                $.ajax({
                    type: 'POST',
                    url: '/rooms/createroom',
                    data: {
                        roomTitle: getVal($('#roomTitle')),
                        roomPwd: getVal($('#roomPwd')),
                        roomPic: getVal($('#roomPic'))
                    },
                    success: function(res) {
                        if (res === 'ok') {
                            window.location.href = '/rooms';
                        } else {
                            tips('创建失败');
                        }
                    }
                });
            }
        }
    })
    $('#ret').click(function(){
        $('#roomTitle').val('');
        $('#roomPwd').val('');
        $('#roomPic').val('');
        $('#roomTitle').focus();
    });
})