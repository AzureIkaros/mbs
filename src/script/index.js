require(['config'],function(){
    require(['jquery','lazyload'],function(){
        $('#list').load("http://10.31.155.75/mbs/src/session.html");
        $('#footer').load("http://10.31.155.75/mbs/src/index_footer.html");
        
    })
})