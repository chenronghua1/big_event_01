$(function () {
    let lay
    // 1.定义密码规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位。且不能出现空格'
        ],
        newPwd: function (value) {
            if (value == $('[name=oldPwd').val()) {
                return '新密码不能和旧密码一致'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次的新密码输入不一致!'
            }
        }
    })
    // 2.修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('密码修改成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})