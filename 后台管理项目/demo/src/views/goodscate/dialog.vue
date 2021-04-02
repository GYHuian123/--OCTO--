<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 上级分类 -->
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="dialogForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="dialogForm.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item
          v-if="dialogForm.pid != 0"
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
import { cateAdd, cateInfo, cateEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialogForm: {
        pid: "", //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
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
      catelist: "cate/getcatelist",
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
      getcateList: "cate/cateAction",
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
        catename: "", //商品分类名称
        // img: "", //图片(文件，一般用于二级分类)
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
          /* 一旦有文件上传，你的文件传输格式，必须是FORMData的格式，enctype = 'multipart/form-data	'  它本身是FORM表单的属性。
          我们没用直接修改属性的方式，我们可以通过表单对象（FormData）构造函数进行转化。通过它转化的内容都是multipart/form-data这种类型
          FormData() 它是key/value键值对的类型，要是添加 只能用append去添加。查询值，只能调用文件.get(key)值 */
          let file = new FormData();
          for (let i in this.dialogForm) {
            file.append(i, this.dialogForm[i]);
          }
          cateAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getcateList();
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
      cateInfo({ id }).then((res) => {
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
          //如果编辑的时候，你重新上传图片，this.imgUrl肯定有值，我们赋值就用this.imgUrl去赋值。如果编辑的时候，没变。用this.dialogForm.img
          this.dialogForm.img = this.imgUrl ? this.imgUrl : this.dialogForm.img;
          //进行formData转化
          let file = new FormData();
          for (let i in this.dialogForm) {
            file.append(i, this.dialogForm[i]);
          }
          cateEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getcateList();
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
/* 
enctype 上传编码类型
application/x-www-form-urlencoded	在发送前编码所有字符（默认）


multipart/form-data	
不对字符编码。

在使用包含文件上传控件的表单时，必须使用该值。

text/plain	空格转换为 "+" 加号，但不对特殊字符编码。
*/
</script>
<style lang="" scoped>
</style>