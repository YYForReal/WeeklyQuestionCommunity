<template lang="">
  <div class="article-maincontainer article-card card">
    <div class="article-tag-box" v-if="article.tags">
      <a v-for="tag in article.tags.split(',')" style="cursor: pointer;" class="article-tag">{{tag}}</a>
    </div>

    <h1 class="main-article-title"> {{article.title}}</h1>

    <div v-if="article.type&&authorInfo!=null">
      <SmallUserBox :user="authorInfo"></SmallUserBox>
    </div>

    <!-- 用户的文章内容 -->
    <div class="markdown-box-content" v-html="article.content"></div>

    <!-- 如果有视频就放，没有就不显示了（已经没有了） -->
    <!-- <video class="media-box" v-if="article.vsrc!=null&&article.vsrc!=''" controls>
      <source :src="article.vsrc" type="video/mp4">
    </video> -->
    <!-- 如果问题有封面就放，没有就不显示了 -->
    <img class="media-box" v-if="article.img!=null&&article.img!=''" :src="article.img">
    </img>
    <p>编辑于 {{article.releaseTime}}</p>
    <div class="article-bottom-box" v-if="article.type == 0">

      <button class="button foucs-button ">关注问题</button>
      <button class="button write-button  iconfont icon-xiazai43" @click="handleWriteAnswer()">
        {{isWrite?'关闭回答':'写回答'}}</button>
      <button class="button invite-button iconfont icon-yaoqing"> 邀请回答</button>

      <div class="article-bottom-link">
        <a class="article-card-link iconfont icon-zantongfill" :class="{blue:isAgree}" @click="handleAgree()"> 好问题
          {{article.agree}}</a>
        <a class="article-card-link iconfont icon-icon_comment" @click="handleReview()">
          <!-- {{article.reviews==null?0:article.reviews}} 条评论 -->
          评论
        </a>
        <a class="article-card-link iconfont icon-fenxiang1">分享</a>
        <a class="article-card-link iconfont icon-24gf-ellipsis"></a>
      </div>
    </div>

    <div class="answers-bottom" v-else>
      <div class="agree-box">
        <a class="agree-button" :class="{'has-agree':isAgree}" @click="handleAgree()"> <span
            class="iconfont icon-sanjiaoxing small"></span> {{isAgree?'已':''}}赞同
          <span v-if="article.agree!=0">{{article.agree}}</span></a>

        <a class="disagree-button" :class="{'has-agree':isDisagree}" @click="handleDisagree()">
          <span class="iconfont icon-sanjiaoxing1 small"></span>
        </a>
      </div>
      <a class="article-card-link iconfont icon-pinglun" v-if="reviewsNumber>0"
        @click="handleReview()">{{reviewsNumber}}条评论</a>
      <a class="article-card-link iconfont icon-pinglun" v-else @click="handleReview()">添加评论</a>

      <a class="article-card-link iconfont icon-fenxiang">分享</a>
      <a class="article-card-link iconfont icon-shoucang1">收藏</a>
      <a class="article-card-link iconfont icon-jubao">举报</a>
      <div class="agree-box">
        <a class="article-card-link iconfont icon-31guanzhu1xuanzhong">喜欢</a>
        <!-- <a class="article-card-link iconfont icon-24gf-ellipsis"></a> -->
        <a class="article-card-link iconfont icon-wenzhangzhuanzai" v-if="article.type">文章转载</a>
      </div>

    </div>

    <ReviewsBox v-if="seeReviews" :type="Number(article.type)" :articleId="article.articleId"></ReviewsBox>
    <EditAnswer v-if="isWrite" :articleId="article.articleId"></EditAnswer>
  </div>
