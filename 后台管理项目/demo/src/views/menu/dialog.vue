<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 菜单名称 -->
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="dialogForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="dialogForm.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="dialogForm.type" :label="1">目录</el-radio>
          <el-radio v-model="dialogForm.type" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item
          v-if="dialogForm.type == 2"
          label="菜单地址"
          :label-width="formLabelWidth"
        >
          <el-select v-model="dialogForm.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in routerlist"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item v-else label="菜单图标" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.icon" placeholder="请选择菜单图标">
            <el-option
              v-for="item in iconlist"
              :key="item"
              :label="item"
              :value="item"
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
//引入左侧菜单地址集合
import { RoutersList } from "../../router/index";
import { menuAdd, menuInfo, menuEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogForm: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      //定义左侧菜单地址集合
      routerlist: RoutersList,
      //定义菜单图标的集合
      iconlist: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
    };
  },
  props: ["dislogInfo"],
  computed: {
    ...mapGetters({
      menulist: "menu/getmenulist",
    }),
  },
  methods: {
    ...mapActions({
      getmenuList: "menu/menuAction",
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
      this.$refs.formName.resetFields();
    },
    //封装一个点击添加事件
    add() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          menuAdd(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getmenuList();
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
      menuInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
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
          menuEdit(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getmenuList();
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