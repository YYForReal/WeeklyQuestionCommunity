<template lang="">
  <div>
        <video :src="src" style="width:100%" preload controls ></video>

      <!-- <div calss="video-card-box">
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
      </div> -->
      <!-- <div class="list-end">没有更多内容</div> -->
      <!-- <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="90%"
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // dialogVisible: true,
      src: "https://rrcache.hs-mould.cn/qiyi/cache/ku/8e46ee3ed63391eb1bc41b68599f5c40.mp4",
      // videos: [
      //   {
      //     src: "https://om.tc.qq.com/gzc_1000102_0b53qeaaeaaaguab567utbq4baodakgqabsa.f2.mp4?vkey=C0334BD8A9059AD4A578E57AE672989A7CEED92092F82ABDD38096D157C24C86973BC6825900A03B1AA74CB6F90859104477CDF90A7BF0BA3C61E2394DA1673B9F868A1BCF23D5E8855C2ECFC49B0B16521432688C53B66B34AF18B8DBE97F0CCF5D2AA014B8051AA42AE9334951A2024C9C66956EFD682791414CDE4CEC09B493F7731331FB91B4",
      //     img: "https://pic1.zhimg.com/v2-7d6558e84fe00832ca52e823d0a7de15_640w.jpg?source=12a79843",
      //     description: "学习Python Web框架需要学习JavaScript吗？11111111",
      //     author: "Devil.羽",
      //     timeLength: "8:30",
      //     showTimes: "1.6",
      //     honor: "超多赞同",
      //   },
      // ],
    };
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