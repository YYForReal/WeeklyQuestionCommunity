<template lang="">
  <div class="article-bottom recommend-article-bottom">
    <div class="agree-box">
      <a class="agree-button " @click="handleAgree()" :class="{'has-agree':isAgree}">
        <span class="iconfont icon-sanjiaoxing small"></span> {{isAgree?'已':''}}赞同
        <span v-if="article.agree!=0">{{article.agree}}</span>
      </a>
      <a class="disagree-button" @click="handleDisagree()" :class="{'has-agree':isDisagree}">
        <span class="iconfont icon-sanjiaoxing1 small"></span>
      </a>
    </div>
    <a class="article-card-link iconfont icon-pinglun" v-if="reviews.length==0" @click="handleReview()">添加评论</a>
    <a class="article-card-link iconfont icon-pinglun" v-else @click="handleReview()">{{reviews.length}}条评论</a>
    <a class="article-card-link iconfont icon-fenxiang">分享</a>
    <a class="article-card-link iconfont icon-shoucang1">收藏</a>
    <a class="article-card-link iconfont icon-jubao" v-if="article.agree==0">举报</a>
    <div class="agree-box" v-else>
      <a class="article-card-link iconfont icon-31guanzhu1xuanzhong">喜欢</a>
      <!-- <a class="article-card-link more-button iconfont icon-24gf-ellipsis" ></a> -->
      <div class="more-box">
        <a class="article-card-link iconfont icon-31guanzhu1xuanzhong">申请转载</a>
        <a class="article-card-link iconfont icon-31guanzhu1xuanzhong">不感兴趣</a>
      </div>
    </div>

    <ReviewsBox v-if="seeReviews" :type="Number(article.type)" :articleId="article.articleId"></ReviewsBox>



  </div>
</template>
<script>
  import ReviewsBox from "../ReviewsBox.vue";

  export default {
    data() {
      return {
        isAgree: false,
        isDisagree: false,
        seeReviews: false,
        reviews: [],
      };
    },
    components: {
      ReviewsBox,
    },
    mounted() {
      //获取评论个数
      let that = this;
      $.ajax({
        type: "get",
        url: "http://localhost:9000/review/getReviews",
        async: true,
        data: {
          articleId: that.article.articleId,
          type: Number(that.article.type),
        },
        success: function (data) {
          // console.log(typeof data, data);
          that.reviews = data;
        },
      });
    },
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    watch: {
      article: {
        handler(newValue) {
          //console.log(newValue);
        },
        deep: true,
      },
      reviews: {
        handler(newValue) {},
        deep: true,
      },
    },
    methods: {
      handleReview() {
        this.seeReviews = !this.seeReviews;
        console.log("chek");
      },
      handleAgree() {
        let that = this;
        this.isAgree = !this.isAgree;
        this.isDisagree = false;
        if (this.isAgree) {
          this.article.agree++;
          $.ajax({
            type: "post",
            url: "http://localhost:9000/article/agree",
            async: true,
            data: {
              articleId: that.article.articleId,
              agreeNumber: 1,
            },
            success: function (data) {
              // console.log(typeof data, data);
              // that.article = data;
            },
          });
        } else {
          this.article.agree--;
          $.ajax({
            type: "post",
            url: "http://localhost:9000/article/agree",
            async: true,
            data: {
              articleId: that.article.articleId,
              agreeNumber: -1,
            },
            success: function (data) {
              // console.log(typeof data, data);
              // that.article = data;
            },
          });
        }
      },
      handleDisagree() {
        let that = this;
        this.isDisagree = !this.isDisagree;
        if (this.isAgree) {
          this.isAgree = false;
          this.article.agree--;
          $.ajax({
            type: "post",
            url: "http://localhost:9000/answer/agree",
            async: true,
            data: {
              answerId: that.answer.answerId,
              agreeNumber: -1,
            },
            success: function (data) {
              // console.log(typeof data, data);
              // that.article = data;
            },
          });
        }
      },
    },
  };

</script>
<style lang="" scoped>
  .article-card-link {
    display: inline-block;
    color: gray;
    margin-right: 20px;
    cursor: pointer;
  }

  .article-bottom {
    margin-top: 10px;
    width: 100%;
    min-height: 30px;
    display: block;
    margin-bottom: 5px;
  }

  .article-card-link:hover {
    color: blue;
  }

  .article-card-link {
    display: inline-block;
    color: gray;
    margin-right: 20px;
    cursor: pointer;
  }

  .article-card-link:hover {
    color: blue;
  }

  .article-bottom {
    margin-top: 10px;
    width: 100%;
    min-height: 30px;
    display: block;
    margin-bottom: 5px;
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

  .more-box {
    position: absolute;
    top: 30px;
    visibility: hidden;
  }

  .more:hover+.more-box {
    visibility: visible;
  }



</style>
