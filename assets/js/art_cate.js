$(function () {
    let layer = layui.layer;
    initArticleList();
    function initArticleList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status != 0) {

                    return layer.msg(res.message);
                }

                console.log(res.data);
                let Str = template('tpl-art-cates', {
                    data: res.data
                });
                $('tbody').html(Str)
            }
        })
    }
})