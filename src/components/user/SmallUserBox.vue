<template lang="">
  <div class="user-info">
    <div class="user-img" v-if="answerFlag" >
      <!-- 默认头像 -->
      <img :src="avatar"
      @mouseenter="isDetails = true;" >
    </div>


    <div class="user-name" v-if="answerFlag">
      <strong>{{answer.authorName==null?'匿名用户':answer.authorName}} <i class="iconfont icon-huiyuan orange"></i>
      </strong>
      <p class="user-description">{{answer.authorDescription==null?'':answer.authorDescription}}</p>
    </div>
<!-- 此处后端传值不统一，故条件判断来设置用户头信息 -->
    <div class="user-img" v-if="userFlag">
      <!-- 默认头像 -->
      <img :src="avatar">
    </div>
    <div class="user-name" v-if="userFlag">
      <strong>{{user.userName==null?'匿名用户':user.userName}} <i class="iconfont icon-huiyuan orange"></i>
      </strong>
      <p class="user-description">{{user.description==null?'':user.description}}</p>
    </div>
    <el-collapse-transition>
      <UserBox v-show="isDetails"
        :avatar = "avatar"
        :userId = "userId"
        :username = "username"
        :description = "description"
        :canShow = "canShow"
        ></UserBox>
    </el-collapse-transition>

  </div>
</template>
<script>
import UserBox from "./UserBox.vue"
export default {
  data() {
    return {
      answerFlag: false,
      userFlag: false,
      isDetails: false,
    }
  },
  components: {
    UserBox
  },
  computed: {
    avatar() {
      if (this.answer) return this.answer.authorAvatar ? this.answer.authorAvatar : 'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'
      else if (this.user) return this.user.avatar ? this.user.avatar : 'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'
    },
    description() {
      if (this.userFlag) return this.user.description;
      else if (this.answerFlag) return this.answer.authorDescription;
    },
    username() {
      if (this.userFlag) return this.user.userName;
      else if (this.answerFlag) return this.answer.authorName;
    },
    userId() {
      if (this.userFlag) return this.user.userId;
      else if (this.answerFlag) return this.answer.authorId;
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
    let userId;
    if (this.answer) {
      console.log("this answer is :", this.answer);
      this.answerFlag = true;
      this.userFlag = false;
      userId = this.answer.authorId;
      //authorId
    }
    if (this.user) {
      console.log("this user is :", this.user);
      this.userFlag = true;
      this.answerFlag = false;
      userId = this.user.userId;
    }


  },
  methods: {
    canShow() {
      this.isDetails = false;
    },
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
