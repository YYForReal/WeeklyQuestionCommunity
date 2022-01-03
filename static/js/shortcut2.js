(function(){

    console.log("123123123123");
    function $(id) {
        return document.getElementById(id);
    }
    
    var lastScrollY = 0;
    
    //添加快捷键，按下'/'则聚焦到搜索栏并弹出导航栏
    function focusOnSearchBox(e) {
        if (e.key == '/') {
            $("navbar").className = "navbar box is-fullhd navbar-height is-fixed-top";
            $("searchBox").focus();
        }
    }
    
    // 为搜索框添加快捷键
    document.addEventListener('keyup', focusOnSearchBox, { passive: true });
    
    if (scrollY == 0) {
        $("navbar").className = "navbar box is-fullhd navbar-height is-fixed-top";
    }
    
    var scrolling = false;
    window.onscroll = () => {
        scrolling = true;
    }
    
    // 设置滚轮下滑时隐藏导航栏，上滑则固定导航栏
    // 因为滚动一次滚轮会触发很多次scroll事件，所以设置300ms的延时
    window.addEventListener('scroll',
        (e) => {
            setInterval(() => {
                if (scrolling) {
                    scrolling = false;
                    if (scrollY >= lastScrollY) {
                        $("navbar").className = "navbar box is-fullhd navbar-height is-hidden";
                    } else {
                        $("navbar").className = "navbar box is-fullhd navbar-height is-fixed-top";
                    }
                    lastScrollY = scrollY;
                }
            }, 300)
        });
})()

