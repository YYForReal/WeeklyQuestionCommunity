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
    width: 50%;
    min-height: 360px;
    font-size: 10px;
    margin: 50px auto;
  }

  .waiting-box>div {
    height: 20px;
    width: 100%;
    margin-left: 3px;
    margin-right: 3px;
    margin-top: 10px;
    display: inline-block;
    -webkit-animation: waitingAnimation 1.2s infinite ease-in-out;
    animation: waitingAnimation 1.2s infinite ease-in-out;
  }

  /* 设置延迟 */
  .waiting-box .rect2 {
    animation-delay: -1.1s;
  }

  .waiting-box .rect3 {
    animation-delay: -1.0s;
  }

  .waiting-box .rect4 {
    animation-delay: -0.9s;
  }

  .waiting-box .rect5 {
    animation-delay: -0.8s;
  }


  @keyframes waitingAnimation {
    0% {
      background-color: #E6E6E6;
      transform: scaleX(1);
    }

    25% {
      background-color: #00b2f8;
      transform: scaleX(2);
    }

    50% {
      background-color: #12d836;
      transform: scaleX(0.5);
    }

    75% {
      background-color: red;
      transform: scaleX(1);
    }

    100% {
      background-color: #E6E6E6;
    }
  }

</style>
