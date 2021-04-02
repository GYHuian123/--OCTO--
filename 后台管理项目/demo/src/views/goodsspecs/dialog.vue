<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 规格名称 -->
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input
            v-model="dialogForm.specsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item
          v-for="(item, index) in attrArr"
          :label-width="formLabelWidth"
          label="规格属性"
          :key="index"
        >
          <el-input style="width: 75%" v-model="item.value"></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else type="danger" @click="delAttr(item)"
            >删除</el-button
          >
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
import { specsInfo, specsAdd, specsEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogForm: {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      //设定动态添加表单项的数组
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  props: ["dislogInfo"],
  mounted() {
    this.getspecslist();
  },
  computed: {
    ...mapGetters({
      specslist: "specs/getspecslist",
    }),
  },
  methods: {
    //封装一个新增规格属性
    addAttr() {
      //最多添加6个
      if (this.attrArr.length < 6) {
        this.attrArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多添加6个表单项！！");
      }
    },
    //封装一个删除规格属性
    delAttr(item) {
      let index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    ...mapActions({
      getspecslist: "specs/specsAction",
      getcount: "specs/countAction",
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      };
      this.$refs.formName.resetFields();
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    //封装一个点击添加事件
    add() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          //获取的动态表单项是一个数组，后端接收的时候要字符串，用','分隔这种形式
          this.dialogForm.attrs = this.attrArr
            .map((item) => item.value)
            .join(",");
          specsAdd(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getspecslist();
              //重新调取分页总数
              this.getcount();
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
      specsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let list = res.data.list[0];
          list.attrs.map((item, idx) => {
            if (idx == 0) {
              this.attrArr[0].value = item;
            } else {
              this.attrArr.push({
                value: item,
              });
            }
          });
          this.dialogForm = list;
          this.dialogForm.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个点击编辑事件
    endit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.attrs = this.attrArr
            .map((item) => item.value)
            .join(",");
          specsEdit(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getspecslist();
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