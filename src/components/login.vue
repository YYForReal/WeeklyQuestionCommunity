<template>
  <div class="page container is-fullhd">
    <div class="columns is-centered">
      <a href="" class="columns is-centered login-image">
        <img src="../assets/image/login.png" alt="" />
      </a>
    </div>
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="box">
          <tabs>
            <!-- 登录 -->
            <tab title="登录">
              <form action="">
                <!-- 账号 -->
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      placeholder="账号或邮箱"
                      id="userId"
                      v-model="login_userId"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                    <p class="help is-hidden" id="userIdInfo"></p>
                  </div>
                </div>
                <!-- 密码 -->
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      :type="loginPwdType"
                      class="input"
                      placeholder="密码"
                      id="loginPwd"
                      v-model="loginPassword"
                      required
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                    <span
                      class="icon is-right is-clickable"
                      @click="seeLoginPwd()"
                    >
                      <i
                        class="fas"
                        :class="{ 'fa-eye': !seen, 'fa-eye-slash': seen }"
                        id="eye"
                      ></i>
                    </span>
                    <p class="help is-hidden" id="loginPwdInfo"></p>
                  </div>
                </div>
                <p class="info">
                  登录即代表同意<a href="https://www.zhihu.com/term/zhihu-terms"
                    >《知乎协议》</a
                  >
                  <a href="https://www.zhihu.com/term/privacy"
                    >《隐私保护指引》</a
                  >
                </p>
                <div class="field">
                  <div class="control">
                    <button
                      class="button input log-btn"
                      id="login"
                      @click="Login"
                    >
                      登录
                    </button>
                    <p class="help is-hidden" id="logInfo"></p>
                  </div>
                </div>
              </form>
            </tab>

            <!-- 注册 -->
            <tab title="注册">
              <form action="">
                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      type="text"
                      class="input"
                      placeholder="账号"
                      id="signIdInput"
                      v-model="sign_userId"
                      v-on:input="listenUserId"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                    <p class="help" id="signIdInfo"></p>
                  </div>
                </div>

                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      type="password"
                      class="input"
                      placeholder="密码"
                      id="password"
                      @input="listenPwd"
                      v-model="signPwd"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                    <span
                      class="icon is-right is-clickable"
                      @click="showPassword()"
                    >
                      <i class="fas fa-eye" id="sign-fa-eye"></i>
                    </span>
                    <p class="help is-hidden" id="passwordInfo"></p>
                  </div>
                </div>

                <div class="field">
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      class="input"
                      placeholder="确认密码"
                      id="confirmPwd"
                      @input="listenConfirmPwd"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                  <p class="help is-hidden" id="confirmInfo"></p>
                </div>

                <p class="info">
                  注册后自动登录，登录代表同意<a
                    href="https://www.zhihu.com/term/zhihu-terms"
                    >《知乎协议》</a
                  ><a href="https://www.zhihu.com/term/privacy"
                    >《隐私保护指引》</a
                  >
                </p>

                <div class="field">
                  <div class="control">
                    <button class="button input log-btn" @click="postUserInfo">
                      注册
                    </button>
                  </div>
                </div>
              </form>
            </tab>
          </tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "./loginTab.vue";
import Tabs from "./loginTabs.vue";

