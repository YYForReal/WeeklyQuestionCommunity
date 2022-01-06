<template>
  <div
    class="media block"
    id="page"
    :style="{ 'background-image': background }"
  >
    <div class="media-left">
      <figure class="image is-128x128">
        <img
          class="is-rounded"
          src="https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg"
        />
      </figure>
    </div>
    <div class="media-content">
      <div class="level"></div>
      <!-- 昵称 -->
      <div class="level">
        <div class="level-left">
          <div class="level-item" v-if="changeName">
            <p class="level-item" id="userName">
              昵称：<strong style="font-size: large; font-family: '楷体'">{{
                userName
              }}</strong>
            </p>
            <a class="level-item" @click="changeName = false">修改</a>
          </div>
          <div class="level-item" v-else>
            <div class="field is-grouped">
              <input
                type="text"
                class="input has-fixed-size level-item"
                placeholder="新的昵称"
                rows="1"
                v-model.trim="nameModel"
                @input="nameInput"
              />
              <button class="level-item button">确认</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 个性签名 -->
      <div class="level">
        <div class="level-right">
          <div class="level-item" v-if="changeSignature">
            <p class="level-item" id="signature">个性签名：{{ signature }}</p>
            <a class="level-item" @click="changeSignature = false">编辑</a>
          </div>
          <div class="level-item" v-else>
            <div class="field">
              <textarea
                placeholder="编辑个性签名，展现个人风采~"
                class="textarea has-fixed-size"
                id=""
                cols="33"
                rows="5"
                v-model.trim="signatureModel"
                @input="signatureInput"
              ></textarea>
              <button class="button" style="margin-top: 10px">确认</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 设置背景图 -->
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" accept="image/*" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-angle-double-up"></i>
                  </span>
                  <span class="file-label">上传背景图片</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "带土",
      signature: "我就是我",
      changeName: true,
      changeSignature: true,
      nameModel: "",
      signatureModel: "",
      background:
        "url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png)",
    };
  },
  methods: {
    nameInput() {
      if (this.nameModel == "") {
      }
    },
    signatureInput() {},
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

.button {
  background-color: #0066ff;
  color: white;
}
</style>