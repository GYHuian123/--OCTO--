<template>
  <div class="box">
    <!-- 头部部分 -->
    <van-nav-bar
      class="header"
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 导航部分 -->
    <div class="nav">
      <div class="search">
        <b class="iconfont">&#xe612;</b
        ><input type="text" placeholder="按内容搜索" />
      </div>
      <div class="sort">
        <ul class="clearfix left">
          <li class="active">综合推荐</li>
          <li>销量</li>
          <li>价格</li>
          <li>好评度</li>
          <li>店铺</li>
        </ul>
        <p class="right"><van-icon name="filter-o" /><b>筛选</b></p>
      </div>
    </div>
    <!-- 筛选 -->
    <div class="screen">筛选11.11大促商品</div>
    <!-- 商品 -->
    <van-card
      @click="godetail(item.id)"
      v-for="item in goodslist"
      :key="item.id"
      :price="item.price.toFixed(2)"
      :title="item.goodsname"
      :thumb="
        item.img
          ? $imgUrl + item.img
          : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
      "
    />
  </div>
</template>
<script>
import { getGoods } from "../util/axios";
export default {
  data() {
    return {
      goodslist: [],
    };
  },
  mounted() {
    //页面一加载，获取分类商品
    getGoods({ fid: this.$route.query.id }).then((res) => {
      if (res.code == 200) {
        this.goodslist = res.list;
      }
    });
  },
  methods: {
    //封装一个跳转到商品详情
    godetail(id) {
      this.$router.push({
        path: "goodsdetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #fff !important;
}
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
/* 导航部分 */
.nav {
  height: 0.8rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
}
.nav .iconfont {
  color: #ffffff;
}
/* 搜索框 */
.nav .search {
  width: 100%;
  height: 0.48rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
  padding: 0.1rem;
  box-sizing: border-box;
}
.nav .search b {
  display: block;
  position: absolute;
  color: #999999;
  height: 0.34rem;
  font-size: 0.16rem;
  margin-left: 0.12rem;
  line-height: 0.34rem;
}
.nav .search input {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}
.nav .search input::placeholder {
  font-size: 0.14rem;
  color: #999999;
  padding-left: 0.3rem;
  line-height: 0.22rem;
}
.nav .sort {
  float: left;
  position: relative;
  width: 100%;
  height: 0.32rem;
  overflow: hidden;
  display: flex;
}
.nav .sort .left {
  width: 85%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav .sort li {
  float: left;
  color: #fff3f2;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
}
.nav .sort .left .active {
  font-size: 0.16rem;
  color: #ffffff;
  font-family: PingFangSC-Semibold;
}
.nav .sort .right {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0.65rem;
  height: 0.32rem;
  background-image: linear-gradient(180deg, #ff7a68 0%, #ff8a80 100%);
  box-shadow: -0.05rem 0.05rem 0.1rem -0.05rem #e63d2e;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav .sort .right i {
  font-size: 0.14rem;
  height: 0.13rem;
  color: #ffffff;
}
.nav .sort .right b {
  font-size: 0.14rem;
  color: #ffffff;
}
/* 筛选 */
.screen {
  background: #fff4f2;
  border: 0.5px solid #ff6040;
  border-radius: 2px;
  width: 3.55rem;
  height: 0.32rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #ff6040;
  text-align: center;
  line-height: 0.32rem;
  margin: 0.1rem auto;
}
</style>