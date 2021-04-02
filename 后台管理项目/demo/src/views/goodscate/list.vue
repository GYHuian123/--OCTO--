<template>
  <div>
    <el-table
      :data="catelist"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编码" width="100px">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="200px">
      </el-table-column>
      <el-table-column label="图片" width="200px">
        <template slot-scope="item">
          <div>
            <img
              v-if="item.row.pid != 0"
              class="img"
              :src="$imgUrl + item.row.img"
              alt=""
            />
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
  </div>
</template>
<script>
import { cateDel } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["dislogInfo"],
  mounted() {
    this.getcateList();
  },
  computed: {
    ...mapGetters({
      catelist: "cate/getcatelist",
    }),
  },
  methods: {
    ...mapActions({
      getcateList: "cate/cateAction",
    }),
    //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cateDel({ id }).then((res) => {
            if (res.data.code == 200) {
              this.getcateList();
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
.img {
  width: 100px;
  height: 100px;
}
</style>