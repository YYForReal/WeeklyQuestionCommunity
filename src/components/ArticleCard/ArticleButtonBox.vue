<template lang="">
  <div class="article-bottom recommend-article-bottom">
    <div class="agree-box">
      <a class="agree-button " @click="handleAgree()" :class="{'has-agree':isAgree}">
        <span class="iconfont icon-sanjiaoxing small"></span> {{isAgree?'已':''}}赞同
        <span v-if="article.agree!=0">{{article.agree}}</span>
      </a>
    </div>
    <a class="article-card-link iconfont icon-pinglun" v-if="reviews.length==0" @click="handleReview()">添加评论</a>
    <a class="article-card-link iconfont icon-pinglun" v-else @click="handleReview()">{{reviews.length}}条评论</a>
    <a class="article-card-link iconfont icon-fenxiang" @click="shareUrl()">分享</a>
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
import ReviewsBox from "@/components/review/ReviewsBox.vue";

export default {
  data() {
    return {
      isAgree: false,
      seeReviews: false,
      reviews: [],
    };
  },
  components: {
    ReviewsBox,
  },
  mounted() {
    //获取评论个数
    let form = {
      url: this.baseUrl + "/review/getReviews",
        articleId: this.article.articleId,
        type: Number(this.article.type),
    };

    let p = this.$store.dispatch("getReviews", form);
    p.then((data) => {
      this.reviewsNumber = data.length;
      this.reviews = data;
    })
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
      handler(newValue) { },
      deep: true,
    },
  },
  methods: {
    shareUrl() {
      this.$util.copyUrl(
        this.article.authorName,
        this.article.title,
        '文章',
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
      // console.log("chek");
    },
    handleAgree() {
      let that = this;
      this.isAgree = !this.isAgree;
      if (this.isAgree) {
        this.article.agree++;
        $.ajax({
          type: "post",
          url: that.baseUrl + "/article/agree",
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
          url: that.baseUrl + "/article/agree",
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
