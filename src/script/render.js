define(['jquery'], function () {
    return {
        index_render: function () {
            let self = this;
            $.ajax({
                url: 'http://10.31.155.75/mbs/php/data.php',
                dataType: 'json'
            }).done(function (data) {
                self.chooseRender(data, "文艺女装", $('#main .literature'),0);
                self.chooseRender(data, "优雅女装", $('#main .grace'),1);
                self.chooseRender(data, "活泼女装", $('#main .lively'),2);
                self.chooseRender(data, "简约女装", $('#main .simplicity'),3);
                self.chooseRender(data, "度假女装", $('#main .vacation'),4);
                self.chooseRender(data, "舒适内衣", $('#main .underwear'),5);
                self.chooseRender(data, "品质男装", $('#main .mens'),6);
                self.chooseRender(data, "箱包品类", $('#main .package'),7);
                $(function () { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //效果方式
                    });
                });
            })
        },
        //首页选择分类渲染
        chooseRender: function (data, type, obj,index) {
            let str = obj.html();
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
    }
});