"use strict";define(["jquery"],function(){return{index_render:function(){var e=this;$.ajax({url:"http://10.31.155.75/mbs/php/data.php",dataType:"json"}).done(function(n){e.chooseRender(n,"文艺女装",$("#main .literature"),0),e.chooseRender(n,"优雅女装",$("#main .grace"),1),e.chooseRender(n,"活泼女装",$("#main .lively"),2),e.chooseRender(n,"简约女装",$("#main .simplicity"),3),e.chooseRender(n,"度假女装",$("#main .vacation"),4),e.chooseRender(n,"舒适内衣",$("#main .underwear"),5),e.chooseRender(n,"品质男装",$("#main .mens"),6),e.chooseRender(n,"箱包品类",$("#main .package"),7),$(function(){$("img.lazy").lazyload({effect:"fadeIn"})})})},chooseRender:function(n,e,t,a){var i="<ul>";$.each(["文艺女装","优雅女装","活泼女装","简约女装","度假女装","舒适内衣","品质男装","箱包品类"],function(n,e){i+=a==n?"<li><a href=\"javascript:void(0);\" class='active'>"+e+"</a></li>":'<li><a href="javascript:void(0);">'+e+"</a></li>"}),i+="</ul>";var s=!0,l=!1,c=void 0;try{for(var o,r=n[Symbol.iterator]();!(s=(o=r.next()).done);s=!0){var p=o.value;p.type===e&&(i+='\n                    <div class="good">\n                    <a href="http://10.31.155.75/mbs/dist/details.html?sid='+p.sid+'" target=\'_blank\'>\n                        <img class="lazy"\n                            data-original="'+p.small_url+'"\n                            width="225" height="304">\n                    </a>\n                    <div>\n                        <a href="">￥'+p.new_price+'</a>\n                        <a href="">￥'+p.old_price+"</a>\n                    </div>\n                </div>")}}catch(n){l=!0,c=n}finally{try{!s&&r.return&&r.return()}finally{if(l)throw c}}t.html(i)},details_render:function(){var n=location.search.replace("?","");$.ajax({url:"http://10.31.155.75/mbs/php/check_good.php?"+n,dataType:"json"}).done(function(n){var t,e,a,i,s,l,c,o;$("#store").html(n.store),$("#small_pic").attr({src:n.small_url}),$("title").html(n.title),$("#big_pic").attr({src:n.small_url.replace("large","huge").replace("L.jpg","H.jpg")}),$("#detail main article .list ul").html((t="",e=n.urls.split(","),$.each(e,function(n,e){t+=0===n?'\n                            <li><img src="'+e+'S.jpg" alt="" class=\'active\'></li>\n                            ':'\n                        <li><img src="'+e+'S.jpg" alt=""></li>\n                        '}),t)),$("#detail h2").html(n.title),$("#detail .new_price").html("￥"+n.new_price),$("#detail .old_price").html("￥"+n.old_price),$("#detail .choose").html((i="",s=(a=n).color.split(","),l=a.urls_good.split(","),$.each(s,function(n,e){i+=0===n?'\n                            <div class="color_content active">\n                                <img src="'+l[n]+'" alt="">\n                                <span>'+e+"</span>\n                            </div>\n                        ":'\n                        <div class="color_content">\n                            <img src="'+l[n]+'" alt="">\n                        <span>'+e+"</span>\n                        </div>\n                        "}),i)),$("#detail .size div").html((c="",o=n.size.split(","),$.each(o,function(n,e){c+=0===n?"\n                            <span class='active'>"+e+"</span>\n                        ":"\n                            <span>"+e+"</span>\n                        "}),c)),$(function(){$("img.lazy").lazyload({effect:"fadeIn"})})})},cart_render:function(n,e,t){if($.cookie("sid")){var a=Array.from(new Set($.cookie("sid").split(","))).map(function(n){return+n}).sort(function(n,e){return n-e}),l=$.cookie("sid").split(","),c=$.cookie("color").split(","),o=$.cookie("size").split(","),r=$.cookie("num").split(",");$.ajax({url:"http://10.31.155.75/mbs/php/cart.php?sid="+a,type:"get",dataType:"json"}).done(function(s){$.each(a,function(t,a){var i='\n                        <aside>\n                        <div class="title">\n                            <p>以下商品由 <span>'+s[t].store+"</span> 发货 免配送费</p>\n                        </div>\n                        ";$.each(l,function(n,e){a==e&&(s[t].new_price*r[t],i+='\n                                <div class="shop_content">\n                                    <input type="checkbox" class="choose">\n                                    <div class="good_info">\n                                        <img src="'+s[t].small_url+'" alt="">\n                                        <p>'+s[t].title+"</p>\n                                        <div>\n                                            <p>品牌:"+s[t].store+"</p>\n                                            <p class='cSize'>尺寸:"+o[n]+"</p>\n                                            <p class='cColor'>颜色:"+c[n]+'</p>\n                                        </div>\n                                    </div>\n                                    <p class="single_price">￥'+s[t].new_price+'</p>\n                                    <div class="number">\n                                        <button class="del">-</button>\n                                        <input type="text" class="good_num" value="'+r[n]+'">\n                                        <button class="add">+</button>\n                                    </div>\n                                    <p class="total_price">￥'+s[t].new_price*r[n]+'</p>\n                                    <div class="opecation">\n                                        <button class="remove">移除</button>\n                                    </div>\n                                </div>\n                            ')}),i+="</aside>",$(".good_content").html($(".good_content").html()+i);$.each(r,function(n,e){+e}),$(".deal").html('\n                        <div>\n                            <p>商品数量总计: <span class="sum"></span>\n                            <span>件 折后商品金额总计</span>\n                            <span id="total_price">￥</span>\n                            </p>\n                        </div>\n                        <div>\n                            <button class=\'settle\'>去结算</button>\n                        </div>\n                        ')}),e(),t(),n()})}else $(".deal").html("\n                    <p class='empty'>您的购物车空空如也,快去挑选一些商品吧</p>\n                    <a href='http://10.31.155.75/mbs/dist/'>去首页</a>\n                ")}}});