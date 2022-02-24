<template>
  <div class="main-container">
    <article>
        <router-view></router-view>
    </article>
    <aside>
        <SideBar/>
    </aside>
  </div>
</template>
<script>
import SideBar from '@/components/SideBar.vue'
export default {
    components:{
        SideBar
    }
};
</script>
<style scoped lang="less">
.main-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
  article {
    width: 75%;
    min-width: 900px;
    min-height: 900px;
    background-color: white;
  }
  aside {
    width: 20%;
  }
}
</style>