<template>
  <div
    class="media"
    id="page"
    :style="{ 'background-image': 'url(' + background + ')' }"
    style="background-repeat: no-repeat; background-size: cover"
  >
    <div
      class="image is-128x128 relative avatar-box"
      @mouseleave="isShowChange = false"
    >
      <!-- 头像 -->
      <label class="absolute file-label input-mask">
        <input
          class="file-input"
          type="file"
          accept="image/*"
          @change="uploadAvatar"
        />
        <p class="change-avatar-hint">修改头像</p>
      </label>

      <img
        class="Avatar"
        :src="avatarUrl"
        alt="修改头像"
        @mouseover="isShowChange = true"
      />
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
        <div
          class="sign_container"
          @mouseenter="changeName = false"
          @mouseleave="changeName = true"
        >
          <span class="el-icon-edit"></span>
          <span v-show="changeName">{{ userName }}</span>
          <el-input
            style="width: 80%"
            @blur="updateName"
            v-show="!changeName"
            v-model="userName"
            maxlength="12"
            show-word-limit
            size="mini"
          ></el-input>
        </div>
      </div>

      <!-- 个性签名 -->
      <div class="level">
        <div
          class="sign_container"
          @mouseenter="changeSignature = false"
          @mouseleave="changeSignature = true"
        >
          <span class="el-icon-edit"></span>
          <span v-show="changeSignature">{{ signature }}</span>
          <el-input
            style="width: 80%"
            @blur="updateSignature"
            v-show="!changeSignature"
            v-model.trim="signature"
            maxlength="30"
            show-word-limit
          ></el-input>
        </div>
      </div>



      <!-- <div class="level">
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
                cols="33"
                rows="5"
                v-model.trim="signature"
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
      </div> -->
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
import http from "@/utils/http.js";
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

      showAvatarFile: false,
      background: "",
      isShowChange: false,
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
      url: that.baseUrl + "/user/getUserInfo?userId=" + that.userId,
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
      if (this.userName.length > 12) {
        this.$message({
          type: "error",
          message: "长度不能超过12个字符！",
        });
      } else if (this.userName == "") {
        this.$message({
          type: "error",
          message: "昵称不能为空！",
        });
      } else {
        $.ajax({
          type: "post",
          url: that.baseUrl + "/user/postName",
          async: true,
          data: { userId: that.userId, userName: that.userName },
          success: function (data) {
            that.$message({
              type: "success",
              message: "编辑成功！",
            });
            that.userName = that.userName;
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
      if (this.signature.length > 30) {
        this.$message({
          type: "error",
          message: "长度不能超过30个字符！",
        });
      } else {
        $.ajax({
          type: "post",
          url: that.baseUrl + "/user/postDes",
          async: true,
          data: { userId: that.userId, description: that.signature },
          success: function (data) {
            that.$message({
              type: "success",
              message: "编辑成功！",
            });
            that.signature = that.signature;
            that.changeSignature = true;
          },
          error: function () {
            console.log("获取用户信息失败");
          },
        });
      }
    },
    // 上传图片
    postImg(formData) {
      let that = this;
      return new Promise((resolve, reject) => {
        http
          .post(that.baseUrl + "/article/postImg", formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((res) => {
            console.log("postImg success", res);
            if (res.status == 200) {
              that.$message({
                type: "success",
                message: "上传图片成功",
              });
              resolve(res.data);
            } else {
              reject("上传图片失败");
            }
          })
          .catch(() => {
            reject("上传图片失败");
          });
      });
    },
    // 上传背景图
    uploadBackground(e) {
      let that = this;

      const image = e.target.files[0];
      var formData = new FormData();
      formData.append("file", image, "file");
      this.postImg(formData)
        .then((url) => {
          this.background = url;
          $.ajax({
            type: "post",
            url: that.baseUrl + "/user/postBackground",
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
        })
        .catch((err) => {
          this.$message({
            type: "warning",
            message: err,
          });
        });
    },
    // 读取头像
    uploadAvatar(e) {
      const image = e.target.files[0];
      var formData = new FormData();
      formData.append("file", image, "file");
      // base64 转码
      // const reader = new FileReader();
      // reader.readAsDataURL(image);
      // reader.onload = (e) => {
      //   that.avatarUrl = e.target.result;
      //   post
      // };
      let that = this;
      this.postImg(formData)
        .then((url) => {
          this.avatarUrl = url;
          $.ajax({
            type: "post",
            url: that.baseUrl + "/user/postAvatar",
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
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
  },
};
</script>
<style src="@/assets/css/bulma.min.css" scoped></style>

<style lang="less" scoped>
.button {
  background-color: #0066ff;
  color: white;
}

.avatar-box {
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  &:hover > .input-mask {
    background-color: rgba(128, 128, 128, 0.459);
    opacity: 0.8;
    top: 0;
    color: white;
  }
  .input-mask {
    top: 100%;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    z-index: 99;
    transition: all 0.3s;
    cursor: pointer;
    input {
      border-radius: 50%;
      cursor: pointer;
    }
    .change-avatar-hint {
      display: absolute;
      width: 100%;
      height: 128px;
      line-height: 128px;
      text-align: center;
    }
  }
  img {
    border-radius: 50%;
  }
}

.media-content {
  .sign_container {
    font-size: 20px;
    height:35px;

    box-sizing: border-box;
    span{
      margin-right: 15px;
    }
  }
}
</style>