define(['jquery'], function () {
    return {
        index_render: function () {
            let self = this;
            $.ajax({
                url: 'http://10.31.155.75/mbs/php/data.php',
                dataType: 'json'
            }).done(function (data) {
                self.chooseRender(data, "文艺女装", $('#main .literature'), 0);
                self.chooseRender(data, "优雅女装", $('#main .grace'), 1);
                self.chooseRender(data, "活泼女装", $('#main .lively'), 2);
                self.chooseRender(data, "简约女装", $('#main .simplicity'), 3);
                self.chooseRender(data, "度假女装", $('#main .vacation'), 4);
                self.chooseRender(data, "舒适内衣", $('#main .underwear'), 5);
                self.chooseRender(data, "品质男装", $('#main .mens'), 6);
                self.chooseRender(data, "箱包品类", $('#main .package'), 7);
                $(function () { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //效果方式
                    });
                });
            })
        },
        //首页选择分类渲染
        chooseRender: function (data, type, obj, index) {
            let str = '<ul>';
            let arr = ["文艺女装","优雅女装","活泼女装","简约女装","度假女装","舒适内衣","品质男装","箱包品类"];
            $.each(arr,function(index1,value){
                if(index==index1){
                    str += `<li><a href="javascript:void(0);" class='active'>${value}</a></li>`;
                }else{
                    str += `<li><a href="javascript:void(0);">${value}</a></li>`;
                }
            })
            str += '</ul>';
            for (let i of data) {
                if (i.type === type) {
                    str += `
                    <div class="good">
                    <a href="http://10.31.155.75/mbs/dist/details.html?sid=${i.sid}" target='_blank'>
                        <img class="lazy"
                            data-original="${i.small_url}"
                            width="225" height="304">
                    </a>
                    <div>
                        <a href="">￥${i.new_price}</a>
                        <a href="">￥${i.old_price}</a>
                    </div>
                </div>`
                }
            }
            obj.html(str);
        },
        details_render: function () {
            let self = this;
            let sid = location.search.replace('?', '');
            $.ajax({
                url: `http://10.31.155.75/mbs/php/check_good.php?${sid}`,
                dataType: 'json'
            }).done(function (data) {
                $('#store').html(data.store);
                $('#small_pic').attr({ src: data.small_url });
                $('#big_pic').attr({ src: data.small_url.replace('large', 'huge').replace('L.jpg', 'H.jpg') });
                $('#detail main article .list ul').html((function (data) {
                    let str = '';
                    let urls = data.urls.split(',');
                    $.each(urls, function (index, value) {
                        if (index === 0) {
                            str += `
                            <li><img src="${value}S.jpg" alt="" class='active'></li>
                            `;
                        } else {
                            str += `
                        <li><img src="${value}S.jpg" alt=""></li>
                        `;
                        }
                    })
                    return str;
                })(data));
                $('#detail h2').html(data.title);
                $('#detail .new_price').html('￥' + data.new_price);
                $('#detail .old_price').html('￥' + data.old_price);
                $('#detail .choose').html((function (data) {
                    let str = '';
                    let color = data.color.split(',');
                    let goods = data.urls_good.split(',');
                    $.each(color, function (index, value) {
                        if (index === 0) {
                            str += `
                            <div class="color_content active">
                                <img src="${goods[index]}" alt="">
                                <span>${value}</span>
                            </div>
                        `;
                        } else {
                            str += `
                        <div class="color_content">
                            <img src="${goods[index]}" alt="">
                        <span>${value}</span>
                        </div>
                        `;
                        }
                    })
                    return str;
                })(data));
                $('#detail .size div').html((function (data) {
                    let str = '';
                    let size = data.size.split(',');
                    $.each(size, function (index, value) {
                        if (index === 0) {
                            str += `
                            <span class='active'>${value}</span>
                        `;
                        } else {
                            str += `
                            <span>${value}</span>
                        `;
                        }
                    })
                    return str;
                })(data))
            })
        },
        //购物车页面的渲染
        cart_render: function (setNum,isCheck,setCheck) {
            if ($.cookie('sid')) {
                let onlysid = Array.from(new Set($.cookie('sid').split(','))).map(function(value){return +value}).sort(function(a,b){return a - b});
                let sid = $.cookie('sid').split(',');
                let color = $.cookie('color').split(',');
                let size = $.cookie('size').split(',');
                let num = $.cookie('num').split(',');
                $.ajax({
                    //获取当前选中的商品
                    url: `http://10.31.155.75/mbs/php/cart.php?sid=${onlysid}`,//
                    type: 'get',
                    dataType: 'json'
                }).done(function (data) {
                    let total = 0;//总价
                    $.each(onlysid, function (index1, value1) {
                        let str = `
                        <aside>
                        <div class="title">
                            <p>以下商品由 <span>${data[index1].store}</span> 发货 免配送费</p>
                        </div>
                        `;
                        $.each(sid,function(index2,value2){
                            if(value1 == value2){
                                total += data[index1].new_price*num[index1];
                                str += `
                                <div class="shop_content">
                                    <input type="checkbox" class="choose">
                                    <div class="good_info">
                                        <img src="${data[index1].small_url}" alt="">
                                        <p>${data[index1].title}</p>
                                        <div>
                                            <p>品牌:${data[index1].store}</p>
                                            <p class='cSize'>尺寸:${size[index2]}</p>
                                            <p class='cColor'>颜色:${color[index2]}</p>
                                        </div>
                                    </div>
                                    <p class="single_price">￥${data[index1].new_price}</p>
                                    <div class="number">
                                        <button class="del">-</button>
                                        <input type="text" class="good_num" value="${num[index2]}">
                                        <button class="add">+</button>
                                    </div>
                                    <p class="total_price">￥${data[index1].new_price*num[index2]}</p>
                                    <div class="opecation">
                                        <button class="remove">移除</button>
                                    </div>
                                </div>
                            `;
                            }
                        })
                        str += '</aside>'
                        $(".good_content").html($(".good_content").html()+str);
                        let sum = 0;
                        // console.log(num)
                        $.each(num,function(index,value){sum+=(+value)});
                        $('.deal').html(`
                        <div>
                            <p>商品数量总计: <span class="sum"></span>
                            <span>件 折后商品金额总计</span>
                            <span id="total_price">￥</span>
                            </p>
                        </div>
                        <div>
                            <button>去结算</button>
                        </div>
                        `);
                    })
                    isCheck();
                    setCheck();
                    setNum();
                })
            }
        }
    }
});