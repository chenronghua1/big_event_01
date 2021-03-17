$(function () {
    let layer = layui.layer;
    initArtCateList();
    // 数据渲染
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status != 0) {

                    return layer.msg(res.message);
                }

                // console.log(res.data);
                let Str = template('tpl-art-cates', {
                    data: res.data
                });
                $('tbody').html(Str)
            }
        })
    }
    // 添加弹窗
    $('#btnAdd').click(function () {
        indexAdd = layer.open({
            type: 1,
            title: '修改文章分类',
            content: '可以填写任意的layer代码',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()

        });

    })
    //添加
    let indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        let str = $(this).serialize();
        // console.log(str);
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: str,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexAdd)
                initArtCateList()

            }
        })
    })
    let indexEdit = null;
    let form = layui.form;
    // 修改弹窗
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()

        });
        let Id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                form.val('form-edit', res.data);
                console.log(res);
            }
        })
    })
    // 修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        layer.confirm('确认删除吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + Id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.close(index);
                    initArtCateList();
                    layer.msg('恭喜你，文章类别删除成功')

                }
            })

        });
    })
})