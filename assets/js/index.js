$(function () {
    getUserInof();
})

function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: (res) => {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);

            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 渲染昵称
    let name = user.nickname || user.username;
    $('#welcomee').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src', user_pic);
        $('text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }

    //渲染图片
}