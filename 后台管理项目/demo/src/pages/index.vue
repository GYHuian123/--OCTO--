<template>
  <div>
    <el-container>
      <el-header
        >大型后台管理系统
        <div>{{ getUserInfo.username }}</div>
        <el-button @click="out" type="danger" size="mini">退出</el-button>
      </el-header>
      <el-container>
        <el-aside>
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vNav from "../components/vnav";
export default {
  data() {
    return {};
  },
  components: {
    vNav,
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["userInfoAction"]),
    //封装一个退出登录事件
    out() {
      this.userInfoAction(false);
      this.$router.push('/login')
    },
  },
};
</script>
<style lang="" scoped>
.el-header {
  background-color: #d06fa0;
  height: 10vh !important;
}
.el-aside {
  width: 220px !important;
}
</style>