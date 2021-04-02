<template>
  <div>
    <el-dialog
      title="编辑会员"
      :visible.sync="isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 手机号 -->
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="dialogForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="dialogForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
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
      <div slot="footer">
        <el-button type="primary" @click="alter">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { memberInfo, memberEdit } from "../../util/axios";
export default {
  data() {
    return {
      dialogForm: {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      dialogFormVisible: true,
      formLabelWidth: "120px",
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 11, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isShow"],
  mounted() {
    this.getmemberlist();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getmemberlist",
    }),
  },
  methods: {
    ...mapActions({
      getmemberlist: "member/memberAction",
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        uid: "", //会员编号，必填项
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      //重置验证规则
      this.$refs.formName.resetFields();
    },
    //封装一个获取一条数据的方法
    lookup(uid) {
      memberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
          this.dialogForm.uid = uid;
        }
      });
    },
    // 封装一个修改事件
    alter() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          memberEdit(this.dialogForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getmemberlist();
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