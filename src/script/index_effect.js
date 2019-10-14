define(['jquery', 'jqcookie'], function ($) {
    return {
        //楼梯效果
        louti: function () {
            $('#main section').on('click', function (ev) {
                if (ev.target.nodeName == "A") {
                    $(document).scrollTop($('#main section').eq($(ev.target).parent().index()).offset().top)
                }
            });
        },
        //检测是否登录
        isLogin: function () {
            let self = this;
            if (+$.cookie('flag')) {
                let phone_reg = /^1[3,4,5,7,8]\d{9}$/;
                let type = phone_reg.test($.cookie('username')) ? 'phone' : 'email';
                $.ajax({
                    type: 'post',
                    data: `${type}=${$.cookie('username')}&password=${$.cookie('password')}`,
                    url: 'http://10.31.155.75/mbs/php/check_login.php'
                }).done(function (data) {
                    if (data) {
                        $.cookie('flag', 1, { expires: 7, path: '/' });
                        self.changeHead();
                    } else {
                        $.cookie('flag', 0, { expires: 7, path: '/' });
                    }
                })
            } else {
                $.cookie('flag', 0, { expires: 7, path: '/' });
                self.changeHead();
            }
        },
        //若登陆则改变头部信息
        changeHead: function () {
            if (+$.cookie('flag')) {
                $('.login').html(`<a href='http://10.31.155.75/mbs/dist/login.html'>欢迎您,${$.cookie('username')}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href='javascript:;'>我的梦芭莎</a>`);
                $('.register').html(`<a href="javascript:;" class='logout'>退出</a>`);
            } else {
                $('.login').html(`<a href="http://10.31.155.75/mbs/dist/login.html">登录</a>`);
                $('.register').html(`<a href="http://10.31.155.75/mbs/dist/register.html">注册</a>`);
            }
        },
        //退出
        logout: function () {
            $('header ul').on('click', function (ev) {
                if ($(ev.target).is('.logout')) {
                    $.cookie('username', '', { expires: -1, path: '/' });
                    $.cookie('password', '', { expires: -1, path: '/' });
                    $.cookie('flag', '0', { expires: 7, path: '/' });
                    location.reload();
                }
            })
        },
        //搜索框渲染
        search:function(){
            $('.search_value').on('input',function(){
                $.ajax({
                    url:`https://suggest.taobao.com/sug?code=utf-8&q=${$('.search_value').val()}&_ksTS=1569402939975_317&callback=taobao&k=1&area=c2c&bucketid=15`,
                    dataType:'jsonp',
                }).done(function(data){
                    let str = '';
                    for(let i of data.result){
                        str += `
                            <aside>${i[0]}</aside>
                        `;
                    }
                    $('.search .result').html(str);
                })
            })
        },
        //搜索框效果
        searchGood:function(){
            $('.result').on('click',function(ev){
                if(ev.target.nodeName==='ASIDE'){
                    $('.search_value').val($(ev.target).html());
                    $('.search .result').html('');  
                    $('.search_value').on('blur',function(){
                        $('.search .result').html('');
                    })
                }    
            })
        },
        //头部效果
        showChat:function(){
            $('.chat').hover(function(){
                $(this).children('img').show(); 
            },function(){
                $(this).children('img').hide(); 
            })
        }
    }
})