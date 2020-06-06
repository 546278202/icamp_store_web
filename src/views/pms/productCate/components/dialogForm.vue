<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog" width="40%" :lock-scroll="false">
      <el-form :model="form" :rules="loginRules" ref="loginForm3">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="value">
          <el-select v-model="value" placeholder="请选择" :disabled="disabled" :style="'width:'+ formInputlWidth">
            <el-option v-for="item in tableData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" :style="'width:'+ formInputlWidth"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth" prop="logoFile">
          <el-upload class="avatar-uploader" :action="Global.BASE_URL+ '/files'" name="imgs" :with-credentials="true" :file-list="fileList" :show-file-list="false" :on-success="handleAvatarSuccess">
            <el-image v-if="form.logoFile" style="width: 120px; height: 120px" :src="form.logoFile.originalFile" @error='defImg()' fit="cover" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="operation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import defaultImg from '@/assets/logo.png'
import { validUsername, validDeptId, validPhone } from "@/utils/validate";
export default {
  props: ["inputName"],
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log(value)
      if (!validUsername(value)) {

        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validateParentClass = (rule, value, callback) => {
      if (!this.value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],

      defaultImg: defaultImg,
      disabled: false,
      title: '',
      tableData: null,
      type: 1,     //1添加，2编辑
      formLabelWidth: '120px',
      formInputlWidth: '350px',
      // 校验
      loginRules: {
        value: [
          { required: true, trigger: "blur", validator: validateParentClass }
        ],
        name: [
          { required: true, trigger: "blur", validator: validateUsername }
        ]
      },
      dialogFormVisible: false, //弹出层
      form: {},
      value: '',
      fileList: [],           //本地选择的图片
    };
  },
  components: {

  },
  methods: {
    // 图片加载失败
    defImg() {
      let img = event.srcElement;
      console.log(event.srcElement)
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    closeDialog() {
      this.$emit("changParent", "参数");
    },
    // 来自父组件参数
    sonTableData(e, item, data) {
      this.dialogFormVisible = true;
      this.tableData = { id: this.$route.query.parentId ? this.$route.query.parentId : '', name: this.$route.query.name ? this.$route.query.name : '无上级分类' };
      this.type = e
      this.form = {}
      this.value = this.$route.query.name ? this.$route.query.name : '无上级分类'
      if (this.type == 1) {
        this.title = "添加分类"
        this.disabled = true
        if (this.$refs["loginForm3"]) {
          this.$refs["loginForm3"].resetFields();
        }
      } else if (this.type == 2) {
        this.title = "编辑分类"
        this.form = item
        this.disabled = true
      }
    },
    // 图片提交成功
    handleAvatarSuccess(res, file) {
      console.log(res.data[0])
      this.fileList =
        console.log(file)

      this.form.logoFileId = res.data[0].fileId
      // this.form.logoFile.originalFile=res.data[0].url
    },

    // 添加分类
    operation() {
      let paramer = ''
      if (this.type == 1) {
        paramer = {
          type: 0,
          name: this.form.name,
          id: '',
          parentId: this.tableData.id,
          logoFileId: this.form.logoFileId,
        }
      } else if (this.type == 2) {
        paramer = {
          name: this.form.name,
          id: this.form.id,
          logoFileId: this.form.logoFileId,
        }
      }
      this.$refs.loginForm3.validate(valid => {
        if (valid) {
          console.log(paramer)
          this.axios.post(this.Global.BASE_URL + "/category", paramer).then(response => {
            if (response.data.status == 200) {
              this.dialogFormVisible = false;
              this.$message({ message: '操作成功', type: 'success' });
              this.$parent.getList()
            }
          })
        }
      })
    },
  },

  watch: {
    inputName(newName, oldName) {
      this.dialogFormVisible = newName;
    }
  },
  mounted() {
    console.log(this.inputName);
  }
};
</script>
<style lang="scss" scoped>
// img
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
