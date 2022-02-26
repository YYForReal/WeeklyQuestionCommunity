<template lang="">
  <div>
    <section v-if="articles.length > 0 ">
      <div class="article-card" v-for="(article,index) in showArticles">
        <div class="article-rank-box">
          <h1 class="article-rank" :class="{'orange':index<3}">{{index+1}}</h1>
        </div>
        <div class="article-content" :class="{'article-content-without-img':article.img==null}">
          <router-link :to="('/SpecialArticle/'+article.articleId)">

            <h2 class="content-title">{{article.title}}</h2>
            <p class="black article-content-main" v-html="article.content"></p>
            <div class="article-bottom">
              <a class="article-card-link iconfont icon-redu" >
                {{article.hot>10000?(article.hot/10000).toFixed(2)+'万':article.hot}}热度
              </a>
              <a class="article-card-link iconfont icon-fasong">分享</a>
            </div>
          </router-link>

        </div>
        <div class="img-box float-right" v-if="article.img">
          <router-link :to="('/SpecialArticle/'+article.articleId)">
            <img loading="lazy" :src="article.img" :alt="article.title" :title="article.title">
          </router-link>
        </div>
        <div class="clearfix">
          <hr>
        </div>
      </div>
      <div v-if="showNumber<articles.length" class="list-end">
        <el-button @click="showMore()">
          展示更多
        </el-button>
      </div>
      <div v-else class="list-end">没有更多内容</div>


    </section>

    <section v-else-if="errorType">
      <h1 style="font-size:36px">请求文章数据失败</h1>
      <p>可能原因：<span class="red"> 服务器异常</span> 或<span class="red"> 网络异常</span>。</p>
    </section>
    <section v-else>
      <WaitingBox></WaitingBox>
    </section>
  </div>
</template>
<script>
import ArticleButtonBox from "./ArticleButtonBox.vue";
import WaitingBox from "@/components/WaitingBox/WaitingBox3.vue";

// import { marked } from "marked";
export default {
  data() {
    return {
      articles: [],
      errorType: false,
      showArticles: [],
      showNumber: 10,
    };
  },
  components: {
    ArticleButtonBox,
    WaitingBox,
  },
  mounted() {
    let that = this;
    $.ajax({
      type: "get",
      url: that.baseUrl + "/article/getHot",
      async: true,
      data: {},
      success: function (data) {
        that.articles = data;
        console.log("获取热榜模块数据成功，", typeof data, data);
        //转换markdown成正常文本
        for (let i = 0; i < that.articles.length; i++) {
          that.articles[i].content = that.filterImgSource(
            marked.parse(that.filterDot(that.articles[i].content))
          );
        }
        if (that.articles.length < 10) {
          that.setShowArticles(that.articles.length);
        } else {
          that.setShowArticles(10);
        }
      },
      error: function (data) {
        that.articles = [];
        console.log("获取热榜模块数据失败，", typeof data, data);
        that.errorType = true;
      },
    });
  },
  methods: {
    filterImgSource(str) {
      var reTag = /<img(?:.|\s)*?>/g;
      return str.replace(reTag, "");
    },
    // 卡片里面不能有markdown的标题字符
    filterDot(str) {
      var pattern = new RegExp("#");
      var rs = "";
      for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, "");
      }
      return rs;
    },
    setShowArticles(num) {
      this.showArticles = this.articles.slice(0, num);
      this.showNumber = num;
    },
    showMore() {
      this.showNumber =
        this.showNumber + 10 > this.articles.length
          ? this.articles.length
          : this.showNumber + 10;
      this.setShowArticles(this.showNumber);
    },
  },
};
</script>
<style scoped>
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

a {
  text-decoration: none;
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
