<template lang="">
  <div class="article-maincontainer article-card card">
    <div class="article-tag-box">
      <a v-for="tag in article.tags.split(',')" href="" class="article-tag" >{{tag}}</a>
    </div>

    <h1 class="main-article-title"> {{article.title}}</h1>

    <p class="wrap-line4">{{article.content}}</p>
    <!-- 如果有视频就放，没有就不显示了（估计没有） -->
    <video class="middle-video" v-if="article.vsrc!=null&&article.vsrc!=''" controls>
      <source :src="article.vsrc" type="video/mp4">
    </video>

    <div class="article-bottom-box">
      <button class="button foucs-button ">关注问题</button>
      <button class="button write-button  iconfont icon-xiazai43"> 写回答</button>
      <button class="button invite-button iconfont icon-yaoqing"> 邀请回答</button>

      <div class="article-bottom-link">
        <a href="" class="article-card-link iconfont icon-zantongfill"> 好问题 {{article.agree}}</a>
        <a href="" class="article-card-link iconfont icon-icon_comment"> {{article.reviews==null?0:article.reviews}} 条评论</a>
        <a href="" class="article-card-link iconfont icon-fenxiang1">分享</a>
        <a href="" class="article-card-link iconfont icon-24gf-ellipsis"></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // article: {
        //   tags: ["生活", "情感", "社会", "正能量", "2021年度盘点"],
        //   title: "如何用一个词概括2021年？",
        //   content: "如何用一个词概括 2021 年？央视新闻联合知乎发布年度大事记视频《穿透》，给出了答案。用知乎年度 100 问，回顾今年那些「向上穿透」的瞬间。曾经我们面对着无数坚硬的天花板，但再坚硬的天花板，也挡不住一个时代的穿透！（联合策划：群玉山）",
        //   vsrc: "./image/video1.mp4",
        //   agree: 90,
        //   reviews: 45,
        // },
      }
    },
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
  }

</script>
<style lang="" scoped>
  @import '../assets/css/bulma.min.css';

  .article-card {
    width: 95%;
    padding-left: 20px;
  }

  .img-box {
    width: 180px;
    height: 130px;
    margin-top: 20px;
    margin-right: 20px;
    /* background-color: yellow; */
  }

  .article-card-link {
    display: inline-block;
    color: gray;
    margin-right: 20px;
  }


  .article-card-link:hover {
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
  }

  .article-maincontainer {
    margin: 0 auto;
    width: 96%;
  }

  .button {
    height: 25px;
  }

</style>
