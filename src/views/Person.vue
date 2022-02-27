<template>
  <div class="personal-page">
    <el-row :gutter="5">
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <Setting />
      </el-col>
      <el-col  :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <MyCard></MyCard>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Setting from "@/components/user/Setting.vue";
import MyCard from "@/components/ArticleCard/MyCard.vue";
export default {
  data() {
    return {};
  },
  components: {
    MyCard,
    Setting,
  },
};
</script>
<style scoped lang="less">
.personal-page {
  width: 100%;
}
</style>