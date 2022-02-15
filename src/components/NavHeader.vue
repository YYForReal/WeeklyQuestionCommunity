<template>
  <div class="container">
    <div class="column"></div>
    <nav class="navbar box navbar-height is-fixed-top" id="navbar">
      <div class="navbar-item">
        <router-link to="/">
          <h1>问答天地</h1>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">

          <router-link to="/FocusCard" class="navbar-item">我的</router-link>
          <router-link to="/RecommendCard" class="navbar-item"
            >推荐</router-link
          >
          <router-link to="/HotCard" class="navbar-item">热榜</router-link>
          <router-link to="/VideoBox" class="navbar-item">视频</router-link>

          <div class="navbar-item">
            <p class="control has-icons-right">
              <input
                type="text"
                class="input is-rounded is-normal input-resize nav-line"
                placeholder="择日开放"
                size="40"
                id="searchBox"
              />
              <span class="icon is-right input-icon">
                <i class="fas fa-search fa-sm"></i>
              </span>
            </p>
          </div>
          <div class="navbar-item">
            <button
              type="button"
              class="mybtn button is-rounded nav-line"
              @click="search"
            >
              搜索
            </button>
          </div>
          <div class="navbar-item">
            <button type="button" class="mybtn button is-rounded nav-line">
              <router-link class="white" to="/EditArticle/1">
                我要分享
              </router-link>
            </button>
          </div>
          <div class="navbar-item">
            <button type="button" class="mybtn button is-rounded nav-line">
              <router-link class="white" to="/EditArticle/0">
                我要设问
              </router-link>
            </button>
          </div>
        </div>

        <div class="navbar-end">
          <a class="navbar-item">
            <span class="icon" style="font-size: 0.45rem">
              <i class="fas fa-bell fa-3x"></i>
            </span>
          </a>
          <div class="navbar-item"></div>

          <a class="navbar-item">
            <span class="icon" style="font-size: 0.45rem">
              <i class="fas fa-comments fa-3x"></i>
            </span>
          </a>
          <div class="navbar-item"></div>

          <!-- 登录后的显示的user-icon -->
          <div class="navbar-item has-dropdown is-hoverable" v-if="loginState">
            <span
              class="icon dropbtn navbar-link is-arrowless"
              style="font-size: 0.45rem"
            >
              <i class="fas fa-user fa-3x"></i>
            </span>
            <div class="navbar-dropdown mydropdown">
              <p class="navbar-item" style="margin-bottom: -5px"></p>
              <router-link to="/setting" class="navbar-item"
                ><i class="fas fa-user"></i>&nbsp;我的主页</router-link
              >
              <router-link to="/setting" class="navbar-item"
                ><i class="fas fa-cog"></i>&nbsp;设置</router-link
              >
              <a class="navbar-item is-clickable" @click="logout">
                <i class="fas fa-sign-out-alt"></i>&nbsp;退出
              </a>
            </div>
          </div>

          <!-- 未登录时显示的user-icon -->
          <router-link to="/login" class="navbar-item" v-else>
            <span class="icon" style="font-size: 0.45rem">
              <i class="fas fa-user-plus fa-3x"> </i>
            </span>
          </router-link>

          <div class="navbar-item"></div>
          <div class="navbar-item"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// import { set } from "vue/types/umd";
export default {
  data() {
    return {
      loginState: this.isLogin(),
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.$E.$on("State", (state) => {
      this.loginState = state;
    });
  },
  methods: {
    isLogin() {
      if (localStorage.getItem("user") == null) {
        return false;
      } else {
        return true;
      }
    },
    logout() {
      localStorage.removeItem("user");
      console.log("removeItem");
      this.state = false;

      // 如果不在首页，跳转回首页
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
      // 刷新页面
      this.$router.go(0);

      this.$message({
        type: "success",
        message: "成功退出账号！",
      });
    },
    search() {
      let temp = localStorage.getItem("user");
      console.log("localStorage: " + temp);
    },
  },
};
</script>


<style lang="css" src="../assets/css/bulma.min.css" scoped></style>
<style lang="css" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

.navbar-height {
  height: 55px;
}

.input-resize {
  max-width: 400px;
}

.nav-line {
  height: 34px;
  font-size: 15px;
}

.input-icon {
  padding-bottom: 3px;
}

.mybtn {
  background-color: #0066ff;
  color: white !important;
  margin-left: -3px;
  font-size: 14px;
}

.dropbtn {
  margin-top: 6px;
}

.mydropdown {
  margin-top: -3px;
  margin-left: -30px;
  width: 100px;
}

.mycenter {
  margin-left: auto;
  margin-right: auto;
}

#navbar {
  display:flex;
  padding: 0;
  width:100%;
}

.mybtn {
  padding: 0;
}

.navbar-menu{
  min-width:600px;
  height:100%
}
</style>
