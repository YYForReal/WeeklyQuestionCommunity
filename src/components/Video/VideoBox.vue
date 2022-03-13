<template lang="">
    <div class="video-player__container">
        <video id="myVideo" class="video-player__content" preload="metadata" ref="myVideo"></video>
        <div class="video-player__footer">
            <input ref="progress" class="video-progress_box" type="range" min="0" max="100" value="0"></input>
            <div class="video-player__volume iconfont icon-24gf-volumeHigh">
              <input type="range" id="myVolume" value="20" min="0" max="100" ref="volumeRange">
            </div>
            <div class="video-player__picture iconfont icon-icon-"></div>
            <div class="video-player__btngroup">
                <div class="video-player__button prev iconfont icon-24gf-previousCircle" ref="prevButton"></div>
                <div class="video-player__button play iconfont icon-24gf-playCircle" ref="playButton"></div>
                <div class="video-player__button next iconfont icon-24gf-nextCircle" ref="nextButton"></div>
            </div>
        </div>
    </div>
  <!-- <div>
        <video :src="src" style="width:100%" autoplay controls ></video>

      <div calss="video-card-box">
        <div class="video-card" v-for="(video,index) in videos">
          <div class="video-img-box" @click="handleClickVideo(video)">
              <video width="100%" height="100%" :src="video.src"></video>
          </div>
          <div class="content-box">
            <span class="float-left iconfont icon-24gl-play">{{video.showTimes}}万播放</span>
            <span class="float-right">{{video.timeLength}}</span>
            <div class="clearfix"></div>
            <p class="description wrap-line2">{{video.description}}</p>
          </div>
          <div class="video-bottom">
            <span class="video-card-author">{{video.author}}</span>
            <div class="honor red" v-if="video.honor!=''">{{video.honor}}</div>
            <a class="float-right iconfont icon-24gf-ellipsis"></a>
          </div>
        </div>
      </div>
      <div class="list-end">没有更多内容</div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="90%"
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div> -->
</template>
<script>
import MyVideo from '@/assets/js/MyVideo.js';
export default {
  data() {
    return {
      // src: "https://rrcache.hs-mould.cn/qiyi/cache/ku/8e46ee3ed63391eb1bc41b68599f5c40.mp4",
      // src: "http://www.yywebsite.cn/video/jump.mp4",
      videoList: [
        "https://apd-vlive.apdcdn.tc.qq.com/vipzj.video.tc.qq.com/gzc_1000102_0b53uqaaeaaaayadpsnsq5q4bjgdakuqabsa.f2.mp4?vkey=402253305177613779C104C730AE075D559BF8338F7072C4A76599A1D899C1B8CDF10D11B58239FCD6C2BE7FFB3812FEE537D6EE6315C441178008BE862999AAF0951CC05470179E9D39EFC15FFBCBAF22C3A3F09BBA19191C29F39198A989EA721B35C9B27AC140C0FDA9834957A8B75B1483A5C0BDB3D4B76A803E447EE0C903E64C71C64586D7",
        "http://www.yywebsite.cn/video/jump.mp4",

        // "https://v1.kwaicdn.com/upic/2021/12/31/22/BMjAyMTEyMzEyMjU1MjZfMjQ1ODE0MTM1Ml82MzkyNzE1MTI1NV8xXzM=_b_B69a1e6bdc6b43aa861015c0d3d3de53f.mp4?pkey=AAUxINB4Rkx6ejBhXC99x6WXadxg2PIKHQBWMusXboEihBrqoHlDZ2BFPXUcRI4cGlOh2CjG-qYuSidD1jFv5z_ij2A95I4zX3K3sD2uQomuaEvNgBnvAXEiwKJOVpiXPFM&tag=1-1647099725-xpcwebdetail-0-aqleuofjib-0c09706f78b5cef9&clientCacheKey=3x3ir7igg63wxuq_b.mp4",
        // "https://v1.kwaicdn.com/upic/2021/12/28/20/BMjAyMTEyMjgyMDAyMjVfMjI2Nzc3NjgxNV82MzY5NzAzMDExM18xXzM=_b_B875af224751a05209ab7793889663b01.mp4?pkey=AAWwUNG9y2Os1DZxQZ9VZLvEAr4xCn6EYwauMQ9EMhp7etPGdxCOw-S9MplgWL0-lz8sN0pvDVmIw520iPccrhRIsqn3QWjvppxsXCbLySnSlgg0bM4K0RuRiyUcOCABh4o&tag=1-1647099382-xpcwebdetail-0-xldsl4ri4y-a895536f90405acc&clientCacheKey=3xdniye2me4bkze_b.mp4",
        // "https://v2.kwaicdn.com/upic/2022/02/06/15/BMjAyMjAyMDYxNTE1MzlfMjE2NzgyNTMxM182Njg0MzY5MDEyN18yXzM=_b_B02fb9abc9f81fc3e8fb257d281a45f6a.mp4?pkey=AAVSxaShaD1_e3tPgLCjpwe0gd1OyqzVzY_y9ubZQ-EKPjqj_mgNeuNDew3r55krcZnp-UtAkcAF3gEy9k4ObV8CnTMZ4vyi560a5jK8h4paRIjvUrUy20AYQi8-OV-rCXU&tag=1-1647081830-xpcwebsearch-0-d8hn4yw4jf-24b279dc51fc4f46&clientCacheKey=3xeuyzhu3ci9i8k_b.mp4",

      ],
      myVideo: null,
    };
  },
  mounted() {
    this.myVideo = new MyVideo(this.$refs.myVideo);
    this.myVideo.registerVideoList(this.videoList);
    this.myVideo.registerPlayButton(this.$refs.playButton);
    this.myVideo.registerChangeButton(this.$refs.prevButton, this.$refs.nextButton);
    this.myVideo.registerVolumeProgress(this.$refs.volumeRange);
    this.myVideo.registerKeyBoardEvent();
    this.myVideo.registerProgress(this.$refs.progress);

  },
  beforeDestroy() {
    this.myVideo.clearAllListener();
  },
  methods: {
    // handleClickVideo(video) {
    //   console.log("111");
    //   this.src = video.src;
    //   this.dialogVisible = true;
    // },
  },
};
</script>


