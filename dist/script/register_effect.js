"use strict";define("register_effect",["jquery","jqcookie"],function(){return{changecode:$(".changecode"),code:$(".code"),phone_email:$(".phone_email"),coded:$(".coded"),password:$(".password"),password_second:$(".password_second"),button:$(".button"),checkbox:$("#checkbox"),url:"http://10.31.155.75/mbs/php/",flag:null,phone_flag:!1,code_flag:!1,password_flag:!1,password_second_flag:!1,init:function(){$("#footer").load("login_footer.html"),$.cookie("url",location.href,{expires:7,path:"/"}),this.code.html(this.getCode()),this.changeCode(),this.checkPhoneOrEmail(),this.checkCode(),this.checkPassword(),this.checkPasswordAgain(),this.submitData()},getRandom:function(){var o=String.fromCharCode(Math.round(75*Math.random())+47);return/[0-9a-zA-Z]/.test(o)?o:this.getRandom()},getCode:function(){for(var o="",s=0;s<4;s++)o+=this.getRandom();return o},changeCode:function(){var o=this;this.changecode.on("click",function(){o.code.html(o.getCode())})},checkPhoneOrEmail:function(){var a=this;this.phone_email.on("blur",function(){var o=$(this).val(),s=/^1[3,4,5,7,8]\d{9}$/;""!=o?s.test(o)||/^[\w | \W]{2,}\@[\w | \W]{2,}\.[0-9a-zA-Z]{2,}$/.test(o)?($(".phone_email_info").html(""),a.flag=s.test(o)?"phone":"email",a.phone_flag=!0,$.ajax({type:"post",url:a.url+"check.php",data:a.flag+"="+a.phone_email.val(),async:!0}).done(function(o){o?($(".phone_email_info").html("手机号或邮箱存在"),a.phone_flag=!1):($(".phone_email_info").html(""),a.phone_flag=!0)})):($(".phone_email_info").html("手机号或邮箱错误"),a.phone_flag=!1):($(".phone_email_info").html("请输入手机号或邮箱"),a.phone_flag=!1)})},checkCode:function(){var s=this;this.coded.on("blur",function(){var o=$(this).val();""!=o?o.toUpperCase()===s.code.html().toUpperCase()?($(".code_info").html(""),s.code_flag=!0):($(".code_info").html("验证码输入错误"),s.code_flag=!1):($(".code_info").html("请输入验证码"),s.code_flag=!1)})},checkPassword:function(){var s=this;this.password.on("blur",function(){var o=$(this).val();""!=o?0==s.passwordLen(o)?($(".password_info").html("请输入长度为8-20密码"),s.password_flag=!1):1==s.passwordLen(o)&&1==s.passwordStrong(o)?($(".password_info").html("密码强度不够"),s.password_flag=!1):s.passwordLen(o)<2&&s.passwordStrong(o)<3?($(".password_info").html('<i class="active">弱</i><i>中</i><i>强</i>'),s.password_flag=!0):s.passwordLen(o)<=3&&s.passwordStrong(o)<3?($(".password_info").html('<i class="active">弱</i><i class="active">中</i><i>强</i>'),s.password_flag=!0):3===s.passwordLen(o)&&3<=s.passwordStrong(o)&&($(".password_info").html('<i class="active">弱</i><i class="active">中</i><i class="active">强</i>'),s.password_flag=!0):($(".password_info").html("请输入密码"),s.password_flag=!1),s.password_flag=!!s.check(),s.check()?$(".password_second_info").html(""):$(".password_second_info").html("两次密码输入不一致")})},checkPasswordAgain:function(){var o=this;this.password_second.on("blur",function(){o.check()})},check:function(){return this.password.val()===this.password_second.val()?($(".password_second_info").html(""),this.password_second_flag=!0,this.password_flag=!0):($(".password_second_info").html("两次密码输入不一致"),this.password_second_flag=!1),this.password_second_flag},submitData:function(){var o=this;this.button.on("click",function(){return o.checkbox.is(":checked")?o.phone_flag&&o.code_flag&&o.password_flag&&o.password_second_flag?void $.ajax({type:"post",url:o.url+"register.php",data:o.flag+"="+o.phone_email.val()+"&password="+o.password.val(),async:!0}).done(function(o){o&&(alert("注册成功,1秒后跳转到登录界面"),setTimeout(function(){location.href="login.html"},1e3))}):(alert("信息输入错误,请修改后再提交"),!1):(alert("请注意注册条款"),!1)})},passwordLen:function(o){return 7<o.length?12<o.length?16<o.length?3:2:1:0},passwordStrong:function(o){var s=0;return s=/\d/g.test(o)?++s:s,s=/[a-z]/g.test(o)?++s:s,s=/[A-Z]/g.test(o)?++s:s,s=/[\W | \_]/g.test(o)?++s:s}}});