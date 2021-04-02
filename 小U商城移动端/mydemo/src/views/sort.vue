<template>
  <div>
    <!-- 头部部分 -->
    <van-nav-bar class="header" :title="$route.name" />
    <!-- 搜索框 -->
    <div class="search">
      <b class="iconfont">&#xe612;</b
      ><input type="text" placeholder="按内容搜索" />
    </div>
    <!-- 左侧导航 -->
    <van-sidebar class="navleft" v-model="activeKey" @change="onChange">
      <van-sidebar-item
        v-for="item in firstCate"
        :key="item.id"
        :title="item.catename"
      />
    </van-sidebar>
    <!-- 宫格 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item
        :to="'/goodslist?id=' + item.id"
        v-for="item in secondCate"
        :key="item.id"
      >
        <p class="title">{{ item.catename }}</p>
        <van-image
          :src="
            item.img
              ? $imgUrl + item.img
              : 'https://img.alicdn.com/tfs/TB1F_2nLEH1gK0jSZSyXXXtlpXa-150-150.png_120x120q90.jpg_.webp'
          "
        />
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getcateTree } from "../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      firstCate: [],
      secondCate: [],
    };
  },
  mounted() {
    //页面一加载获取分类树形结构
    getcateTree().then((res) => {
      if (res.code == 200) {
        this.firstCate = res.list;
        this.secondCate = res.list[0].children;
      }
    });
  },
  methods: {
    onChange(n) {
      this.secondCate = this.firstCate[this.activeKey].children;
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
/* 搜索框 */
.search {
  width: 100%;
  height: 0.52rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
  padding: 0.1rem;
  box-sizing: border-box;
}
.search b {
  display: block;
  position: absolute;
  color: #999999;
  height: 0.34rem;
  font-size: 0.16rem;
  margin-left: 0.12rem;
  line-height: 0.34rem;
}
.search input {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}
.search input::placeholder {
  font-size: 0.14rem;
  color: #999999;
  padding-left: 0.3rem;
  line-height: 0.22rem;
}
/* 左侧导航 */
.navleft {
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(51, 51, 51, 0.1);
  width: 1.18rem;
  height: 5.21rem;
  float: left;
}
.navleft >>> .van-sidebar-item {
  background: #ffffff;
}
/* 宫格 */
.van-grid {
  width: 2.32rem;
  background: #fff;
  margin: 0.15rem 0 0.1rem 1.3rem;
}
.van-grid .title {
  font-family: PingFangSC-Semibold;
  font-size: 0.16rem;
  color: #333333;
  margin-bottom: 0.1rem;
}
</style>