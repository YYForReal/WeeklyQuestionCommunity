<template>
  <div id="app">
    <router-view :key="$route.path" />
    <BackTop></BackTop>
    <MusicDisk/>
  </div>
</template>

<script>

import BackTop from "@/components/BackTop.vue";
import MusicDisk from "@/components/MusicDisk.vue";

export default {
  name: "App",
  components: {
    BackTop,
    MusicDisk
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
  },
  methods: {
    jumpToArticle(id){
      this.$router.push("/SpecialArticle/"+id);
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  width:100%;
}
</style>
