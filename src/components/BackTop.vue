<template lang="">
  <div v-if="isShow" class="back-top-box">
    <i class="back-top iconfont icon-huojian1 canTap " :class="{'animation-move':isAnimation,'shake':isShow}" title="回到顶部"
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
      // console.log(document.documentElement.scrollTop);
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
      this.isShow = false;
      // let bodyHeight = document.body.scrollHeight;
      // let screenHeight = window.screen.height; //屏幕高度
      // console.log("bodyHeight : ", bodyHeight);
      // console.log("screenHeight : ", screenHeight);
      // if (bodyHeight > screenHeight) {
      //   this.isShow = true;
      // } else {
      //   this.isShow = false;
      // }
    },
  },
  mounted() {
    let _this = this;
    window.addEventListener("scroll", () => {
      _this.isShow = true;
    });
  },
  watch: {
    $route: {
      handler() {
        this.reload();
      },
    },
  },
};
</script>


<style>
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
  bottom: 6%;
  font-size: 5rem;
  color: red;
  animation: zoomInUp 2s;
}



.animation-move {
  -webkit-animation: moveUp 0.9s ease-in-out;
  animation: moveUp 0.9s ease-in-out;
}
@keyframes moveUp {
  0% {
    bottom: 6%;
  }
  99% {
    bottom: 150%;
  }
  100% {
    bottom: 6%;
  }
}


@keyframes zoomInUp {
  from {
    opacity: 0;
    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacity: 1;
    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }
}

.zoomInUp {
  animation-name: zoomInUp;
}

</style>
