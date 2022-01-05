<template lang="">
  <div class="answers-maincontainer card">
    <header class="card-header">
      <p class="card-header-title" v-if="reviews!=null&&reviews.length>0">
        {{reviews.length}}条评论
      </p>
      <p class="card-header-title" v-else>
        还没有评论
      </p>
      <button class="card-header-icon" aria-label="more options">
        <div class="float-right">
          <a>默认排序 <i class="iconfont icon-shangxia"></i></a>
        </div>
      </button>
    </header>
    <header>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input type="text" placeholder="写下你的评论..." v-model="reviewContent"></el-input>
        </el-col>
        <el-col :span="2" class="float-right">
          <el-button :disabled="reviewContent==''" @click="handleReleaseReview()">发布</el-button>
        </el-col>
      </el-row>
    </header>
    <div id="reviews-box">
      <Review v-for="(review,index) in reviews" :key="review.reviewId" :review="review" />
    </div>
  </div>
</template>
<script>
  import Review from './Review.vue'

  export default {
    data() {
      return {
        reviews: [],
        reviewContent:"",
      }
    },
    components: {
      Review
    },
    methods: {
      handleReleaseReview(){
        let form = {
          content:this.reviewContent,
          articleId:this.articleId,
          userId:1,
          type:this.type
        };
        let that = this;
        $.ajax({
          type:'post',
          url:that.baseUrl + '/review/post',
          async:true,
          data:form,
          success:function(){
            console.log("relaseReview");
            that.$message({
              type:"success",
              message:"评论提交成功"
            })
            setTimeout(function(){
              window.location.reload();
            },800);
          }
        })
      }
    },
    props: {
      'type': {
        type: Number,
        required: true,
      },
      articleId: {
        type: Number,
        required: true,
      }
      // reviews:{
      //   type:Array,
      //   default:()=>[],
      // }
    },
    mounted() {
      let that = this;
      $.ajax({
        type: 'get',
        url: 'http://localhost:9000/review/getReviews',
        async: true,
        data: {
          articleId: that.articleId,
          type: that.type,
        },
        success: function (data) {
          console.log(typeof data, data);
          that.reviews = data;
        },
      })
    },
    watch: {
      articleId: {
        handler(newValue) {
          console.log("articleID checkd");
          let that = this;
          if (this.type != null) {
            //send 
            $.ajax({
              type: 'get',
              async: true,
              data: {
                articleId: that.articleId,
                type: that.type,
              },
              success: function (data) {
                console.log(typeof data, data);
                that.reviews = data;
              },
            })
          }
        }
      },
      type: {
        handler(newValue) {
          console.log("articleID checkd");
          if (this.articleId != null) {
            //send

          }
        }
      },
      reviews: {
        handler() {

        },
        deep: true,
      }
    }
  }

</script>
<style lang="" scoped>
  @import '../assets/css/bulma.min.css';

  .answers-maincontainer {
    margin: 0 auto;
    min-width: 600px;
    width: 80%;
    min-height: 300px;
    max-height: 600px;
    margin-top: 20px;
    padding: 5px;
    display: block;
    clear: both;
  }

</style>
