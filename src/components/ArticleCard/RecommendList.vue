<template lang="">
  <div>
    <section v-if="articles.length>0">
      <div class="article-card" v-for="(article,index) in articles.slice(0,endIndex)">
        <RecommendCard :article="article" :markContent="markContents[index]"></RecommendCard>
      </div>
      <div v-if="endIndex<articles.length" class="list-end">
        <el-button @click="showMore()">
          展示更多
        </el-button>
      </div>
      <div v-else class="list-end">没有更多内容</div>
    </section>
    <section v-else-if="requestType==3">
      <h1 style="font-size:36px">请求文章数据失败</h1>
      <p>可能原因：<span class="red"> 服务器异常</span> 或<span class="red"> 网络异常</span>。</p>
    </section>
    <section v-else-if="requestType==2">
      <h1 style="font-size:36px">好像没什么人发布内容呢？</h1>
      <p>可能原因：<span class="red"> 没有积累 </span> 或<span class="red"> 没有问题 </span>。</p>
      <p>解决方案：<span class="red"> 右上角开始发布 </span> 或<span class="red"> 下次一定 </span>。</p>  
    </section>
    <section v-else>
      <WaitingBox></WaitingBox>
    </section>
  </div>
</template>
<script>
import WaitingBox from "@/components/WaitingBox/WaitingBox2.vue";
import RecommendCard from "./RecommendCard.vue";
export default {
  data() {
    return {
      authorId: 1,
      requestType: 0,//0请求中  1 请求成功 2 没数据 3 请求失败 
      // readingStatus: false,
      articles: [],
      markContents: [],
      endIndex: 5,
    };
  },
  components: {
    WaitingBox,
    RecommendCard,
    'NoFoundComponent': () => import("@/components/NoFoundComponent.vue"),//懒加载异常组件
  },

  created() {
    let that = this;
    $.ajax({
      type: "get",
      url: that.baseUrl + "/article/getAll",
      async: true,
      data: {},
      success: function (data) {
        that.articles = data;

        // 时间排序
        that.articles.sort(function (a, b) {
          if (a.releaseTime < b.releaseTime) {
            return 1;
          } else {
            return -1;
          }
        })
        //转换markdown成正常文本
        for (let i = 0; i < that.articles.length; i++) {
          that.markContents.push(
            that.filterImgSource(marked.parse(that.filterDot(that.articles[i].content)))
          );
        }
        //转换时间格式
        that.translateDate();

        if (that.articles.length == 0) {
          that.requestType = 2;
        }

      },
      error: function (data) {
        that.articles = [];
        console.log("获取推荐模块数据失败，", typeof data, data);
        that.errorType = true;
      },
    });

  },

  watch: {
    articles: {
      handler(newValue) { },
      deep: true,
    },
  },

  methods: {
    showMore() {
      this.endIndex =
        this.endIndex + 5 > this.articles.length
          ? this.articles.length
          : this.endIndex + 5;
    },

    filterImgSource(str) {
      var reTag = /<img(?:.|\s)*?>/g;
      return str.replace(reTag, "");
    },
    getUserInfo() {
      //获取用户信息
      this.authorId = JSON.parse(localStorage.getItem("user")).userId;
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



</style>
