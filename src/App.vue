<template>
  <div id="app">
    <NavHeader></NavHeader>

    <!-- <user-info></user-info> -->
    <!-- <setting></setting> -->
    <!-- <login></login> -->
    <router-view />
  </div>
</template>

<script>
import Login from "./components/login.vue";
import userInfo from "./components/userInfo.vue";
import Setting from "./components/setting.vue";
import NavHeader from "./components/NavHeader.vue";
export default {
  name: "App",
  components: {
    NavHeader,
    Login,
    Setting,
    userInfo,
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
