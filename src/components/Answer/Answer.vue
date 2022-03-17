<template lang="">
  <div class="one-answer">
    <SmallUserBox :answer="answer"></SmallUserBox>
    <div class="agree-info" v-if="answer.agree>0"> {{answer.agree}}人赞同了该回答</div>
    <div class="one-answer-content" v-html="answer.content" ref="answerContent"></div>
    <div class="contentItem-time">
      <a>
        <span v-if="answer.updateTime!= answer.releaseTime">发布于 {{answer.releaseTime}}</span>
        <span v-else>更新于 {{answer.updateTime}}</span>
      </a>
      <span> {{answer.showTimes}} 次查看</span>
    </div>
    <div class="answers-bottom">
      <div class="agree-box">
        <a class="agree-button" :class="{'has-agree':isAgree}" @click="handleAgree()"> <span
            class="iconfont icon-sanjiaoxing small"></span> {{isAgree?'已':''}}赞同
          <span v-if="answer.agree!=0">{{answer.agree}}</span></a>
      </div>
      <a class="article-card-link iconfont icon-pinglun" v-if="reviewsNumber>0"
        @click="handleReview()">{{reviewsNumber}}条评论</a>
      <a class="article-card-link iconfont icon-pinglun" v-else @click="handleReview()">添加评论</a>

      <a class="article-card-link iconfont icon-fenxiang" @click="shareUrl()">分享</a>
      <a class="article-card-link iconfont icon-shoucang1">收藏</a>
      <a class="article-card-link iconfont icon-jubao" v-if="answer.agree==0">举报</a>
      <div class="agree-box" v-else>
        <a class="article-card-link iconfont icon-31guanzhu1xuanzhong">喜欢</a>
        <a class="article-card-link iconfont icon-24gf-ellipsis"></a>
      </div>
      <ReviewsBox v-if="seeReviews" :type="0" :articleId="answer.answerId"></ReviewsBox>
    </div>
    <hr>

  </div>
</template>
<script>
import ReviewsBox from '@/components/review/ReviewsBox.vue'
import SmallUserBox from '@/components/user/SmallUserBox.vue'
// import {
//   marked
// } from 'marked'

export default {
  data() {
    return {
      isAgree: false,
      seeReviews: false,
      reviewsNumber: 0,
    }
  },
  components: {
    ReviewsBox,
    SmallUserBox
  },
  props: {
    answer: {
      type: Object,
      required: true,
    }
  },
  methods: {
    shareUrl() {
      this.$util.copyUrl(this.answer.authorName,
        this.$refs.answerContent.innerText,
        '回答',
        this.$message,
        this,
        {
          type: 'success',
          message: '链接复制成功，快去转发给自己的好友吧~'
        }
      );
    },
    handleReview() {
      this.seeReviews = !this.seeReviews;
      console.log("chek");

    },
    handleAgree() {
      let that = this;
      this.isAgree = !this.isAgree;
      if (this.isAgree) {
        this.answer.agree++;
        $.ajax({
          type: "post",
          url: that.baseUrl + "/answer/agree",
          async: true,
          data: {
            answerId: that.answer.answerId,
            agreeNumber: 1
          },
          success: function (data) {
            console.log(typeof data, data);
            // that.article = data;
          }
        })
      } else {
        this.answer.agree--;
        $.ajax({
          type: "post",
          url: that.baseUrl + "/answer/agree",
          async: true,
          data: {
            answerId: that.answer.answerId,
            agreeNumber: -1
          },
          success: function (data) {
            console.log(typeof data, data);
            // that.article = data;
          }
        })
      }
    },
    translateContent() {
      this.answer.content = marked.parse(this.answer.content);
    },
    translateDate() {
      let d = new Date(this.answer.releaseTime);
      d = d.getTime() + d.getTimezoneOffset() * 60 * 1000; // - 480分钟
      d = new Date(d);
      let resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      let resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
      // 不够10 前面加0
      console.log(resDate);
      console.log(resTime);
      this.answer.releaseTime = resDate + ' ' + resTime;
      d = new Date(this.answer.updateTime);
      d = d.getTime() + d.getTimezoneOffset() * 60 * 1000; // - 480分钟
      d = new Date(d);
      resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
      resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
      // 不够10 前面加0
      console.log(resDate);
      console.log(resTime);
      this.answer.updateTime = resDate + ' ' + resTime;
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },

  },

  mounted() {
    this.translateDate();
    this.translateContent();
  },
  watch: {
    answer: {
      handler(newValue) {
        let that = this;

        let form = {
          articleId: this.answer.answerId,
          type: 0, //回答是0
        };
        $.ajax({
          type: "get",
          url: that.baseUrl + "/review/getReviews",
          async: true,
          data: form,
          success: function (data) {
            that.reviewsNumber = data.length;
            console.log("reviewsLength: ", that.reviewsNumber);
          }
        })
      },
      deep: true
    }
  }
};

</script>

<style scoped>
.article-card-link {
  display: inline-block;
  color: gray;
  margin-right: 20px;
}

.article-card-link:hover {
  color: blue;
}

.agree-info {
  margin: 3px;
  font-size: 14px;
}

.one-answer {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;
}

.one-answer .user-info {
  width: 100%;
  height: 50px;
}

.user-description {
  font-size: 14px;
}

/* markdown 格式 */
.one-answer-content {
  word-break: keep-all;
}

.one-answer-content >>> p {
  margin: 15px;
  line-height: 1.5rem;
  letter-spacing: 0.1rem;
  text-indent: 2rem;
}

.one-answer-content >>> img {
  min-width: 300px !important;
  max-width: 600px !important;
  margin: 0 auto;
  display: block;
}
.one-answer-content >>> code {
  min-width: 300px !important;
  max-width: 900px !important;
  margin: 0 auto;
  display: block;
  word-break: break-all;
}

.one-answer .user-info .user-img {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 5px;
}

.one-answer .user-info .user-img img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.one-answer .user-info .user-name {
  display: inline-block;
  position: relative;
  top: -8px;
  height: 50px;
  padding: 0;
  margin: 0;
}

.contentItem-time {
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.agree-box .has-agree {
  background-color: #0066ff;
  color: white;
}

.has-agree:hover {
  background-color: rgb(42, 120, 236);
  color: white;
}

.agree-button {
  padding-left: 4px;
  padding-right: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
