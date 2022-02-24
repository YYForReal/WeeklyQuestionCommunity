<template>
  <el-card class="video-card">
    <div
      class="video-img-box"
      @mouseover="handlePreview(true)"
      @mouseleave="handlePreview(false)"
    >
      <a class="can-tap video-area" @click="dialogVisible = true">
        <img
          :src="video.cover"
          :alt="video.title"
          v-show="!isPreview"
          ref="favorImg"
        />
        <video
          :src="video.url"
          ref="favorVideo"
          v-show="isPreview"
          autoplay
          loop
          muted
        ></video>
      </a>

      <div class="darkmode-ignore video-img-text" v-show="!isHover">
        <p class="img-left-text iconfont icon-24gl-play">
          {{ video.showTimes }}播放
        </p>

        <p class="video-card-time">{{ timeLength }}</p>
      </div>
      <div class="progress-box">
        <span class="progress-line" ref="favorProgress"></span>
      </div>
    </div>

    <div class="content-box">
      <a href="#" class="video-title wrap-line2">{{ video.title }}</a>
    </div>
    <div class="height40"></div>
    <!-- 收藏卡片：需要展示用户信息+收藏数 -->
    <div class="video-bottom">
      <div class="user-info">
        <img
          class="video-avatar"
          :src="
            video.authorAvatar
              ? video.authorAvatar
              : 'https://source.acexy.cn/view/X7SNmF1'
          "
          :alt="video.authorAvatar"
        />
        <p class="video-card-author">{{ video.authorNickName }}</p>
        <!-- <div class="honor red" v-if="video.honor != ''">
            {{ video.honor }}
          </div> -->
      </div>

      <p
        class="video-card-menu"
        :class="{
          'el-icon-star-off': !isFavor,
          'el-icon-star-on': isFavor,
          yellow: isFavor,
        }"
        @click="handleFavor()"
      >
        {{ formatLikes(video.love) }}
      </p>
    </div>
    <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible">
      <template slot="title">
        <div class="titleZise">
          <h2>{{ video.title }}</h2>
          <p class="wrap-line2 desc">({{ video.desc }})</p>
        </div>
      </template>
      <video controls autoplay>
        <source :src="video.url" type="video/mp4" />
      </video>
    </el-dialog>
  </el-card>
</template>
<script>
import http from "@/utils/http.js";

