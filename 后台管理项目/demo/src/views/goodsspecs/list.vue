<template>
  <div>
    <el-table
      :data="specslist"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="规格编码" width="80"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="200">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attrs in item.row.attrs" :key="attrs" type="info">{{
              attrs
            }}</el-tag>
          </div>
        </template>
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
import { specsDel } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["dislogInfo"],
  mounted() {
    this.getspecsList();
    this.getcount();
  },
  computed: {
    ...mapGetters({
      specslist: "specs/getspecslist",
      count: "specs/getCount",
      size: "specs/getSize",
    }),
  },
  methods: {
    ...mapActions({
      getspecsList: "specs/specsAction",
      getcount: "specs/countAction",
      getpage: "specs/pageAction",
    }),
    //封装一个分页切换事件
    changePage(n) {
      this.getpage(n);
    },
    //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          specsDel({ id }).then((res) => {
            if (res.data.code == 200) {
              this.getspecsList();
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
    edit(id) {
      this.$emit("edit", id);
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