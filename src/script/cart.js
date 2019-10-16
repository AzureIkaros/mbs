require(['config'],function() {
    require(['jquery'],function($){
        require(['render','cart_effect','index_effect','jqcookie','lazyload'],function(render,effect,index){
            $('#list').load("session.html");
            $('#footer').load("index_footer.html");
            $.cookie('url', location.href, { expires: 7, path: '/' });
            render.cart_render(effect.setNum,effect.isCheck,effect.setCheck);
            effect.clickEvent();
            effect.checkAll();
            effect.settleMent();
            index.changeHead();
            index.logout();
        })
    })
})