export default {
  data() {
    return {
      isShowMore: false,
      isFavor: true,
      userId: null,
      isHover: false,
      isPreview: false,
      dialogVisible: false,
      previewTimer: null, //预览的前置延时器
      showTimer: null, //播放的定时器
      timeLength: "",
      height: "", //响应式的视频大小（跟随封面图）
      width: "",
    };
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    let userId = sessionStorage.getItem("userId");
    if (userId) {
      this.userId = userId;
    }
    this.$refs.favorVideo.addEventListener("canplay", this.formatTimeLength);
  },
  beforeDestroy() {
    if (this.showTimer) {
      clearInterval(this.showTimer);
      this.showTimer = null;
    }
    if (this.previewTimer) {
      clearTimeout(this.previewTimer);
      this.previewTimer = null;
    }
  },
  methods: {
    formatLikes(likes) {
      // get from video-card
      let numStr = likes.toString().split(".")[0];
      return numStr.length < 5
        ? numStr
        : numStr.slice(0, numStr.length - 4) +
            "." +
            numStr[numStr.length - 4] +
            "w";
    },
    formatTimeLength() {
      try {
        this.timeLength = this.$refs.favorVideo.duration;
      } catch (err) {
        console.warn("favor-card formatTimeLength");
      }
      var minutes = ("0" + parseInt(this.timeLength / 60, 10).toFixed(0)).slice(
        -2
      );
      var seconds = ("0" + parseInt(this.timeLength % 60, 10).toFixed(0)).slice(
        -2
      );
      this.timeLength = minutes + ":" + seconds; //获取时长
    },
    formatTime(d) {
      d = new Date(d);
      let resDate =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2);
      let resTime =
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2);
      return resDate + " " + resTime; // 将 发布时间 转成了一个 格式化的时间字符串  yyyy-MM-dd HH:mm:ss
    },

    trackProgress() {
      //计算并修改进度条
      let duration = this.$refs.favorVideo.duration;
      let progress = this.$refs.favorVideo.currentTime;
      this.$refs.favorProgress.style.width =
        (parseFloat(progress) / parseFloat(duration)) * 100 + "%";
    },
    handlePreview(flag) {
      this.isHover = flag;
      if (flag) {
        //进入
        if (this.previewTimer) {
          clearTimeout(this.previewTimer);
        }

        this.previewTimer = setTimeout(() => {
          //手动 赋值 封面图的宽高 给 视频，防止宽高比不匹配而出现页面抖动
          if (this.$refs.favorImg.height != 0 && this.height == "") {
            this.height = this.$refs.favorImg.height;
            this.width = this.$refs.favorImg.width;
          }
          this.isPreview = true;
          if (this.height != "") {
            this.$refs.favorVideo.style.height = this.height + "px";
            this.$refs.favorVideo.style.width = this.width + "px";
          }

          this.$refs.favorVideo.play();
          if (this.showTimer) {
            clearInterval(this.showTimer);
            this.showTimer = null;
          }
          this.showTimer = setInterval(() => {
            this.trackProgress();
          }, 500);
        }, 500);
      } else {
        //离开
        this.isPreview = false;
        this.height = "";
        if (this.showTimer) {
          clearInterval(this.showTimer);
          this.showTimer = null;
          this.$refs.favorVideo.pause();
        }
        if (this.previewTimer) {
          clearTimeout(this.previewTimer);
        }
      }
    },
    handleFavor() {
      this.isFavor = !this.isFavor;
      if (this.isFavor) {
        this.video.love++;

        //重新收藏
        http
          .post("/favour/add", {
            videoId: this.video._id,
            userId: this.userId,
          })
          .then((res) => {
            if (res.data.code == 400) {
              this.networkFlag = -1;
              this.message = res.data.data.msg;
            } else  {
              this.networkFlag = 1;
              this.$store.commit("setFavorNumber",this.$store.state.favorNumber + 1);
              this.$message({
                type:'success',
                message:'重新收藏成功'
              })
            }
          })
          .catch((err) => {
            console.log(err);
            this.networkFlag = -1;
            this.message = err;
          });
      } else {
        this.video.love--;
        //取消收藏
        http
          .post("/favour/delete", {
            videoId: this.video._id,
            userId: this.userId,
          })
          .then((res) => {
            console.log(res);
            if (res.data.code == 400) {
              this.networkFlag = -1;
              this.message = res.data.data.msg;
            } else {
              this.networkFlag = 1;
              this.$store.commit("setFavorNumber",this.$store.state.favorNumber - 1);
              this.$message({
                type:'success',
                message:'取消收藏成功'
              })
            }
          })
          .catch((err) => {
            console.log(err);
            this.networkFlag = -1;
            this.message = err;
          });
      }
    },

  },
  // watch: {
  //   video: {
  //     deep: true,
  //   },
  // },
};
</script>
<style lang="scss" scoped>
/* 普通类，想放进common.css中 */

/* 清除浮动 */
.clearfix {
  clear: both;
}

/* 多行文本限制 */
.wrap-line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

a {
  text-decoration: none;
}

.yellow {
  color: rgb(231, 231, 21);
}

// 深度作用选择器
::v-deep .el-card__body {
  padding: 0;
}

// 兼容移动端的响应式
@media (min-width: 320px) {
  .video-card {
    width: 52%;
  }
}
@media (min-width: 375px) {
  .video-card {
    width: 66%;
  }
}
@media (min-width: 425px) {
  .video-card {
    width: 77%;
  }
}

@media screen and (min-width: 1596px) {
  .video-card {
    width: 19%;
  }
}
@media (min-width: 1140px) {
  .video-card {
    width: 24%;
  }
}
@media (min-width: 884px) {
  .video-card {
    width: 30%;
  }
}
@media (max-width: 884px) {
  .video-card {
    width: 48%;
  }
}
// 填充类
.height40 {
  width: 100%;
  height: 40px;
}

