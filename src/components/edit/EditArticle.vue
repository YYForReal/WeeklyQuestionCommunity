<template lang="">
  <div class="post-box">
    <el-card class="box-card original-box">
      <div slot="header" class="clearfix">
        <h1 class="text-align">发布{{typeMessage}}</h1>
        <br>
        <el-input v-model="form.title" :placeholder="typeMessage + '标题(最长30个字符)'" maxlength="30"></el-input>
      </div>

      <!-- 文章/问题编辑区域 -->
      <div id="editor" v-if="type<=1">
          <mavon-editor style="height: 100%" 
          v-model="form.content"
          :toolbars = "toolbars"
          :ishljs="true"
          ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"
          ></mavon-editor>
      </div>

      <!--选择题 编辑框 -->
      <el-row :gutter="20" class="el-row" type="flex" v-else>
        <el-col :span="12">
          <el-input type="textarea" :rows="20" :placeholder="'请在此编辑您的'+typeMessage+'内容（支持markdown语法）'"
            v-model="form.content" >
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button v-if="type==2" @click="addItem()" type="primary">增加选项</el-button>

          <div v-for="(item, index) in form.dynamicItem" :key="index">
            <div class="choice-line">
              <p class="choice-label">选项{{getAlphabet(index)}}</p>
              <el-input v-model="item.content" placeholder="在此处填写选项内容，右侧选择该选项的正确性" class="choice-input"></el-input>            
              <el-checkbox-group v-model="item.isCorrect">
                <el-checkbox label="√" :name="item.isCorrect"></el-checkbox>
              </el-checkbox-group>
              <el-button class="choice-button" type="danger" icon="el-icon-delete" circle @click="deleteItem(item, index)"></el-button>          
            </div>
          </div>

          <!-- <h3 v-if="markContent =='' ">
            此处可以预览您的{{typeMessage}}内容
          </h3>
          <el-input v-else type="textarea" :rows="20" v-html="markContent" disabled> </el-input> -->
        </el-col>
      </el-row>

      <div class="button-box">
        <el-button type="button" @click="dialogFormVisible=true">其他配置</el-button>
        <el-button type="button" @click="dialogVisible=true">放大预览</el-button>
        <el-button type="button" @click="checkSubmit()">提交</el-button>
      </div>
    </el-card>

    <el-dialog title="放大预览" :visible.sync="dialogVisible" width="72%" class="markdown-box-content markdown">
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
import DOMPurify from "dompurify";
import { marked } from "marked";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import http from "@/utils/http.js";
//  var clean = DOMPurify.sanitize(dirty);
// const createDOMPurify = require('dompurify');
// const {JSDOM} = require('jsdom');

// const window = new JSDOM('').window;
// const DOMPurify = createDOMPurify(window);

//  const clean = DOMPurify.sanitize(dirty);

