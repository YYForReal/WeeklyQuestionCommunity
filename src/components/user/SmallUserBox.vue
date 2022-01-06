<template lang="">
  <div class="user-info">
    <div class="user-img" v-if="answerFlag">
      <!-- 默认头像 -->
      <img :src="answer.authorAvatar?answer.authorAvatar:'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'">
    </div>
    <div class="user-name" v-if="answerFlag">
      <strong>{{answer.authorName==null?'匿名用户':answer.authorName}} <i class="iconfont icon-huiyuan orange"></i>
      </strong>
      <p class="user-description">{{answer.authorDescription==null?'':answer.authorDescription}}</p>
    </div>

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
          console.log("this user is :",this.user);
        this.userFlag = true;
        this.answerFlag =false;
      }
    },
  }

</script>
<style lang="" scoped>
  .user-info {
    width: 100%;
    height: 50px;
  }

  .user-info .user-img {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 5px;
  }

  .user-info .user-img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .user-description {
    font-size: 14px;
  }

  .user-info .user-name {
    display: inline-block;
    position: relative;
    top: -8px;
    height: 50px;
    padding: 0;
    margin: 0;
  }

</style>
