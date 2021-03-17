$(function () {
    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        const dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }






    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable();
    var layer = layui.layer;
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.mgs('获取文章类别失败!')
                }

                var htmlStr = template('tpl-table', { data: res.data });
                $('tbody').html(htmlStr);
                renderPage(res.total);
                // console.log(res);
            }
        })
    }
    initCate();
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var state = $('[name=state]').val();
        var cate_id = $('[name=cate_id').val();
        q.state = state;
        q.cate_id = cate_id;
        initTable();

    })


    var laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',//id
            count: total,//数总数
            limit: q.pagesize,//每页显示几条
            curr: q.pagenum,//初始化页面
            // 页面切换触发这个方法
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) {
                    initTable();
                }
            }
        })
    }

    //删除文章按钮
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('是否确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + Id,
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    initTable();
                    layer.msg('恭喜你，删除文章成功');
                    //    页面汇总删除按钮个数等于1，页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;

                }
            })
            layer.close(index);
        })
    })

})