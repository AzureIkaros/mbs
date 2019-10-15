require(['config'],function() {
    require(['jquery'],function($){
        require(['render','cart_effect','jqcookie'],function(render,effect){
            $('#list').load("http://10.31.155.75/mbs/src/session.html");
            $('#footer').load("http://10.31.155.75/mbs/src/index_footer.html");
            render.cart_render(effect.setNum,effect.isCheck,effect.setCheck);
            effect.clickEvent();
            effect.checkAll()
        })
    })
})