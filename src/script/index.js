require(['config'], function () {
    require(['jquery', 'render', 'index_effect'], function ($, render, effect) {
        require(['lazyload'], function () {
            $('#list').load("http://10.31.155.75/mbs/src/session.html");
            $('#footer').load("http://10.31.155.75/mbs/src/index_footer.html");
            $.cookie('url', location.href, { expires: 7, path: '/' });
            render.index_render();
            effect.louti();
            effect.isLogin();
            effect.logout();
            effect.search();
            effect.searchGood();
            effect.showChat();
            effect.rightSidebar();
            effect.weChat();
            effect.loginBox();
        })
    })
})