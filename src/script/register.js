require(['config'],function(){
    require(['jquery','register_effect'],function($,effect){
        $('#footer').load("http://10.31.155.75/mbs/src/login_footer.html");
        $.cookie('url', location.href, { expires: 7, path: '/' });
        effect.code.html(effect.getCode());
        effect.changeCode();
        effect.checkPhoneOrEmail();
        effect.checkCode();
        effect.checkPassword();
        effect.checkPasswordAgain();
        effect.submitData();
    })
})