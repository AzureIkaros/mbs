define(['jquery','jqcookie'], function ($) {
    return {
        init: function () {
            $('#footer').load("login_footer.html");
            $('.button').on('click', function () {
                let username = $('.username');
                let password = $('.password');
                let phone_reg = /^1[3,4,5,7,8]\d{9}$/;
                let email_reg = /^[\w | \W]{2,}\@[\w | \W]{2,}\.[0-9a-zA-Z]{2,}$/;
                let flag = phone_reg.test(username.val()) || email_reg.test(username.val()) ? true : false;
                let type = phone_reg.test(username.val()) ? 'phone' : 'email';
                if (flag) {
                    $.ajax({
                        url: '../php/login.php',
                        type: 'post',
                        data: `${type}=${username.val()}&password=${password.val()}`
                    }).done(function (data) {
                        if (/^[0-9a-z]{40}$/g.test(data)) {
                            alert("登录成功,1秒后返回前一页");
                            $.cookie('username', username.val(), { expires: 7, path: '/' })
                            $.cookie('password', data, { expires: 7, path: '/' })
                            $.cookie('flag', 1, { expires: 7, path: '/' })
                            setTimeout(function () {
                                location.href = /detils|cart/.test($.cookie('url')) ? $.cookie('url') : 'index.html';
                            }, 1000)
                        } else {
                            alert("账号或密码错误");
                        }
                    })
                } else {
                    alert("手机号或邮箱格式错误");
                } 
            });
        }
    }
});