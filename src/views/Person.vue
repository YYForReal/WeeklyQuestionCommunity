<template>
  <div class="personal-page">
    <el-row :gutter="5">
      <el-col :span="10">
        <Setting />
      </el-col>
      <el-col :span="14">
        <FocusCard></FocusCard>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Setting from "@/components/user/Setting.vue";
import FocusCard from "@/components/ArticleCard/FocusCard.vue";
export default {
  data() {
    return {};
  },
  components: {
    FocusCard,
    Setting,
  },
};
</script>
<style scoped lang="less">
.personal-page {
  width: 100%;
}
</style>