"use strict";define(["jquery","jqcookie"],function(c){return{small_pic:c("#small_pic"),small_box:c("#small_box"),smallf:document.querySelector("#smallf"),bigf:c(".bigf"),big_pic:c("#big_pic"),list:c("article .list"),fdj:function(){var l=this,i=this.small_pic.width()*this.bigf.width()/this.big_pic.width(),e=this.small_pic.height()*this.bigf.height()/this.big_pic.height();this.smallf.style.width=i+"px",this.smallf.style.height=e+"px";var s=this.big_pic.width()/this.small_pic.width();this.small_box.hover(function(){l.bigf.show(),c(l.smallf).show(),c(document).on("mousemove",function(i){var e=i.pageX-c(l.smallf).width()/2-c(l.small_pic).offset().left,t=i.pageY-c(l.smallf).height()/2-c(l.small_pic).offset().top;e<=0?e=0:e>=l.small_pic.width()-l.smallf.offsetWidth&&(e=l.small_pic.width()-l.smallf.offsetWidth),t<=0?t=0:t>=l.small_pic.height()-l.smallf.offsetHeight&&(t=l.small_pic.height()-l.smallf.offsetHeight),l.smallf.style.left=e+"px",l.smallf.style.top=t+"px",l.big_pic.get(0).style.left=-e*s+"px",l.big_pic.get(0).style.top=-t*s+"px"}),c(document).off("mouseover",function(){l.small_box.off(),c(document).off()})},function(){l.bigf.hide(),c(l.smallf).hide()})},clickChange:function(){var e=this;this.list.on("mouseover",function(i){"IMG"===i.target.nodeName&&(e.small_pic.attr("src",i.target.src.replace("small","large").replace("S.jpg","L.jpg")),c(".list img").removeClass("active"),c(i.target).addClass("active"))})},chooseGood:function(){c("aside .choose").on("click",function(i){"IMG"===i.target.nodeName||"SPAN"===i.target.nodeName?(c("aside .choose div").removeClass("active"),c(i.target).parent().addClass("active")):c(i.target).is(".color_content")&&(c("aside .choose div").removeClass("active"),c(i.target).addClass("active"))})},chooseSize:function(){c(".size").on("click",function(i){"SPAN"===i.target.nodeName&&(c(".size span").removeClass("active"),c(i.target).addClass("active"))})},changeNum:function(){c(".num .up").on("click",function(){c(".num input").val(+c(".num input").val()+1)}),c(".num .down").on("click",function(){1==c(".num input").val()?c(".num input").val(1):c(".num input").val(+c(".num input").val()-1)})},slideGood:function(){var e=0;c(".slon").on("click",function(){var i=c(".list ul li").innerHeight();e=0==e?0:--e,c(".list ul").get(0).style.left=-e*i+"px",console.log(e)}),c(".sron").on("click",function(){var i=c(".list ul li").innerHeight();e=6<c(".list ul li").length?e==c(".list ul li").length-7?c(".list ul li").length-7:++e:0,c(".list ul").get(0).style.left=-e*i+"px"})},addCart:function(){c(".addCart").on("click",function(){if(c.cookie("sid")){var t=c.cookie("sid").split(","),l=c.cookie("color").split(","),s=c.cookie("size").split(","),o=c.cookie("num").split(","),a=c.cookie("store").split(",");c.each(t,function(i,e){console.log(e,t),location.search.replace("?sid=","")==e?l[i]!=c(".color .active span").html()&&s[i]==c(".size .active").html()||(s[i]!=c(".size .active").html()&&l[i]==c(".color .active span").html()?alert("尺寸不同"):s[i]!=c(".size .active").html()&&l[i]!=c(".color .active span").html()?alert("全都不同"):(o[i]=Number(o[i])+Number(c(".num input").val()),c.cookie("num",o,{expires:7,path:"/"}))):(alert("id不同"),t.push(location.search.replace("?sid=","")),l.push(c(".color .active span").html()),s.push(c(".size .active").html()),o.push(c(".num input").val()),a.push(c("#search #store").html()),console.log(t,l,s,o,a),c.cookie("sid",t,{expires:7,path:"/"}),c.cookie("color",l,{expires:7,path:"/"}),c.cookie("size",s,{expires:7,path:"/"}),c.cookie("num",o,{expires:7,path:"/"}),c.cookie("stror",a,{expires:7,path:"/"}))})}else c.cookie("sid",location.search.replace("?sid=",""),{expires:7,path:"/"}),c.cookie("color",c(".color .active span").html(),{expires:7,path:"/"}),c.cookie("size",c(".size .active").html(),{expires:7,path:"/"}),c.cookie("num",c(".num input").val(),{expires:7,path:"/"}),c.cookie("store",c("#search #store").html(),{expires:7,path:"/"})})}}});