"use strict";var _createClass=function(){function a(s,e){for(var o=0;o<e.length;o++){var a=e[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(s,a.key,a)}}return function(s,e,o){return e&&a(s.prototype,e),o&&a(s,o),s}}();function _classCallCheck(s,e){if(!(s instanceof e))throw new TypeError("Cannot call a class as a function")}var Register=function(){function s(){_classCallCheck(this,s),this.changecode=$(".changecode"),this.code=$(".code"),this.phone_email=$(".phone_email"),this.coded=$(".coded"),this.password=$(".password"),this.password_second=$(".password_second"),this.button=$(".button"),this.checkbox=$("#checkbox"),this.url="http://10.31.155.75/mbs/php/",this.flag=null,this.phone_flag=!1,this.code_flag=!1,this.password_flag=!1,this.password_second_flag=!1}return _createClass(s,[{key:"init",value:function(){this.code.html(this.getCode()),this.changeCode(),this.checkPhoneOrEmail(),this.checkCode(),this.checkPassword(),this.checkPasswordAgain(),this.submitData()}},{key:"getRandom",value:function(){var s=String.fromCharCode(Math.round(75*Math.random())+47);return/[0-9a-zA-Z]/.test(s)?s:this.getRandom()}},{key:"getCode",value:function(){for(var s="",e=0;e<4;e++)s+=this.getRandom();return s}},{key:"changeCode",value:function(){var s=this;this.changecode.on("click",function(){s.code.html(s.getCode())})}},{key:"checkPhoneOrEmail",value:function(){var o=this;this.phone_email.on("blur",function(){var s=$(this).val(),e=/^1[3,4,5,7,8]\d{9}$/;""!=s?e.test(s)||/^[\w | \W]{2,}\@[\w | \W]{2,}\.[0-9a-zA-Z]{2,}$/.test(s)?($(".phone_email_info").html(""),o.flag=e.test(s)?"phone":"email",o.phone_flag=!0,$.ajax({type:"post",url:o.url+"check.php",data:o.flag+"="+o.phone_email.val(),async:!0}).done(function(s){s?($(".phone_email_info").html("手机号或邮箱存在"),o.phone_flag=!1):($(".phone_email_info").html(""),o.phone_flag=!0)})):($(".phone_email_info").html("手机号或邮箱错误"),o.phone_flag=!1):($(".phone_email_info").html("请输入手机号或邮箱"),o.phone_flag=!1)})}},{key:"checkCode",value:function(){var e=this;this.coded.on("blur",function(){var s=$(this).val();""!=s?s.toUpperCase()===e.code.html().toUpperCase()?($(".code_info").html(""),e.code_flag=!0):($(".code_info").html("验证码输入错误"),e.code_flag=!1):($(".code_info").html("请输入验证码"),e.code_flag=!1)})}},{key:"checkPassword",value:function(){var e=this;this.password.on("blur",function(){var s=$(this).val();""!=s?0==e.passwordLen(s)?($(".password_info").html("请输入长度为8-20密码"),e.password_flag=!1):1==e.passwordLen(s)&&1==e.passwordStrong(s)?($(".password_info").html("密码强度不够"),e.password_flag=!1):e.passwordLen(s)<2&&e.passwordStrong(s)<3?($(".password_info").html('<i class="active">弱</i><i>中</i><i>强</i>'),e.password_flag=!0):e.passwordLen(s)<=3&&e.passwordStrong(s)<3?($(".password_info").html('<i class="active">弱</i><i class="active">中</i><i>强</i>'),e.password_flag=!0):3===e.passwordLen(s)&&3<=e.passwordStrong(s)&&($(".password_info").html('<i class="active">弱</i><i class="active">中</i><i class="active">强</i>'),e.password_flag=!0):($(".password_info").html("请输入密码"),e.password_flag=!1),e.password_flag=!!e.check(),e.check()?$(".password_second_info").html(""):$(".password_second_info").html("两次密码输入不一致")})}},{key:"checkPasswordAgain",value:function(){var s=this;this.password_second.on("blur",function(){s.check()})}},{key:"check",value:function(){return this.password.val()===this.password_second.val()?($(".password_second_info").html(""),this.password_second_flag=!0,this.password_flag=!0):($(".password_second_info").html("两次密码输入不一致"),this.password_second_flag=!1),this.password_second_flag}},{key:"submitData",value:function(){var s=this;this.button.on("click",function(){return s.checkbox.is(":checked")?s.phone_flag&&s.code_flag&&s.password_flag&&s.password_second_flag?void $.ajax({type:"post",url:s.url+"register.php",data:s.flag+"="+s.phone_email.val()+"&password="+s.password.val(),async:!0}).done(function(s){s&&(alert("注册成功,1秒后跳转到登录界面"),setTimeout(function(){location.href="http://10.31.155.75/mbs/src/login.html"},1e3))}):(alert("信息输入错误,请修改后再提交"),!1):(alert("请注意注册条款"),!1)})}},{key:"passwordLen",value:function(s){return 7<s.length?12<s.length?16<s.length?3:2:1:0}},{key:"passwordStrong",value:function(s){var e=0;return e=/\d/g.test(s)?++e:e,e=/[a-z]/g.test(s)?++e:e,e=/[A-Z]/g.test(s)?++e:e,e=/[\W | \_]/g.test(s)?++e:e}}]),s}();