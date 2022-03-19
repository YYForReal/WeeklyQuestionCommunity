<template lang="">
  <div class="article-maincontainer article-card card ">
    <div class="article-tag-box markdown" v-if="article.tags">
      <a v-for="tag in article.tags.split(',')" style="cursor: pointer;" class="article-tag">{{tag}}</a>
    </div>

    <h1 class="main-article-title markdown"> {{article.title}}</h1>

    <div v-if="authorInfo!=null">
      <SmallUserBox :user="authorInfo"></SmallUserBox>
    </div>
    <!-- 如果问题有封面就放，没有就不显示了 -->
    <img class="media-box" v-if="article.img!=null&&article.img!=''" :src="article.img"></img>

    <!-- 用户的文章内容 -->
    <div class="markdown-box-content markdown-body" v-html="article.content" ref="articleContent"></div>


    <p>编辑于 {{article.releaseTime}}</p>

    <div class="article-bottom-box" v-if="article.type == 0">
      <el-button class="foucs-button">关注问题</el-button>
      <el-button class="write-button  iconfont icon-xiazai43" @click="handleWriteAnswer()">
        {{isWrite?'关闭回答':'写回答'}}</el-button>
      <el-button class="invite-button iconfont icon-yaoqing"> 邀请回答</el-button>

      <div class="article-bottom-link">
        <a class="article-card-link iconfont icon-zantongfill" :class="{blue:isAgree}" @click="handleAgree()"> 好问题
          {{article.agree}}</a>
        <a class="article-card-link iconfont icon-icon_comment" @click="handleReview()">
          评论
        </a>
        <a class="article-card-link iconfont icon-fenxiang1" @click="shareUrl()">分享</a>
      </div>
    </div>

    <div class="answers-bottom" v-else-if="article.type == 1">
      <div class="agree-box">
        <a class="agree-button" :class="{'has-agree':isAgree}" @click="handleAgree()"> <span
            class="iconfont icon-sanjiaoxing small"></span> {{isAgree?'已':''}}赞同
          <span v-if="article.agree!=0">{{article.agree}}</span></a>
      </div>
      <a class="article-card-link iconfont icon-pinglun" v-if="reviewsNumber>0"
        @click="handleReview()">{{reviewsNumber}}条评论</a>
      <a class="article-card-link iconfont icon-pinglun" v-else @click="handleReview()">添加评论</a>
      <a class="article-card-link iconfont icon-fenxiang" @click="shareUrl()">分享</a>
      <a class="article-card-link iconfont icon-shoucang1">收藏</a>
      <div class="agree-box">
        <a class="article-card-link iconfont icon-31guanzhu1xuanzhong">喜欢</a>
        <a class="article-card-link iconfont icon-wenzhangzhuanzai" v-if="article.type">文章转载</a>
      </div>
    </div>
    <ReviewsBox v-if="seeReviews" :type="Number(article.type)" :articleId="article.articleId"></ReviewsBox>
    <EditAnswer v-if="isWrite" :articleId="article.articleId"></EditAnswer>

  </div>
</template>
<script>
import ReviewsBox from '@/components/review/ReviewsBox.vue'
import EditAnswer from '@/components/edit/EditAnswer.vue'
import SmallUserBox from '@/components/user/SmallUserBox.vue'
import ChoiceCard from '@/components/ChoiceCard.vue'
// import {
//   marked
// } from 'marked'
export default {
  data() {
    return {
      isAgree: false,
      isWrite: false,
      seeReviews: false,
      reviewsNumber: 0,
      authorInfo: null,
    }
  },
  components: {
    ReviewsBox,
    EditAnswer,
    SmallUserBox,
    ChoiceCard,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    //转换mark格式
    this.article.content = marked.parse(this.article.content);
    console.log("article is ", this.article);
    // this.translateDate();
    let that = this;
    if (this.article.type == 1) {
      $.ajax({
        type: 'get',
        url: that.baseUrl + '/user/getUserInfo',
        data: {
          userId: that.article.authorId,
        },
        success: function (data) {
          that.authorInfo = data;
          console.log("Special getUserInfo", data);
        }
      })
    }

  },
  methods: {
    shareUrl() {
      console.log(this.article);
      this.$util.copyUrl(
        this.article.authorName || '问答社区',
        this.$refs.articleContent.innerText,
        this.article.type == 1 ? '文章' : '问答',
        this.$message,
        this,
        {
          type: 'success',
          message: '链接复制成功，快去转发给自己的好友吧~'
        }
      );
    },
    handleWriteAnswer() {
      this.isWrite = !this.isWrite;
      this.seeReviews = false;
    },
    handleReview() {
      this.seeReviews = !this.seeReviews;
      this.isWrite = false;
    },
    handleAgree() {
      let that = this;
      let agreeNumber = 0 - ((this.isAgree + 0) * 2 - 1);
      that.isAgree = !that.isAgree;
      that.article.agree += agreeNumber;
      $.ajax({
        type: "post",
        url: that.baseUrl + "/article/agree",
        async: true,
        data: {
          articleId: that.article.articleId,
          agreeNumber
        },
        success: function (data) {
          console.log(typeof data, data);
          // that.article = data;
        }
      })

    },
  },
  watch: {
    article: {
      handler(newValue) {
        let that = this;

        let form = {
          articleId: this.article.articleId,
          type: Number(this.article.type), //回答是0
        };
        $.ajax({
          type: "get",
          url: that.baseUrl + "/review/getReviews",
          async: true,
          data: form,
          success: function (data) {
            that.reviewsNumber = data.length;
            console.log("reviewsLength: ", that.reviewsNumber);
          }
        })
      },
      deep: true
    }
  }
}

