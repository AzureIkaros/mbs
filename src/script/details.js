require(['config'], function () {
    require(['jquery', 'render', 'details_effect', 'index_effect'], function ($, render, effect, index) {
        require(['lazyload'], function () {
            $('#list').load("http://10.31.155.75/mbs/src/session.html");
            $('#footer').load("http://10.31.155.75/mbs/src/index_footer.html");
            $.cookie('url', location.href, { expires: 7, path: '/' });
            render.details_render();
            effect.fdj();
            effect.clickChange();
            effect.chooseGood();
            effect.chooseSize();
            effect.changeNum();
            effect.slideGood();
            effect.addCart();
            index.changeHead();
            index.logout();
        })
    })
})