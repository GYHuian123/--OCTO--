<template>
  <div>
    <el-table :data="rolerlist" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="100">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
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
            @click="edit(item.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(item.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roleDel } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getrolerlist();
  },
  computed: {
    ...mapGetters({
      rolerlist: "roler/getrolerList",
    }),
  },
  methods: {
    ...mapActions({
      getrolerlist: "roler/rolerAction",
    }),
    //封装一个编辑事件
    edit(id) {
      this.$emit("edit", id);
    },
    //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          roleDel({ id }).then((res) => {
            if (res.data.code == 200) {
              this.getrolerlist();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="" scoped>
</style>