<template>
  <div>
    <!-- 面包屑导航 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 表格列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-dialog ref="editM" :dialogInfo="dialogInfo" @cancel="cancel"></v-dialog>
  </div>
</template>
<script>
import vList from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      dialogInfo: {
        isShow: false, //弹框的显示和隐藏
        isAdd: true, //是否是添加按钮
      },
    };
  },
  components: {
    vList,
    vDialog,
  },
  methods: {
    //封装一个添加事件
    add() {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = true;
    },
    //封装一个取消事件
    cancel(e) {
      this.dialogInfo.isShow = e;
    },
    //封装一个编辑事件
    edit(e) {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = false;
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