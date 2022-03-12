<template>
  <div class="app-body">
    <NavHeader></NavHeader>
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
  components: {
    NavHeader,
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
