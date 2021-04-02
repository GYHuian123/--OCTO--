<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 表格列表 -->
    <v-list :dislogInfo="dislogInfo" @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-dialog ref="editM" :dislogInfo="dislogInfo" @cancel="cancel"></v-dialog>
  </div>
</template>
<script>
import vList from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      dislogInfo: {
        isShow: false, //弹框的显示隐藏
        isAdd: true, //是否是添加按钮
      },
    };
  },
  methods: {
    //封装一个添加事件
    add() {
      this.dislogInfo.isShow = true;
      this.dislogInfo.isAdd = true;
    },
    //封装一个取消事件
    cancel(e) {
      this.dislogInfo.isShow = e;
    },
    //封装一个编辑事件
    edit(e) {
      this.dislogInfo.isAdd = false;
      this.dislogInfo.isShow = true;
      this.$refs.editM.lookup(e);
    },
  },
  components: {
    vList,
    vDialog,
  },
};
</script>
<style lang="" scoped>
.el-button {
  margin: 20px 5px;
}
</style>