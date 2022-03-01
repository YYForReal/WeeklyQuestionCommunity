<template lang="">
  <div>
    <section v-if="articles.length>0">
      <div class="article-card" v-for="(article,index) in articles">
        <div class="time-release" v-if="article.type==1">{{article.authorName}}发表了文章 {{article.releaseTime}}</div>
        <div class="time-release" v-else-if="article.type==0">{{article.authorName}}发布了问答 {{article.releaseTime}}</div>
        <h1 class="article-card-title canTap" @click="TurnToArticle(article.articleId)">
          <span class="article-type-tag iconfont icon-icon-test" :class="{'red':(article.type==1)}">{{typeMessage(article.type)}}</span>
          {{article.title}}
        </h1>
        <div>
          <div class="recommend-article-content canTap"
            :class="{'recommend-article-content-without-img':article.img==null}"
            @click="TurnToArticle(article.articleId)">
            <div>
              <div class="img-box float-left " v-if="article.img!=null  ">
                <img loading="lazy" :src="article.img" :alt="article.title">
              </div>
              <div>
                <span class="black recommend-article-content-main"
                  v-html="markContents[index]"></span>
              </div>
            </div>
          </div>
        </div>
        <ArticleButtonBox :article="article"></ArticleButtonBox>
        <hr>
      </div>
      <div class="list-end">没有更多内容</div>
    </section>
    <section v-else-if="requestType==3">
      <h1 style="font-size:36px">请求文章数据失败</h1>
      <p>可能原因：<span class="red"> 服务器异常</span> 或<span class="red"> 网络异常</span>。</p>
    </section>
    <section v-else-if="requestType==2">
      <h1 style="font-size:36px">你是不是还没写内容呀？</h1>
      <p>可能原因：<span class="red"> 没有积累 </span> 或<span class="red"> 没有问题 </span>。</p>
      <p>解决方案：<span class="red"> 右上角开始发布 </span> 或<span class="red"> 下次一定 </span>。</p>  
    </section>
    <section v-else-if="requestType==4">
      <NoFoundComponent :errorMessage="'需要先注册登录，才能查看自己写的文章噢~'" :errorType="'未登录'" :needLogin="true" />
      <!-- <h1 style="font-size:36px">你是不是还没写内容呀？</h1>
      <p>可能原因：<span class="red"> 没有积累 </span> 或<span class="red"> 没有问题 </span>。</p>
      <p>解决方案：<span class="red"> 右上角开始发布 </span> 或<span class="red"> 下次一定 </span>。</p>   -->
    </section>
    
    <section v-else>
      <WaitingBox></WaitingBox>
    </section>
  </div>
</template>
<script>
import ArticleButtonBox from "./ArticleButtonBox.vue";
import WaitingBox from "@/components/WaitingBox/WaitingBox2.vue";


// import { marked } from "marked";
export default {
  data() {
    return {
      authorId: 1,
      requestType: 0,//0请求中  1 请求成功 2 没数据 3 请求失败 4 未登录
      // readingStatus: false,
      articles: [],
      markContents: [],
    };
  },
  mounted() {
    try{
      this.getUserInfo();
    }catch(err){
      this.requestType = 4;
      return ;
      // this.$router.push("/login");
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
        if(that.articles.length==0){
          that.requestType = 2;
        }
      },
      error: function (data) {
        that.articles = [];
        // console.log("获取关注模块数据失败，", typeof data, data);
        that.requestType = 3;
      },
    });
  },
  components: {
    ArticleButtonBox,
    WaitingBox,
    'NoFoundComponent':()=> import("@/components/NoFoundComponent.vue")
  },
  watch: {
    articles: {
      handler(newValue) {},
      deep: true,
    },
  },

  methods: {
    typeMessage(articleType){
      console.log(articleType);
      switch(articleType){
        case 0:{
          return '问答';
        }
        case 1:{
          return '文章';
        }
        case 2:{
          return '选择'
        }
      }
    },
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
        // console.log("release Time : ", this.articles[i].releaseTime);
        let d = new Date(this.articles[i].releaseTime);
        // console.log("new Date : ", d);
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
<style lang="" scoped>


.time-release {
  color: grey;
  font-size: small;
}

.article-card {
  width: 95%;
  text-align: left;
  padding-left: 20px;
  margin-bottom: 5px;
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
  overflow: hidden;
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


</style>
