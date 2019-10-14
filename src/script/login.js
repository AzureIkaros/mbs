require(['config'], function () {
    require(['jquery'], function ($) {
        require(['jqcookie'], function () {
            $('#footer').load("http://10.31.155.75/mbs/src/login_footer.html");
            $('.button').on('click', function () {
                let username = $('.username');
                let password = $('.password');
                let phone_reg = /^1[3,4,5,7,8]\d{9}$/;
                let type = phone_reg.test(username.val()) ? 'phone' : 'email';
                $.ajax({
                    url: 'http://10.31.155.75/mbs/php/login.php',
                    type: 'post',
                    data: `${type}=${username.val()}&password=${password.val()}`
                }).done(function (data) {
                    console.log(data)
                    if (data) {
                        alert("登录成功,1秒后跳转到首页");
                        $.cookie('username', username.val(), { expires: 7, path: '/' })
                        $.cookie('password', data, { expires: 7, path: '/' })
                        $.cookie('flag', 1, { expires: 7, path: '/' })
                        setTimeout(function () {
                            location.href = "http://10.31.155.75/mbs/dist/";
                        }, 1000)
                    } else {
                        alert("账号或密码错误");
                    }
                })
            })
        })
    })
})