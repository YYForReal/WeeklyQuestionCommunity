<template>
  <div id="app">
    <router-view :key="$route.path" />
    <BackTop></BackTop>
    <MusicDisk />
  </div>
</template>
<script>
import BackTop from "@/components/BackTop.vue";
import MusicDisk from "@/components/MusicDisk.vue";
export default {
  name: "App",
  components: {
    BackTop,
    MusicDisk,
  },
  mounted() {
    // 展示上次浏览的历史文章
    let id = window.localStorage.getItem("latestArticleId");
    let title = window.localStorage.getItem("latestArticleTitle");
    let that = this;
    if (id && title) {
      let message = `<small>检测到您之前浏览的历史记录</small>
          <h3 class="canTap "> ${title} </h3>`;
      this.$notify({
        title: "最近浏览",
        message: message,
        position: "top-left",
        offset: 120,
        dangerouslyUseHTMLString: true,
        duration: 5000,
        onClick() {
          that.jumpToArticle(id);
        },
      });
    }
    this.bindKeyboard();
  },
  methods: {
    jumpToArticle(id) {
      this.$router.push("/article/" + id);
    },
    bindKeyboard() {
      var lastScrollY = 0;

      $(function () {
        //添加快捷键，按下'/'则聚焦到搜索栏并弹出导航栏
        $(document).on("keyup", function (e) {
          if (e.key == "/") {
            $("#navbar").attr(
              "class",
              "navbar box is-fullhd navbar-height is-fixed-top"
            );
            $("#searchBox").trigger("focus");
          }
        });

        var scrolling = false;
        $(window).on("scroll", () => {
          scrolling = true;
        });

        // 设置滚轮下滑时隐藏导航栏，上滑则固定导航栏
        // 因为滚动一次滚轮会触发很多次scroll事件，所以设置300ms的延时

        $(window).on("scroll", () => {
          setInterval(() => {
            if (scrolling) {
              scrolling = false;
              let scrolly = $(window).scrollTop();
              if (scrolly >= lastScrollY) {
                $("#navbar").attr(
                  "class",
                  "navbar box is-fullhd navbar-height is-hidden"
                );
              } else {
                $("#navbar").attr(
                  "class",
                  "navbar box is-fullhd navbar-height is-fixed-top"
                );
              }
              lastScrollY = scrolly;
            }
          }, 300);
        });
      });
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
}
</style>
