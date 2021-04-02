<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 活动名称 -->
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="dialogForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="dialogForm.first_cateid"
            placeholder="请选择分类"
            @change="changeCate(false)"
          >
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="dialogForm.second_cateid"
            placeholder="请选择分类"
            @change="changeGoods(false)"
          >
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="dialogForm.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 取消和确定 -->
      <div slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="dislogInfo.isAdd" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="endit">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { seckAdd, seckInfo, seckEdit, goodsList } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogForm: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
      },
      secondCate: [], //二级分类数组
      goodsArr: [], //商品分类数组
      timer: "",
    };
  },
  props: ["dislogInfo"],
  mounted() {
    if (this.catelist.length == 0) {
      this.getcateList();
    }
    this.getseckList();
  },
  computed: {
    ...mapGetters({
      secklist: "seck/getsecklist",
      catelist: "cate/getcatelist",
    }),
  },
  methods: {
    ...mapActions({
      getseckList: "seck/seckAction",
      getcateList: "cate/cateAction",
    }),
    //封装一个切换一级分类的事件
    changeCate(n) {
      let index = this.catelist.findIndex(
        (item) => item.id == this.dialogForm.first_cateid
      );
      this.secondCate = this.catelist[index].children;
      if (!n) {
        this.dialogForm.second_cateid = "";
        this.dialogForm.goodsid = "";
      }
    },
    //封装一个切换二级分类的事件
    changeGoods(n) {
      goodsList({
        fid: this.dialogForm.first_cateid,
        sid: this.dialogForm.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
        }
      });
      if (!n) {
        this.dialogForm.goodsid = "";
      }
    },
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      this.$refs.formName.resetFields();
      //清空时间
      this.timer = [];
    },
    //封装一个点击添加事件
    add() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          //对秒杀的时间进行拆分
          this.dialogForm.begintime = new Date(this.timer[0]).getTime();
          this.dialogForm.endtime = new Date(this.timer[1]).getTime();
          seckAdd(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getseckList();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    //回显数据
    lookup(id) {
      seckInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
          this.dialogForm.id = id;
          //时间的回显
          this.timer = [
            new Date(parseInt(this.dialogForm.begintime)),
            new Date(parseInt(this.dialogForm.endtime)),
          ];
          //重新调取二级和一级分类
          this.changeCate(true);
          this.changeGoods(true);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个点击编辑事件
    endit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.begintime = new Date(this.timer[0]).getTime();
          this.dialogForm.endtime = new Date(this.timer[1]).getTime();
          seckEdit(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getseckList();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="" scoped>
</style>