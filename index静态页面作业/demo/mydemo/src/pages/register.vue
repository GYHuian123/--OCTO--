<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar class="header" :title="$route.name" left-arrow />
    <div class="center">
      <img class="logo" :src="logo" alt="" />
      <div class="reg">
        <p>昵称：<input type="text" v-model="regList.nickname" /></p>
        <p>手机号：<input type="text" v-model="regList.phone" /></p>
        <p>密码：<input type="text" v-model="regList.password" /></p>
        <button class="btn" @click="register">注 册</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getRegister } from "../util/axios";
//轻提示
import { Toast } from "vant";
export default {
  data() {
    return {
      logo: require("../assets/images/register/orange.png"),
      regList: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      if (
        this.regList.phone == "" ||
        this.regList.nickname == "" ||
        this.regList.password == ""
      ) {
        Toast.fail("内容不能为空");
        return;
      }
      getRegister(this.regList).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          this.$router.push("/login");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="" scoped>
/* 头部部分 */
.header {
  width: 100%;
  height: 0.44rem !important;
  background-color: #ff6040;
  font-size: 0.17rem !important;
}
[class*="van-hairline"]::after {
  border: 0;
}
.header >>> .van-ellipsis {
  color: #fff;
}
.header >>> .van-icon {
  color: #fff;
}
.center {
  width: 3.55rem;
  height: 80vh;
  background-color: #fff;
  margin: 0.1rem 0.1rem 0;
  overflow: hidden;
}
.logo {
  width: 1.82rem;
  height: 0.48rem;
  margin: 2.44rem 0.86rem 0 0.87rem;
}
.reg {
  width: 3.05rem;
  margin: 0.2rem auto;
}
.reg p {
  height: 0.4rem;
  line-height: 0.4rem;
  border-bottom: 1px solid #eeeeee;
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #666666;
}
.reg input {
  border: 0;
  outline: none;
}
.btn {
  width: 100%;
  height: 0.49rem;
  background: #cccccc;
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #ffffff;
  margin-top: 0.2rem;
  border: 0;
  outline: none;
}
</style>