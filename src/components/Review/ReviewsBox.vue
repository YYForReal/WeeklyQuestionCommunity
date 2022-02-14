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
          <el-input type="text" placeholder="写下你的评论..." v-model="reviewContent"
            @keyup.enter.native="handleReleaseReview()"></el-input>
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
  import Review from '@/components/review/Review.vue'

  export default {
    data() {
      return {
        reviews: [],
        reviewContent: "",
        user: {},
      }
    },
    components: {
      Review
    },
    methods: {
      handleReleaseReview() {
        let that = this;
        if (this.user == null) {
          this.$message({
            type: 'error',
            message: "用户未登录"
          })
          return;
        }
        if (this.reviewContent == "") {
          this.$message({
            type: 'error',
            message: "评论信息不能为空"
          })
          return;
        }
        // 匹配特殊字符
        let regEx = /[@#$%^&*()_\[\]{}\\|<>\/?]/;
        if (regEx.test(this.reviewContent)) {
          this.$message({
            type: 'error',
            message: "评论信息不能为包含特殊字符"
          })
          return;
        }


        let form = {
          content: this.reviewContent,
          articleId: this.articleId,
          userId: this.user.userId,
          type: this.type
        };
        // TODO 校验用户数据 
        let userId = this.user.userId;
        let pwd = this.user.password;
        $.ajax({
          type: "get",
          url: that.baseUrl + "/user/getUserInfo?userId=" + userId,
          async: true,
          success: function (data) {
            console.log("data", data);
            if (pwd == data.password) {
              that.$message({
                type: "success",
                message: "验证通过！",
              });
              that.pwdModal = true;
              //提交
              $.ajax({
                type: 'post',
                url: that.baseUrl + '/review/post',
                async: true,
                data: form,
                success: function () {
                  console.log("relaseReview");
                  that.$message({
                    type: "success",
                    message: "评论提交成功"
                  })
                  setTimeout(function () {
                    window.location.reload();
                  }, 800);
                }
              })
            } else {
              that.$message({
                type: "error",
                message: "密码错误！",
              });
            }
          },
          error: function () {
            console.log("验证身份失败!");
          },
        });

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
    },
    mounted() {
      let userString = window.localStorage.getItem("user");
      console.log("userString:", userString);
      this.user = JSON.parse(userString);

      let that = this;
      $.ajax({
        type: 'get',
        url: that.baseUrl + '/review/getReviews',
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
<style src="@/assets/css/bulma.min.css" scoped></style>
<style lang="" scoped>

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
