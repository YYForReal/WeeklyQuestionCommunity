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
    <div id="answers-box">
        <Answer v-for="(answer,index) in answers" :key="answer.answerId"    :answer = "answer" />
    </div>
  </div>
</template>
<script>
  import Answer from '@/components/Answer/Answer.vue'
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
<style lang="" scoped>

  .answers-maincontainer {
    margin: 0 auto;
    min-width: 600px;
    width: 97%;
    min-height: 600px;
    margin-top: 20px;
    padding: 5px;
  }


</style>
