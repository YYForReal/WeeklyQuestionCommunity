<template>
  <div class="music-box" :class="{ rotating: playing }" @click="handleClick()">
    <img src="https://source.acexy.cn/view/X9Fw0XQ" onerror="this.src='https://source.acexy.cn/view/X9Fw0XQ'" />
    <audio ref="audioRef" :src="source" autoplay></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playing: true,
      // imgSrc: "https://source.acexy.cn/view/X9Fw0XQ",
      // errorImage: 'this.src="' + require('https://source.acexy.cn/view/X9Fw0XQ') + '"'  ,
      source: "http://music.163.com/song/media/outer/url?id=2081057.mp3",
    };
  },
  mounted(){
      try{
        this.$refs.audioRef.oncanplay = ()=>{
          this.$refs.audioRef.volume = 0.5;
        }
        console.log(this.$refs);
      }catch(err){
        console.log("set audio volume error",err);
      }
  },
  methods:{
    handleClick() {
        this.playing = !this.playing;
        // if(this.playing)
        if(this.playing){
            this.$refs.audioRef.play();
        }else{
            this.$refs.audioRef.pause();
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