<template>
  <!-- 验证身份 -->
  <div class="field">
    <div class="control">
      <div class="field is-grouped">
        <p class="control has-icons-left">
          <input type="password" class="input" placeholder="请输入您的密码" />
          <span class="icon is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <div class="control">
          <button class="button">验证身份</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.button {
  background-color: #0066ff;
  /* background-color: #3574d3; */
  color: white;
}
</style>