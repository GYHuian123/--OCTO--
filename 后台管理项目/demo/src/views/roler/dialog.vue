<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="dialogForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            ref="tree"
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
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
      <div slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogInfo.isAdd" type="primary" @click="add"
          >添 加</el-button
        >
        <el-button v-else type="primary" @click="edit">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { roleAdd, roleInfo, roleEdit } from "../../util/axios";
export default {
  data() {
    return {
      dialogForm: {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '1,2,3'
        status: 1, //状态1正常2禁用
      },
      dialogFormVisible: true,
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["dialogInfo"],
  mounted() {
    // console.log(this.menuList.length); 
    //如果页面一加载显示的是当前页面，this.menuList.length==0，就执行一次数据交互
    //数据交互只执行一次
    if (this.menuList.length == 0) {
      this.getmenulist();
    }
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getmenulist",
    }),
  },
  methods: {
    ...mapActions({
      getrolerlist: "roler/rolerAction",
      getmenulist: "menu/menuAction",
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '1,2,3'
        status: 1, //状态1正常2禁用
      };
      //重置验证规则
      this.$refs.formName.resetFields();
      //重置tree结构
      this.$refs.tree.setCheckedKeys([]);
    },
    //封装一个添加事件
    add() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          roleAdd(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getrolerlist();
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
    //封装一个获取一条数据的方法
    lookup(id) {
      roleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
          //重新给tree赋值
          this.$refs.tree.setCheckedKeys(this.dialogForm.menus.split(","));
          this.dialogForm.id = id;
        }
      });
    },
    // 封装一个编辑事件
    edit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          roleEdit(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getrolerlist();
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