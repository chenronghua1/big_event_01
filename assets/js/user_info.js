$(function () {
    // 1.校验规则定义
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return '昵称长度1~6位之间';
            }
        }
    })
    // 2.用户渲染
    initUserInfo();
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res.data);
                if (res.status != 0) {
                    return layer.msg = (res.message);
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //用户资料重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 用户资料修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                console.log(window.parent);
                if (res.status != 0) {
                    return layer.msg('用户信息修改失败!')
                }
                layer.msg('恭喜您，用户信息修改成功');

            }
        })
    })

})