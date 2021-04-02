<template>
  <div class="box">
    <el-form
      :model="loginForm"
      :rules="rules"
      label-width="100px"
      ref="formName"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          placeholder="请输入用户名"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          show-password
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { userLogin } from "../util/axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //组件内部导航守卫，离开组件的守卫
  beforeRouteLeave(to, from, next) {
    if (sessionStorage.getItem("user") == null) {
      location.reload();
      next();
    } else {
      next();
    }
  },
  methods: {
    ...mapActions(["userInfoAction"]),
    //封装一个登录事件
    login() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          userLogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //登陆成功后，把存储信息存到Vuex中
              this.userInfoAction(res.data.list);
              this.$router.push("/index");
              //登陆成功后，把存储信息存到本地存储中
              // sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-color: #efe0de;
}
.el-form {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -150px 0 0 -230px;
  width: 400px;
  height: 250px;
}
</style>