<template>
  <div class="main-container">
    <div class="article">
        <router-view></router-view>
    </div>
    <div class="aside">
        <SideBar/>
    </div>
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
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
  .article {
    @media screen and (min-width:300px){
      width:100%;
    }
    @media screen and (min-width:1023px){
      width: 70%;

    }
    min-height: 900px;
    background-color: white;
  }
  .aside {
    @media screen and (min-width:300px){
      width:100%;
    }
    @media screen and (min-width:1023px){
      width: 20%;      
    }
  }
}
</style>