<template>
  <div class="choice-card">
    <div class="title-box">
      <span class="time">{{ time }}</span>
      <h1 class="title">{{ title }}</h1>
    </div>
    <p class="description" v-html="description"></p>

    <div class="choice-area">
      <p
        v-for="(choice, index) in choices"
        :key="index"
        :class="{
          isSelected: choice.isSelected,
          showAnswer: choice.isCorrect && showAnswer,
        }"
        @click="handleClickAnswer(choice)"
      >{{ baseArr[index] }}.{{ choice.content }}</p>
    </div>
    <div class="submit-button-area">
      <el-button type="primary" round @click="checkAnswers()">检查</el-button>
      <el-button type="success" round @click="seeAnswers()">答案</el-button>
      <el-button class="fade-in" :class="{active:hasShow}" type="info iconfont icon-fenxiang" round @click="shareUrl()"></el-button>
    </div>
  </div>
</template>
<script>
// import {marked} from 'marked'
export default {
  data() {
    return {
      baseArr: ["A", "B", "C", "D", "E", "F", "G"],
      showAnswer: false,
      checkTimer: null,
      hasShow:false,
    };
  },
  mounted() { },
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    choices: {
      type: Array,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },

  computed: {
    description: function () {
      //   console.log(this.content);
      //   console.log(marked.parse(this.content));
      return marked.parse(this.content);
    },
  },
  methods: {
    shareUrl() {
      this.$util.copyUrl(
        '问答社区',
        this.title,
        '选择题',
        this.$message,
        this,
        {
          type: 'success',
          message: '链接复制成功，快去转发给自己的好友吧~'
        }
      );
    },
    checkAnswers() {
      // 增加定时器 防抖
      if (this.checkTimer) {
        return;
      }
      console.log(this.choices);
      //匹配所有Selected 与 答案
      for (let choice of this.choices) {
        if (choice.isSelected != choice.isCorrect) {
          this.$message({
            type: "error",
            message: "答错啦",
            duration: 1000,
          });
          this.checkTimer = setTimeout(() => {
            clearTimeout(this.checkTimer);
            this.checkTimer = null;
          }, 1000);
          return false;
        }
      }
      this.$message({
        type: "success",
        message: "答对啦",
        duration: 1000,
      });
      this.checkTimer = setTimeout(() => {
        clearTimeout(this.checkTimer);
        this.checkTimer = null;
      }, 1000);

      return true;
    },
    seeAnswers() {
      this.hasShow = true;
      if (this.showAnswer == false) {
        this.showAnswer = true;
        setTimeout(() => {
          this.showAnswer = false;
        }, 1000);
      }
    },
    handleClickAnswer(choice) {
      //   console.log(choice);
      choice.isSelected = !choice.isSelected;
      //   if (choice.isCorrect) {
      //   } else {
      //   }
    },
  },
  //  在watch中获取props的值，防止因为延时而无法在mounted中获取的情况。
  watch: {
    choices: {
      handler(newVal) {
        this.myChoices = newVal;
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="less">
.choice-card {
  @media screen and (min-width: 300px) {
    width: 80vw;
  }
  @media screen and (min-width: 768px) {
    width: 40vw;
  }
  box-sizing: border-box;
  border: 1px dotted dodgerblue;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 2px grey;
  margin: 5px auto;
  padding: 5px;
  .title-box {
    position: relative;
    .title {
      font-size: 2rem;
      text-align: center;
    }
    .time {
      position: absolute;
      right: 0;
      opacity: 0.8;
    }
  }
  .description {
    color: brown;
    letter-spacing: 0.3ch;
    text-indent: 2rem;
    text-align: justify;
  }
  .choice-area {
    width: 100%;
    opacity: 0.9;
    margin-top: 10px;
    p {
      line-height: 2rem;
      margin: 15px auto;
      padding-left: 8px;
      padding-right: 8px;
      background-color: #e5ff4f;
      border: 1px solid blue;
      border-radius: 5px;

      &:hover {
        color: blue;
        background-color: skyblue;
      }
      cursor: pointer;
    }
    p.isSelected {
      color: blue;
      background-color: rgb(135, 235, 135);
    }
    p.showAnswer {
      transform-origin: top center;
      animation: swing 1s;
    }
  }
  .submit-button-area {
    display: flex;
    width: 100%;
    justify-content: center;
    .submit-button {
      display: block;
    }
  }
  .fade-in{
    opacity: 0;
    transition: all 1s;
  }
  .fade-in.active{
    opacity: 1;
  }
}

@keyframes swing {
  20% {
    transform: rotate(10deg);
  }

  40% {
    transform: rotate(-8deg);
  }

  60% {
    transform: rotate(5deg);
  }

  80% {
    transform: rotate(-4deg);
  }

  to {
    transform: rotate(0deg);
  }
}
</style>