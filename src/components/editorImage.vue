<template>
  <div class="upload-container">
    <el-dialog append-to-body :visible.sync="message">
      <el-upload class="editor-slide-upload" action="https://t8090.i-camp.com.cn/files" name="imgs" :data="dataObj" :multiple="true" :file-list="fileList" :show-file-list="true" list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :before-upload="beforeUpload" style="margin-bottom: 30px;">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { policy } from '@/api/oss'
export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    message: null
  },
  data() {
    return {
      listObj: {},
      fileList: [],
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
      }
    }
  },
  methods: {

    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleCancel() {
      this.$emit('func', [],false)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('func', arr, false)
      this.listObj = {};
      this.fileList = [];
    },
    handleSuccess(response, file) {
      console.log(response)
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj)

      console.log(objKeyArr)
      
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data[0].url
          this.listObj[objKeyArr[i]].fileId = response.data[0].fileId

          this.listObj[objKeyArr[i]].hasSuccess = true;
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const fileName = file.uid;
      this.listObj[fileName] = {};
      _self.dataObj.policy = "response.data.policy";
      _self.dataObj.signature = "response.data.signature";
      _self.dataObj.ossaccessKeyId = "response.data.accessKeyId";
      _self.dataObj.key = "response.data.dir" + '/${filename}';
      _self.dataObj.dir = "response.data.dir";
      _self.dataObj.host = "response.data.host";
      _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height };
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container .editor-slide-upload {
  margin-bottom: 20px;
}
</style>
