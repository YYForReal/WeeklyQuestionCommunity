<template lang="">
  <div class="post-box">
    <el-card class="box-card original-box">

      <div slot="header" class="clearfix">
        <h1 class="text-align">写{{typeMessage}}</h1>
        <br>
        <el-input v-model="form.title" :placeholder="typeMessage + '标题(最长30个字符)'" maxlength="30"></el-input>
      </div>
      <el-row :gutter="20" class="el-row" type="flex">
        <el-col :span="12">
          <el-input type="textarea" :rows="20" :placeholder="'请在此编辑您的'+typeMessage+'内容（支持markdown语法）'"
            v-model="form.content" >
          </el-input>
        </el-col>
        <el-col :span="12">
          <h3 v-if="markContent =='' ">
            此处可以预览您的{{typeMessage}}内容
          </h3>
          <el-input v-else type="textarea" :rows="20" v-html="markContent" disabled> </el-input>
        </el-col>
      </el-row>

      <div class="button-box">
        <el-button type="button" @click="dialogFormVisible=true">其他配置</el-button>
        <el-button type="button" @click="dialogVisible=true">放大预览</el-button>
        <el-button type="button" @click="checkSubmit()">提交</el-button>
      </div>
    </el-card>

    <el-dialog title="放大预览" :visible.sync="dialogVisible" width="72%" class="markdown-box-content">
      <h1>{{form.title}}</h1>

      <div v-html="markContent" disabled>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="其他选项" :visible.sync="dialogFormVisible" width="50%">
      <p>话题标签</p>
      <el-input type="text" class="tags-input" v-model="form.tags" placeholder="添加话题标签，以英文逗号分隔“,”"></el-input>

      <p>封面图片</p>
      <el-upload class="img-upload" drag :limit="1" action="baseUrl + '/article/postArticle'"
        :before-upload="beforeImgUpload" :on-success="handleUploadSuccess">
        <div v-if="form.img==''">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件，且不超过2M</div>
        </div>
        <img v-else :src="form.img" alt="">
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  //导入 dompurify ， 防止XSS攻击
  //a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, SVG and MathML. 
  import DOMPurify from 'dompurify';
  import {
    marked
  } from 'marked';
  //  var clean = DOMPurify.sanitize(dirty);
  // const createDOMPurify = require('dompurify');
  // const {JSDOM} = require('jsdom');

  // const window = new JSDOM('').window;
  // const DOMPurify = createDOMPurify(window);

  //  const clean = DOMPurify.sanitize(dirty);

  export default {
    data() {
      return {
        authorId:'',
        user:null,
        typeMessage: '',
        dialogFormVisible: false,
        dialogVisible: false,
        form: {
          authorId: '',
          title: '',
          content: ``,
          type: '',
          tags: '',
          img: '',
        },
        markContent: ``,
        hint: false,
      };
    },
    props: {
      // authorId: {
      //   default: 1,
      // },
      // 类型默认是文章 ， 0 是问题
      type: {
        default: 1,
      }
    },
    mounted() {
      if(window.localStorage.getItem("user")==null){
        this.$message({
          type:'warning',
          message:'发布文章或问题需要先登录噢'
        })
        this.$router.push("/login");
      }else{
        this.user = JSON.parse(window.localStorage.getItem("user"));
        this.authorId = this.user.userId;

      }
      if (this.type == 0) {
        this.typeMessage = "问题";
      } else if (this.type == 1) {
        this.typeMessage = "文章";
      }
    },
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
      },
    },
    methods: {
      beforeImgUpload(file) {
        const isJPG = file.type === 'image/jpg';
        const isPNG = file.type === 'image/png';
        const isJPEG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isJPEG && !isPNG) {
          this.$message.error('上传的图片只能是 JPG,JPEG 或者 PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传的图片大小不能超过 2MB!');
          return false;
        }
        let that = this;
        var formData = new FormData();
        formData.append('file', file, 'file');
        // 开始上传
        $.ajax({
          type: "post",
          url: that.baseUrl + "/article/postImg", //需要获取的页面内容
          async: true, //异步
          data: formData,
          processData: false,
          contentType: false,
          success: function (data) {
            console.log(typeof data, data);
            that.$message({
              message: '提交成功',
              type: 'success'
            });
            that.form.img = data;

          },
        });
        return false;

      },
      handleUploadSuccess(res, file) {
        console.log("handleSuccess");
        //        this.form.img = URL.createObjectURL(file.raw);
      },
      turnToRelease() {
        let that = this;
        $.ajax({
          type: "get",
          url: that.baseUrl + "/article/getArticlesFromAuthor", //需要获取的页面内容
          async: true, //异步
          data: {
            authorId: that.authorId
          },
          success: function (data) {
            console.log(typeof data, data);
            that.turnToArticle(data[0].articleId);
          },
        });
      },
      checkSubmit() {
        let flag = true;
        if (this.form.title == "") {
          this.$message({
            type: 'error',
            message: "文章标题不能为空",
          });
          flag = false;
        }
        if (this.form.content == "") {
          setTimeout(() => {
            this.$message({
              type: 'error',
              message: "文章内容不能为空",
            })
          }, 200);
          flag = false;
        }
        if (!flag) return;
        //校验用户的输入
        if (this.form.content != DOMPurify.sanitize(this.form.content)) {
          this.$confirm('检测到您的文章可能含有非法格式，如需发布会过滤掉非法内容，发布后效果如右侧所示，是否继续发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log("user confirm");
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
          url: "http://localhost:9000/user/getUserInfo?userId=" + userId,
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
        this.form.authorId = this.authorId;
        this.form.type = this.type;
        this.form.content = DOMPurify.sanitize(this.form.content);
        let submitForm = this.form;
        let that = this;
        console.log("submit");
        $.ajax({
          type: "post",
          url: that.baseUrl + "/article/postArticle", //需要获取的页面内容
          async: true, //异步
          data: submitForm,
          success: function (data) {
            console.log(typeof data, data);
            that.$message({
              message: '提交成功',
              type: 'success'
            });
             that.turnToRelease();
            //            window.location.reload();
            // that.$router.push({
            //   name: 'SpecialArticle',
            //   params: {
            //     articleId: that.articleId
            //   }
            // })
          },
        });
      },
      turnToArticle(id) {
        this.$router.push("/SpecialArticle/" + id);
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


  .tags-input {
    margin: 5px;
  }

  .img-upload {
    margin: 5px;
  }

  .img-upload img {
    width: 100%;
    height: 100%;
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
