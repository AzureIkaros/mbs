require(['config'], function () {
    require(['jquery', 'lazyload', 'render'], function ($,lazyload,render) {
        $('#list').load("http://localhost/mbs/src/session.html");
        $('#footer').load("http://localhost/mbs/src/index_footer.html");
        render.index_render();
    })
})