<template lang="">
    <div class="video-player__container">
        <video id="myVideo" class="video-player__content" preload="metadata" ref="myVideo"></video>
        <div class="video-player__footer">
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
        "https://v1.kwaicdn.com/upic/2022/01/07/10/BMjAyMjAxMDcxMDQyMTdfMjU5NTkyMjMxNl82NDM3MTQ3NDUwNV8wXzM=_b_B241a3e7da7a12322ecbeb0425db9bfb7.mp4?pkey=AAXacIGeNXpYjMuz9i5-EvdVvQ0zlxDemVjKodmWGFRKkkV4_G0i0tiavuUwPWP8Swwhe-3vImstxTkAPM7FQvC756L-KI1ecTrCk0aay1H0u8Tky7RYim136CnTQOVx6uo&tag=1-1647084880-xpcwebdetail-0-f4oyjcqkwu-c82679f9acacbfb0&clientCacheKey=3x2aam963vvss9e_b.mp4",
        "https://v2.kwaicdn.com/upic/2022/02/06/15/BMjAyMjAyMDYxNTE1MzlfMjE2NzgyNTMxM182Njg0MzY5MDEyN18yXzM=_b_B02fb9abc9f81fc3e8fb257d281a45f6a.mp4?pkey=AAVSxaShaD1_e3tPgLCjpwe0gd1OyqzVzY_y9ubZQ-EKPjqj_mgNeuNDew3r55krcZnp-UtAkcAF3gEy9k4ObV8CnTMZ4vyi560a5jK8h4paRIjvUrUy20AYQi8-OV-rCXU&tag=1-1647081830-xpcwebsearch-0-d8hn4yw4jf-24b279dc51fc4f46&clientCacheKey=3xeuyzhu3ci9i8k_b.mp4",
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