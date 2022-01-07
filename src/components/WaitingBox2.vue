<template lang="">
  <div class="waiting-box">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>
</template>
<script>
  export default {data(){return {}}}

</script>
<style lang="" scoped>
  .waiting-box {
    width: 100%;
    min-height: 360px;
    font-size: 10px;
  }

  .waiting-box>div {
    height: 20px;
    width: 100%;
    margin-left: 3px;
    margin-right: 3px;
    margin-top: 20px;
    display: inline-block;
    -webkit-animation: waitingAnimation 1.2s infinite ease-in-out;
    animation: waitingAnimation 1.2s infinite ease-in-out;
  }

  /* 设置延迟 */
  .waiting-box .rect1{
    width: 30%;
  }
  .waiting-box .rect2 {
    animation-delay: -1.1s;
    width: 75%;
  }
  .waiting-box .rect3 {
    animation-delay: -1.0s;
    width: 60%;
  }
  .waiting-box .rect4 {
    animation-delay: -0.9s;
    width: 100%;
  }
  .waiting-box .rect5 {
    animation-delay: -0.8s;
    width: 34%;
  }


  @keyframes waitingAnimation {
    0% {
      background-color: #ffffff;
    }

    25% {
      background-color: #eeeeee;
    }

    50% {
      background-color: #dddddd;
    }

    75% {
      background-color: #eeeeee;
    }

    100% {
      background-color: #ffffff;
    }
  }


</style>
