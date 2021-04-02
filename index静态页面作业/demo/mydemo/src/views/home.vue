<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar class="header" :title="$route.name" left-arrow />
    <!-- 导航部分 -->
    <div class="nav">
      <div class="search">
        <span class="iconfont icon1">&#xe613;</span>
        <img :src="logoimg" alt="" />
        <div class="iconfont">
          <b class="iconfont">&#xe612;</b
          ><input type="text" placeholder="按内容搜索" />
        </div>
        <span class="iconfont icon2">&#xe6ab;</span>
      </div>
      <div class="sort">
        <ul class="clearfix left">
          <li class="active">推荐</li>
          <li>女装</li>
          <li>鞋包</li>
          <li>居家</li>
          <li>母婴</li>
          <li>美妆</li>
        </ul>
        <p class="iconfont right"><i>&#xe609;</i><b>分类</b></p>
      </div>
    </div>
    <!-- 菜单部分 -->
    <div class="menu">
      <!-- 轮播图 -->
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="#FF6040">
          <van-swipe-item v-for="item in bannerlist" :key="item.id">
            <img :src="$imgUrl + item.img" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 宫格展示 -->
      <ul class="clearfix menu2">
        <li>
          <img :src="menuimg1" alt="" />
          <p>限时秒杀</p>
        </li>
        <li>
          <img :src="menuimg2" alt="" />
          <p>畅销商品</p>
        </li>
        <li>
          <img :src="menuimg3" alt="" />
          <p>品质大牌</p>
        </li>
        <li>
          <img :src="menuimg4" alt="" />
          <p>积分商城</p>
        </li>
        <li>
          <img :src="menuimg1" alt="" />
          <p>限时秒杀</p>
        </li>
      </ul>
    </div>
    <!-- content部分 -->
    <div class="content">
      <div class="left">
        <p class="title">
          <span>限时秒杀</span>
          <i>查看更多&gt;</i>
        </p>
        <p class="txt">每天0点场，好货秒不停</p>
        <p class="time">
          <span>05</span>: <span>20</span>:
          <span>48</span>
        </p>
      </div>
      <div class="right">
        <div class="top">
          <h3>品牌上新</h3>
          <p class="txt">9点整，抢大牌</p>
          <p class="time">疯抢红包 &gt;</p>
        </div>
        <div class="last">
          <h3>日用好物</h3>
          <p class="txt">愿君多采撷</p>
          <p class="time">塞满奖券 &gt;</p>
        </div>
      </div>
    </div>
    <!-- goods部分 -->
    <div class="goods">
      <van-tabs>
        <van-tab aria-selected:false title="热卖单品">
          <div class="one" v-for="item in hotlist" :key="item.id">
            <img
              :src="
                item.img
                  ? $imgUrl + item.img
                  : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
              "
              alt=""
            />
            <div>
              <p class="title">{{ item.goodsname }}</p>
              <p class="price"><span>￥</span>{{ item.price.toFixed(2) }}</p>
              <p class="sale">已售800件</p>
              <input type="submit" name="" id="" value="立即抢购" />
            </div>
          </div>
        </van-tab>
        <van-tab title="最IN新品">
          <div class="one" v-for="item in newslist" :key="item.id">
            <img
              :src="
                item.img
                  ? $imgUrl + item.img
                  : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
              "
              alt=""
            />
            <div>
              <p class="title">{{ item.goodsname }}</p>
              <p class="price"><span>￥</span>{{ item.price.toFixed(2) }}</p>
              <p class="sale">已售800件</p>
              <input type="submit" name="" id="" value="立即抢购" />
            </div>
          </div>
        </van-tab>
        <van-tab title="所有商品">
          <div class="one" v-for="item in goodslist" :key="item.id">
            <img
              :src="
                item.img
                  ? $imgUrl + item.img
                  : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
              "
              alt=""
            />
            <div>
              <p class="title">{{ item.goodsname }}</p>
              <p class="price"><span>￥</span>{{ item.price.toFixed(2) }}</p>
              <p class="sale">已售800件</p>
              <input type="submit" name="" id="" value="立即抢购" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getBanner, getindexGoods } from "../util/axios";