/* 视频卡片 */
.video-card {
  display: block;
  box-sizing: border-box;
  margin: 10px 12px;
  overflow: hidden;
  padding: 0;
  border-radius: 5px;
  position: relative;

  animation-name: showBig;
  animation-duration: 0.8s;


  .video-img-box {
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 25vh;
    max-height: 30vh;
    margin: 0;
    overflow: hidden;
    display: inline-block;

    .video-area {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 25vh;
      max-height: 30vh;
      img {
        width: 100%;
        height: 100%;
        min-height: 25vh;
        max-height: 30vh;
        background: black 50% 50% no-repeat;
        object-fit: contain;
        transition: all 0.5s;
        opacity: 0.95;
      }
      video {
        width: 100%;
        height: 100%;
        min-height: 25vh;
        max-height: 40vh; // 300
        background: black 50% 50% no-repeat;
        transition: all 0.5s;
        opacity: 0.95;
      }
      img:hover {
        /* 放大特效 */
        transform: scale(1.5, 1.5);
      }
    }
    .video-img-text {
      display: flex;
      position: absolute;
      bottom: 5px;
      width: 100%;
      color: rgb(255, 255, 255);

      justify-content: space-between;
      //  图片左下方： 播放量 || 赞同
      .img-left-text {
        display: block;
        height: 20px;
        font-size: large;
      }
      .favor-icon {
        color: yellow;
        font-size: larger;
      }
      //  时长
      .video-card-time {
        display: block;
        height: 20px;
        font-size: large;
        opacity: 1;
        margin-right: 5px;
      }
    }
    .progress-box {
      position: absolute;
      bottom: 1px;
      width: 100%;
      height: 2px;
      z-index: 99;
      .progress-line {
        display: block;
        background-color: rgb(89, 0, 255);
        height: 3px;
        width: 0%;
      }
    }
  }
  .content-box {
    display: block;
    width: 100%;
    top: 0;
    color: white;
    margin-left: 5px;
    opacity: 0.9;
    // 视频标题
    .video-title {
      margin-top: 5px;
      margin-bottom: 5px;
      color: #222;
      font-weight: bold;
      font-size: 1.2em;
      text-overflow: ellipsis;
    }
  }
  .video-bottom {
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0px;
    align-content: center;
    justify-content: space-between;
    .user-info {
      display: flex;
      margin-left:5px;
      // 作者
      .video-card-author {
        color: rgb(82, 80, 80);
        line-height: 40px;
        margin-left: 5px;
      }
      //作者头像
      .video-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: text-top;
      }
    }
    // 关注的按钮
    .video-card-menu {
      float: right;
      cursor: pointer;
      margin-right: 5px;
    }
    // 视频荣誉标签
    .honor {
      display: inline-block;
      font-size: small;
      color: red;
      text-align: center;
      background-color: #fff0ea;
    }

    .video-release {
      font-size: small;
      color: grey;
    }
  }
}

/* 大屏视频 */
::v-deep .el-dialog {
  margin-top: 10px !important;

  video {
    width: 100%;
    height: 100%;
    max-height: 80vh;
    background-color: #000 ;
  }
}

/*视频描述 */
.desc {
  font-size: large;
  font-weight: 400;
  margin-top: 5px;
}

/* 关注收藏的按钮 */
.el-icon-star-on::before,
.el-icon-star-off::before {
  font-size: 2rem;
}


/* 动画 */
@keyframes showBig{
  0%{
    transform: scale(0);
  }
  95%{
    transform: scale(1.05);
  }
  100%{
    transform: scale(1);
  }
}


/* 阿里巴巴图标库 */
@font-face {
  font-family: "iconfont"; /* Project id 3148618 */
  src: url("//at.alicdn.com/t/font_3148618_7hovwfsl5a4.woff2?t=1643787037449")
      format("woff2"),
    url("//at.alicdn.com/t/font_3148618_7hovwfsl5a4.woff?t=1643787037449")
      format("woff"),
    url("//at.alicdn.com/t/font_3148618_7hovwfsl5a4.ttf?t=1643787037449")
      format("truetype"),
    url("//at.alicdn.com/t/font_3148618_7hovwfsl5a4.svg?t=1643787037449#iconfont")
      format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-24gl-play:before {
  content: "\ea6d";
}

.icon-shoucang:before {
  content: "\e602";
}

.icon-shoucang1:before {
  content: "\e8c6";
}
</style>