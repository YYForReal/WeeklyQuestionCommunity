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
        </div>

        <div class="navbar-end">
          <el-dropdown>
            <el-button
              class="writing-button iconfont icon-tianchongxing-"
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/EditArticle/1">
                  <p class="dropdown-item"><i class="iconfont icon-yongyan"></i>写文章</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/EditArticle/0">
                  <p class="dropdown-item "><i class="iconfont icon-wenti"></i>发问题</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/EditArticle/2">
                  <p class="dropdown-item "><i class="iconfont icon-xuanzeti"></i>设问题</p>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 登录后的显示的user-icon -->
          <el-dropdown v-if="loginState">
            <el-button
              class="writing-button user-bar"
              style="font-size: 0.55rem"
              ><i class="fas fa-user fa-3x"></i>
            </el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/setting" >
                  <p class="dropdown-item"><i class="fas fa-user"></i>主页</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/setting">
                  <p class="dropdown-item"><i class="fas fa-cog"></i>设置</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="logout">
                  <p class="dropdown-item"><i class="fas fa-sign-out-alt"></i>退出</p>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          
          <!-- <div class="navbar-item" v-if="loginState">
            <p
              class="navbar-link is-arrowless user-bar"
              style="font-size: 0.55rem"
              ><i class="fas fa-user fa-3x"></i>
            </p>
            <div class="navbar-dropdown mydropdown">
              <router-link to="/setting" class="navbar-item"
                ><i class="fas fa-user"></i>&nbsp;我的主页</router-link
              >
              <router-link to="/setting" class="navbar-item"
                ><i class="fas fa-cog"></i>&nbsp;设置</router-link
              >
              <a class="navbar-item is-clickable" @click="logout">
                <i class="fas fa-sign-out-alt"></i>&nbsp;
              </a>
            </div>
          </div> -->

          <!-- 未登录时显示的user-icon -->
          <!-- <router-link to="/login" class="navbar-item" v-else>
            <span class="icon" style="font-size: 0.45rem">
              <i class="fas fa-user-plus fa-3x"> </i>
            </span>
          </router-link> -->

          <el-button
            class="writing-button user-bar"
            style="font-size: 0.55rem"
            @click="$router.push('/login')"
            v-else
          >
            <i class="fas fa-user-plus fa-3x"></i>
          </el-button>
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

<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item {
  display: block;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
<style lang="css" src="@/assets/css/bulma.min.css" scoped></style>
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

.user-bar:hover + .mydropdown {
  display: block;
  height: 93px;
}

.mydropdown {
  margin-top: -3px;
  margin-left: -30px;
  width: 100px;
  overflow: hidden;
  height: 0px;
  transition: all 1s;
}
.mydropdown:hover {
  display: block;
  height: 93px;
}

#navbar {
  display: flex;
  padding: 0;
  width: 100%;
}

.mybtn {
  padding: 0;
}

.navbar-menu {
  min-width: 600px;
  height: 100%;
  margin-right: 0!important;
}

.writing-button {
  box-sizing: border-box;
  height: 100%;
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  background-color: hsl(0, 100%, 100%);
  border-width: 0px;
  opacity: 0.9;
}
.writing-button:hover {
  background-color: hsl(240, 100%, 95%);
  color: #0052cc;
  opacity: 0.8;
}

.dropdown-item {
  margin: 10px auto;
  padding-left: 15px;
  padding-right:15px;
  min-width: 50px;
  text-align: center;
}
</style>
