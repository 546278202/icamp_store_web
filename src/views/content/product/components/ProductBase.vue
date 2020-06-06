
<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small">
      <el-form-item label="标题：" prop="name">
        <el-input v-model="ruleForm.title" placeholder="请输入名字" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="类目：" prop="name">
        <el-select v-model="ruleForm.cid" placeholder="全部" clearable class="input-width">
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="name">
        <el-select v-model="ruleForm.type" placeholder="全部" clearable class="input-width">
          <el-option v-for="item in typeOperates" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介：" prop="name">
        <el-input v-model="ruleForm.brief" placeholder="请输入简介" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="name">
        <el-input v-model="ruleForm.remark" placeholder="请输入备注" class="input-width"></el-input>
      </el-form-item>
    </el-form>
    <!-- 多图片上传 -->
    <div style="margin-top:30px;">
      <div style="display:flex;justify-content: space-between;align-items: center;">
        <h3>上传图片 </h3>
        <div style="margin-top: 30px;text-align: center;" v-if="fileArry.length>0">
          <el-button type="primary" size="small" class="el-icon-upload el-icon--right" @click="recursionPostFile(globalIndex)">点击上传</el-button>
          <el-button type="danger" size="small" @click="ResetAllImg()">重置数据</el-button>
        </div>
      </div>
      <div data-v-02d73824="" style="overflow:hidden;">
        <ul class="el-upload-list el-upload-list--picture-card" style="overflow:hidden;float:left;padding:3px;">
          <div style="width:148px;float:left;margin-right: 15px;" v-for="(item,index) in fileArry" :key="index">
            <li tabindex="0" class="el-upload-list__item is-ready">
              <img :src="getCreateObjectURL(item)" alt="" class="el-upload-list__item-thumbnail">
              <span class="el-upload-list__item-actions"><span class="el-upload-list__item-preview" @click="PreviewItemImg(getCreateObjectURL(item))"><i class="el-icon-zoom-in"></i></span><span class="el-upload-list__item-delete" @click="delItemImg(index)"><i class="el-icon-delete"></i></span></span>
            </li>
            <div style="display: flex;align-items: center;justify-content: space-between;">
              <label class="el-form-item__label" style="line-height:30px;">设为主图</label>
              <el-switch v-model="item.isCover" @change="setIsCover($event,index)"> </el-switch>
            </div>
            <div style="display: flex;align-items: center;justify-content: space-between;">
              <label class="el-form-item__label" style="line-height:30px;">设为轮播</label>
              <el-switch v-model="item.isSlide" @change="setIsSlide($event,index)"> </el-switch>
            </div>
            <div style="display: flex;align-items: center;justify-content: space-between;">
              <label class="el-form-item__label" style="line-height:30px;">相册中展示</label>
              <el-switch v-model="item.isGallery" @change="setIsGallery($event,index)"> </el-switch>
            </div>
          </div>
          <div class="wl_input_module" v-if="fileArry.length<5">
            <i class="el-icon-plus"></i>
            <input type="file" name="file" class="wl_input" accept="image/*" multiple @change="postFile()">
          </div>
        </ul>
      </div>

    </div>

    <!-- 父文本编辑器 -->
    <div style="padding:30px 0 50px 0;">
      <h3>详情介绍</h3>
      <tinymce v-model="value.detailHtml"></tinymce>
    </div>
    <div style="padding: 30px 0;text-align:center;">
      <el-button type="primary" @click="addGood">完成,提交</el-button>
    </div>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="imgDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>
