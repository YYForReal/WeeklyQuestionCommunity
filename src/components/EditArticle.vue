<template lang="">
  <div class="post-box">
    <el-card class="box-card original-box">
      <div slot="header" class="clearfix">
        <el-input v-model="form.title" placeholder="文章标题(最长20个字)" maxlength="20"></el-input>
      </div>

      <el-row :gutter="20" class="el-row" type="flex">
        <el-col :span="12">
          <el-input type="textarea" :rows="10" placeholder="请在此编辑您的文章内容（支持markdown语法）" v-model="form.content">
          </el-input>
        </el-col>
        <el-col :span="12">
          <h3 v-if="markContent =='' " type="textarea" :rows="10">
            此处可以预览您的文章内容
          </h3>
          <el-input v-else type="textarea" :rows="10" v-html="markContent" disabled> </el-input>

        </el-col>
      </el-row>


      <div class="button-box">
        <el-button type="button" @click="submitArticle()">提交</el-button>
        <el-button type="button" @click="turnToMyArticles()">查看我的文章</el-button>
      </div>
    </el-card>

  </div>
</template>
<script>
  //导入 dompurify ， 防止XSS攻击
  //a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, SVG and MathML. 
  import DOMPurify from 'dompurify';

  //  var clean = DOMPurify.sanitize(dirty);
  // const createDOMPurify = require('dompurify');
  // const {JSDOM} = require('jsdom');

  // const window = new JSDOM('').window;
  // const DOMPurify = createDOMPurify(window);

  //  const clean = DOMPurify.sanitize(dirty);

  export default {
    data() {
      return {
        form: {
          authorId: '',
          title: '',
          content: ``,
        },
        markContent: ``,
        hint: false,
      };
    },
    props: {
      authorId: {
        type: String,
        required: true,
      }
    },
    mounted() {},
    watch: {
      // 深度监听表单，若左侧输入框内容修改，则右侧渲染出对应的效果
      // 若通过DOMPurify过滤后的文本与原文本不同，则定时提示。
      // 当然，还是可以渲染出来的
      form: {
        handler: function (newValue) {
          if (this.form.content != DOMPurify.sanitize(this.form.content) && this.hint == false) {
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
          this.markContent = marked.parse(DOMPurify.sanitize(this.form.content));
        },
        deep: true,
      }
    },
    methods: {
      checkSubmit() {
        //校验用户的输入
        if (this.form.content != DOMPurify.sanitize(this.form.content)) {
          this.$confirm('检测到您的文章可能含有非法格式，如需发布会过滤掉非法内容，发布后效果如右侧所示，是否继续发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("confirm");

            submitArticle();
          }).catch(() => {
            //点击取消则什么都不做
          });
        }
      },
      submitArticle() {
        this.form.authorId = this.authorId;
        this.form.content = DOMPurify.sanitize(this.form.content);
        let submitForm = this.form;
        let that = this;
        console.log("submit");
        $.ajax({
          type: "post",
          url: "http://localhost:9000/article/postArticle", //需要获取的页面内容
          async: true, //异步
          data: submitForm,
          success: function (data) {
            console.log(typeof data, data);
            that.$message({
              message: '提交成功',
              type: 'success'
            });
            that.$router.push({
              name: 'SpecialArticle',
              params: {
                authorId: '1'
              }
            })
          },
        });
      },
      turnToMyArticles(){
      this.$router.push("/SpecialArticle/"+this.authorId);
    }
    },

  };

</script>

<style scoped>
  .post-box {
    width: 80%;
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
    width: 300px;
    margin: 10px auto;
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
