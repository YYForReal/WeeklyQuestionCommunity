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
    margin: 100px auto;
    width: 100px;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }

  .waiting-box>div {
    background-color: #391cdf;
    height: 100%;
    width: 10px;
    margin-left: 3px;
    margin-right: 3px;
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
      background-color: #127700;
      transform: scaleY(1);
    }

    25% {
      background-color: #0004F8;
      transform: scaleY(2);
    }

    50% {
      background-color: #007516;
      transform: scaleY(0.5);
    }

    75% {
      background-color: red;
      transform: scaleY(1);
    }

    100% {
      background-color: #127700;
      left: 10%;
      top: 0px;
    }
  }

</style>
