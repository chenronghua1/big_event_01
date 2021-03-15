$(function () {
    getUserInof();
})

function getUserInof() {
    // 用户资料渲染
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);

            }
            renderAvatar(res.data)
        },
        //complete无论成功与否，都会执行
        // complete: function (res) {
        //     console.log(res);
        //     let obj = res.responseJSON;
        //     console.log(obj);
        //     if (obj.status==1 && obj.message == '身份认证失败！') {
        //         location.href = 'login.html'
        //         localStorage.removeItem('token')
        //     }
        // }
    });

    //退出弹出框
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            layer.close(index);
            localStorage.removeItem('token');
            location.href = 'login.html';


        });
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