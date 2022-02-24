<template>
  <div class="nofound-box">
    <h1>{{ errorType }}~</h1>
    <img class="error-img"  src="https://source.acexy.cn/view/X8lpYX6" />
    <p class="error-message">
      可能原因：{{ errorMessage }}。<router-link to="/">回首页吧</router-link>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: "请检查访问路径，请求内容是否正确。也可能是服务端错误",
    },
    errorType: {
      type: String,
      default: "请求出错",
    },
  },
};
</script>
<style scoped lang="less">
.nofound-box {
  width: 50%;
  margin: 10px auto;
  text-align: center;
  .error-message {
    display: inline-block;
    position: relative;
    top: -150px;
  }
  .error-img {
    display: inline-block;
  }
}
</style>