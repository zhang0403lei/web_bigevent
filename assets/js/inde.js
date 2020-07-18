$(function () {
    // 给退出绑定点击事件

    var layer = layui.layer

    $('#btnLogout').on('click', function () {

        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })




    // 调用函数
    getUserInfo()



    // 获取信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers  请求头配置对象
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if(res.status == 1) {
                    
                }
                renderAvatar(res.data)
            }
        })
    }


    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img')
                .attr('src', user.user_pic)
                .show()
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar')
                .html(first)
                .show()
        }
    }
})



