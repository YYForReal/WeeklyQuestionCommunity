<template lang="">
  <div class="post-box">
    <el-card class="box-card original-box">
      <el-row :gutter="20" class="el-row" type="flex">
        <el-col :span="12">
          <el-input type="textarea" :rows="10" placeholder="请在此编辑您的回答内容（支持markdown语法）" v-model="content">
          </el-input>
        </el-col>
        <el-col :span="12">
          <h3 v-if="markContent =='' " type="textarea" :rows="10">
            此处可以预览您的内容
          </h3>
          <el-input v-else type="textarea" :rows="10" v-html="markContent" disabled class="mark-box"> </el-input>
        </el-col>
      </el-row>

      <div class="button-box">
        <el-button type="button " class="foucs-button" @click="checkSubmit()">提交</el-button>
      </div>
    </el-card>

  </div>
</template>
<script>
  //导入 dompurify ， 防止XSS攻击
  //a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, SVG and MathML. 
  // import DOMPurify from 'dompurify';
  // import {
  //   marked
  // } from 'marked';

  export default {
    data() {
      return {
        content: '',
        markContent: ``,
        hint: false,
        // authorId: 1,
        user: {},
      };
    },
    props: {
      articleId: {
        type: Number,
        required: true,
      }
    },
    mounted() {
      let user = window.localStorage.getItem("user");
      if (user == null) {
        this.$message({
          type: 'error',
          message: '用户未登录'
        })
        this.$router.push("/login");
      }
      this.user = JSON.parse(user);
    },
    watch: {
      // 深度监听表单，若左侧输入框内容修改，则右侧渲染出对应的效果
      // 若通过DOMPurify过滤后的文本与原文本不同，则定时提示。
      // 当然，还是可以渲染出来的
      content: {
        handler: function (newValue) {
          if (this.content != DOMPurify.sanitize(this.content) && this.hint == false) {
            this.$notify({
              title: '提示',
              message: '请不要输入与文章无关的内容',
              duration: 6000,
              type: 'warning'
            });
            this.hint = true;
            setTimeout(() => {
              this.hint = false;
            }, 6000);
          }
          this.markContent = marked.parse(DOMPurify.sanitize(this.content));
        },
      }
    },
    methods: {
      checkSubmit() {
        //校验用户的输入
        if (this.content != DOMPurify.sanitize(this.content)) {
          this.$confirm('检测到您的文章可能含有非法格式，如需发布会过滤掉非法内容，发布后效果如右侧所示，是否继续发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("confirm");
            this.checkPassword();
          }).catch(() => {
            //点击取消则什么都不做
          });
        } else {
          this.checkPassword();
        }
      },
      checkPassword() {
        let that = this;
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
              that.submitArticle();
            } else {
              that.$message({
                type: "error",
                message: "密码错误！",
              });
            }
            // that.$router.push("/setting");
          },
          error: function () {
            console.log("验证身份失败!");
          },
        });
      },
      submitArticle() {
        this.content = DOMPurify.sanitize(this.content);
        let submitForm = {
          articleId: this.articleId,
          authorId: this.user.userId,
          content: this.content
        }
        let that = this;
        console.log("submit");
        $.ajax({
          type: "post",
          url: that.baseUrl + "/answer/postAnswer", //需要获取的页面内容
          async: true, //异步
          data: submitForm,
          success: function (data) {
            console.log(typeof data, data);
            that.$message({
              message: '提交成功',
              type: 'success'
            });
            // window.location.reload();
            that.$router.go(0);
            // that.$router.push({
            //   name: 'SpecialArticle',
            //   params: {
            //     articleId: that.articleId
            //   }
            // })
          },
        });
      },
    },

  };

</script>

<style scoped>
  .post-box {
    width: 100%;
    min-width: 600px;
    min-height: 500px;
    margin: 0 auto;
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
    clear: both
  }

  .box-card {
    margin: 0 auto;
  }

  .button-box {
    width: 20%;
    margin: 10px auto;
  }

  .mark-box img {

    max-width: 300px !important;
    max-height: 300px !important;

  }

</style>


<!-- 
DOM purify 效果
DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'); // becomes <math><mi></mi></math>
DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>


 -->
