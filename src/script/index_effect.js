define(['./render.js','jquery', 'jqcookie','lazyload'], function (render,$) {
    return {
        init:function(){
            this.louti();
            this.isLogin();
            this.logout();
            this.search();
            this.searchGood();
            this.showChat();
            this.rightSidebar();
            this.weChat();
            this.loginBox();
            render.index_render();
        },
        //楼梯效果
        louti: function () {
            $('#main section').on('click', function (ev) {
                if (ev.target.nodeName == "A") {//$('#main section').eq($(ev.target).parent().index()).offset().top
                    let top = $('#main section').eq($(ev.target).parent().index()).offset().top;
                    $('html,body').animate({ scrollTop: top }, 500)
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
                    url: '../php/check_login.php'
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
                $('.login').html(`<a href='login.html'>欢迎您,${$.cookie('username')}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href='javascript:;'>我的梦芭莎</a>`);
                $('.register').html(`<a href="javascript:;" class='logout'>退出</a>`);
            } else {
                $('.login').html(`<a href="login.html" class="loginaddress">登录</a>`);
                $('.register').html(`<a href="register.html">注册</a>`);
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
        search: function () {
            $('.search_value').on('input', function () {
                $.ajax({
                    url: `https://suggest.taobao.com/sug?code=utf-8&q=${$('.search_value').val()}&_ksTS=1569402939975_317&callback=taobao&k=1&area=c2c&bucketid=15`,
                    dataType: 'jsonp',
                }).done(function (data) {
                    let str = '';
                    for (let i of data.result) {
                        str += `
                            <aside>${i[0]}</aside>
                        `;
                    }
                    $('.search .result').html(str);
                })
            })
        },
        //搜索框效果
        searchGood: function () {
            $('.result').on('click', function (ev) {
                if (ev.target.nodeName === 'ASIDE') {
                    $('.search_value').val($(ev.target).html());
                    $('.search .result').html('');
                    $(document).on('blur', function () {
                        $('.search .result').html('');
                    })
                }
            })
        },
        //头部效果
        showChat: function () {
            $('.chat').hover(function () {
                $(this).children('img').show();
            }, function () {
                $(this).children('img').hide();
            })
        },
        //右侧边栏显示效果
        stairsShow: function () {
            if ($('html,body').scrollTop() >= 1000) {
                $('.stairs').show();
            } else {
                $('.stairs').hide();
            }
        },
        //右侧边栏效果
        rightSidebar: function () {
            let self = this;
            this.stairsShow();
            $(document).on('scroll', function () {
                self.stairsShow();
            })
        },
        //左侧边栏微信效果
        weChat: function () {
            $('.wechat').hover(function () {
                $('.wechat img').show();
            }, function () {
                $('.wechat img').hide();
            })
        },
        //侧边栏用户登录功能
        loginBox: function () {
            if ((+$.cookie('flag'))) {
                $('.login_box').html(`
                    <img class="img2" src="http://i0.mbscss.com/img/moonbasa2/member/default-head.jpg" alt="">
                    <p class="username">用户名:${$.cookie('username')}</p>
                    <p class="usertype">会员类型:普通客户</p>
                `)
            }
            $('#user').hover(function () {
                $('.login_box').show();
            }, function () {
                $('.login_box').hide();
            });
            if($.cookie('num')){
                $('.shopcount').html($.cookie('num').split(',').map(function(value){return +value}).reduce(function(prve,next){return prve+next}));
            }
            $('#left_sidebar').on('mouseover',function(ev){
                if($(ev.target).parents('section').is('.cartList') || $(ev.target).is('.sideBar') || $(ev.target).is('.sideBar p')){
                    $('.cartList').show();
                }else{
                    $('.cartList').hide();
                }
            })
            $('.cartList').on('mouseout',function(){
                $('.cartList').hide();
            })
        }
    }
})