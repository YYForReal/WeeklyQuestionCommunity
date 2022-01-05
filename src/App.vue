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

    },
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