export default {
  data() {
    return {
      img_file: [],
      authorId: "",
      user: null,
      typeMessage: "",
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        authorId: "",
        title: "",
        content: ``,
        type: "",
        tags: "",
        img: "",
        // add
        dynamicItem: [],
      },
      markContent: ``,
      hint: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: false, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: false, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  components: {
    mavonEditor,
  },
  props: {
    // 类型默认是文章 ， 0 是问题 , 2是选择题
    type: {
      default: 1,
    },
  },
  mounted() {
    if (this.type < 0 && this.type > 2) {
      //参数错误则回退
      this.$router.back(-1);
    }
    if (window.localStorage.getItem("user") == null) {
      this.$message({
        type: "warning",
        message: "发布文章或问题需要先登录噢",
      });
      this.$router.push("/login");
    } else {
      this.user = JSON.parse(window.localStorage.getItem("user"));
      this.authorId = this.user.userId;
    }
    if (this.type == 0) {
      this.typeMessage = "问题";
    } else if (this.type == 1) {
      this.typeMessage = "文章";
    } else if (this.type == 2) {
      this.typeMessage = "选择题";
    }
  },
  watch: {
    // 深度监听表单，若左侧输入框内容修改，则右侧渲染出对应的效果
    // 若通过DOMPurify过滤后的文本与原文本不同，则定时提示。
    // 当然，还是可以渲染出来的
    form: {
      handler: function (newValue) {
        console.log("new", newValue.content);
        if (
          this.form.content != DOMPurify.sanitize(this.form.content) &&
          this.hint == false
        ) {
          this.$notify({
            title: "提示",
            message: "请不要输入与文章无关的内容",
            duration: 6000,
            type: "warning",
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
    getAlphabet(index) {
      let baseArr = ["A", "B", "C", "D", "E", "F", "G"];
      return baseArr[index];
    },
    addItem() {
      if (this.form.dynamicItem.length > 6) {
        this.$message({
          type: "warning",
          message: "添加的选项太多啦",
        });
        return;
      }
      this.form.dynamicItem.push({
        content: "",
        isCorrect: "",
      });
    },
    deleteItem(item, index) {
      this.form.dynamicItem.splice(index, 1);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      this.img_file[pos] = $file;
      http
        .post(this.baseUrl + "/article/postImg", formdata, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          let _res = res.data;
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, _res);
        });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isJPEG && !isPNG && !isGIF) {
        this.$message.error("上传的图片只能是 JPG,JPEG,PNG,GIF 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
        return false;
      }
      let that = this;
      var formData = new FormData();
      formData.append("file", file, "file");

      http
        .post(that.baseUrl + "/article/postImg", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          console.log("upload success:", res);
          if (res.status == 200) {
            that.$message({
              message: "提交成功",
              type: "success",
            });
            that.form.img = res.data;
          } else {
            that.$message({
              message: "提交失败",
              type: "warn",
            });
          }
        })
        .catch((err) => {
          that.$message({
            message: "提交失败：" + err,
            type: "warn",
          });
        });
      return false;
    },
    handleUploadSuccess(res, file) {
      console.log("handleUpLoadSuccess", res, file);
    },
    turnToRelease() {
      let that = this;
      $.ajax({
        type: "get",
        url: that.baseUrl + "/article/getArticlesFromAuthor", //需要获取的页面内容
        async: true, //异步
        data: {
          authorId: that.authorId,
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
          type: "error",
          message: "文章标题不能为空",
        });
        flag = false;
      }
      if (this.form.content == "") {
        setTimeout(() => {
          this.$message({
            type: "error",
            message: "文章内容不能为空",
          });
        }, 200);
        flag = false;
      }
      if(this.type==2){
        if(this.form.dynamicItem.length==0){
          setTimeout(() => {
            this.$message({
              type: "error",
              message: "既然都是选择题了，怎么着都出几个选项吧~",
            });
          }, 200);
          flag = false;
        }else{
          let rightFlag = false;
          for(let i=0;i<this.form.dynamicItem.length;i++){
            if(this.form.dynamicItem[i].content==""){
              setTimeout(() => {
                this.$message({
                  type: "error",
                  message: "既然都增加选项了，怎么着都得说点话吧~",
                });
              }, 250);
              flag = false;
              break;
            }
            if(this.form.dynamicItem[i].isCorrect==true){
              rightFlag = true;
            }else{
              this.form.dynamicItem[i].isCorrect = false;
            }
          }
          if(!rightFlag){
            setTimeout(() => {
              this.$message({
                type: "error",
                message: "既然给选项了，怎么着都得设点正确答案吧~",
              });
            }, 300);
            flag = false;
          }
        }
      }
      if (!flag) return;
      //校验用户的输入
      if (this.form.content != DOMPurify.sanitize(this.form.content)) {
        this.$confirm(
          "检测到您的文章可能含有非法格式，如需发布会过滤掉非法内容，发布后效果如右侧所示，是否继续发布?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            console.log("user confirm");
            this.checkPassword();
          })
          .catch(() => {
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
            message: "提交成功",
            type: "success",
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
    },
  },
};
</script>

<style lang="less" scoped>
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
  clear: both;
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
  img {
    width: 100%;
    height: 100%;
  }
}

#editor {
  margin: auto;
  width: 100%;
  height: 580px;
}

.choice-line {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 5px auto;
  .choice-label {
    display: flex;
    align-items: center;
  }
  .choice-input {
    width: 70%;
  }
  .choice-button {
    display: block;
  }
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
