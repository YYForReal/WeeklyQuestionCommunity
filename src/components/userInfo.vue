<template>
  <div
    class="media"
    id="page"
    :style="{ 'background-image': 'url(' + background + ')' }"
    style="background-repeat: no-repeat; background-size: cover"
  >
    <div class="media-left">
      <!-- 头像 -->
      <figure class="image is-128x128" @mouseleave="hideAvatar">
        <img
          class="Avatar"
          :src="avatarUrl"
          alt="修改头像"
          @mouseenter="showAvatar"
        />
        <div
          class="file is-hidden"
          style="
            font-size: 15px;
            font-weight: bold;
            margin-top: -55px;
            margin-left: 35px;
            color: white;
          "
          id="showAvatar"
        >
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              accept="image/*"
              @change="uploadAvatar"
            />
            <span class="file-label">修改头像</span>
          </label>
        </div>
      </figure>
    </div>
    <div class="media-content">
      <!-- 用户名 -->
      <div class="level">
        <div class="level-left">
          <div class="level-item">用户名：{{ userId }}</div>
        </div>
      </div>
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
                class="input level-item"
                placeholder="新的昵称"
                v-model.trim="nameModel"
              />
              <button class="level-item button" @click="updateName">
                确认
              </button>
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
              ></textarea>
              <button
                class="button"
                style="margin-top: 10px"
                @click="updateSignature"
              >
                确认
              </button>
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
                <input
                  class="file-input"
                  type="file"
                  accept="image/*"
                  @change="uploadBackground"
                />
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
      userId: "",
      userName: "",
      signature: "",
      avatarUrl:
        "https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg",

      changeName: true,
      changeSignature: true,

      nameModel: "",
      signatureModel: "",

      showAvatarFile: false,
      background: "",
    };
  },
  created() {
    // 获取用户信息
    let that = this;
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    this.userId = user.userId;
    $.ajax({
      type: "get",
      url: "http://localhost:9000/user/getUserInfo?userId=" + that.userId,
      success: function (data) {
        that.userName = data.userName;
        that.signature = data.description;
        if (data.background != null) {
          that.background = data.background;
        }
        if (data.avatar != null) {
          that.avatarUrl = data.avatar;
        }
      },
      error: function () {
        console.log("获取用户信息失败");
      },
    });
  },
  methods: {
    updateName() {
      let that = this;
      if (this.nameModel.length > 12) {
        this.$message({
          type: "error",
          message: "长度不能超过12个字符！",
        });
      } else if (this.nameModel == "") {
        this.$message({
          type: "error",
          message: "昵称不能为空！",
        });
      } else {
        $.ajax({
          type: "post",
          url: "http://localhost:9000/user/postName",
          async: true,
          data: { userId: that.userId, userName: that.nameModel },
          success: function (data) {
            that.$message({
              type: "success",
              message: "编辑成功！",
            });
            that.userName = that.nameModel;
            that.changeName = true;
          },
          error: function () {
            console.log("获取用户信息失败");
          },
        });
      }
    },
    updateSignature() {
      let that = this;
      if (this.signatureModel.length > 30) {
        this.$message({
          type: "error",
          message: "长度不能超过30个字符！",
        });
      } else {
        $.ajax({
          type: "post",
          url: "http://localhost:9000/user/postDes",
          async: true,
          data: { userId: that.userId, description: that.signatureModel },
          success: function (data) {
            that.$message({
              type: "success",
              message: "编辑成功！",
            });
            that.signature = that.signatureModel;
            that.changeSignature = true;
          },
          error: function () {
            console.log("获取用户信息失败");
          },
        });
      }
    },

    showAvatar() {
      $("#showAvatar").attr("class", "file");
    },
    hideAvatar() {
      $("#showAvatar").attr("class", "file is-hidden");
    },
    // 读取背景图
    uploadBackground(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      let that = this;
      reader.onload = (e) => {
        that.background = e.target.result;

        $.ajax({
          type: "post",
          url: "http://localhost:9000/user/postBackground",
          async: true,
          data: { userId: that.userId, background: that.background },
          success: function (data) {
            that.$message({
              type: "success",
              message: "上传背景图片成功！",
            });
          },
          error: function () {
            console.log("获取用户信息失败");
          },
        });
      };
    },
    // 读取头像
    uploadAvatar(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      let that = this;
      reader.onload = (e) => {
        that.avatarUrl = e.target.result;

        $.ajax({
          type: "post",
          url: "http://localhost:9000/user/postAvatar",
          async: true,
          data: { userId: that.userId, avatar: that.avatarUrl },
          success: function (data) {
            that.$message({
              type: "success",
              message: "修改成功！",
            });
          },
          error: function () {
            console.log("获取用户信息失败");
          },
        });
      };
    },
  },
};
</script>
<style lang="css" src="../assets/css/bulma.min.css" scoped></style>

<style src="../assets/css/bulma.min.css" scoped></style>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

.button {
  background-color: #0066ff;
  color: white;
}
</style>