<template lang="">
  <div class="article-bottom recommend-article-bottom">
    <div class="agree-box">
      <a class="agree-button "> <span class="iconfont icon-sanjiaoxing small"></span> 赞同
        <span v-if="article.agree!=0">{{article.agree}}</span></a>
      <a class="disagree-button"><span class="iconfont icon-sanjiaoxing1 small"></span></a>
    </div>
    <a class="article-card-link iconfont icon-pinglun" href="" v-if="article.judge==0">添加评论</a>
    <a class="article-card-link iconfont icon-pinglun" href="" v-else>{{article.judge}}条评论</a>
    <a class="article-card-link iconfont icon-fenxiang" href="">分享</a>
    <a class="article-card-link iconfont icon-shoucang1" href="">收藏</a>
    <a class="article-card-link iconfont icon-jubao" href="" v-if="article.agree==0">举报</a>
    <div class="agree-box" v-else>
      <a class="article-card-link iconfont icon-31guanzhu1xuanzhong" href="">喜欢</a>
      <a class="article-card-link iconfont icon-24gf-ellipsis" href=""></a>
    </div>

    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card> -->



  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    props: {
      article: {
        type: Object,
        required: true,
      }
    },
  }

</script>
<style lang="" scoped>
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

  .article-bottom {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    display: block;
    margin-bottom: 5px;
  }

  .article-card-link:hover {
    color: blue;
  }

</style>
