<template lang="">
  <div v-if="isShow" class="back-top-box">
    <i class="back-top iconfont icon-huojian1 canTap " :class="{'animation-move':isAnimation}" title="回到顶部"
      @click="backToTop()"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      isAnimation: false,
    };
  },
  methods: {
    backToTop() {
      this.isAnimation = true;
      let that = this;
      console.log(document.documentElement.scrollTop);
      let delt = document.documentElement.scrollTop / 150.0;
      // console.log(delt);
      let timer = setInterval(function () {
        document.documentElement.scrollTop -= delt;
        if (document.documentElement.scrollTop <= delt) {
          clearInterval(timer);
          that.isAnimation = false;
        }
      }, 2);
    },
    reload() {
      let bodyHeight = document.body.scrollHeight;
      let screenHeight = window.screen.height; //屏幕高度
      console.log("bodyHeight : ", bodyHeight);
      console.log("screenHeight : ", screenHeight);
      if (bodyHeight > screenHeight) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  mounted() {
    let _this = this;
    window.addEventListener("scroll", (e) => {
      _this.isShow = true;
    });
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        this.reload();
      },
    },
  },
};
</script>


<style lang="">
.icon-huojian1:before {
  font-size: 5rem ;
}
</style>

<style >
.back-top {
  position: fixed;
  width: 5rem;
  height: 5rem;
  right: 5rem;
  bottom: 6rem;
  font-size: 5rem;
  color: red;
}

.animation-move {
  -webkit-animation: moveUp 0.9s ease-in-out;
  animation: moveUp 0.9s ease-in-out;
}
@keyframes moveUp {
  0% {
    bottom: 6rem;
  }
  99% {
    bottom: 120%;
  }
  100% {
    bottom: 6rem;
  }
}
</style>