</script>

<style lang="less">
.markdown {
  a {
    color: #4183c4;
  }

  a.absent {
    color: #cc0000;
  }

  a.anchor {
    display: block;
    padding-left: 30px;
    margin-left: -30px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 10px;
    padding: 0;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    cursor: text;
    position: relative;
  }

  h1:hover a.anchor,
  h2:hover a.anchor,
  h3:hover a.anchor,
  h4:hover a.anchor,
  h5:hover a.anchor,
  h6:hover a.anchor {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA09pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUM2NjlDQjI4ODBGMTFFMTg1ODlEODNERDJBRjUwQTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUM2NjlDQjM4ODBGMTFFMTg1ODlEODNERDJBRjUwQTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QzY2OUNCMDg4MEYxMUUxODU4OUQ4M0REMkFGNTBBNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QzY2OUNCMTg4MEYxMUUxODU4OUQ4M0REMkFGNTBBNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsQhXeAAAABfSURBVHjaYvz//z8DJYCRUgMYQAbAMBQIAvEqkBQWXI6sHqwHiwG70TTBxGaiWwjCTGgOUgJiF1J8wMRAIUA34B4Q76HUBelAfJYSA0CuMIEaRP8wGIkGMA54bgQIMACAmkXJi0hKJQAAAABJRU5ErkJggg==)
      no-repeat 10px center;
    text-decoration: none;
  }

  h1 tt,
  h1 code {
    font-size: inherit;
  }

  h2 tt,
  h2 code {
    font-size: inherit;
  }

  h3 tt,
  h3 code {
    font-size: inherit;
  }

  h4 tt,
  h4 code {
    font-size: inherit;
  }

  h5 tt,
  h5 code {
    font-size: inherit;
  }

  h6 tt,
  h6 code {
    font-size: inherit;
  }

  h1 {
    font-size: 28px;
    color: #2b3f52;
  }

  h2 {
    font-size: 24px;
    border-bottom: 1px solid #dde4e9;
    color: #2b3f52;
  }

  h3 {
    font-size: 18px;
    color: #2b3f52;
  }

  h4 {
    font-size: 16px;
    color: #2b3f52;
  }

  h5 {
    font-size: 14px;
    color: #2b3f52;
  }

  h6 {
    color: #2b3f52;
    font-size: 14px;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  li,
  table,
  pre {
    margin: 15px 0;
    color: #516272;
  }

  hr {
    background: transparent
      url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC)
      repeat-x 0 0;
    border: 0 none;
    color: #cccccc;
    height: 4px;
    padding: 0;
  }

  body > h2:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  body > h1:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  body > h1:first-child + h2 {
    margin-top: 0;
    padding-top: 0;
  }

  body > h3:first-child,
  body > h4:first-child,
  body > h5:first-child,
  body > h6:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  a:first-child h1,
  a:first-child h2,
  a:first-child h3,
  a:first-child h4,
  a:first-child h5,
  a:first-child h6 {
    margin-top: 0;
    padding-top: 0;
  }

  h1 p,
  h2 p,
  h3 p,
  h4 p,
  h5 p,
  h6 p {
    margin-top: 0;
  }

  li p.first {
    display: inline-block;
  }

  li {
    margin: 0;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  ul :first-child,
  ol :first-child {
    margin-top: 0;
  }

  dl {
    padding: 0;
  }

  dl dt {
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    padding: 0;
    margin: 15px 0 5px;
  }

  dl dt:first-child {
    padding: 0;
  }

  dl dt > :first-child {
    margin-top: 0;
  }

  dl dt > :last-child {
    margin-bottom: 0;
  }

  dl dd {
    margin: 0 0 15px;
    padding: 0 15px;
  }

  dl dd > :first-child {
    margin-top: 0;
  }

  dl dd > :last-child {
    margin-bottom: 0;
  }

  blockquote {
    border-left: 4px solid #ecf0f3;
    /*padding: 0 15px;*/
    padding: 15px;
    background-color: #f7f9fa;
    color: #2b3f52;
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  table {
    padding: 0;
    border-collapse: collapse;
  }

  table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  table tr th {
    font-weight: bold;
    border: 1px solid #cccccc;
    margin: 0;
    padding: 6px 13px;
  }

  table tr td {
    border: 1px solid #cccccc;
    margin: 0;
    padding: 6px 13px;
  }

  table tr th :first-child,
  table tr td :first-child {
    margin-top: 0;
  }

  table tr th :last-child,
  table tr td :last-child {
    margin-bottom: 0;
  }

  img {
    max-width: 100%;
  }

  span.frame {
    display: block;
    overflow: hidden;
  }

  span.frame > span {
    border: 1px solid #dddddd;
    display: block;
    float: left;
    overflow: hidden;
    margin: 13px 0 0;
    padding: 7px;
    width: auto;
  }

  span.frame span img {
    display: block;
    float: left;
  }

  span.frame span span {
    clear: both;
    color: #333333;
    display: block;
    padding: 5px 0 0;
  }

  span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-center > span {
    display: block;
    overflow: hidden;
    margin: 13px auto 0;
    text-align: center;
  }

  span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  span.align-right > span {
    display: block;
    overflow: hidden;
    margin: 13px 0 0;
    text-align: right;
  }

  span.align-right span img {
    margin: 0;
    text-align: right;
  }

  span.float-left {
    display: block;
    margin-right: 13px;
    overflow: hidden;
    float: left;
  }

  span.float-left span {
    margin: 13px 0 0;
  }

  span.float-right {
    display: block;
    margin-left: 13px;
    overflow: hidden;
    float: right;
  }

  span.float-right > span {
    display: block;
    overflow: hidden;
    margin: 13px auto 0;
    text-align: right;
  }

  code,
  tt {
    margin: 0 2px;
    padding: 0 5px;
    white-space: nowrap;
    border: 1px solid #eaeaea;
    background-color: #f8f8f8;
    border-radius: 3px;
  }

  pre code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent;
  }

  .highlight pre {
    background-color: #f8f8f8;
    border: 1px solid #cccccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
  }

  pre {
    background-color: #f8f8f8;
    border: 1px solid #cccccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
  }

  pre code,
  pre tt {
    background-color: transparent;
    border: none;
  }

  sup {
    font-size: 0.83em;
    vertical-align: super;
    line-height: 0;
  }

  code {
    white-space: pre-wrap;
    word-break: break-all;
    display: block;
  }

  * {
    -webkit-print-color-adjust: exact;
  }

  @media screen and (min-width: 914px) {
    body {
      width: 960px;
      margin: 0 auto;
    }
  }

  @media print {
    table,
    pre {
      page-break-inside: avoid;
    }

    pre {
      word-wrap: break-word;
    }
  }
}
</style>
<style lang="" scoped>
  .article-card {
    width: 95%;
    padding-left: 20px;
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
  .blue {
    color: blue;
  }

  /* tag */
  .article-tag {
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    height: 30px;
    line-height: 25px;
    background-color: #E5EFFF;
    color: #0066FF;
    margin-right: 6px;
    padding: 1px 10px;

  }

  .article-tag:hover {
    background-color: #D9E8FF;
  }

  /* title */
  .main-article-title {
    font-size: larger;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  .article-bottom-box {
    padding-bottom: 5px;
    margin-top: 10px;
    line-height: 40px;
    height: 49px;
    width: 100%;
    overflow: hidden;
  }

  .article-bottom-link {
    display: inline-block;
    height: 40px;
    margin-left: 10px;
    letter-spacing: 2px;
  }

  .article-maincontainer {
    margin: 0px auto;
    width: 96%;
    padding-bottom: 30px;
  }

  .button {
    height: 30px;
  }


  .media-box {
    display: block;
    max-width: 80%;
    margin: 10px auto;

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

</style>
