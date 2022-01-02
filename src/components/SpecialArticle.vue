<template lang="">
  <div class="special-box">
    <Question></Question>
    <el-card class="box-card" v-for="(article,index) in authorArticles" :key="index">
      <div slot="header" class="clearfix">
        <h1 class="card-title">{{article.title}}</h1>
      </div>
      <div v-html="article.content">
      </div>
    </el-card>
    <Answer />
  </div>
</template>
<script>
  import {
    marked
  } from 'marked'
  import Question from './Question.vue'
  import Answer from './Answer.vue'
  export default {
    data() {
      return {
        authorId: 1,
        authorArticles: [],
        authorInfo: {},
        userInfo: {

        },
        authorInfo: {
          username: '匿名用户',
          password: '123',
          avatar: 'https://img0.baidu.com/it/u=4213503151,140101761&fm=26',
        }
      }
    },
    components:{
      Question,
      Answer
    },
    methods: {

    },
    mounted() {
      let that = this;
      this.authorId = this.$route.params.authorId;
      console.log(this.authorId);
      $.ajax({
        type: "get",
        url: "http://localhost:9000/article/getArticlesFromAuthor", //需要获取的页面内容
        async: true, //异步
        data: {
          authorId: that.authorId,
        },
        success: function (data) {
          console.log(typeof data, data);
          that.authorArticles = data;
          for (let i = 0; i < that.authorArticles.length; i++) {
            that.authorArticles[i].content = marked.parse(that.authorArticles[i].content);
            console.log(that.authorArticles[i].content);
          }
        },
      });
    },
  }

</script>
<style lang="">
  .special-box {
    width: 75%;
    height: 600px;
    background-color: skyblue;
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

</style>
