<template>
  <div>
    <button @click="verify">123</button>
  </div>
</template>

<script>
export default {
  methods: {
    verify() {
      let that = this;
      let st = localStorage.getItem("user");
      st = JSON.parse(st);
      let userId = st.userId;
      let pwd = st.password;
      console.log(userId);
      console.log(pwd);
      $.ajax({
        type: "get",
        url:
        that.baseUrl + "/user/token?userId=" +
          userId +
          "&password=" +
          pwd,
        success: function (data) {
          console.log(data);
          if (data == true) {
            that.$message({
              type: "success",
              message: "检验成功！",
            });
          }
        },
        error: function () {
          console.log("修改密码失败!");
        },
      });
    },
  },
};
</script>
