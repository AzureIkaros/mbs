define(['./index_effect.js','./render.js','jquery', 'jqcookie'], function (index,render,$) {
    return {
        init:function(){
            $('#list').load("session.html");
            $('#footer').load("index_footer.html");
            $.cookie('url', location.href, { expires: 7, path: '/' });
            render.cart_render(this.setNum,this.isCheck,this.setCheck);
            this.clickEvent();
            this.checkAll();
            this.settleMent();
            index.changeHead();
            index.logout();
        },
        clickEvent: function () {
            let self = this;
            $('.good_content').on('click', function (ev) {
                //点击增加键改变数量
                if ($(ev.target).is('.add')) {
                    let index = $(ev.target).index('.add');
                    $('.good_num').eq(index).val((+$('.good_num').eq($(ev.target).index('.add')).val()) + 1);
                    $('.total_price').eq(index).html('￥' + ($('.single_price').eq(index).html().replace('￥', '')) * ($('.good_num').eq(index).val()))
                    $('.choose').eq(index).prop('checked', true);
                    self.setCheck();
                    self.setNum();
                    self.changeNum($('.good_num').eq(index).val(), index);
                }
                //点击减少键改变数量
                if ($(ev.target).is('.del')) {
                    let index = $(ev.target).index('.del')
                    let num = (+$('.good_num').eq($(ev.target).index('.del')).val()) - 1;
                    num = num <= 0 ? 0 : num--;
                    $('.good_num').eq(index).val(num);
                    if (num != 0) {
                        $('.total_price').eq(index).html('￥' + ($('.single_price').eq(index).html().replace('￥', '')) * num);
                    } else {
                        $('.total_price').eq(index).html(0);
                        $('.choose').eq(index).prop('checked', false);
                        self.setCheck()
                    }
                    self.setNum();
                    self.changeNum($('.good_num').eq(index).val(), index);
                }
                //点击商品勾选取消全选
                if ($(ev.target).is('.choose')) {
                    if (!$(ev.target).prop('checked')) {
                        $('#allcheck').prop('checked', false)
                    }
                    self.setCheck();
                    self.setNum();
                }
                //删除按钮的实现
                if ($(ev.target).is('.remove')) {
                    if (confirm('你确定要删除吗')) {
                        let index = $(ev.target).index('.remove');//点击元素的index
                        let arrcolor = $.cookie('color').split(',');
                        let arrsize = $.cookie('size').split(',');
                        let arrsid = $.cookie('sid').split(',');
                        let arrnum = $.cookie('num').split(',');
                        index = self.findIndex(index);//位于cookie中的cookie
                        arrcolor.splice(index, 1);
                        arrsize.splice(index, 1);
                        arrsid.splice(index, 1);
                        arrnum.splice(index, 1);
                        $.cookie('num', arrnum, { expires: 7, path: '/' })
                        $.cookie('sid', arrsid, { expires: 7, path: '/' })
                        $.cookie('color', arrcolor, { expires: 7, path: '/' })
                        $.cookie('size', arrsize, { expires: 7, path: '/' })
                        $('.shop_content').eq($(ev.target).index('.remove')).remove();
                        $.each($('.good_content aside'), function (index, value) {
                            if ($(value).children('.shop_content').length == 0) {
                                $(value).remove();
                            }
                        })
                        self.setNum();
                        self.setCheck();
                        self.emptyCart();
                    }
                }
            });
            //改变输入框修改数量
            $('.good_content').on('input', function (ev) {
                let self = this;
                if ($(ev.target).is('.good_num')) {
                    let index = $(ev.target).index('.good_num');
                    let num = $(ev.target).val();
                    if (num != 0) {
                        $('.total_price').eq(index).html('￥' + ($('.single_price').eq(index).html().replace('￥', '')) * num)
                        self.setNum()
                    } else {
                        $('.total_price').eq(index).html(0);
                        self.setNum();
                    }
                }
            })
        },
        //全选效果
        checkAll: function () {
            let self = this;
            $('#allcheck').on('click', function () {
                if ($(this).prop('checked')) {
                    $('.choose').prop('checked', true);
                    self.setNum();
                } else {
                    $('.choose').prop('checked', false);
                    self.setNum();
                }
            })
        },
        //检测是否全选
        setCheck: function () {
            let flag = true;
            //没有内容时取消全选
            flag = $('.good_content').children('aside').length != 0 ? true : false;
            //检测每个商品是否被勾选
            $.each($('.choose'), function (index, value) {
                if (!$(value).prop('checked')) {
                    flag = false;
                    return false;
                }
            });
            flag ? $('#allcheck').prop('checked', true) : $('#allcheck').prop('checked', false);
        },
        //设置总共商品数量
        setNum: function () {
            let totalprice = 0;
            let sum = 0;
            $.each($('.choose:checked'), function (index, value) {
                let realindex = $('.choose').index(value);
                sum += (+$('.good_num').eq(realindex).val());
                totalprice += (+($('.total_price').eq(realindex).html().replace('￥', '')));
            })
            sum != 0 ? $('.sum').html('￥' + sum) : $('.sum').html(0);
            totalprice != 0 ? $('#total_price').html('￥' + totalprice) : $('#total_price').html(0);
        },
        //修改cookie中的数量
        changeNum: function (num, index) {
            let arrnum = $.cookie('num').split(',');
            arrnum[this.findIndex(index)] = num;
            $.cookie('num', arrnum, { expires: 7, path: '/' })
        },
        //渲染时判定根据数量(0)判定是否勾选,传入到render.js中的cart渲染函数
        isCheck: function () {
            $.each($('.good_num'), function (index, value) {
                if ($(this).val() != 0) {
                    $('.choose').eq(index).prop('checked', true);
                }
            })
        },
        //查找删除时和修改数量时的操作元素索引
        findIndex: function (index) {
            let arrcolor = $.cookie('color').split(',');
            let arrsize = $.cookie('size').split(',');
            let color = $('.cColor').eq(index).html().replace('颜色:', '');
            let size = $('.cSize').eq(index).html().replace('尺寸:', '');
            let flag = 0;
            $.each(arrcolor, function (index, value) {
                if (color == value && arrsize[index] == size) {
                    flag = index;
                    return false;
                }
            })
            return flag;
        },
        //结算功能
        settleMent: function () {
            let self = this;
            $('.deal').on('click', function (ev) {
                if ($(ev.target).is('.settle')) {
                    if (+$.cookie('flag')) {
                        if ($('.sum').html().replace('￥', '') != 0) {
                            let flag = confirm('您确认要购买选中的商品吗?') ? true : false;
                            if (flag) {
                                alert('购买成功');
                                $('.good_content aside').remove();
                                self.setNum();
                                self.setCheck();
                                self.emptyCart();
                                //清除cookie
                                $.cookie('num', '', { expires: -1, path: '/' });
                                $.cookie('color', '', { expires: -1, path: '/' });
                                $.cookie('size', '', { expires: -1, path: '/' });
                                $.cookie('sid', '', { expires: -1, path: '/' });
                            }
                        } else {
                            alert('您还没有选择商品哦!请您先选择商品')
                        }
                    } else {
                        confirm('您还没有登录,请先登录') ? location.href = 'login.html' : undefined;
                    }
                }
            })
        },
        //清空购物车效果
        emptyCart: function () {
            if ($('.good_content').children('aside').length == 0) {
                $('.deal').html(`
                    <p class='empty'>您的购物车空空如也,快去挑选一些商品吧</p>
                    <a href='http://10.31.155.75/mbs/dist/'>去首页</a>
                `);
            }
        }
    }
})