<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 表格列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-dialog ref="editM" :isShow="isShow" @cancel="cancel"></v-dialog>
  </div>
</template>
<script>
import vList from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      isShow: false, //弹框的显示和隐藏
    };
  },
  components: {
    vList,
    vDialog,
  },
  methods: {
    //封装一个取消事件
    cancel(e) {
      this.isShow = e;
    },
    //封装一个编辑事件
    edit(e) {
      this.isShow = true;
      this.$refs.editM.lookup(e);
    },
  },
};
</script>
<style lang="" scoped>
.el-button {
  margin: 20px 5px;
}
</style>