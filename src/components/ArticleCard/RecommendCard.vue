<template lang="">
  <div>
    <section v-if="articles.length > 0 ">
      <div class="article-card" v-for="(article,index) in articles" >
        <h3 class="recommend-content-title canTap"  @click="turnToArticle(article.articleId)">{{article.title}}</h3>
        <div class="article-card-body" >
          <div class="img-box canTap" v-if="article.img!=null&&article.img!='' " @click="turnToArticle(article.articleId)">
            <img loading="lazy" :src="article.img" :alt="article.title">
          </div>
          <div class="recommend-article-content "
            :class="{'recommend-article-content-without-img':article.img==null}">
            <div class="canTap" @click="turnToArticle(article.articleId)"  >
              <span class="black article-content-main" v-html="article.content"></span>
            </div>
            <ArticleButtonBox :article="article"></ArticleButtonBox>
          </div>

        </div>
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
import ArticleButtonBox from "./ArticleButtonBox.vue";
// import { marked } from "marked";
export default {
  data() {
    return {
      errorType: false,
      articles: [],
    };
  },
  mounted() {
    let that = this;
    $.ajax({
      type: "get",
      url: that.baseUrl + "/article/getAll",
      async: true,
      data: {},
      success: function (data) {
        that.articles = data;
        // console.log("获取推荐模块数据成功，", typeof data, data);
        //转换markdown成正常文本
        for (let i = 0; i < that.articles.length; i++) {
          that.articles[i].content = that.filterImgSource(
            marked.parse(that.filterDot(that.articles[i].content))
          );
        }
      },
      error: function (data) {
        that.articles = [];
        console.log("获取推荐模块数据失败，", typeof data, data);
        that.errorType = true;
      },
    });
  },
  components: {
    ArticleButtonBox,
  },
  methods: {
    filterImgSource(str) {
      var reTag = /<img(?:.|\s)*?>/g;
      return str.replace(reTag, "");
    },
    turnToArticle(id) {
      this.$router.push({
        name: "SpecialArticle",
        params: {
          articleId: id,
        },
      });
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
  },
};
</script>
<style lang="less" scoped>
.content-title,
.recommend-content-title {
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
}

.article-card {
  width: 95%;
  text-align: left;
  padding-left: 20px;
  margin-top: 8px;
  padding-bottom: 8px;
  .article-card-body {
    display: flex;
    margin-bottom: 5px;
    .recommend-article-content {
      width: 100%;
    }
    .article-content-without-img {
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
  }
}

.img-box {
  width: 20%;
  min-width: 120px;
  max-height: 100px;
  margin-right: 20px;
}

.img-box img {
  width: 100%;
  max-height: 100px;
}
</style>
