<template lang="">
  <div>
    <section>
      <div calss="video-card-box">
        <div class="video-card" v-for="(video,index) in videos">
          <div class="video-img-box">
            <a :href="video.link">
              <img :src="video.img" alt="">
            </a>
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
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        videos: [{
            link: "",
            img: "https://pic3.zhimg.com/v2-78ea4c63ab83097b39cee74029d4011c_640w.jpg?source=382ee89a",
            description: "学习Python Web框架需要学习JavaScript吗？",
            author: "Devil.羽",
            timeLength: "8:30",
            showTimes: "1.6",
            honor: "",
          },
          {
            link: "",
            img: "https://pic1.zhimg.com/v2-7d6558e84fe00832ca52e823d0a7de15_640w.jpg?source=12a79843",
            description: "学习Python Web框架需要学习JavaScript吗？11111111",
            author: "Devil.羽",
            timeLength: "8:30",
            showTimes: "1.6",
            honor: "超多赞同",
          },
          {
            link: "",
            img: "https://pic3.zhimg.com/v2-78ea4c63ab83097b39cee74029d4011c_640w.jpg?source=382ee89a",
            description: "学习Python Web框架需要学习JavaScript吗？11111111111",
            author: "Devil.羽",
            timeLength: "8:30",
            showTimes: "1.6",
            honor: "",
          },
          {
            link: "",
            img: "https://pic3.zhimg.com/v2-78ea4c63ab83097b39cee74029d4011c_640w.jpg?source=382ee89a",
            description: "学习Python Web框架需要学习JavaScript吗？",
            author: "Devil.羽",
            timeLength: "8:30",
            showTimes: "1.6",
            honor: "",
          },
          {
            link: "",
            img: "https://pic1.zhimg.com/v2-7d6558e84fe00832ca52e823d0a7de15_640w.jpg?source=12a79843",
            description: "学习Python Web框架需要学习JavaScript吗？",
            author: "Devil.羽",
            timeLength: "8:30",
            showTimes: "1.6",
            honor: "超多赞同",
          },
          {
            link: "",
            img: "https://pic1.zhimg.com/v2-7d6558e84fe00832ca52e823d0a7de15_640w.jpg?source=12a79843",
            description: "学习Python Web框架需要学习JavaScript吗？",
            author: "Devil.羽",
            timeLength: "8:30",
            showTimes: "1.6",
            honor: "超多赞同",
          },
        ],
      }
    }
  }

</script>
<style lang="">

</style>
