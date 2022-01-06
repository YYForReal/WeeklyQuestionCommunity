<template lang="">
  <div class="router-body">
    <article>
      <div class="tabs is-large">
        <!-- <div class="navbar-item">
          <button type="button" class="mybtn button is-rounded nav-line">
            <router-link to="EditArticle"> 编辑文章 </router-link>
          </button>
        </div> -->
        <ul>
          <li v-for="(ele,index) in navList" :class="{'is-active':index==activeIndex}" @click="handleActive(index);">
            <a> {{ele}} </a>
          </li>
        </ul>
      </div>
      <!-- 关注 -->
      <!-- 推荐 -->
      <!-- 热榜 -->
      <!-- 视频 -->
      <router-view></router-view>

      <!-- 主页面 -->
      <!-- <section v-if="activeIndex==4" id="showing-box"> -->

      <!-- </section> -->

    </article>
    <div class="clearfix">
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
      };
    },
    components: {
      // ArticleButtonBox,
      // FocusCard
    },
    mounted() {
    },
    methods: {
      handleActive(index) {
        this.activeIndex = index;
        console.log(index);
        switch (index) {
          case 0: {
            this.$router.push({
              name: 'FocusCard',
              params: {
                userId: '1'
              }
            });
            break;
          }
          case 1: {
            this.$router.push({
              name: 'RecommendCard',
              params: {
                userId: '1'
              }
            });
            break;
          }
          case 2: {
            this.$router.push({
              name: 'HotCard',
              params: {
                userId: '1'
              }
            });
            break;
          }
          case 3: {
            this.$router.push({
              name: 'VideoBox',
              params: {
                userId: '1'
              }
            });
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
.router-body{
  width: 100%;
  height: 100%;
}
</style>
