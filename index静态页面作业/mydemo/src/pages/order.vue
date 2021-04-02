<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar
      class="header"
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 收货地址 -->
    <div class="top">
      <div class="info"></div>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="3050" button-text="提交订单" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
.top {
  width: 100%;
  height: 0.9rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
}
.top .info {
  width: 3.55rem;
  height: 1.04rem;
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(255, 149, 128, 0.1);
  border-radius: 4px;
  position: relative;
  left: 0.1rem;
  top: 0.1rem;
}
</style>