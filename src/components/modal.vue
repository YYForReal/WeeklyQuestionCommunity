<template>
  <div class="modal is-active" v-show="show">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content" :style="{ overflow: flow }">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="message">
            <div class="message-header">
              <p class="">{{ title }}</p>
              <button class="delete" @click="closeModal"></button>
            </div>
            <div class="message-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "showModal"],
  data() {
    return {
      show: true,
    };
  },
  computed: {
    // 去掉滚动条
    flow() {
      if (this.show) {
        return "hidden";
      }
      return "";
    },
  },
  methods: {
    closeModal() {
      this.show = false;
    },
  },
};
</script>