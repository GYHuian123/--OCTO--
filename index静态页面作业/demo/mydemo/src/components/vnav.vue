<template>
  <div class="nav">
    <router-link to="/home" active-class="active"
      ><p class="img"></p>
      商城</router-link
    >
    <router-link to="/sort" active-class="active"
      ><p class="img"></p>
      分类</router-link
    >
    <router-link to="/cart" active-class="active"
      ><p class="img"></p>
      购物车</router-link
    >
    <router-link to="/mine" active-class="active"
      ><p class="img"></p>
      我</router-link
    >
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
.nav {
  width: 100%;
  height: 0.5rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}
.nav a {
  flex: 1;
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 10px;
  color: #999999;
}
.img {
  width: 0.18rem;
  height: 0.2rem;
  margin: 0.07rem auto 1px;
  background-image: url("../assets/images/nav/unselected.png");
  background-size: 0.18rem 0.2rem;
}
.active {
  font-family: PingFangSC-Semibold !important;
  color: #ff6040 !important;
}
.active .img {
  background-image: url("../assets/images/nav/selected.png");
}
</style>