export default {
  data() {
    return {
      seen: false,

      login_userId: "",
      loginPassword: "",

      sign_userId: "",
      signPwd: "",

      allUserId: [],

      isLegalSignId: false,
      isLegalSignPwd: false,
      isLegalSignCon: false,

      token: "",
    };
  },
  computed: {
    // 点击眼睛图标可查看密码
    loginPwdType() {
      if (this.seen) {
        return "text";
      } else {
        return "password";
      }
    },
  },
  // 页面渲染完成后获取所有用户id
  mounted: function () {
    let that = this;
    $.ajax({
      type: "get",
      url: "http://localhost:9000/user/getAllUserId",
      dataType: "json",
      success: function (res) {
        that.allUserId = res;
      },
      error: function () {
        console.log("获取用户名失败！");
      },
    });
  },
  components: {
    Tab,
    Tabs,
  },
  methods: {
    seeLoginPwd() {
      this.seen = !this.seen;
    },
    sendState(state) {
      this.$E.$emit("State", state);
    },
    // 点击登录按钮后的事件
    Login() {
      // 密码输入框
      let loginPwd = $("#loginPwd");
      // 密码提示信息
      let userPwdInfo = $("#loginPwdInfo");
      // 用户名输入框
      let userId = $("#userId");
      // 用户名提示信息
      let userIdInfo = $("#userIdInfo");

      if (!this.isRepeatedUserId(this.login_userId)) {
        this.setDangerInfo(userIdInfo);
        this.setDangerInput(userId);
        userIdInfo.html("用户名不存在！");

        this.setHiddenInfo(userPwdInfo);
        loginPwd.attr("class", "input");
      } else {
        this.setHiddenInfo(userIdInfo);
        userId.attr("class", "input");
        // 获取用户密码并检验，ajax是异步的，所以要在success后再检查密码！
        let that = this;
        $.ajax({
          type: "get",
          url:
            "http://localhost:9000/user/getUserInfo?userId=" +
            that.login_userId,
          success: function (res) {
            let md5Pwd = that.$md5(that.loginPassword);

            if (res.password == md5Pwd) {
              console.log("密码正确！");
              that.setHiddenInfo(userPwdInfo);
              that.setSuccessInput(loginPwd);
              that.$message({
                type: "success",
                message: "登录成功！",
              });
              // TODO
              // 保存用户id
              localStorage.setItem("userId", that.login_userId);
              console.log("创建Storage: " + localStorage.getItem("userId"));
              that.sendState(true);

              that.$router.push("/");
            } else {
              that.setDangerInfo(userPwdInfo);
              that.setDangerInput(loginPwd);
              userPwdInfo.html("密码错误！");
            }
          },
          error: function () {
            console.log("获取密码失败！");
          },
        });
      }
    },
    // 检查用户名语法的合法性
    isIlLegalAccount(value) {
      return /[^a-zA-Z\d_]/.test(value);
    },
    // 检查用户名是否重复
    isRepeatedUserId(id) {
      let flag = false;
      this.allUserId.forEach(function (e) {
        if (e == id) {
          flag = true;
        }
      });
      return flag;
    },
    listenUserId: function () {
      let signIdInput = $("#signIdInput");
      let signIdInfo = $("#signIdInfo");
      let flag = false;

      if (this.sign_userId == "") {
        signIdInput.attr("class", "input");
        this.setHiddenInfo(signIdInfo);
      } else if (this.sign_userId.length < 4 || this.sign_userId.length > 12) {
        this.setDangerInput(signIdInput);
        this.setDangerInfo(signIdInfo);
        signIdInfo.html("用户名长度必须为4~12个字符！");
      } else if (this.isIlLegalAccount(this.sign_userId)) {
        this.setDangerInput(signIdInput);
        this.setDangerInfo(signIdInfo);
        signIdInfo.html("用户名只能由数字、字母和下划线组成！");
      } else {
        // check the userId from database
        if (this.isRepeatedUserId(this.sign_userId)) {
          this.setDangerInfo(signIdInfo);
          this.setDangerInput(signIdInput);
          signIdInfo.html("该用户名太受欢迎了，换一个吧~");
        } else {
          this.setSuccessInput(signIdInput);
          this.setSuccessInfo(signIdInfo);
          flag = true;
          signIdInfo.html("恭喜，该用户名可用！");
        }
      }

      this.isLegalSignId = flag;
    },
    // 上传用户账号和密码
    postUserInfo() {
      if (!this.isLegalSignId || !this.isLegalSignPwd || !this.isLegalSignCon) {
        alert("请检查输入是否合法！");
        return;
      }
      let that = this;
      let pwd = this.$md5(that.signPwd);
      $.ajax({
        type: "post",
        url: "http://localhost:9000/user/postLoginInfo",
        async: true,
        data: { userId: that.sign_userId, password: pwd },
        success: function (data) {
          console.log(data);
          that.$message({
            type: "success",
            message: "注册成功！",
          });

          // TODO
          // 保存用户id
          localStorage.setItem("userId", that.sign_userId);
          console.log("创建Storage: " + localStorage.getItem("userId"));
          that.sendState(true);
          that.$router.push("/");
        },
        error: function () {
          console.log("提交信息失败!");
        },
      });
    },
    // 判断密码是否由字母、数字和特殊字符3种组合组成
    isLegalPwd(value) {
      // 匹配非数字、字母和英文特殊字符的字符
      let regEx1 = /[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?a-zA-Z0-9]/;

      // 匹配英文特殊字符
      let regEx2 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      return (
        !regEx1.test(value) &&
        /[\d]/.test(value) &&
        /[a-z]/i.test(value) &&
        regEx2.test(value)
      );
    },
    listenPwd() {
      var password = $("#password");
      var passwordInfo = $("#passwordInfo");
      let flag = false;

      if (this.signPwd == "") {
        password.attr("class", "input");
        this.setHiddenInfo(passwordInfo);
      } else if (this.signPwd.length < 8 || this.signPwd.length > 16) {
        this.setDangerInput(password);
        this.setDangerInfo(passwordInfo);
        passwordInfo.html("密码长度必须为8-16位！");
      } else if (!this.isLegalPwd(this.signPwd)) {
        this.setDangerInput(password);
        this.setDangerInfo(passwordInfo);
        passwordInfo.html("密码必须由字母、数字和特殊字符3种组合组成！");
      } else {
        this.setSuccessInfo(passwordInfo);
        this.setSuccessInput(password);
        passwordInfo.html("该密码可用！");
        flag = true;
      }
      this.isLegalSignPwd = flag;
    },
    // signUp--点击眼睛图标可查看密码
    showPassword() {
      var password = $("#password");
      if (password.attr("type") == "password") {
        $("#sign-fa-eye").attr("class", "fas fa-eye-slash");
        password.attr("type", "text");
      } else {
        $("#sign-fa-eye").attr("class", "fas fa-eye");
        password.attr("type", "password");
      }
    },
    listenConfirmPwd() {
      var confirmPwd = $("#confirmPwd");
      var confirmInfo = $("#confirmInfo");
      var password = $("#password");
      let flag = false;

      if (confirmPwd.val() == "") {
        confirmPwd.attr("class", "input");
        this.setHiddenInfo(confirmInfo);
      } else if (confirmPwd.val() == password.val()) {
        this.setSuccessInput(confirmPwd);
        this.setHiddenInfo(confirmInfo);
        flag = true;
      } else {
        this.setDangerInput(confirmPwd);
        this.setDangerInfo(confirmInfo);
        confirmInfo.html("两次密码输入不一致！");
      }
      this.isLegalSignCon = flag;
    },
    setDangerInfo(e) {
      e.attr("class", "help is-danger");
    },

    setDangerInput(e) {
      e.attr("class", "input is-danger");
    },

    setSuccessInput(e) {
      e.attr("class", "input is-success");
    },

    setSuccessInfo(e) {
      e.attr("class", "help is-success");
    },

    setHiddenInfo(e) {
      e.attr("class", "is-hidden");
    },
  },
};
</script>


<style src="../assets/css/bulma.min.css" scoped></style>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

.page {
  background-image: url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 600px;
}

.login-image {
  width: 128px;
  height: 81px;
  margin-top: 45px;
}

.log-btn {
  background-color: #0066ff;
  color: white !important;
}

.info {
  font-size: 13px;
  margin-bottom: 15px;
  float: left;
}

tab {
  background-color: inherit;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: medium;
  line-height: 60px;
}
</style>