<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      background-color="#B15384"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in getUserInfo.menus"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="menu.url"
            v-for="menu in item.children"
            :key="menu.id"
            >{{ menu.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
      // navList: [],
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.defaultActive = this.$route.path;
    // if (sessionStorage.getItem("userInfo")) {
    //   this.navList = JSON.parse(sessionStorage.getItem("userInfo")).menus;
    // }
  },
};
</script>
<style lang="" scoped>
.el-menu {
  height: 90vh !important;
}
</style>