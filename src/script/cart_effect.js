define(['jquery','jqcookie'], function ($) {
    return {
        clickEvent:function(){
            let self = this;
            $('.good_content').on('click',function(ev){
                //点击增加键改变数量
                if($(ev.target).is('.add')){
                    let index = $(ev.target).index('.add');
                    $('.good_num').eq(index).val((+$('.good_num').eq($(ev.target).index('.add')).val())+1);
                    $('.total_price').eq(index).html('￥'+($('.single_price').eq(index).html().replace('￥',''))*($('.good_num').eq(index).val())) 
                    $('.choose').eq(index).prop('checked',true);
                    self.setCheck();
                    self.setNum();
                    self.changeNum($('.good_num').eq(index).val(),index);
                }
                //点击减少键改变数量
                if($(ev.target).is('.del')){
                    let index = $(ev.target).index('.del')
                    let num = (+$('.good_num').eq($(ev.target).index('.del')).val())-1;
                    num = num <= 0 ? 0 : num--; 
                    $('.good_num').eq(index).val(num);   
                    if(num!=0){
                        $('.total_price').eq(index).html('￥'+($('.single_price').eq(index).html().replace('￥',''))*num);
                    } else{
                        $('.total_price').eq(index).html(0);
                        $('.choose').eq(index).prop('checked',false);
                        self.setCheck()
                    }
                    self.setNum();
                    self.changeNum($('.good_num').eq(index).val(),index);
                }
                //点击商品勾选取消全选
                if($(ev.target).is('.choose')){
                    if(!$(ev.target).prop('checked')){
                        $('#allcheck').prop('checked',false)
                    }
                    self.setCheck()
                }
                //删除按钮的实现
                if($(ev.target).is('.remove')){
                    let index = $(ev.target).index('.remove');//点击元素的index
                    let arrcolor = $.cookie('color').split(',');
                    let arrsize = $.cookie('size').split(',');
                    let arrsid = $.cookie('sid').split(',');
                    let arrnum = $.cookie('num').split(',');
                    index = self.findIndex(index);//位于cookie中的cookie
                    arrcolor.splice(index,1);
                    arrsize.splice(index,1);
                    arrsid.splice(index,1);
                    arrnum.splice(index,1);
                    $.cookie('num', arrnum, { expires: 7, path: '/' })
                    $.cookie('sid', arrsid, { expires: 7, path: '/' })
                    $.cookie('color', arrcolor, { expires: 7, path: '/' })
                    $.cookie('size', arrsize, { expires: 7, path: '/' })
                    $('.shop_content').eq($(ev.target).index('.remove')).remove();
                    $.each($('.good_content aside'),function(index,value){
                        if($(value).children('.shop_content').length==0){
                            $(value).remove(); 
                        }
                    })
                    self.setNum();
                    self.setCheck();
                }
            });
            //改变输入框修改数量
            $('.good_content').on('input',function(ev){
                let self = this;
                if($(ev.target).is('.good_num')){
                    let index = $(ev.target).index('.good_num');
                    let num = $(ev.target).val(); 
                    if(num!=0){
                        $('.total_price').eq(index).html('￥'+($('.single_price').eq(index).html().replace('￥',''))*num) 
                        self.setNum()
                    } else{
                        $('.total_price').eq(index).html(0);
                        self.setNum();
                        self.setCheck();
                    }
                }
            })
        },
        //全选效果
        checkAll:function(){
            let self = this;
            $('#allcheck').on('click',function(){
                if($(this).prop('checked')){
                    $('.choose').prop('checked',true);
                    self.setNum();
                }else{
                    $('.choose').prop('checked',false);
                    self.setNum();
                }
            })
        },
        //检测是否全选
        setCheck:function(){
            let flag = false;
            $.each($('.choose'),function(index,value){
                if(!$(value).prop('checked')){
                    flag=true;
                    return false;
                }
            });
            // flag = $('.good_content').html() ? true : false;
            flag ? $('#allcheck').prop('checked',false) : $('#allcheck').prop('checked',true);
        },
        //设置总共商品数量
        setNum:function(){
            let totalprice = 0;
            let sum = 0;
            $.each($('.choose:checked'),function(index,value){
                let realindex = $('.choose').index(value);
                sum += (+$('.good_num').eq(realindex).val());
                totalprice +=  (+($('.total_price').eq(realindex).html().replace('￥','')));
            })
            sum != 0 ? $('.sum').html('￥'+sum) : $('.sum').html(0);
            totalprice != 0 ? $('#total_price').html('￥'+totalprice) : $('#total_price').html(0);
        },
        //修改cookie中的数量
        changeNum:function(num,index){
            let arrnum = $.cookie('num').split(',');
            arrnum[this.findIndex(index)] = num;
            $.cookie('num', arrnum, { expires: 7, path: '/' })
        },
        //渲染时判定根据数量(0)判定是否勾选,传入到render.js中的cart渲染函数
        isCheck:function(){
            $.each($('.good_num'),function(index,value){
                if($(this).val() != 0){
                    $('.choose').eq(index).prop('checked',true);
                }
            })
        },
        //查找删除时和修改数量时的操作元素索引
        findIndex:function(index){
            let arrcolor = $.cookie('color').split(',');
            let arrsize = $.cookie('size').split(',');
            let color = $('.cColor').eq(index).html().replace('颜色:','');
            let size = $('.cSize').eq(index).html().replace('尺寸:','');
            let flag = 0;
            $.each(arrcolor,function(index,value){
                if(color == value && arrsize[index]==size){
                    flag = index;
                    return false;
                }
            })
            return flag;
        }
    }
})