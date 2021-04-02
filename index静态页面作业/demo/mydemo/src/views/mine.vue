<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar class="header" :title="$route.name" />
    <div class="myself">
      <!-- 已登录状态 -->
      <div v-if="getuserInfo" class="title">
        <van-image
          class="vimg"
          round
          width=".64rem"
          height=".64rem"
          src="https://img2.baidu.com/it/u=2590128318,632998727&fm=26&fmt=auto&gp=0.jpg"
        />
        <div class="right">
          <p>{{ getuserInfo.nickname }}</p>
          <van-button @click="logout" type="warning">退出登录</van-button>
        </div>
      </div>
      <!-- 未登录状态  去登录 -->
      <div v-else class="title">
        <van-image
          class="vimg"
          round
          width=".64rem"
          height=".64rem"
          src="https://img0.baidu.com/it/u=4033157900,4273689182&fm=26&fmt=auto&gp=0.jpg"
        />
        <div class="right">
          <p>XXXXXX</p>
          <van-button @click="$router.push('/login')" type="info"
            >未登录，请登录</van-button
          >
        </div>
      </div>
    </div>
    <!-- 展示性列表 -->
    <div>
      <van-cell title="地址管理" icon="location-o" is-link />
      <van-cell title="我的钱包" icon="paid" is-link value="剩余200U币" />
      <van-cell title="我的二维码" icon="qr" is-link />
      <van-cell title="我的小伙伴" icon="friends-o" is-link />
      <van-cell title="0元试用" icon="gold-coin-o" is-link />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getuserInfo"]),
  },
  methods: {
    ...mapActions(["userinfoAction"]),
    //退出登录
    logout() {
      // 触发行动
      this.userinfoAction(false);
      //跳转到登录页
      this.$router.push("/login");
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
/* 我自己的 */
.myself {
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
  width: 100%;
  height: 2.1rem;
}
.myself .title {
  padding: 0.1rem 0 0 0.1rem;
  height: 0.64rem;
}
.myself .title .vimg {
  float: left;
}
.myself .title .right {
  margin: 0.05rem 0 0 0.84rem;
}
.myself .title .right p {
  font-family: PingFangSC-Semibold;
  font-size: 0.18rem;
  color: #ffffff;
}
.myself .title .right .van-button {
  /* width: 0.88rem; */
  height: 0.25rem;
  margin-top: 0.09rem;
}
</style>