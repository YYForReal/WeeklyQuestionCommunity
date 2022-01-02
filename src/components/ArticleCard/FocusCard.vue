<template lang="">
  <div>
    <section>
      <div class="article-card" v-for="(article,index) in articlesWithImg">
        <div class="time-release" v-if="article.type==1">{{article.author}}发表了文章 {{article.time}}分钟前</div>
        <div class="time-release" v-if="article.type==0">{{article.author}}赞同了回答 {{article.time}}分钟前</div>
        <h1 class="recommend-content-title">{{article.title}}</h1>
        <div>
          <div class="recommend-article-content" :class="{'recommend-article-content-without-img':article.img==null}">
            <div>
              <div class="img-box float-left" v-if="article.img!=null  ">
                <img loading="lazy" :src="article.img" :alt="article.title">
              </div>
              <div>
                <span class="black recommend-article-content-main">{{article.content}}</span>
                <div><router-link class="read-all float-right" :to="'/SpecialArticle/' + article.id "> 阅读全文 </router-link></div>
              </div>
            </div>
          </div>
        </div>
        <ArticleButtonBox :article="article"></ArticleButtonBox>
        <hr>
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
            id: 1,
            type: 1, //1 是文章 0 是回答
            title: "高水平运动员如何避免运动拉伤？",
            img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
            hot: 790,
            author: "author",
            judge: 2,
            agree: 1,
            time: "12",
            content: "吕小军:人在训练， 刚上知乎。军:人在训练， 刚上知乎。军:人在训练， 刚上知乎。军:人在训练， 刚上知乎。军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
          {
            id: 2,
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
    mounted() {

    },
    components: {
      ArticleButtonBox,
    }
  }

</script>
<style lang="" scoped>
  @import '../../assets/css/bulma.min.css';



  .content-title,
  .recommend-content-title {
    font-size: large;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .time-release {
    color: grey;
  }

  .read-all {
    color: blue;
  }


  .article-card {
    width: 95%;
    text-align: left;

    padding-left: 20px;
  }


  .article-card .article-content {
    width: 600px;
    height: 150px;
    margin-top: 10px;
    float: left;
    /* background-color: red; */
  }

  .article-card .article-content-without-img {
    width: 700px;
  }

  .article-card .article-content .article-content-main {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .img-box {
    width: 20%;
    min-width: 120px;
    margin-right: 20px;
    height: 10%;  
    max-height: 130px;
    /* background-color: yellow; */
  }
  /* 关注 */


  .article-card .recommend-article-content {
    width: 750px;
    height: 130px;
    margin-top: 10px;
    /* background-color: red; */
  }

  .article-card .recommend-article-content-without-img {
    width: 800px;

  }

  .article-card .recommend-article-content .recommend-article-content-main {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

</style>
