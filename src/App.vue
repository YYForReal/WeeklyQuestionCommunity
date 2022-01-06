<template>
  <div id="app">
    <NavHeader></NavHeader>
    <router-view :key="$route.path" />
    <BackTop></BackTop>
  </div>
</template>

<script>
  import NavHeader from './components/NavHeader.vue';
  import BackTop from './components/BackTop.vue';

  export default {
    name: "App",
    components: {
      NavHeader,
      BackTop,
    },
    methods: {
      jumpToArticle(id) {
        this.$router.push('/SpecialArticle/' + id);
      }
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
          title: '最近浏览',
          message: message,
          position: 'top-left',
          offset: 120,
          dangerouslyUseHTMLString: true,
          duration: 6000,
          onClick() {
            that.jumpToArticle(id)
          },
        });
      }
    },
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
    background-color: white;
  }

</style>
