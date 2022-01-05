<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="box">
        <!-- 昵称和个性签名 -->
        <userInfo></userInfo>
        <hr />
        <tabs>
          <tab title="修改密码">
            <verify :show-modal.sync="showPwdModal"></verify>
          </tab>
          <tab title="绑定邮箱">
            <verify></verify>
          </tab>
        </tabs>
        <!-- 修改密码 -->
        <modal title="修改密码">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input
                type="password"
                class="input"
                placeholder="新的密码"
                id="password"
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
                style="background-color: #4a4a4a; color: white"
              >
                确认
              </button>
            </div>
          </div>
        </modal>
        <!-- 绑定邮箱 -->
        <modal title="绑定邮箱">
          <div class="field">
            <div class="control has-icons-left">
              <input
                type="email"
                class="input"
                placeholder="新的邮箱地址"
                id="email"
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
                style="background-color: #4a4a4a; color: white"
              >
                确认
              </button>
            </div>
          </div>
        </modal>
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

    // 监听密码输入框
    pwdInput() {
      var password = $("#password");
      var passwordInfo = $("#passwordInfo");

      if (password.val() == "") {
        password.attr("class", "input");
        this.setHiddenInfo(passwordInfo);
      } else if (password.val().length < 8 || password.val().length > 16) {
        this.setDangerInput(password);
        this.setDangerInfo(passwordInfo);
        passwordInfo.html("密码长度必须为8-16位！");
      } else if (!this.isLegalPwd(password.val())) {
        this.setDangerInput(password);
        this.setDangerInfo(passwordInfo);
        passwordInfo.html("密码必须由字母、数字和特殊字符3种组合组成！");
      } else {
        this.setSuccessInfo(passwordInfo);
        this.setSuccessInput(password);
        passwordInfo.html("该密码可用！");
      }
    },

    // 监听确认密码输入框
    confirmPwdInput() {
      var password = $("#password");
      var confirmPwd = $("#confirmPwd");
      var confirmInfo = $("#confirmInfo");

      if (confirmPwd.val() == "") {
        confirmPwd.attr("class", "input");
        this.setHiddenInfo(confirmInfo);
      } else if (confirmPwd.val() == password.val()) {
        this.setSuccessInput(confirmPwd);
        this.setHiddenInfo(confirmInfo);
      } else {
        this.setDangerInput(confirmPwd);
        this.setDangerInfo(confirmInfo);
        confirmInfo.html("两次密码输入不一致！");
      }
    },
    // 检查邮箱是否合法,合法返回true
    checkEmail(e) {
      let emailRegx = /^\S+@\S\.\S+$/;
      return emailRegx.test(e);
    },
    emailInput() {
      let email = $("#email");
      let emailInfo = $("#emailInfo");
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
      }
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
</style>