define(['./render.js','./index_effect.js','jquery', 'jqcookie'], function (render,index,$) {
    return {
        small_pic: $('#small_pic'),
        small_box: $('#small_box'),
        smallf: document.querySelector('#smallf'),
        bigf: $('.bigf'),
        big_pic: $('#big_pic'),
        list: $('article .list'),
        init:function(){
            $('#list').load("session.html");
            $('#footer').load("index_footer.html");
            $.cookie('url', location.href, { expires: 7, path: '/' });
            render.details_render();
            this.fdj();
            this.clickChange();
            this.chooseGood();
            this.chooseSize();
            this.changeNum();
            this.slideGood();
            this.addCart();
            index.changeHead();
            index.logout();
        },
        //放大镜效果
        fdj: function () {
            const self = this;
            const width = this.small_pic.width() * this.bigf.width() / this.big_pic.width();
            const height = this.small_pic.height() * this.bigf.height() / this.big_pic.height();
            this.smallf.style.width = width + 'px';
            this.smallf.style.height = height + 'px';
            const bili = this.big_pic.width() / this.small_pic.width();
            this.small_box.hover(function () {
                self.bigf.show();
                $(self.smallf).show();
                $(document).on('mousemove', function (ev) {
                    let left = ev.pageX - $(self.smallf).width() / 2 - $(self.small_pic).offset().left;
                    let top = ev.pageY - $(self.smallf).height() / 2 - $(self.small_pic).offset().top;
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= self.small_pic.width() - self.smallf.offsetWidth) {
                        left = self.small_pic.width() - self.smallf.offsetWidth;
                    }
                    if (top <= 0) {
                        top = 0;
                    } else if (top >= self.small_pic.height() - self.smallf.offsetHeight) {
                        top = self.small_pic.height() - self.smallf.offsetHeight;
                    }
                    self.smallf.style.left = left + 'px';
                    self.smallf.style.top = top + 'px';
                    self.big_pic.get(0).style.left = -(left * bili) + "px";
                    self.big_pic.get(0).style.top = -(top * bili) + "px";

                });
                $(document).off('mouseover', function () {
                    self.small_box.off();
                    $(document).off();
                });
            }, function () {
                self.bigf.hide();
                $(self.smallf).hide();
            })
        },
        //点击图片列表切换小图效果
        clickChange: function () {
            let self = this;
            this.list.on('mouseover', function (ev) {
                if (ev.target.nodeName === "IMG") {
                    self.small_pic.attr('src', ev.target.src.replace('small', 'large').replace('S.jpg', 'L.jpg'));
                    $('.list img').removeClass('active')
                    $(ev.target).addClass('active');
                    self.big_pic.attr('src', ev.target.src.replace('small', 'huge').replace('S.jpg', 'H.jpg'));
                }
            })
        },
        //点击分类实现商品选择功能
        chooseGood: function () {
            $('aside .choose').on('click', function (ev) {
                if (ev.target.nodeName === "IMG" || ev.target.nodeName === "SPAN") {
                    $('aside .choose div').removeClass('active');
                    $(ev.target).parent().addClass('active')
                } else if ($(ev.target).is('.color_content')) {
                    $('aside .choose div').removeClass('active');
                    $(ev.target).addClass('active');
                }
            })
        },
        //点击尺码实现尺码选择
        chooseSize: function () {
            $('.size').on('click', function (ev) {
                if (ev.target.nodeName === "SPAN") {

                    $('.size span').removeClass('active');
                    $(ev.target).addClass('active');
                }
            })
        },
        //改变商品的数量
        changeNum: function () {
            $('.num .up').on('click', function () {
                $('.num input').val(+$('.num input').val() + 1);
            })
            $('.num .down').on('click', function () {
                if ($('.num input').val() == 1) {
                    $('.num input').val(1);
                } else {
                    $('.num input').val(+$('.num input').val() - 1);
                }
            })
        },
        //商品列表的滑动
        slideGood: function () {
            let index = 0;
            $('.slon').on('click', function () {
                let width = $('.list ul li').innerHeight();
                index = index == 0 ? 0 : --index;
                $('.list ul').get(0).style.left = (-index * width + 'px');
                console.log(index)
            });
            $('.sron').on('click', function () {
                let width = $('.list ul li').innerHeight();
                index = $('.list ul li').length > 6 ? index == $('.list ul li').length - 7 ? $('.list ul li').length - 7 : ++index : 0;
                $('.list ul').get(0).style.left = (-index * width + 'px');
            })
        },
        //添加到购物车(cookie)
        addCart: function () {
            $('.addCart').on('click', function () {
                if ($.cookie('sid')) {
                    let sid = $.cookie('sid').split(',');
                    let color = $.cookie('color').split(',');
                    let size = $.cookie('size').split(',');
                    let num = $.cookie('num').split(',');
                    let color_flag = false;
                    let size_flag = false;
                    let all_flag = false;
                    let flag = null;
                    function pushCookie() {
                        $.cookie('sid', sid, { expires: 7, path: '/' });
                        $.cookie('color', color, { expires: 7, path: '/' });
                        $.cookie('size', size, { expires: 7, path: '/' });
                        $.cookie('num', num, { expires: 7, path: '/' });
                        alert('添加成功');
                    }
                    function dealArr() {
                        sid.push(location.search.replace('?sid=', ''));
                        color.push($('.color .active span').html());
                        size.push($('.size .active').html());
                        num.push($('.num input').val());
                    }
                    $.each(sid,function(index,value){
                        if(value==location.search.replace('?sid=', '')){
                            if(color[index]==$('.color .active span').html()){
                                color_flag = true;
                            }
                            if(size[index]==$('.size .active').html()){
                                size_flag = true;
                            }
                            if(color[index]==$('.color .active span').html()&&size[index]==$('.size .active').html()){
                                all_flag = true;
                                color_flag = false;
                                size_flag = false;
                                flag = index;
                                return false;
                            }
                        }
                    })
                    if (sid.indexOf(location.search.replace('?sid=', ''))!=-1) {
                        if (color_flag) {//颜色不同
                            dealArr();
                            pushCookie();
                        } else if (size_flag) {//尺码不同
                            dealArr();
                            pushCookie();
                        } else if(all_flag){//都不同
                            num[flag] = Number(num[flag]) + Number($('.num input').val());
                            $.cookie('num', num, { expires: 7, path: '/' });
                            alert('添加成功');
                        }else{//都相同
                            dealArr();
                            pushCookie();
                        }
                    } else {
                        dealArr();
                        pushCookie();
                    }
                } else {//第一次添加商品
                    $.cookie('sid', location.search.replace('?sid=', ''), { expires: 7, path: '/' });
                    $.cookie('color', $('.color .active span').html(), { expires: 7, path: '/' });
                    $.cookie('size', $('.size .active').html(), { expires: 7, path: '/' });
                    $.cookie('num', $('.num input').val(), { expires: 7, path: '/' });
                    alert('添加成功');
                }
            })
        }
    }
})