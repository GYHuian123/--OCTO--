<template>
  <div>
    <el-table :data="goodslist" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="80"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="150">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="150">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="80">
        <template slot-scope="item">
          <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template></el-table-column
      >
      <el-table-column prop="ishot" label="是否热卖" width="80">
      <template slot-scope="item">
          <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template></el-table-column>
      <el-table-column prop="status" label="状态" width="70">
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
import { goodsDel } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["dislogInfo"],
  mounted() {
    this.getgoodsList();
    this.getcount();
  },
  computed: {
    ...mapGetters({
      goodslist: "goods/getgoodslist",
      count: "goods/getCount",
      size: "goods/getSize",
    }),
  },
  methods: {
    ...mapActions({
      getgoodsList: "goods/goodsAction",
      getcount: "goods/countAction",
      getpage: "goods/pageAction",
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
          goodsDel({ id }).then((res) => {
            if (res.data.code == 200) {
              this.getgoodsList();
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
.img {
  width: 100px;
  height: 100px;
}
</style>