</template>
<script>
  import ReviewsBox from './ReviewsBox.vue'
  import EditAnswer from './EditAnswer.vue'
  import SmallUserBox from './user/SmallUserBox.vue'
  import {
    marked
  } from 'marked'
  export default {
    data() {
      return {
        isAgree: false,
        isDisagree: false,
        isWrite: false,
        seeReviews: false,
        reviewsNumber: 0,
        authorInfo: null,
      }
    },
    components: {
      ReviewsBox,
      EditAnswer,
      SmallUserBox,
    },
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      //转换mark格式
      this.article.content = marked.parse(this.article.content);
      console.log("article is ", this.article);
      this.translateDate();
      let that = this;
      if (this.article.type == 1) {
        $.ajax({
          type: 'get',
          url: that.baseUrl + '/user/getUserInfo',
          data: {
            userId: that.article.authorId,
          },
          success: function (data) {
            that.authorInfo = data;
            console.log("getUserInfo", data);
          }
        })
      }

    },
    methods: {
      translateDate() {
        let d = new Date(this.article.releaseTime);
        d = d.getTime() + d.getTimezoneOffset() * 60 * 1000; // - 480分钟
        d = new Date(d);
        let resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
        // 不够10 前面加0
        console.log(resDate);
        console.log(resTime);
        this.article.releaseTime = resDate + ' ' + resTime;
      },
      p(s) {
        return s < 10 ? '0' + s : s
      },
      handleWriteAnswer() {
        this.isWrite = !this.isWrite;
        this.seeReviews = false;
      },
      handleReview() {
        this.seeReviews = !this.seeReviews;
        this.isWrite = false;
      },
      handleAgree() {
        let that = this;
        let agreeNumber = 0 - ((this.isAgree + 0) * 2 - 1);
        that.isAgree = !that.isAgree;
        that.isDisagree = false;
        that.article.agree += agreeNumber;
        $.ajax({
          type: "post",
          url: that.baseUrl + "/article/agree",
          async: true,
          data: {
            articleId: that.article.articleId,
            agreeNumber
          },
          success: function (data) {
            console.log(typeof data, data);
            // that.article = data;
          }
        })

      },
      handleDisagree() {
        let that = this;
        this.isDisagree = !this.isDisagree;
        if (this.isAgree) {
          this.isAgree = false;
          this.article.agree--;
          $.ajax({
            type: "post",
            url: that.baseUrl + "/article/agree",
            async: true,
            data: {
              articleId: that.article.articleId,
              agreeNumber: -1
            },
            success: function (data) {
              console.log(typeof data, data);
            }
          })
        }
      },
    },
    watch: {
      article: {
        handler(newValue) {
          // this.article.content = marked.parse(this.article.content);
          // console.log("mard", this.article.content);
          let that = this;

          let form = {
            articleId: this.article.articleId,
            type: Number(this.article.type), //回答是0
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
  }

</script>
<style lang="" scoped>
  @import '../assets/css/bulma.min.css';

  .article-card {
    width: 95%;
    padding-left: 20px;
  }

  .img-box {
    width: 180px;
    height: 130px;
    margin-top: 20px;
    margin-right: 20px;
    /* background-color: yellow; */
  }

  .article-card-link {
    display: inline-block;
    color: gray;
    margin-right: 20px;
  }
  .article-card-link:hover {
    color: blue;
  }
  .blue {
    color: blue;
  }

  /* tag */
  .article-tag {
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    height: 30px;
    line-height: 25px;
    background-color: #E5EFFF;
    color: #0066FF;
    margin-right: 6px;
    padding: 1px 10px;

  }

  .article-tag:hover {
    background-color: #D9E8FF;
  }

  /* title */
  .main-article-title {
    font-size: larger;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .article-bottom-box {
    padding-bottom: 5px;
    margin-top: 10px;
    line-height: 40px;
    height: 49px;
    width: 100%;
    overflow: hidden;
  }

  .article-bottom-link {
    display: inline-block;
    height: 40px;
    margin-left: 10px;
    letter-spacing: 2px;
  }

  .article-maincontainer {
    margin: 0px auto;
    width: 96%;
    padding-bottom: 30px;
  }

  .button {
    height: 30px;
  }


  .media-box {
    display: block;
    max-width: 80%;
    margin: 10px auto;

  }

  .agree-box .has-agree {
    background-color: #0066FF;
    color: white;
  }

  .has-agree:hover {
    background-color: rgb(42, 120, 236);
    color: white;
  }

  .disagree-button {
    cursor: pointer;
  }

  .agree-button {
    padding-left: 4px;
    padding-right: 4px;
    font-size: 14px;
    cursor: pointer;
  }

</style>
