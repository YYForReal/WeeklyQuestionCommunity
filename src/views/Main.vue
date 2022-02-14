<template lang="">
  <div class="router-body">
    <NavHeader></NavHeader>
    <article>
      <router-view></router-view>
    </article>
    <div class="clearfix"></div>
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader.vue";
export default {
  components:{
    NavHeader,
  }
};
</script>
<style lang="" scoped>

.router-body{
  width: 100%;
  height: 100%;
  margin-top: 50px;
}
</style>
