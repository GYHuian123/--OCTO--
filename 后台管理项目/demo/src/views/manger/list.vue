<template>
  <div>
    <el-table
      :data="userlist"
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编码"> </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
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
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(item.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分页 -->
    <el-pagination
      :page-size="size"
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { userDel } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["dislogInfo"],
  mounted() {
    this.getuserList();
    this.getcount();
  },
  computed: {
    ...mapGetters({
      userlist: "manger/getuserlist",
      count: "manger/getCount",
      size: "manger/getSize",
    }),
  },
  methods: {
    ...mapActions({
      getuserList: "manger/userAction",
      getcount: "manger/countAction",
      getpage: "manger/pageAction",
    }),
    //封装一个分页切换事件
    changePage(n) {
      this.getpage(n);
    },
    //封装一个删除事件
    del(uid) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userDel({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.getuserList();
              this.getcount();
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
    //封装一个编辑事件
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>
<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 10px;
}
</style>