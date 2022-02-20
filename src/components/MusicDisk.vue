<template>
  <div class="music-box" :class="{ rotating: playing }" @click="handleClick()">
    <img :src="imgSrc" />
    <audio ref="audio" :src="source" autoplay></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playing: true,
      imgSrc:
        "https://hbimg.huabanimg.com/bf156e93f3b6b4db3a026b26df2be5d583761d57891b-rYoA1Z_fw658/format/webp",
      source: "http://music.163.com/song/media/outer/url?id=2081057.mp3",
    };
  },
  mounted(){
      console.log(this.$refs.audio);
      this.$refs.audio.oncanplay = function(){
          this.$refs.audio.volume = 0.3;
          console.log("set volume = ",0.3);
      }
  },
  methods:{
    handleClick() {
        this.playing = !this.playing;
        // if(this.playing)
        if(this.playing){
            this.$refs.audio.play();
        }else{
            this.$refs.audio.pause();
        }
    },

  }
};
</script>
<style scoped lang="less">
.music-box {
  position: fixed;
  width: 5rem;
  height: 5rem;
  left: 2rem;
  bottom: 2rem;
  border-radius: 50%;
  cursor:pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.rotating {
  animation: rotate 5s infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>