<style src="@/assets/css/video_iconfont.css"></style>
<style lang="less">
/* 播放器容器 */
.video-player__container {
  background-image: linear-gradient(
    to left top,
    #dd2990,
    #ce39a7,
    #b849bb,
    #9d57cb,
    #7b63d8,
    #6377e9,
    #4389f5,
    #009afe,
    #00b7ff,
    #00d1ff,
    #00e9ff,
    #1ffef0
  );
  width: 800px;
  height: 600px;
  padding-top: 10px;
  margin: 5px auto;
  /* 播放器中间 */
  .video-player__content {
    display: block;
    width: 700px;
    height: 400px;
    margin: 20px auto;
    video {
      width: 100%;
      height: 100%;
    }
  }

  /* 播放器底部 */
  .video-player__footer {
    position: relative;
    width: 100%;
    font-size: 25px;
    .video-progress_box {
      position: absolute;
      display: block;
      top: 1px;
      width: 100%;
      height: 2px;
      z-index: 99;
      cursor: pointer;
      background-color: #fff;
      color: blueviolet;
      opacity: 0.8;
      border: none;
    }
    /* 按钮 */
    .video-player__btngroup {
      display: flex;
      width: 400px;
      height: 100px;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;

      .video-player__button {
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 40px;
        cursor: pointer;
      }
    }
  }

  /* 统一配色 */
  .video-player__button.prev,
  .video-player__button.play,
  .video-player__button.next,
  .video-player__volume::before,
  .video-player__picture {
    color: skyblue;
  }

  /* 微调一下位置，不然播放按钮沉底了 */
  .video-player__button.play::before {
    position: relative;
    top: -3px;
  }
  /* 音量 */
  .video-player__volume {
    position: absolute;
    width: 150px;
    height: 100px;
    line-height: 100px;
    font-size: 40px;
    right: 20px;
  }

  .video-player__volume::before {
    cursor: pointer;
  }

  .video-player__volume input {
    float: right;
    width: 80px;
    margin-top: 40px;
    cursor: pointer;
  }

  /* 截图按钮 */
  .video-player__picture {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 20px;
    line-height: 100px;
    font-size: 40px;
    cursor: pointer;
  }
}
</style>