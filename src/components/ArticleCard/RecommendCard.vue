<template lang="">
  <div>
    <section v-if="articles.length > 0 ">
      <div class="article-card" v-for="(article,index) in articles">

        <h3 class="recommend-content-title canTap" @click="turnToArticle(article.articleId)" >{{article.title}}</h3>
        <div>
          <div class="recommend-article-content canTap"
            :class="{'recommend-article-content-without-img':article.img==null}"
            @click="turnToArticle(article.articleId)">
            <div>
              <div class="img-box float-left" v-if="article.img!=null&&article.img!='' ">
                <img loading="lazy" :src="article.img" :alt="article.title">
              </div>
              <div>
                <span class="black article-content-main" v-html="article.content"></span>
                <a class="read-all float-right" @click="readAll(2)">阅读全文</a>
              </div>
            </div>
          </div>
        </div>
        <ArticleButtonBox :article="article"></ArticleButtonBox>
        <hr>
      </div>
      <div class="list-end">没有更多内容</div>
    </section>

    <section v-else-if="errorType">
      <h1 style="font-size:36px">请求文章数据失败</h1>
      <p>可能原因：<span class="red"> 服务器异常</span> 或<span class="red"> 网络异常</span>。</p>
    </section>
    <section v-else>
      <el-skeleton :rows="5" animated />
    </section>


  </div>
</template>
<script>
  import ArticleButtonBox from './ArticleButtonBox.vue'
  import {marked} from 'marked'
  export default {
    data() {
      return {
        errorType: false,
        articles: [
          // {
          //   type: 1, //1 是文章 0 是回答
          //   title: "高水平运动员如何避免运动拉伤？",
          //   img: "https://infinitypro-img.infinitynewtab.com/findaphoto/bigLink/1641053102219.jpg",
          //   hot: 790,
          //   author: "author",
          //   judge: 2,
          //   agree: 1,
          //   time: "12",
          //   content: "吕小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚小军:人在训练， 刚上知乎。在训练， 刚上知乎。在训练， 刚上知乎。在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          // },

          // {
          //   type: 1, //1 是文章 0 是回答
          //   title: "高水平运动员如何避免运动拉伤？",
          //   img: "https://infinitypro-img.infinitynewtab.com/findaphoto/bigLink/1641053102219.jpg?imageView2/2/w/1920/format/webp/interlace/1",
          //   hot: 790,
          //   agree: 1,
          //   content: "吕小军:人在训练， 刚人在训练， 刚人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          // },
          // {
          //   type: 0, //1 是文章 0 是回答
          //   title: "高水平运动员如何避免运动拉伤？",
          //   img: "",
          //   hot: 790,
          //   agree: 1,
          //   content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          // },

          // {
          //   type: 1, //1 是文章 0 是回答
          //   title: "高水平运动员如何避免运动拉伤？",
          //   img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
          //   hot: 790,
          //   agree: 1,
          //   content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          // },
        ],
      }
    },
    mounted() {
      let that = this;
      $.ajax({
        type: 'get',
        url: that.baseUrl + '/article/getAll',
        async: true,
        data: {},
        success: function (data) {
          that.articles = data;
          console.log("获取热榜模块数据成功，", typeof data, data);
          //转换markdown成正常文本
          for (let i = 0; i < that.articles.length; i++) {
            that.articles[i].content = marked.parse(that.filterDot(that.articles[i].content));
          }
        },
        error: function (data) {
          that.articles = [];
          console.log("获取热榜模块数据失败，", typeof data, data);
          that.errorType = true;
        }
      })
    },
    components: {
      ArticleButtonBox
    },
    methods: {
      turnToArticle(id) {
        this.$router.push({
          name: 'SpecialArticle',
          params: {
            articleId: id
          }
        })
      },
      // 卡片里面不能有markdown的标题字符
      filterDot(str) {
        var pattern = new RegExp("#")
        var rs = "";
        for (var i = 0; i < str.length; i++) {
          rs = rs + str.substr(i, 1).replace(pattern, '');
        }
        return rs;
      },
    },
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
  }

  .article-card .article-content-without-img {
    width: 700px;
  }

  .article-content-main {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    min-height: 36px;
  }

  .img-box {
    width: 20%;
    height: 10%;
    min-width: 120px;
    max-height: 100px;
    margin-right: 20px;

  }

  .img-box img {
    width: 100%;
    max-height: 100px;
  }

</style>
