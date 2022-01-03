var lastScrollY = 0;

$(function () {
  //添加快捷键，按下'/'则聚焦到搜索栏并弹出导航栏
  $(document).on('keyup', function (e) {
    if (e.key == '/') {
      $("#navbar").attr("class", "navbar box is-fullhd navbar-height is-fixed-top");
      $("#searchBox").trigger('focus');
    }
  });

  var scrolling = false;
  $(window).on('scroll', () => {
    scrolling = true;
  });

  // 设置滚轮下滑时隐藏导航栏，上滑则固定导航栏
  // 因为滚动一次滚轮会触发很多次scroll事件，所以设置300ms的延时
  $(window).on('scroll',
    () => {
      setInterval(() => {
        if (scrolling) {
          scrolling = false;
          let scrolly = $(window).scrollTop();
          if (scrolly >= lastScrollY) {
            $("#navbar").attr("class", "navbar box is-fullhd navbar-height is-hidden");
          } else {
            $("#navbar").attr("class", "navbar box is-fullhd navbar-height is-fixed-top");
          }
          lastScrollY = scrolly;
        }
      }, 300)
    });

});