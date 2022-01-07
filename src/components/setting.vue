<template>
  <div class="container" id="page" style="min-height: 580px">
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="box control">
          <!-- 昵称和个性签名 -->
          <userInfo></userInfo>
          <hr />
          <tabs>
            <tab title="修改密码">
              <!-- 验证身份 -->
              <div class="field">
                <div class="control">
                  <div class="field is-grouped">
                    <p class="control has-icons-left">
                      <input
                        type="password"
                        class="input"
                        v-model="verifyPwdInput"
                        placeholder="请输入您的密码"
                      />
                      <span class="icon is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                    <div class="control">
                      <button
                        class="button"
                        @click="verifyPwd"
                        style="background-color: #0066ff; color: white"
                      >
                        身份验证
                      </button>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <p class="help" id="verifyPwdInfo"></p>
                  </div>
                </div>
              </div>
            </tab>
            <tab title="绑定邮箱">
              <!-- 验证身份 -->
              <div class="field">
                <div class="control">
                  <div class="field is-grouped">
                    <p class="control has-icons-left">
                      <input
                        type="password"
                        class="input"
                        v-model="verifyEmailInput"
                        placeholder="请输入您的密码"
                      />
                      <span class="icon is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                    <div class="control">
                      <button
                        class="button"
                        @click="verifyEmail"
                        style="background-color: #0066ff; color: white"
                      >
                        身份验证
                      </button>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <p class="help" id="verifyEmailInfo"></p>
                  </div>
                </div>
              </div>
            </tab>
          </tabs>

          <!-- 修改密码 -->
          <modal title="修改密码" v-show="pwdModal">
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input
                  type="password"
                  class="input"
                  placeholder="新的密码"
                  id="password"
                  v-model="password"
                  @input="pwdInput"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <span
                  class="icon is-right is-clickable"
                  @click="showPassword('#fa-eye')"
                >
                  <i class="fas fa-eye" id="fa-eye"></i>
                </span>
              </div>
              <p class="help is-hidden" id="passwordInfo"></p>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  type="password"
                  class="input"
                  placeholder="确认密码"
                  id="confirmPwd"
                  v-model="confirmPassword"
                  @input="confirmPwdInput"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <p class="help is-hidden" id="confirmInfo"></p>
            </div>
            <div class="field">
              <div class="control">
                <button
                  class="button input"
                  id="modalBtn"
                  @click="changePwd"
                  style="background-color: #8fc3ff; color: white"
                >
                  确认
                </button>
              </div>
            </div>
          </modal>
          <!-- 绑定邮箱 -->
          <modal title="绑定邮箱" v-show="emailModal">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  type="email"
                  class="input"
                  placeholder="新的邮箱地址"
                  id="email"
                  v-model="email"
                  @input="emailInput"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <p class="help is-hidden" id="emailInfo"></p>
            </div>

            <div class="field has-addons">
              <div class="control has-icons-left">
                <input
                  type="text"
                  class="input"
                  placeholder="请输入4位邮箱验证码"
                  id="emailCode"
                  size="40"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-shield"></i>
                </span>
              </div>
              <div class="control">
                <button class="button">获取邮箱验证码</button>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button
                  class="input button"
                  id="modalBtn"
                  @click="changeEmail"
                  style="background-color: #8fc3ff; color: white"
                >
                  确认
                </button>
              </div>
            </div>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "./loginTab.vue";
import Tabs from "./loginTabs.vue";
import userInfo from "./userInfo.vue";
import verify from "./verify.vue";
import modal from "./modal.vue";

