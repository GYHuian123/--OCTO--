<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar
      class="header"
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 商品展示 -->
    <div>
      <img
        class="imgUrl"
        :src="
          goodsInfo.img
            ? $imgUrl + goodsInfo.img
            : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
        "
        alt=""
      />
    </div>
    <div id="des">
      <p class="two">
        <!-- 商品价格 -->
        <span>￥{{ goodsInfo.price }}</span>
        <span>￥{{ goodsInfo.market_price }}</span>
      </p>
      <!-- 商品名称 -->
      <p class="one">{{ goodsInfo.goodsname }}</p>
    </div>
    <div id="spe">
      <!--商品规格部分-->
      <van-collapse v-model="activeNames">
        <van-collapse-item name="0">
          <template #title>
            <p class="one">
              <span class="one_1">
                <i>促销： </i>
                <i>满减</i>
                <i>满2件9折；3件8折</i>
              </span>
            </p>
          </template>
          内容
        </van-collapse-item>
      </van-collapse>
      <!-- 购买数量 -->
      <p class="two">
        <span>购买数量</span>
        <van-stepper v-model="value" min="1" max="5" />
      </p>
      <!-- 商品属性 -->
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <template #title>
            <div class="th_1">商品属性</div>
          </template>
          <span class="th_2">
            <strong>规格</strong>
            <van-button
              size="mini"
              v-for="item in goodsInfo.specsattr"
              :key="item"
              type="danger"
              >{{ item }}</van-button
            >
          </span>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 商品详情 -->
    <div id="word">
      <p class="word">商品详情</p>
      <div class="con" v-html="goodsInfo.description"></div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button
        type="warning"
        @click="goCart"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" @click="goBuy" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { getgoodsInfo, cartAdd } from "../util/axios";
import { Dialog } from "vant";
export default {
  data() {
    return {
      goodsInfo: "",
      value: 1,
      activeNames: ["1"],
    };
  },

  mounted() {
    //页面一加载，获取一个商品信息
    getgoodsInfo({ id: this.$route.query.id }).then((res) => {
      if (res.code == 200) {
        this.goodsInfo = res.list[0];
        this.goodsInfo.price = res.list[0].price.toFixed(2);
        this.goodsInfo.market_price = res.list[0].market_price.toFixed(2);
        this.goodsInfo.specsattr = this.goodsInfo.specsattr
          ? this.goodsInfo.specsattr.split(",")
          : [];
      }
    });
  },
  methods: {
    //封装一个加入购物车事件
    goCart() {
      //判断是否登录，如果登录直接调取接口，未登录提示去登录
      if (this.$store.state.userInfo) {
        //调用购物车添加接口，并跳转到购物车
        cartAdd({
          uid: this.$store.getters.getuserInfo.uid,
          goodsid: this.goodsInfo.id,
          num: this.value,
        }).then((res) => {
          if (res.code == 200) {
            this.$router.push("/cart");
          }
        });
      } else {
        Dialog.alert({
          title: "未登录",
          message: "未登录，不能加入购物车",
        }).then(() => {
          // on close
        });
      }
    },
    //封装一个去订单页的事件
    goBuy() {
      Dialog.confirm({
        title: "提交订单",
        message: "确定要提交订单吗？",
      })
        .then(() => {
          // on confirm
          this.$router.push("/order");
        })
        .catch(() => {
          // on cancel
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
.imgUrl {
  width: 100%;
  height: 3.75rem;
}
/*describe描述部分*/
#des {
  height: 1.03rem;
  background: #fff;
  margin-bottom: 0.1rem;
}
#des .one {
  font-family: PingFangSC-Regular;
  font-size: 0.16rem;
  color: #333333;
  padding-left: 0.1rem;
}
#des .two {
  font-family: PingFangSC-Semibold;
  font-size: 0.3rem;
  color: #ff6040;
  padding: 0.1rem;
}
#des .two span:nth-child(2) {
  text-decoration: line-through;
  font-family: PingFangSC-Semibold;
  font-size: 0.14rem;
  color: #999999;
}
/*商品规格部分*/
#spe >>> .van-cell {
  height: 0.4rem;
  border-bottom: 1px solid #f1f1f1;
}
#spe {
  height: 1.9rem;
  background: #fff;
  display: flex;
  flex-direction: column;
}
#spe .one .one_1 i:nth-child(1) {
  font-size: 0.13rem;
  color: #454545;
}
#spe .one .one_1 i:nth-child(2) {
  font-size: 0.1rem;
  color: #b12919;
  width: 0.32rem;
  height: 0.17rem;
  border: 0.05px solid #b0281a;
  border-radius: 0.03rem;
  line-height: 0.17rem;
  text-align: center;
  margin-left: 0.1rem;
  display: inline-block;
}
#spe .one span.one_1 i:nth-child(3) {
  font-size: 0.12rem;
  color: #444444;
  margin-left: 0.1rem;
}
#spe .two {
  height: 0.4rem;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.13rem;
  padding: 0 0.15rem 0 0.15rem;
}
#spe .two span:nth-child(1) {
  color: #454545;
}
.th_1 {
  font-size: 0.13rem;
  color: #444444;
}
#spe .three .th_2 {
  width: 4rem;
  height: 0.59rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.th_2 {
  font-size: 0.12rem;
  color: #b6b6b6;
}
.th_2 >>> .van-button {
  font-size: 0.11rem;
  color: #fffffd;
}
.word {
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.13rem;
  font-size: 0.15rem;
  color: #454545;
}
#word {
  margin: 0.1rem 0 0.5rem 0;
  background: #fff;
}
#word .con >>> img {
  width: 100%;
  height: 3.75rem;
}
</style>