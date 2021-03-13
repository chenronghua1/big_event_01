$(function () {
    // 注册登录模块切换
    $('#link-log').click(
        function () {
            console.log(1);
            $('.reg-box').hide();
            $('.log-box').show();
        }
    );
    $('#link-reg').click(
        function () {
            $('.log-box').hide();
            $('.reg-box').show();
        }
    )

    //自定义验证规则  
    //verify（）的参数是一个对象
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须未6-16位，且不能输入空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box input[name=password]').val();
            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    })


    var layer = layui.layer;
    // 注册用户
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#link-log').click();
                document.querySelector('#form_reg').reset();
            }
        })
    })
    //用户登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // let str = $(this).serialize();
        // console.log(str);
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res, res.token);
                layer.msg('恭喜你登录成功');
                localStorage.setItem('token', res.token);
                location.href = 'index.html'
            }
        })
    })

})