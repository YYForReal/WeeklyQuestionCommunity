<template>
  <div class="header-box">
    <div class="column"></div>
    <nav class="navbar box is-fullhd navbar-height is-fixed-top" id="navbar">
      <div class="navbar-item"></div>
      <div class="navbar-item">
        <a href="" class="">
          <img src="../assets/image/zhi.png" alt="logo" />
          <img src="../assets/image/hu.png" alt="logo" />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item"></div>

          <a class="navbar-item">首页</a>
          <a class="navbar-item">会员</a>
          <a class="navbar-item">发现</a>
          <a class="navbar-item">等你来答</a>

          <div class="navbar-item"></div>
          <div class="navbar-item"></div>
          <div class="navbar-item"></div>

          <div class="navbar-item">
            <p class="control has-icons-right">
              <input type="text" class="input is-rounded is-normal input-resize nav-line" placeholder="裸考四六级过的可能性"
                size="40" id="searchBox" />
              <span class="icon is-right input-icon">
                <i class="fas fa-search fa-sm"></i>
              </span>
            </p>
          </div>
          <div class="navbar-item">
            <button type="button" class="mybtn button is-rounded nav-line">
              提问
            </button>
          </div>
          <div class="navbar-item">
            <button type="button" class="mybtn button is-rounded nav-line">
              <router-link to="/EditArticle/1"> 编辑文章 </router-link>
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

          <div class="navbar-item has-dropdown is-hoverable">
            <span class="icon dropbtn navbar-link is-arrowless" style="font-size: 0.45rem">
              <i class="fas fa-user fa-3x"></i>
            </span>
            <div class="navbar-dropdown mydropdown">
              <p href="" class="navbar-item" style="margin-bottom: -5px"></p>
              <a href="" class="navbar-item"><i class="fas fa-user"></i>&nbsp;我的主页</a>
              <a href="./setting.html" class="navbar-item"><i class="fas fa-cog"></i>&nbsp;设置</a>
              <a href="./navigation.html" class="navbar-item"><i class="fas fa-sign-out-alt"></i>&nbsp;退出</a>
            </div>
          </div>

          <div class="navbar-item"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {};

</script>

<style scoped>
  @import '../assets/css/bulma.min.css';
  /* @import '../assets/css/all.min.css'; */
  @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
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
    margin-left: -10px;
    font-size: 14px;
  }

  .dropbtn {
    margin-top: -4px;
  }

  .mydropdown {
    margin-top: 4px;
    margin-left: -30px;
    width: 100px;
  }

  .mycenter {
    margin-left: auto;
    margin-right: auto;
  }

  #navbar {
    padding: 0;
  }

  .header-box {
    margin: 0;
    padding: 0;
    height: 0;
  }

</style>
