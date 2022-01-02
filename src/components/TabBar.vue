<template lang="">
  <div>
    <article>
      <div class="tabs is-large">
        <div class="navbar-item">
          <button type="button" class="mybtn button is-rounded nav-line">
            <router-link to="EditArticle"> 编辑文章 </router-link> 
          </button>
        </div>
        <ul>
          <li v-for="(ele,index) in navList" :class="{'is-active':index==activeIndex}" @click="handleActive(index);">
            <a>{{ele}}-{{index}} </a></li>
        </ul>
        <hr>
      </div>
      <!-- 关注 -->
      <!-- 推荐 -->
      <!-- 热榜 -->
      <!-- 视频 -->
      <router-view></router-view>      



      <!-- 主页面 -->
      <section v-if="activeIndex==4" id="showing-box">

      </section>
      <div class="list-end">没有更多内容</div>

    </article>
    <!-- 侧边栏 -->
    <aside>

    </aside>
    <div class="clearfix">
    </div>

    <div class="main-article-container" v-if="checkArticle">


      <div class="answers-maincontainer card">
        <header class="card-header">
          <p class="card-header-title">
            1,132个回答
          </p>
          <button class="card-header-icon" aria-label="more options">
            <div class="float-right">
              <a href="#">默认排序 <i class="iconfont icon-shangxia"></i></a>
            </div>
          </button>
        </header>

        <!-- 
        <div id="answers-box" v-html="answersBoxHtml">
        </div> -->
      </div>
    </div>

  </div>
</template>
<script>
// import ArticleButtonBox from './ArticleButtonBox.vue'
// import FocusCard from './ArticleCard/FocusCard.vue'

  export default {
    data() {
      return {
        navList: ["关注", "推荐", "热榜", "视频"],
        activeIndex: 4,
        checkArticle: true,
        answersBoxHtml: "",

        articlesWithImg: [{
            type: 1, //1 是文章 0 是回答
            title: "高水平运动员如何避免运动拉伤？",
            img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
            hot: 790,
            author: "author",
            judge: 2,
            agree: 1,
            time: "12",
            content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
          {
            type: 1, //1 是文章 0 是回答
            title: "高水平运动员如何避免运动拉伤？",
            img: "https://pica.zhimg.com/80/v2-d8b4ef5d7ddb321c5d6637dfb0104e9e_400x224.png",
            hot: 790,
            agree: 1,

            content: "吕小军:人在训练， 刚上知乎。收到@,谢邀了(他们说这是固定格式)。运动员受伤，在所难免。但绝对不是家堂便饭了。而县能有效防控和提前预防的。前面几篇- ..",
          },
        ],

      };
    },
    components:{
      // ArticleButtonBox,
      // FocusCard
    },
    methods: {
      handleActive(index) {
        this.activeIndex = index;
        console.log(index);
        switch(index){
          case 0:{
            this.$router.push({ name: 'FocusCard', params: { userId: '1' }});
            break;
          }
          case 1:{
            this.$router.push({ name: 'RecommendCard', params: { userId: '1' }});
            break;
          }
          case 2:{
            this.$router.push({ name: 'HotCard', params: { userId: '1' }});
            break;
          }
          case 3:{
            this.$router.push({ name: 'VideoBox', params: { userId: '1' }});
            break;
          }
        }
      },
      readAll(index) {
        this.activeIndex = 4;
        $.ajax({
          type: "get",
          url: "./article" + index + ".html", //需要获取的页面内容
          async: true,
          success: function (data) {
            console.log(data);
            $("#showing-box").html(data); //将获取到的内容放到当前页面的.contentBox中
          },
        });
        let that = this;
        $.ajax({
          type: "get",
          url: "./answer" + index + ".html", //需要获取的页面内容
          async: true,
          success: function (data) {
            console.log(data);
            that.answersBoxHtml = that.answersBoxHtml + data; //将获取到的内容放到当前页面的.contentBox中
          },
        });
      },
      //获取文章
      getArticle() {
        this.activeIndex = 4;
        $.ajax({
          type: "get",
          url: "./article" + index + ".html", //需要获取的页面内容
          async: true,
          success: function (data) {
            console.log(data);
            $("#showing-box").html(data); //将获取到的内容放到当前页面的.contentBox中
          },
        });
      },
    },
  };

</script>
<style lang="" scoped>
  @import '../assets/css/bulma.min.css';
</style>
