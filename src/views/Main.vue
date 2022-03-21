<template>
  <div class="app-body">
    <NavHeader v-if="isPC == true"></NavHeader>
    <main>
      <keep-alive include="EditArticle">
        <router-view></router-view>
      </keep-alive>
    </main>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader.vue";
export default {
  data() {
    return {
      isPC: true,
    }
  },
  components: {
    NavHeader,
  },
  created() {
    if (localStorage.getItem("user") == null) {
      this.$store.commit
    }

  },
  mounted() {
    console.log(navigator.userAgent);
    this.isPC = !this.isMobile();
    
  },
  methods: {
    isMobile() {
      if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true; // 移动端
      } else {
        return false; // PC端
      }
    }
  },
};
</script>
<style lang="less" scoped>
.app-body {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  main {
    width: 90%;
    min-width: 900px;
    min-height: 630px;
    margin: 0 auto;
  }
}
</style>
