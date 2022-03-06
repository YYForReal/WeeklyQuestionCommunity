<template lang="">
  <div class="user-info">
    <div class="user-img" v-if="answerFlag" >
      <!-- 默认头像 -->
      <img :src="answer.authorAvatar?answer.authorAvatar:'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'"
      @mouseenter="isDetails = true;" @mouseleave="isDetails = false;">
    </div>
    <transition name="el-zoom-in-top">
      <div class="person-box" v-show="isDetails" @mouseover = "isDetails = true;" @mouseleave = "isDetails = false;">
        <div class="user-img inner-user-img" v-if="answerFlag" >
          <!-- 默认头像 -->
          <img :src="answer.authorAvatar?answer.authorAvatar:'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'"
          @mouseenter="isDetails = true;" @mouseleave="isDetails = false;">
        </div>
        <div class="user-name inner-user-name" v-if="answerFlag">
          <el-button class="focus-button" @click="handleFocus">关注</el-button>
          <h2>{{answer.authorName==null?'匿名用户':answer.authorName}} <i class="iconfont icon-huiyuan orange"></i></h2>
          <p class="user-description">{{answer.authorDescription==null?'':answer.authorDescription}}</p>
        </div>
        <div class="person-details">
          <div>
            <p>文章</p>
            <h3>{{author.number}}</h3>
          </div>
          <div>
            <p>问答</p>
            <h3>{{author.number}}</h3>
          </div>
          <div>
            <p>选择</p>
            <h3>{{author.number}}</h3>
          </div>
        </div>
      </div>
    </transition>

    <div class="user-name" v-if="answerFlag">
      <strong>{{answer.authorName==null?'匿名用户':answer.authorName}} <i class="iconfont icon-huiyuan orange"></i>
      </strong>
      <p class="user-description">{{answer.authorDescription==null?'':answer.authorDescription}}</p>
    </div>
<!-- 此处后端传值不统一，故条件判断来设置用户头信息 -->
    <div class="user-img" v-if="userFlag">
      <!-- 默认头像 -->
      <img :src="user.avatar?user.avatar:'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'">
    </div>
    <div class="user-name" v-if="userFlag">
      <strong>{{user.userName==null?'匿名用户':user.userName}} <i class="iconfont icon-huiyuan orange"></i>
      </strong>
      <p class="user-description">{{user.description==null?'':user.description}}</p>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      answerFlag: false,
      userFlag: false,
      isDetails: false,
      author:{number:5}
    }
  },
  props: {
    answer: {
      type: Object,
    },
    user: {
      type: Object
    }
  },
  mounted() {
    if (this.answer) {
      this.answerFlag = true;
      this.userFlag = false;
    }
    if (this.user) {
      console.log("this user is :", this.user);
      this.userFlag = true;
      this.answerFlag = false;
    }
  },
}

</script>
<style lang="less" scoped>
.user-info {
  position: relative;
  width: 100%;
  height: 50px;
  .user-img {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .user-name {
    display: inline-block;
    position: relative;
    top: -8px;
    height: 50px;
    padding: 0;
    margin: 0;
    .user-description {
      font-size: 14px;
    }
  }
  .person-box {
    position: absolute;
    top: -10px;
    width: 400px;
    height: 200px;
    background-color: rgb(159, 216, 238);
    opacity: 0.98;
    z-index: 999;
    animation: showIn 1s;
    .inner-user-img {
      width: 80px;
      height: 80px;
    }
    .inner-user-name {
      max-width:300px;
      text-overflow: ellipsis;
      .focus-button{
        position: absolute;
        right: 0;
        top: 10px;
        z-index: 9999;
      }
      h2 {
        display: block;
        color: rgb(162, 0, 255);
        width: 300px;
      }
    }
    .person-details {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      text-align: center;
    }
  }
}

@keyframes showIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}
</style>
