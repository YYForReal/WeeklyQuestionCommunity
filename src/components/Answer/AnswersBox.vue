<template lang="">
  <div class="answers-maincontainer card">
    <header class="card-header">
      <p class="card-header-title">
        {{answers.length}}个回答
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="answers.length"
          :page-size="pageSize"
          @current-change="handleChangePage"
          :hide-on-single-page="(answers.length<pageSize)"

          >
        </el-pagination>
      </p>
      <button class="card-header-icon" aria-label="more options" @click="handleSort()">
        <div class="float-right">
          <a>{{isSorted?'点赞最多':'默认排序'}} <i class="iconfont icon-shangxia"></i></a>
        </div>
      </button>
    </header>
    <div id="answers-box" class="markdown">
        <Answer v-for="(answer,index) in filterAnswers()" :key="answer.answerId"    :answer = "answer" />
    </div>
  </div>
</template>
<script>
import Answer from "@/components/answer/Answer.vue";
export default {
  data() {
    return {
      pageSize:5,
      showAnswers: [],
      currentPage:1,
    };
  },
  components: {
    Answer,
  },
  mounted() {
    this.showAnswers = this.answers;
    console.log("this.showAnswers:",this.showAnswers);
  },
  methods: {
    handleChangePage(currentPage){
      this.currentPage = currentPage;
    },
    filterAnswers(){
      if(this.showAnswers.length == 0 ){
        this.showAnswers = this.answers;
      }
      return this.showAnswers.filter((val,index)=>{
          if(index < this.currentPage * this.pageSize && index >= (this.currentPage-1)*this.pageSize){
            console.log(val)
            return true;
          }
          return false;
      })
    },
    handleSort() {
      this.isSorted = !this.isSorted;
      let comAttr = "releaseTime";
      if (this.isSorted) {
        console.log(this.showAnswers);
        comAttr = "agree";
      }
      let compFunction = function (obj1, obj2) {
        if (obj1[comAttr] < obj2[comAttr]) {
          return 1;
        } else {
          return -1;
        }
      };
      this.showAnswers.sort(compFunction);
    },
  },
  props: {
    answers: {
      type: Array,
      required: true,
    },
  },
  watch:{
    showAnswers:{
      handler(){},
      deep:true,
    },
    currentPage(newValue){
      console.log(newValue);
    }
  }
};
</script>
<style lang="less" scoped>
.answers-maincontainer {
  margin: 0 auto;
  width: 97%;

  margin-top: 20px;
  padding: 3px;

  @media screen and (min-width: 768px) {
    min-width: 660px;
    min-height: 600px;
  }
}
</style>
