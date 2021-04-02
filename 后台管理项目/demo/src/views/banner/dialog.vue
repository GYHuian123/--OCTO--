<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 分类名称 -->
        <el-form-item
          label="标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="dialogForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
import { bannerAdd, bannerInfo, bannerEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogForm: {
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //预览时调用的图片地址
      dialogVisible: false, //预览时控制图片的显示隐藏
      imgUrl: "", //设置图片的地址
      fileList: [], //上传的文件列表，用于图片回显
    };
  },
  props: ["dislogInfo"],
  computed: {
    ...mapGetters({
      bannerlist: "banner/getbannerlist",
    }),
  },
  methods: {
    //删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //上传图片文件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      //打开图片预览的弹框
      this.dialogVisible = true;
    },
    //文件状态改变时触发
    onChange(file, fileList) {
      //把文件详情赋值给图片地址
      this.imgUrl = file.raw;
    },
    //文件超出个数limit=1时触发
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    ...mapActions({
      getbannerList: "banner/bannerAction",
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: 1, //状态1正常2禁用
      };
      this.$refs.formName.resetFields();
      this.fileList = [];
    },
    //封装一个点击添加事件
    add() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.img = this.imgUrl;
          let file = new FormData();
          for (let i in this.dialogForm) {
            file.append(i, this.dialogForm[i]);
          }
          bannerAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getbannerList();
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败1");
          return false;
        }
      });
    },
    //回显数据
    lookup(id) {
      bannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
          this.dialogForm.id = id;
          //判断图片是否存在，实现图片回显
          this.fileList = this.dialogForm.img
            ? [{ url: this.$imgUrl + this.dialogForm.img }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个点击编辑事件
    endit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.img = this.imgUrl ? this.imgUrl : this.dialogForm.img;
          //进行formData转化
          let file = new FormData();
          for (let i in this.dialogForm) {
            file.append(i, this.dialogForm[i]);
          }
          bannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getbannerList();
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