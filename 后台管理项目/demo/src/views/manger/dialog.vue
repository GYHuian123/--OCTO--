<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 所属角色 -->
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="dialogForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名称 -->
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.password" autocomplete="off"></el-input>
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
import { userInfo, userAdd, userEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
    };
  },
  props: ["dislogInfo"],
  mounted() {
    //数据交互只执行一次
    if (this.rolelist.length == 0) {
      this.getrolelist();
    }
  },
  computed: {
    ...mapGetters({
      userlist: "manger/getuserlist",
      rolelist: "roler/getrolerList",
    }),
  },
  methods: {
    ...mapActions({
      getuserList: "manger/userAction",
      getrolelist: "roler/rolerAction",
      getcount: "manger/countAction",
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
          userAdd(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getuserList();
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
    lookup(uid) {
      userInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
          this.dialogForm.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个点击编辑事件
    endit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          userEdit(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getuserList();
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