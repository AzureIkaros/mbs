"use strict";define(["jquery","jqcookie"],function(n){return{init:function(){n("#footer").load("login_footer.html"),n(".button").on("click",function(){var t=n(".username"),e=n(".password"),o=/^1[3,4,5,7,8]\d{9}$/,a=!(!o.test(t.val())&&!/^[\w | \W]{2,}\@[\w | \W]{2,}\.[0-9a-zA-Z]{2,}$/.test(t.val())),i=o.test(t.val())?"phone":"email";a?n.ajax({url:"../php/login.php",type:"post",data:i+"="+t.val()+"&password="+e.val()}).done(function(e){/^[0-9a-z]{40}$/g.test(e)?(alert("登录成功,1秒后返回前一页"),n.cookie("username",t.val(),{expires:7,path:"/"}),n.cookie("password",e,{expires:7,path:"/"}),n.cookie("flag",1,{expires:7,path:"/"}),setTimeout(function(){location.href=/detils|cart/.test(n.cookie("url"))?n.cookie("url"):"index.html"},1e3)):alert("账号或密码错误")}):alert("手机号或邮箱格式错误")})}}});