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
  // import Login from "./components/login.vue";
  // import userInfo from "./components/userInfo.vue";
  // import Setting from "./components/setting.vue";
  export default {
    name: "App",
    components: {
      NavHeader,
      BackTop,
      // Login,
      // Setting,
      // userInfo,
    },
    methods: {

    },
  };

</script>

<style >
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
    background-color: white;
  }


</style>
