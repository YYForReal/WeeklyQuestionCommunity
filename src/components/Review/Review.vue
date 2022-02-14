<template lang="">
  <div class="one-answer" @mouseover="isHover = true" @mouseleave="isHover = false">
    <div class="user-info">
      <div class="user-img">
        <img :src="review.userAvatar?review.userAvatar:'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'" alt="">
      </div>
      <div class="user-name">
        <strong>{{review.userName==null?'匿名用户':review.userName}}</strong>
      </div>
      <div class="float-right">
        <span> {{review.releaseTime}}</span>
      </div>
    </div>

    <div class="one-answer-content" v-html="review.content">
      <!-- 填充 用户输入的内容 -->
    </div>
    <div class="answers-bottom">
      <a class="article-card-link iconfont icon-dianzan" :class="{blue:isAgree}"
        @click="handleAgree()">{{review.agree==0?'':review.agree}}</a>
      <a class="article-card-link iconfont icon-fenxiang hover-show" v-show="isHover">分享</a>
      <a class="article-card-link iconfont icon-shoucang1 hover-show" v-show="isHover">收藏</a>
      <a class="article-card-link iconfont icon-jubao hover-show" v-show="isHover">举报</a>
    </div>
    <hr>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        isHover: false,
        isAgree: false,
      }
    },
    props: {
      review: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleAgree() {
        let that = this;
        this.isAgree = !this.isAgree;
        let agreeNumber = (this.isAgree + 0) * 2 - 1;
        this.review.agree += agreeNumber;
        $.ajax({
          type: 'post',
          url: that.baseUrl + '/review/agree',
          data: {
            reviewId: that.review.reviewId,
            agreeNumber
          },
          success: function (data) {
            console.log(typeof data, data);

          },
        })
      },
      translateDate() {
        let d = new Date(this.review.releaseTime);
        d = d.getTime() + d.getTimezoneOffset()*60*1000; // - 480分钟
        d = new Date(d);
        let resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        console.log(resDate);
        this.review.releaseTime = resDate;
      },
      p(s) {
        return s < 10 ? '0' + s : s
      }
    },
    mounted() {
      this.translateDate();
    },
    watch: {
      review: {
        handler(newValue) {
          this.translateDate();
        },
        deep: true,
      }
    }
  }

</script>
<style lang="" scoped>
  .user-info .user-img {
    height: 40px;
    width: 40px;
  }

  .user-img img {
    height: 100%;
    width: 100%;
  }

  .answers-bottom {
    margin-top: 5px;
  }

  .article-card-link {
    margin-left: 15px;
    margin-right: 15px;
    letter-spacing: 2px;
    cursor: pointer;
  }

</style>