export default {
  data() {
    return {
      showPwdModal: "",
      pwdModal: false,
      emailModal: false,

      isLegalPwd: false,
      isLegalConPwd: false,

      isLegalEmail: false,

      password: "",
      confirmPassword: "",
      email: "",

      verifyPwdInput: "",
      verifyEmailInput: "",
    };
  },
  components: {
    Tab,
    Tabs,
    userInfo,
    verify,
    modal,
  },
  methods: {
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
    // 判断密码是否由字母、数字和特殊字符3种组合组成
    checkPwd(value) {
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

    // 点击眼睛图标可查看密码
    showPassword(iconId) {
      var password = $("#password");
      if (password.attr("type") == "password") {
        $(iconId).attr("class", "fas fa-eye-slash");
        password.attr("type", "text");
      } else {
        $(iconId).attr("class", "fas fa-eye");
        password.attr("type", "password");
      }
    },
    // 验证身份--修改密码
    verifyPwd() {
      let that = this;
      let st = localStorage.getItem("user");
      st = JSON.parse(st);
      let pwd = this.verifyPwdInput;
      pwd = this.$md5(pwd);
      if (pwd == st.password) {
        that.$message({
          type: "success",
          message: "验证通过！",
        });
        that.pwdModal = true;
      } else {
        that.$message({
          type: "error",
          message: "密码错误！",
        });
        that.$router.push("/setting");
      }
    }, // 验证身份--绑定邮箱
    verifyEmail() {
      let that = this;
      let st = localStorage.getItem("user");
      st = JSON.parse(st);
      let pwd = this.verifyEmailInput;
      pwd = this.$md5(pwd);
      if (pwd == st.password) {
        that.$message({
          type: "success",
          message: "验证通过！",
        });
        that.emailModal = true;
      } else {
        that.$message({
          type: "error",
          message: "密码错误！",
        });
        that.$router.push("/setting");
      }
    },
    // 修改密码
    changePwd() {
      if (!this.isLegalPwd || !this.isLegalConPwd) {
        this.$message({
          type: "error",
          message: "请检查输入是否合法！",
        });
        return;
      }
      let that = this;
      let st = localStorage.getItem("user");
      st = JSON.parse(st);
      let userId = st.userId;
      let pwd = this.password;
      console.log(userId);
      console.log(pwd);
      pwd = this.$md5(pwd);
      $.ajax({
        type: "post",
        url: that.baseUrl + "/user/postPassword",
        async: true,
        data: { userId: userId, password: pwd },
        success: function (data) {
          that.$message({
            type: "success",
            message: "修改密码成功！",
          });
          that.$router.go(1);
        },
        error: function () {
          that.$router.go(1);
          console.log("修改密码失败!");
        },
      });
      that.$router.go(-1);
    },
    // 绑定邮箱
    changeEmail() {
      if (!this.isLegalEmail) {
        this.$message({
          type: "error",
          message: "请检查输入是否合法！",
        });
        return;
      }
      let that = this;
      // $.ajax({
      //   type: "post",
      //   url: "http://localhost:9000/user/postEmail",
      //   data: { userId: userId, email: that.email },
      //   success: function (data) {
      //     console.log(data);

      //   },
      //   error: function () {
      //     console.log("绑定邮箱失败!");
      //   },
      // });
    },
    // 监听密码输入框
    pwdInput() {
      var password = $("#password");
      var passwordInfo = $("#passwordInfo");
      let flag = false;
      if (password.val() == "") {
        password.attr("class", "input");
        this.setHiddenInfo(passwordInfo);
      } else if (password.val().length < 8 || password.val().length > 16) {
        this.setDangerInput(password);
        this.setDangerInfo(passwordInfo);
        passwordInfo.html("密码长度必须为8-16位！");
      } else if (!this.checkPwd(password.val())) {
        this.setDangerInput(password);
        this.setDangerInfo(passwordInfo);
        passwordInfo.html("密码必须由字母、数字和特殊字符3种组合组成！");
      } else {
        this.setSuccessInfo(passwordInfo);
        this.setSuccessInput(password);
        passwordInfo.html("该密码可用！");
        flag = true;
      }

      this.isLegalPwd = flag;
    },

    // 监听确认密码输入框
    confirmPwdInput() {
      var password = $("#password");
      var confirmPwd = $("#confirmPwd");
      var confirmInfo = $("#confirmInfo");
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
      this.isLegalConPwd = flag;
    },
    // 检查邮箱是否合法,合法返回true
    checkEmail(e) {
      let emailRegx = /^\S+@\S+\.\S+$/;
      return emailRegx.test(e);
    },
    emailInput() {
      let email = $("#email");
      let emailInfo = $("#emailInfo");
      let flag = false;
      if (email.val() == "") {
        this.setHiddenInfo(emailInfo);
        email.attr("class", "input");
      } else if (!this.checkEmail(email.val())) {
        this.setDangerInput(email);
        this.setDangerInfo(emailInfo);
        emailInfo.html("请检查邮箱地址是否合法！");
      } else {
        this.setSuccessInfo(emailInfo);
        this.setSuccessInput(email);
        emailInfo.html("该邮箱地址合法！");
        flag = true;
      }
      this.isLegalEmail = flag;
    },
  },
};
</script>
<style lang="css" src="../assets/css/bulma.min.css" scoped>
</style>

<style scoped >
/* @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"; */
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
</style>