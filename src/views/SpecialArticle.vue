<template lang="">
  <div class="special-box">
    <!-- 问题+回答列表 -->
    <div v-if="article.type == 0">
      <Question :article="article"></Question>
      <AnswersBox :answers="answers"></AnswersBox>
    </div>

    <!-- 文章 -->
    <div v-else-if="article.type == 1">
      <Question :article="article"></Question>
    </div>
    
    <!-- 选择题 -->
    <div class="" v-else-if="article.type == 2">
      <!-- <Question :article="article"></Question> -->
      <ChoiceCard 
        :title="article.title" 
        :content="article.content" 
        :choices="article.choices"
        :time="article.releaseTime"
      ></ChoiceCard> 

    </div>

    <div v-else-if="errorType">
      <NoFoundComponent :errorType="'你要找的内容离你而去了'" :errorMessage="errorMessage" />
    </div>

    <div v-else>
      <WaitingBox />
    </div>

  </div>
</template>
<script>
import Question from "@/components/Question.vue";
import ChoiceCard from "@/components/ChoiceCard.vue";
import Answer from "@/components/answer/Answer.vue";
import AnswersBox from "@/components/answer/AnswersBox.vue";
import WaitingBox from "@/components/waitingBox/WaitingBox.vue";
import NoFoundComponent from "@/components/NoFoundComponent.vue";

export default {
  data() {
    return {
      articleId: 1,
      article: {},
      answers: [],
      errorType: false,
      errorMessage: "网络异常",
    };
  },
  components: {
    Question,
    Answer,
    AnswersBox,
    WaitingBox,
    ChoiceCard,
    NoFoundComponent,
  },
  methods: {
    translateDate() {
      let d = new Date(this.article.releaseTime);
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
      // 不够10 前面加0
      console.log(resDate);
      console.log(resTime);
      this.article.releaseTime = resDate + " " + resTime;
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
  },
  mounted() {
    let that = this;
    this.articleId = this.$route.params.articleId;
    console.log(this.articleId);
    // 获取文章或者问题的信息
    $.ajax({
      type: "get",
      url: this.baseUrl + "/article/getArticleFromId",
      async: true,
      data: {
        articleId: that.articleId,
      },
      success: function (data) {
        console.log("getArticle: ",typeof data, data);
        if (data == "" || data == null) {
          that.errorMessage = "文章不存在";
          that.errorType = true;
        } else {
          if(data.type==2){
            data.choices.forEach(element => {
               element.isSelected = false;
            });   
          }
          that.article = data;
          that.translateDate();
          // 记录一下最近的浏览记录
          window.localStorage.setItem("latestArticleTitle", that.article.title);
          window.localStorage.setItem(
            "latestArticleId",
            that.article.articleId
          );
        }
      },
      error: function (data) {
        console.log(typeof data, data);
        that.errorMessage = "服务器未开启或连接异常";
        that.errorType = true;
      },
    });
    //获取对应的回答
    $.ajax({
      type: "get",
      url: this.baseUrl + "/answer/getAnswers",
      async: true,
      data: {
        articleId: that.articleId,
      },
      success: function (data) {
        console.log(typeof data, data);
        that.answers = data;
      },
    });
  },
  watch: {
    article: {
      handler() {},
      deep: true,
    },
    answers: {
      handler() {},
      deep: true,
    },
  },
};
</script>
<style lang="" >
.special-box {
  width: 90%;
  min-width: 300px;
  min-height: 600px;
  margin: 0 auto;
  text-align: left;
}

.card-title {
  font-family: "楷体", "仿宋";
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 90%;
  margin: 10px auto;
}

.author-name {
  color: rgb(36, 12, 170);
  font-family: "仿宋", "楷体";
}

</style>
