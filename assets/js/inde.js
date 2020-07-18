$(function () {
    var layer = layui.layer

    $('#btnLogout').on('click', function () {

        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function () {
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })

    getUserInfo()
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}



function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // 选取第一个字符，防止有英文，设置英文第一个字母大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}