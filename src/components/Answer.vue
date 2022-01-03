<template lang="">
  <div class="one-answer">
    <div class="user-info">
      <div class="user-img">
        <img :src="avatar" alt="">
      </div>
      <div class="user-name">
        <strong>{{answer.author==null?'匿名用户':answer.author}} <i class="iconfont icon-huiyuan orange"></i> </strong>
        <p class="user-description">{{answer.description==null?'该用户没有用户描述':answer.description}}</p>
      </div>
    </div>
    <!-- 没有编辑 标签 “编辑推荐”这种 -->
    <!-- <div class="tag-box">
      <i class="tag" :class="{ 'tag-orange':index%2==0 , 'tag-blue':index%2!=0 }" v-for="(honor,index) in honorTags"><a>
          {{honor}}</a></i>
    </div> -->


    <div class="agree-info" v-if="answer.agree>0"> {{answer.agree}}人赞同了该回答</div>
    <div class="one-answer-content" v-html="answer.content">
      <!-- <video class="middle-video" width="750" height="460" v-if="article.vsrc!=''" controls>
            <source src="./image/video1.mp4" type="video/mp4">
        </video>
        <br>
        <p> 2021 年，我们曾穿透岁月，穿透质疑，穿透时光，穿透力量……</p>
        <br>
        <p> 我们为什么能穿透比钢铁还坚硬的阻隔和障碍？</p>
        <br>
        <p> 央视新闻联合知乎发布视频「穿透」，致敬 2021，那些「向上穿透」的力量。</p> -->
    </div>
    <div class="ContentItem-time">
      <a target="_blank" href="//www.zhihu.com/question/508117339/answer/2286404162">
        <span v-if="answer.updateTime!= answer.releaseTime">发布于 {{answer.releaseTime}}</span>
        <span v-else>更新于 {{answer.updateTime}}</span>
      </a>
      <span> {{answer.viewTimes}} 次查看</span>
    </div>
    <div class="answers-bottom">
      <div class="agree-box">
        <a class="agree-button "> <span class="iconfont icon-sanjiaoxing small"></span> 赞同
          <span v-if="agree!=0">{{answer.agree}}</span></a>
        <a class="disagree-button"><span class="iconfont icon-sanjiaoxing1 small"></span></a>
      </div>
      <a class="article-card-link iconfont icon-pinglun" href="">添加评论</a>
      <a class="article-card-link iconfont icon-fenxiang" href="">分享</a>
      <a class="article-card-link iconfont icon-shoucang1" href="">收藏</a>
      <a class="article-card-link iconfont icon-jubao" href="" v-if="agree==0">举报</a>
      <div class="agree-box" v-else>
        <a class="article-card-link iconfont icon-31guanzhu1xuanzhong" href="">喜欢</a>
        <a class="article-card-link iconfont icon-24gf-ellipsis" href=""></a>
      </div>
    </div>
    <hr>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        avatar:'https://pic1.zhimg.com/v2-7dbdcdee5a4a7fb6e4a866d373d4f297_xs.jpg?source=1940ef5c',
        // author: '用户名',
        // authorDescription: "用户介绍",
        // honorTags: ['编辑推荐', '「知乎 2021」年度盘点'],
        // content: '<h2>文章文章文章文章文章文章文章文章文</h2><p>章文章文章文章文章文章文章文章文章</p>',
        // agree: 300,
        // releaseTime: '2021-12-26 12:00',
        // viewTimes: 8.8
      }
    },
    props:{
      answer:{
        type:Object,
        required:true,
      }
    }
  };

</script>

<style lang="" scoped>
  @import '../assets/css/bulma.min.css';


  .article-card {
    width: 95%;
    background-color: skyblue;
    padding-left: 20px;
  }

  .article-card-link {
    display: inline-block;
    color: gray;
    margin-right: 20px;
  }

  .article-card-link:hover {
    color: blue;
  }

  .tag-box {
    margin-top: 10px;
    margin-bottom: 10px;

  }

  .agree-info {
    margin: 3px;
  }

  .one-answer {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .one-answer .user-info {
    width: 100%;
    height: 50px;
  }

  .user-description {
    font-size: 14px;
  }

  .one-answer-content p {
    margin: 15px;
  }

  .one-answer .user-info .user-img {
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 5px;
  }

  .one-answer .user-info .user-img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .one-answer .user-info .user-name {
    display: inline-block;
    position: relative;
    top: -8px;
    height: 50px;
    padding: 0;
    margin: 0;
  }

  /* tag */
  .tag {
    border-radius: 5px;
    padding-left: 3px;
    padding-right: 3px;
    font-weight: bold;
  }

  .tag-blue {
    background-color: #F2F3FB !important;
    color: #828FDD !important;
  }

  .tag-orange {
    background-color: #FAF8F3 !important;
    color: #e6b259 !important;
  }

  .answer-img {
    display: block;
    margin: 5px auto;
    width: 100%;
    max-height: 400px;
  }

</style>
