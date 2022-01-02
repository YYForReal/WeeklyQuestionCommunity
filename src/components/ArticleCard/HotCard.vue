<template lang="">
  <div>
    <section>
      <div class="article-card" v-for="(article,index) in articlesWithImg">
        <div class="article-rank-box">
          <h1 class="article-rank" :class="{'orange':index<3}">{{index+1}}</h1>
        </div>
        <div class="article-content" :class="{'article-content-without-img':article.img==null}">
          <router-link :to="('/SpecialArticle/'+article.articleId)">

            <h2 class="content-title">{{article.title}}</h2>
            <p class="black article-content-main">{{article.content}}</p>
            <div class="article-bottom">
              <a class="article-card-link iconfont icon-redu" href="">{{article.hot}}万热度</a>
              <a class="article-card-link iconfont icon-fasong" href="">分享</a>
            </div>
          </router-link>

        </div>
        <div class="img-box float-right" v-if="article.img!=null  ">
          <router-link :to="('/SpecialArticle/'+article.articleId)">
            <img loading="lazy" :src="article.img" :alt="article.title" :title="article.title">
          </router-link>
        </div>
        <div class="clearfix">
          <hr>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import ArticleButtonBox from './ArticleButtonBox.vue'
  export default {
    data() {
      return {
        articlesWithImg: [{
            type: 1, //1 是文章 0 是回答
            articleId: 12,
            title: "高水平运动员如何避免运动拉伤？高水平运动员如何避免运动拉伤？高水平运动员如何避免运动拉伤？",
            img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
            hot: 790,
            author: "author",
            judge: 2,
            agree: 1,
            time: "12",
            content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
          {
            type: 1, //1 是文章 0 是回答
            title: "高水平运动员如何避免运动拉伤？",
            img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
            hot: 790,
            agree: 1,

            content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
          {
            type: 0, //1 是文章 0 是回答
            title: "高水平运动员如何避免运动拉伤？",
           // img: "",
            hot: 790,
            agree: 1,

            content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
          {
            type: 1, //1 是文章 0 是回答
            title: "高水平运动员如何避免运动拉伤？",
            img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
            hot: 790,
            agree: 1,

            content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
        ],
      }
    },
    components: {
      ArticleButtonBox
    },
  }

</script>
<style lang="" scoped>
  /* @import '../../assets/css/bulma.min.css'; */

  .read-all {
    color: blue;
  }


  .article-card {
    width: 98%;
    padding-left: 2px;
  }

  .article-card .article-rank-box {
    float: left;
    width: 10%;
    max-width: 50px;
    height: 50px;
    font-size: larger;
    background-color: fff;
    text-align: center;
  }

  .article-rank {
    margin: 0 auto;
    font-size: 30px;
    font-weight: bold;
    line-height: 50px;
    color: black;
  }


  .article-card .article-content {
    width: 65%;
    height: 150px;
    text-align: left;

    margin-top: 10px;
    float: left;
    /* background-color: red; */
  }

  .article-card .article-content-without-img {
    width: 89%;
  }

  .article-card .article-content .article-content-main {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .content-title {
    font-size: larger;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .img-box {
    width: 25%;
    min-width: 100px;
    height: 130px;
    margin-top: 20px;
    margin-right: 20px;
    /* background-color: yellow; */
  }


  a{
    text-decoration:none ;
    color: black;
  }

  .article-card-link {
    display: inline-block;
    color: gray;
    margin-right: 20px;
  }


  .article-card-link:hover {
    color: blue;
  }

  .article-bottom {
    margin-top: 5px;
    width: 50%;
    min-width: 100px;
    height: 30px;
    display: block;
    margin-bottom: 5px;
  }
</style>