<script>
import { validUsername, validDeptId, validPhone, sharchReset } from "@/utils/validate";
import tinymce from "@/components/Tinymce";
import Vue from 'vue'
export default {
  components: {
    tinymce
  },

  data() {
    const defaultListQuery = {
      keyword: null,
      page: 0,
      size: 5,
      status: null,
      cid: null,
      type: null,
      goodsName: null,
      productCategoryId: null,
    };
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    }
    return {
      parentId: 0,
      typeOperates: [
        { value: '0', label: '文章' },
        { value: '1', label: '外链' },
        { value: '2', label: '视频' }
      ],
      typeList: [],
      listQuery: Object.assign({}, defaultListQuery),
      ruleForm: {},
      value: {
        type: String,
        default: ''
      },
      edit: true,
      globalIndex: 0,
      fileArry: [],     //文件列表
      fileIdArry: [],   //文件id

      // 校验
      rules: {
        name: [{ required: true, trigger: "blur", validator: validateUsername }],
      },

      dialogImageUrl: "",
      dialogVisible: false,
      imgDialogVisible: false,

      galleries: [{
        isCover: true,
        isSlide: true,
        isGallery: false
      }
      ],
    }
  },
  created() {
    this.getList();

  },
  mounted() {

  },
  methods: {

    // 删除属性类
    handleDel(a) {
      if (this.goodsAttributes.length == 1) {
        return false
      }
      this.goodsAttributes.splice(a, 1)
    },
    // 添加数据
    handleAddVal(a, b, c, d, e) {
      console.log(a, b, c, d, e)
      console.log(d)
      console.log(b)
      let item = JSON.stringify(d)
      this.goodsAttributes[a].values.push(JSON.parse(item))
    },

    // 删除数据
    handleDelVal(a, b, c, d, e) {
      console.log(a, b, c, d, e)
      if (this.goodsAttributes.length == 1 && b.values.length == 1) {
        return false
      }
      if (b.values.length == 1) {
        this.goodsAttributes.splice(a, 1)
      } else {
        this.goodsAttributes[a].values.splice(e, 1)
      }
    },
    //文件路径处理
    getCreateObjectURL(url) {
      window.URL = window.URL || window.webkitURL;
      return window.URL.createObjectURL(url)
    },
    // 是否主图
    setIsCover(event, index) {
      let list = this.fileArry
      for (var i = 0; i < list.length; i++) {
        list[i].isCover = false
      }
      setTimeout(() => {
        this.$set(this.fileArry[index], "isCover", event)
        this.$forceUpdate()
      }, 100)
      console.log(this.fileArry)
    },
    // 是否轮播图
    setIsSlide(event, index) {
      this.$set(this.fileArry[index], "isSlide", event)
      console.log(this.fileArry)
      this.$forceUpdate()
    },
    // 是否在相册中展示
    setIsGallery(event, index) {
      this.$set(this.fileArry[index], "isGallery", event)
      console.log(this.fileArry)
      this.$forceUpdate()
    },
    // 预览当前图片
    PreviewItemImg(url) {
      this.dialogImageUrl = url;
      this.imgDialogVisible = true;
    },
    // 删除当前图片
    delItemImg(index) {
      this.fileArry.splice(index, 1)
      console.log(this.fileArry)
    },
    //清空文件列表
    ResetAllImg() {
      this.$confirm('您确定清空已选图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // lockScroll: false
      }).then(() => {
        this.fileArry.splice(0, this.fileArry.length)
        console.log(this.fileArry)
      })
    },
    // 文件上传
    postFile(file) {
      // 选中的文件push到总数组
      let fileList = event.target.files
      for (let i = 0; i < fileList.length; i++) {
        this.fileArry.push(fileList[i])
      }
      event.target.value = "" // 解决不能选同一个文件

      // 处理总数组的状态
      let _fileArry = this.fileArry
      for (let j = 0; j < _fileArry.length; j++) {
        if (j == 0) {
          _fileArry[j]["isCover"] = true   //默认第一张主图
        } else {
          _fileArry[j]["isCover"] = false
        }
        _fileArry[j]["isSlide"] = true   //轮播
        _fileArry[j]["isGallery"] = false //相册
      }

      // 控制图片数量
      if (this.fileArry.length > 5) {
        this.fileArry = this.fileArry.slice(0, 5)
      }
      console.log(this.globalIndex)
      // 此处调用自动上传
      // this.recursionPostFile(this.globalIndex)
    },
    //递归上传
    recursionPostFile(index) {
      var formData = new window.FormData()
      formData.append('imgs', this.fileArry[index]) // 'imgs' 这个名字要和后台获取文件的名字一样;
      var options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log("第" + this.globalIndex + "次上传开始")
      this.axios.post(this.Global.BASE_URL + "/files", formData, options).then(response => {
        if (response.data.status == 200) {
          this.fileIdArry.push(response.data.data[0].fileId)
          console.log("第" + this.globalIndex + "次上传结束")
          this.globalIndex++
          if (this.fileArry.length == this.globalIndex) {
            this.$message({ type: 'success', message: '添加成功!' });
            this.getGalleries()
            return false
          }
          this.recursionPostFile(this.globalIndex)
        }
      })
    },

    // 获取分类
    getList() {
      this.axios.get(this.Global.BASE_URL + `/category/${this.parentId}?page=${this.listQuery.page}&size=10&type=2`).then(response => {
        if (response.data.status == 200) {
          console.log(response.data.data)
          this.total = response.data.total
          this.typeList = response.data.data
        }
      })
    },

    // 获取图片参数
    getGalleries() {
      let fileIdArry = this.fileIdArry
      if (fileIdArry.length == 0) {
        this.$message.error('至少提交1张商品图片');
        return false
      } else {
        let arr = []
        for (var i = 0; i < fileIdArry.length; i++) {
          let paramer = {
            fileId: fileIdArry[i],
            isCover: this.fileArry[i].isCover,
            isSlide: this.fileArry[i].isSlide,
            isGallery: this.fileArry[i].isGallery
          }
          arr.push(paramer)
        }
        this.galleries = arr
      }
    },

    //添加商品
    addGood() {
      console.log(this.value.detailHtml)
      this.ruleForm.content = this.value.detailHtml
      this.ruleForm.logoFileId = this.galleries[0].fileId
      if (this.galleries.length != 0) {
        this.$confirm('您确定添加此内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll: false
        }).then(() => {
          this.axios.post(this.Global.BASE_URL + "/discovery", this.ruleForm).then(response => {
            if (response.data.status == 200) {
              console.log(response)
              this.$message({ type: 'success', message: '添加成功!' });
              setTimeout(() => {
                this.$router.push({ path: "/content/product" });
              }, 600)
            }
          })
        })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cell {
  text-align: center;
}
.el-table i {
  font-size: 20px;
}
.el-table a {
  color: #409eff;
}

//图片上传

.wl_input_module {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
  position: relative;
}
.wl_input {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  opacity: 0;
  display: inline-block;
  padding: 0;
  border: 0;
  height: 148px;
  width: 148px;
  cursor: pointer;
}
.input-width {
  width: 600px;
}
</style>

