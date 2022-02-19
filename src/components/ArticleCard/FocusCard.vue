<template lang="">
  <div>
    <section v-if="articles.length>0">
      <div class="article-card" v-for="(article,index) in articles">
        <div class="time-release" v-if="article.type==1">{{article.authorName}}发表了文章 {{article.releaseTime}}</div>
        <div class="time-release" v-else-if="article.type==0">{{article.authorName}}发布了问答 {{article.releaseTime}}</div>
        <h1 class="recommend-content-title canTap" @click="TurnToArticle(article.articleId)">
          <span class="article-type-tag iconfont icon-icon-test">{{article.type==1?'文章':'问题'}}</span>
          {{article.title}}
        </h1>
        <div>
          <div class="recommend-article-content canTap"
            :class="{'recommend-article-content-without-img':article.img==null}"
            @click="TurnToArticle(article.articleId)">
            <div>
              <div class="img-box float-left" v-if="article.img!=null  ">
                <img loading="lazy" :src="article.img" :alt="article.title">
              </div>
              <div>
                <span class="black" :class="{'recommend-article-content-main':!readingStatus}"
                  v-html="markContents[index]"></span>
                <div>
                  <a class="read-all float-right" @click="readingStatus=!readingStatus" v-if="readingStatus==false">
                    阅读全文 </a>
                  <a class="read-all float-right" @click="readingStatus=!readingStatus" v-else> 收起文章 </a>
                </div>
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
      <WaitingBox></WaitingBox>
    </section>
  </div>
</template>
<script>
import ArticleButtonBox from "./ArticleButtonBox.vue";
import WaitingBox from "@/components/WaitingBox/WaitingBox2.vue";

import { marked } from "marked";
export default {
  data() {
    return {
      authorId: 1,
      errorType: false,
      readingStatus: false,
      articles: [],
      markContents: [],
    };
  },
  mounted() {
    try{
      this.getUserInfo();
    }catch(err){
      this.$router.push("/login");
    }
    let that = this;
    $.ajax({
      type: "get",
      url: that.baseUrl + "/article/getArticlesFromAuthor",
      async: true,
      data: {
        authorId: that.authorId,
      },
      success: function (data) {
        that.articles = data;
        //转换markdown成正常文本
        for (let i = 0; i < that.articles.length; i++) {
          that.markContents.push(
            that.filterImgSource(marked.parse(that.filterDot(that.articles[i].content)))
          );

        }
        //转换时间格式
        that.translateDate();
      },
      error: function (data) {
        that.articles = [];
        console.log("获取关注模块数据失败，", typeof data, data);
        that.errorType = true;
      },
    });
  },

  components: {
    ArticleButtonBox,
    WaitingBox,
  },
  watch: {
    articles: {
      handler(newValue) {},
      deep: true,
    },
  },

  methods: {
    filterImgSource(str) {
      var reTag = /<img(?:.|\s)*?>/g;
      return str.replace(reTag, "");
    },
    getUserInfo() {
      //获取用户信息
      this.authorId = JSON.parse(localStorage.getItem("user")).userId;
    },
    TurnToArticle(id) {
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
    translateDate() {
      for (let i = 0; i < this.articles.length; i++) {
        console.log("release Time : ", this.articles[i].releaseTime);
        let d = new Date(this.articles[i].releaseTime);
        console.log("new Date : ", d);
        d = d.getTime() + d.getTimezoneOffset() * 60 * 1000; // - 480分钟
        d = new Date(d);
        let resDate =
          d.getFullYear() +
          "-" +
          this.p(d.getMonth() + 1) +
          "-" +
          this.p(d.getDate());
        let resTime =
          this.p(d.getHours()) +
          ":" +
          this.p(d.getMinutes()) +
          ":" +
          this.p(d.getSeconds());
        this.articles[i].releaseTime = resDate + " " + resTime;
        d = new Date(this.articles[i].updateTime);
        d = d.getTime() + d.getTimezoneOffset() * 60 * 1000; // - 480分钟
        d = new Date(d);
        resDate =
          d.getFullYear() +
          "-" +
          this.p(d.getMonth() + 1) +
          "-" +
          this.p(d.getDate());
        resTime =
          this.p(d.getHours()) +
          ":" +
          this.p(d.getMinutes()) +
          ":" +
          this.p(d.getSeconds());
        this.articles[i].updateTime = resDate + " " + resTime;
      }
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
  },
};
</script>
<style src="@/assets/css/bulma.min.css" scoped></style>
<style lang="" scoped>

.content-title,
.recommend-content-title {
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
}

.time-release {
  color: grey;
  font-size: small;
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
  width: 100%;
  height: 115px;
  margin-top: 10px;
  /* background-color: red; */
}

.article-card .recommend-article-content-without-img {
  width: 100%;
}

.recommend-article-content-main {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

img {
  height: 120px;
}

/* 文章类型的标签 */
.article-type-tag {
  font-size: 16px;
  display: inline-block;
  /* width: 60px; */
  background-color: rgb(170, 166, 166);
  font-weight: 400;
}
</style>
