<template>
  <div>
    <button
      v-for="(tab, index) in tabs"
      @click="selectTab(index)"
      :key="tab.title"
      :class="{ active: index == selectedIndex }"
      class="tab-btn"
    >
      {{ tab.title }}
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    };
  },
  // 将所有tab赋给tabs
  created() {
    this.tabs = this.$children;
  },
  // 整个视图都渲染之后调用
  mounted() {
    this.selectTab(0);
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;
      this.tabs.forEach((tab, index) => {
        tab.isActive = index == i;
      });
    },
  },
};
</script>


<style scoped>
.active {
  height: 3px;
  font-weight: 600;
  background-color: #0066ff !important;
}

.tab-btn {
  background-color: inherit;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  float: left;
  font-size: medium;
  line-height: 60px;
}
</style>
