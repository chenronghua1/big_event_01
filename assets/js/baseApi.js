// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
let baseURL = 'http://ajax.frontend.itheima.net';
//拦截所有ajax请求；
// 处理参数
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = baseURL + options.url;
    // console.log(options);
<<<<<<< HEAD
=======
    //需要token认证的接口
    if (options.url.indexOf('/my/') != -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    }
    // token认证失败时，清空本地token并跳转到登录页面
    options.complete = function (res) {
        console.log(res);
        let obj = res.responseJSON;
        console.log(obj);
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            location.href = 'login.html'
            localStorage.removeItem('token')
        }
    }
>>>>>>> a267e7e... 主页功能完成
})