import axios from "axios";
export default {
  data() {
    return {
      logoimg: require("../assets/images/index/white.png"),
      banimg1: require("../assets/images/index/mid.png"),
      menuimg1: require("../assets/images/index/seckill.png"),
      menuimg2: require("../assets/images/index/top.png"),
      menuimg3: require("../assets/images/index/brand.png"),
      menuimg4: require("../assets/images/index/selfsupport.png"),
      menuimg5: require("../assets/images/index/integral.png"),

      bannerlist: [],
      hotlist: [],
      newslist: [],
      goodslist: [],
    };
  },
  mounted() {
    //axios并发处理
    axios.all([getBanner(), getindexGoods()]).then(
      axios.spread((res1, res2) => {
        if (res1.code == 200) {
          this.bannerlist = res1.list;
        }
        if (res2.code == 200) {
          this.hotlist = res2.list[0].content;
          this.newslist = res2.list[1].content;
          this.goodslist = res2.list[2].content;
        }
      })
    );
  },
};
</script>
<style scoped>
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
.nav .search {
  height: 0.48rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav .search .icon1 {
  font-size: 0.184rem;
  height: 0.22rem;
}
.nav .search img {
  width: 0.91rem;
  height: 0.24rem;
}
.nav .search input {
  width: 1.7rem;
  height: 0.32rem;
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
.nav .search icon2 {
  font-size: 0.2rem;
  height: 0.2rem;
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
}
.nav .sort .left .active {
  font-size: 0.16rem;
  color: #ffffff;
  font-weight: bold;
}
.nav .sort .left .active::after {
  width: 0.2rem;
  height: 2px;
  background: #ffffff;
  border-radius: 1px;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0.18rem;
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
/* 菜单部分 */
.menu {
  width: 100%;
  height: 3rem;
  background: #ffffff;
}
.menu .banner {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 1.95rem;
  overflow: hidden;
  padding-top: 0.12rem;
}
.van-swipe {
  width: 3.35rem;
  height: 1.95rem;
  margin: 0 auto;
}
.van-swipe img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.menu .banner p {
  width: 3.35rem;
  position: absolute;
  bottom: 0.1rem;
  left: 0.2rem;
  text-align: center;
}
.menu .banner p span {
  display: inline-block;
  width: 0.06rem;
  height: 0.06rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}
.menu .banner p .active {
  background: #ffffff;
  border-radius: 3px;
  width: 0.12rem;
}
.menu .menu2 {
  width: 100%;
  height: 0.93rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.menu .menu2 li {
  float: left;
  width: 0.5rem;
  height: 0.47rem;
  text-align: center;
}
.menu .menu2 li img {
  margin: 0 auto;
}
.menu .menu2 li p {
  font-size: 0.1rem;
  color: #333333;
}
/* content部分 */
.content {
  width: 100%;
  height: 1.75rem;
  margin: 0.1rem 0;
}
.content .left {
  background-image: url("../assets/images/index/big.png");
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.1rem;
  float: left;
  box-sizing: border-box;
  padding: 0.1rem;
}
.content .left .title {
  display: flex;
  justify-content: space-between;
}
.content .left .title span,
.content .right .top h3,
.content .right .last h3 {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  line-height: 0.16rem;
}
.content .left .title span {
  color: #85a642;
}
.content .left .title i {
  font-size: 0.1rem;
  color: #333333;
}
.content .left .txt,
.content .right .top .txt,
.content .right .last .txt {
  font-family: PingFangSC-Light;
  font-size: 0.1rem;
  margin-top: 0.1rem;
}
.content .left .txt {
  color: #b1cc7a;
}
.content .left .time {
  color: #b1cc7a;
}
.content .left .time span {
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  background-image: linear-gradient(180deg, #85a642 0%, #b1cc7a 100%);
  border-radius: 1px;
  font-family: DINCondensed-Bold;
  font-size: 0.14rem;
  color: #ffffff;
  text-align: center;
}
.content .right {
  float: right;
}
.content .right .top {
  background-image: url("../assets/images/index/small.png");
  width: 1.75rem;
  height: 0.85rem;
  margin-bottom: 0.05rem;
  padding: 0.1rem;
  margin-right: 0.1rem;
  box-sizing: border-box;
}
.content .right .top h3 {
  color: #ff6040;
}
.content .right .top .txt {
  color: #ff9580;
}
.content .right .top .time,
.content .right .last .time {
  width: 0.7rem;
  height: 0.2rem;
  line-height: 0.2rem;
  border-radius: 2px 12px 12px 2px;
  font-family: PingFangSC-Medium;
  font-size: 0.1rem;
  color: #ffffff;
  text-align: center;
}
.content .right .top .time {
  background-image: linear-gradient(180deg, #ff6040 0%, #ff9f80 100%);
}
.content .right .last {
  background-image: url("../assets/images/index/02.png");
  width: 1.75rem;
  height: 0.85rem;
  padding: 0.1rem;
  box-sizing: border-box;
  margin-right: 0.1rem;
}
.content .right .last h3 {
  color: #af40ff;
}
.content .right .last .txt {
  color: #ca80ff;
}
.content .right .last .time {
  background-image: linear-gradient(180deg, #af40ff 0%, #f58cff 100%);
}
/* goods部分 */
.goods {
  width: 96%;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.goods >>> .van-tab--active {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #ff6040;
}
.goods >>> .van-tabs__nav {
  position: unset;
}
.goods >>> .van-tabs__line {
  position: unset;
  width: 0;
}
.goods .one {
  height: 1.5rem;
  margin-top: 0.1rem;
  display: flex;
  padding: 0.2rem 0 0 0.185rem;
  box-sizing: border-box;
  box-shadow: 0.01rem 0.01rem 0.025rem 0.02rem #e9e9e9;
}
.goods .one img {
  width: 1.085rem;
  height: 1.125rem;
  margin-right: 0.25rem;
}
.goods .one div .title {
  font-size: 0.14rem;
  color: #373737;
  margin-bottom: 0.07rem;
}
.goods .one div .price {
  font-size: 0.14rem;
  color: #e7435c;
  margin-bottom: 0.08rem;
}
.goods .one div .price span {
  font-size: 0.09rem;
}
.goods .one div .sale {
  font-size: 0.11rem;
  color: #969696;
  margin-bottom: 0.14rem;
}
.goods .one div input {
  width: 0.82rem;
  height: 0.26rem;
  background: #f26b11;
  font-size: 0.11rem;
  color: #fff7f3;
  border: none;
  border-radius: 0.025rem;
}
</style>