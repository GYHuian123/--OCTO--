<template>
  <div>
    <el-table :data="memberlist" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="100">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit(item.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getmemberlist();
  },
  computed: {
    ...mapGetters({
      memberlist: "member/getmemberList",
    }),
  },
  methods: {
    ...mapActions({
      getmemberlist: "member/memberAction",
    }),
    //封装一个编辑事件
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>
<style lang="" scoped>
.el-table {
  margin-top: 20px;
}
</style>