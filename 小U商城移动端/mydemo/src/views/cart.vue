<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar class="header" :title="$route.name" />
    <!-- 头部导航 -->
    <div class="nav">
      <span class="active">全部</span>
      <span>降价</span>
      <span>常卖</span>
      <span>分类</span>
    </div>
    <!-- 商品 -->
    <!-- 有数据显示 -->
    <div v-if="cartlist.length > 0" class="goods">
      <!-- 小U自营 -->
      <div class="mine">
        <input type="radio" />
        <span>小U自营</span>
        <p class="right">
          <i>已免运费</i>
          <i>|</i>
          <i>领券</i>
        </p>
      </div>
      <!-- 商品展示 -->
      <van-swipe-cell v-for="item in cartlist" :key="item.id">
        <van-checkbox
          :value="checked"
          checked-color="#07c160"
          bind:change="onChange"
        >
          <!-- 数据 -->
          <van-card
            :num="item.num"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            class="goods-card"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
            "
          >
            <template #footer>
              <van-stepper
                v-model="item.num"
                theme="round"
                button-size="22"
                disable-input
              />
            </template>
          </van-card>
        </van-checkbox>

        <!-- 删除 -->
        <template #right>
          <van-button
            @click="del(item.id)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 无数据显示 -->
    <div v-else>
      <van-empty description="购物车空空如也，快去加购商品吧！" />
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="0" button-text="提交订单">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
//引入Dialog方法
import { Dialog } from "vant";
import { cartList, cartDel } from "../util/axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      value: 1,
      cartlist: [],
      checked: false,
    };
  },
  computed: {
    ...mapGetters(["getuserInfo"]),
  },
  // 组件进入之前触发的路由守卫，没有this，不能用vuex，直接用sessionStorage
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      //有登录就跳转购物车
      next();
    } else {
      //未登录，去登录
      Dialog.confirm({
        title: "未登录",
        message: "购物车必须登录才能查看，请快速登录！！！",
      })
        .then(() => {
          // 确定，去登录
          next("/login");
        })
        .catch(() => {
          // 取消
        });
    }
  },
  mounted() {
    //页面一加载获取购物车列表
    cartList({ uid: this.getuserInfo.uid }).then((res) => {
      if (res.code == 200) {
        this.cartlist = res.list ? res.list : [];
      }
    });
  },
  methods: {
    onChange(event) {
      this.setData({
        checked: event.detail,
      });
    },
    //封装一个删除事件
    del(id) {
      //调用购物车删除接口
      cartDel({ id }).then((res) => {
        if (res.code == 200) {
          //重新调用购物车列表
          cartList({ uid: this.getuserInfo.uid }).then((res) => {
            if (res.code == 200) {
              this.cartlist = res.list ? res.list : [];
            }
          });
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
/* 头部导航 */
.nav {
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
  width: 100%;
  height: 0.32rem;
  display: flex;
  justify-content: space-around;
  line-height: 0.32rem;
}
.nav span {
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  color: #fff3f2;
}
.nav .active {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #ffffff;
  border-bottom: 2px solid #fff;
}
/* 小U自营 */
.mine {
  background: #ffffff;
  width: 100%;
  height: 0.36rem;
  line-height: 0.36rem;
}
.mine input {
  margin: 0 0.1rem;
  background: #f2f2f2;
  border: 1px solid #999999;
}
.mine span {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #333333;
}
.mine .right {
  float: right;
}
.mine .right i:nth-child(3) {
  font-family: PingFangSC-Regular;
  font-size: 0.12rem;
  color: #ff6040;
  margin: 0 0.1rem;
}
.mine .right i:nth-child(1) {
  font-family: PingFangSC-Regular;
  font-size: 0.12rem;
  color: #333333;
  margin-right: 0.1rem;
}
/* 商品 */
.goods {
  margin-top: 0.1rem;
  background: #fff;
}
.van-swipe-cell {
  margin: 0.1rem 0;
}
.van-button {
  height: 100%;
}
.van-submit-bar {
  margin-bottom: 0.51rem;
}
.van-checkbox >>> .van-checkbox__label {
  width: 100%;
}
</style>