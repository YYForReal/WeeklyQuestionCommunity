<template lang="">
  <div class="answers-maincontainer card">
    <header class="card-header">
      <p class="card-header-title">
        {{answers.length}}个回答
      </p>
      <button class="card-header-icon" aria-label="more options">
        <div class="float-right">
          <a href="#">默认排序 <i class="iconfont icon-shangxia"></i></a>
        </div>
      </button>
    </header>
    <div id="answers-box" class="markdown">
        <Answer v-for="(answer,index) in answers" :key="answer.answerId"    :answer = "answer" />
    </div>
  </div>
</template>
<script>
  import Answer from '@/components/answer/Answer.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
        Answer
    },
    methods: {
        
    },
    props:{
      answers:{
        type:Array,
        required:true,
      }
    }
  }

</script>
<style src="@/assets/css/bulma.min.css" scoped></style>
<style lang="less" scoped>
.answers-maincontainer {
  margin: 0 auto;
  width: 97%;
  margin-top: 20px;
  padding: 5px;

  @media screen and (min-width:768px) {
    min-width: 600px;    
    min-height: 600px;
  }
}

</style>
