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
          <router-link to="/articleList/FocusCard" class="navbar-item" active-class="is-active">我的</router-link>
          <router-link to="/articleList/recommend" class="navbar-item" active-class="is-active">最新</router-link>
          <router-link to="/articleList/hotlist" class="navbar-item" active-class="is-active">热榜</router-link>
          <router-link to="/video" class="navbar-item" active-class="is-active">视频</router-link>

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
                <i class="iconfont icon-sousuo"></i>
              </span>
            </p>
          </div>
          <div class="navbar-item">
            <button type="button" class="mybtn button is-rounded nav-line" @click="search">搜索</button>
          </div>
        </div>

        <div class="navbar-end">
          <a href="https://github.com/YYForReal/WeeklyQuestionCommunity" target="blank">
            <el-button class="nav-button">
              <svg
                height="32"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                class="octicon"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </el-button>
          </a>
          <el-dropdown>
            <el-button class="nav-button iconfont icon-tianchongxing-"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/EditArticle/1">
                  <p class="dropdown-item">
                    <i class="iconfont icon-yongyan"></i> 写文章
                  </p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/EditArticle/0">
                  <p class="dropdown-item">
                    <i class="iconfont icon-wenti"></i> 发问答
                  </p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/EditArticle/2">
                  <p class="dropdown-item">
                    <i class="iconfont icon-xuanzeti"></i> 设选择
                  </p>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 登录后的显示的user-icon -->
          <el-dropdown v-if="loginState">
            <el-button class="nav-button iconfont icon-dengluyonghu"></el-button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/person">
                  <p class="dropdown-item">
                    <i class="iconfont icon-dengluyonghu"></i>主页
                  </p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/person">
                  <p class="dropdown-item">
                    <i class="iconfont icon-shezhi"></i>设置
                  </p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a @click="logout">
                  <p class="dropdown-item">
                    <i class="iconfont icon-tuichu"></i>退出
                  </p>
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button class="nav-button iconfont icon-zhuce" @click="$router.push('/login')" v-else></el-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    loginState(){
      return this.$store.state.isLogin;
    }
  },
  watch: {},
  mounted() {
    // this.$E.$on("State", (state) => {
    //   this.loginState = state;
    // });
  },
  methods: {
    ...mapMutations(["setLogin","setUserInfo"]),
    logout() {
      console.log("navHeader get userInfo from vuex :",this.$store.state.userInfo);
      localStorage.removeItem("user");
      console.log("removeItem");
      // this.state = false;
      this.setLogin(false);
      this.setUserInfo(null);
      // 如果不在首页，跳转回首页
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
      // 刷新页面
      // this.$router.go(0);

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
<style lang="css" scoped>
.navbar-end {
  align-items: center;
}

.octicon {
  filter: invert(0.1);
  margin-right: 5px;
}

.github-icon {
  margin-right: 5px;
}

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

.navbar-menu {
  min-width: 600px;
  height: 100%;
  margin-right: 0 !important;
}

.nav-button {
  box-sizing: border-box;
  height: 100%;
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  background-color: hsl(0, 100%, 100%);
  border-width: 0px;
  opacity: 0.9;
}
.nav-button:hover {
  background-color: hsl(240, 100%, 95%);
  color: #0052cc;
  opacity: 0.8;
}

.dropdown-item {
  padding-left: 0;
  padding-right: 0;
  text-align: center;
}
</style>
