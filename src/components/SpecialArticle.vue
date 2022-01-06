<template lang="">
  <div class="special-box">

    <!-- <el-card class="box-card" v-for="(article,index) in authorArticles" :key="index">
      <div slot="header" class="clearfix">
        <h1 class="card-title">{{article.title}}</h1>
      </div>
      <div v-html="article.content">
      </div>
    </el-card> -->


    <!-- 判断是否问题，若是则展示回答列表 -->
    <div v-if="article.type == 0">
      <Question :article="article"></Question>
      <AnswersBox :answers="answers"></AnswersBox>
    </div>

    <!-- 判断是文章 -->
    <div v-else-if="article.type == 1">
      <Question :article="article"></Question>
      <AnswersBox :answers="answers"></AnswersBox>
    </div>

    <div v-else-if="errorType">
      <h1>您要找的文章离你而去了~</h1>
      <img src="../assets/image/sad.png" alt="" class="error-img">
      <p class="error-message">可能原因：{{errorMessage}}。</p>
    </div>

    <div v-else>
      <WaitingBox />
    </div>

  </div>
</template>
<script>
  import {
    marked
  } from 'marked'
  import Question from './Question.vue'
  import Answer from './Answer.vue'
  import AnswersBox from './AnswersBox.vue'
  import WaitingBox from './WaitingBox.vue'
  export default {
    data() {
      return {
        articleId: 1,
        article: {},
        answers: [],
        errorType: false,
        errorMessage: '网络异常'
        // authorArticles: [],

        // authorInfo: {},
        // userInfo: {

        // },
        // authorInfo: {
        //   username: '匿名用户',
        //   password: '123',
        //   avatar: 'https://img0.baidu.com/it/u=4213503151,140101761&fm=26',
        // }

      }
    },
    components: {
      Question,
      Answer,
      AnswersBox,
      WaitingBox
    },
    methods: {

    },
    mounted() {
      let that = this;
      this.articleId = this.$route.params.articleId;
      console.log(this.articleId);
      // 获取文章或者问题的信息
      $.ajax({
        type: "get",
        url: "http://localhost:9000/article/getArticleFromId",
        async: true,
        data: {
          articleId: that.articleId,
        },
        success: function (data) {
          console.log(typeof data, data);
          if (data == "" || data == null) {
            that.errorMessage = "文章不存在";
            that.errorType = true;
          } else {
            that.article = data;
            // 记录一下最近的浏览记录
            window.localStorage.setItem("latestArticleTitle", that.article.title);
            window.localStorage.setItem("latestArticleId", that.article.articleId);
          }
        },
        error: function (data) {
          console.log(typeof data, data);
          that.errorMessage = '服务器未开启或连接异常';
          that.errorType = true;
        }
      })
      //获取对应的回答
      $.ajax({
        type: "get",
        url: "http://localhost:9000/answer/getAnswers",
        async: true,
        data: {
          articleId: that.articleId,
        },
        success: function (data) {
          console.log(typeof data, data);
          that.answers = data;
        }
      })



      // $.ajax({
      //   type: "get",
      //   url: "http://localhost:9000/article/getArticlesFromAuthor", //需要获取的页面内容
      //   async: true, //异步
      //   data: {
      //     authorId: that.authorId,
      //   },
      //   success: function (data) {
      //     console.log(typeof data, data);
      //     that.authorArticles = data;
      //     for (let i = 0; i < that.authorArticles.length; i++) {
      //       that.authorArticles[i].content = marked.parse(that.authorArticles[i].content);
      //       console.log(that.authorArticles[i].content);
      //     }
      //   },
      // });
    },
    watch: {
      article: {
        handler() {},
        deep: true
      },
      answers: {
        handler(newValue) {

        },
        deep: true
      },
    }
  }

</script>
<style lang="">
  .special-box {
    width: 75%;
    min-height: 600px;
    margin: 0 auto;
    text-align: left;
  }

  .card-title {
    font-family: "楷体", "仿宋";

  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 90%;
    margin: 10px auto;
  }

  .author-name {
    color: rgb(36, 12, 170);
    font-family: "仿宋", "楷体";
  }

  .error-img {
    display: inline-block;
  }

  .error-message {
    display: inline-block;
    position: relative;
    top: -150px;
  }

</style>
