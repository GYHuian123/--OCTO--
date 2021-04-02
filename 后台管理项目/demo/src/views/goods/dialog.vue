<template>
  <div>
    <el-dialog
      :title="dislogInfo.isAdd ? '添加商品管理' : '编辑商品管理'"
      :visible.sync="dislogInfo.isShow"
      center
      :beforeClose="cancel"
      @opened="createEditor"
    >
      <el-form :model="dialogForm" :rules="rules" ref="formName">
        <!-- 一级分类 -->
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            @change="changeCate(false)"
            v-model="dialogForm.first_cateid"
            placeholder="请选择"
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
        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="dialogForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input
            v-model="dialogForm.goodsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="dialogForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input
            v-model="dialogForm.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="filelist"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 商品规格 -->
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            @change="changeSpecs(false)"
            v-model="dialogForm.specsid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select
            v-model="dialogForm.specsattr"
            placeholder="请选择"
            multiple
          >
            <el-option
              v-for="item in specsAttr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item
          label="是否新品"
          :label-width="formLabelWidth"
          prop="isnew"
        >
          <el-radio v-model="dialogForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="dialogForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item
          label="是否热卖"
          :label-width="formLabelWidth"
          prop="ishot"
        >
          <el-radio v-model="dialogForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="dialogForm.ishot" :label="2">否</el-radio>
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
        <!-- 商品描述 -->
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="wangEditor"></div>
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
import { goodsInfo, goodsAdd, goodsEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
//引入富文本编辑器
import E from "wangeditor";
export default {
  data() {
    return {
      dialogForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      editor: null,
      formLabelWidth: "120px",
      filelist: [], //用于图片回显
      dialogVisible: false, //用于控制图片预览的显示隐藏
      dialogImageUrl: "", //预览时调用的图片地址
      imgUrl: "", //设置图片地址用于接收所有上传文件详情
      secondCate: [], //二级分类数组
      specsAttr: [], //规格属性数组
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
    };
  },
  props: ["dislogInfo"],
  mounted() {
    //数据交互只执行一次
    if (this.specslist.length == 0) {
      this.getspecslist();
    }
    if (this.catelist.length == 0) {
      this.getcatelist();
    }
  },
  computed: {
    ...mapGetters({
      specslist: "specs/getspecslist",
      catelist: "cate/getcatelist",
    }),
  },
  methods: {
    //封装一个富文本编辑器事件
    createEditor() {
      this.editor = new E("#wangEditor");
      this.editor.create();
      // console.log(this.editor);
      //每次创建都把上一次的值清空
      this.editor.txt.html(this.dialogForm.description);
    },
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
    //封装一个一级分类事件
    changeCate(n) {
      let index = this.catelist.findIndex(
        (item) => item.id == this.dialogForm.first_cateid
      );
      this.secondCate = this.catelist[index].children;
      //通过对开关进行判断，去清空二级的双向数据绑定值
      if (!n) {
        this.dialogForm.second_cateid = "";
      }
    },
    //封装一个商品规格事件
    changeSpecs(n) {
      let index = this.specslist.findIndex(
        (item) => item.id == this.dialogForm.specsid
      );
      this.specsAttr = this.specslist[index].attrs;
      if (!n) {
        this.dialogForm.specsattr = "";
      }
    },
    ...mapActions({
      getspecslist: "specs/specsAction",
      getcount: "goods/countAction",
      getcatelist: "cate/cateAction",
      getgoodslist: "goods/goodsAction",
    }),
    //封装一个取消事件
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.dialogForm = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      };
      this.$refs.formName.resetFields();
      this.filelist = [];
    },
    //封装一个点击添加事件
    add() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          //将商品规格属性转换成后端需要的字符串
          this.dialogForm.specsattr = this.dialogForm.specsattr.join(",");
          this.dialogForm.img = this.imgUrl;
          //将富文本编辑器的内容赋值给商品描述
          this.dialogForm.description = this.editor.txt.html();
          let file = new FormData();
          for (let i in this.dialogForm) {
            file.append(i, this.dialogForm[i]);
          }
          // console.log(this.dialogForm);
          goodsAdd(file).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getgoodslist();
              //重新调取分页总数
              this.getcount();
              this.cancel();
            } else {
              this.dialogForm.specsattr = "";
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
      goodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.dialogForm = res.data.list;
          //判断图片是否存在实现回显
          this.filelist = this.dialogForm.img
            ? [{ url: this.$imgUrl + this.dialogForm.img }]
            : [];
          //判断商品属性是否存在，存在转成字符串，不存在空的数组
          this.dialogForm.specsattr = this.dialogForm.specsattr
            ? this.dialogForm.specsattr.split(",")
            : [];
          this.dialogForm.id = id;
          //重新调用切换分类以及切换属性 目的是：数据的回显
          this.changeCate(true);
          this.changeSpecs(true);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个点击编辑事件
    endit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.dialogForm.specsattr = this.dialogForm.specsattr.join(",");
          this.dialogForm.img = this.imgUrl ? this.imgUrl : this.dialogForm.img;
          //将富文本编辑器的内容赋值给商品描述
          this.dialogForm.description = this.editor.txt.html();
          let file = new FormData();
          for (let i in this.dialogForm) {
            file.append(i, this.dialogForm[i]);
          }
          goodsEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getgoodslist();
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