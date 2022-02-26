<template>
  <div class="main-box">
    <div class="nofound-box">
      <h1>{{ errorType }}~</h1>
      <div class="info-box">
        <!-- <img class="error-img" src="https://source.acexy.cn/view/X8xBx3V" /> -->
        <div class="error-message">
          <h3>可能原因：{{ errorMessage }}</h3>
          <el-button type="primary" @click="$router.push('/')"
            >返回首页</el-button
          >
          <el-button
            v-if="needLogin"
            type="success"
            @click="$router.push('/login')"
            >前往登录</el-button
          >
        </div>
        <img
          class="error-img"
          src="https://uploadfile.huiyi8.com/up/e6/20/1f/e6201fafbf30d0b547305b84b4f43780.gif"
          alt=""
        />
      </div>
    </div>
    <div class="bottom-box">
      <img src="https://source.acexy.cn/view/X8xiNDh" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: "请检查访问路径，请求内容是否正确。",
    },
    errorType: {
      type: String,
      default: "请求出错",
    },
    needLogin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped lang="less">
.main-box {
  position: relative;
  width: 100%;
  min-height: 500px;
  .nofound-box {
    @media screen and (min-width: 300px) {
      width: 100%;
    }
    @media screen and (min-width: 768px) {
      width: 50%;
    }
    margin: 10px auto;
    text-align: center;

    .info-box {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-radius: 10px;
      background-color: #eee;
      padding-top: 5px;
      margin-bottom: 5px;
      z-index: 20;

      .error-message {
        display: block;
        width: 70%;
        text-align: center;
        text-indent: 2em;
        h3{
          font-weight: 400;
        }
      }

      .error-img {
        display: block;
        position: relative;
        @media (min-width: 300px) {
          left: 0%;
          top: 0%;
          width: 15vw;
        }
        @media (min-width: 768px) {
          left: -10%;
          top: -10px;
          width: 100px;
        }

        img {
          width: 100%;
        }
      }
    }
  }
  .bottom-box{
    position: absolute;
    left: 0;
    bottom: 0;
    z-index:10;
    @media (min-width:300px){
      width:200px;
    }
    @media (min-width:768px){
      width: 25vw;
    }
    
    img{
      width: 100%;
    }
  }
}
</style>