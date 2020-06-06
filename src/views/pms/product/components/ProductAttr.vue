
<template>
  <div>
    <el-card class="form-container" style="width:1000px;" shadow="never">
      <div v-for="(item,index) in goodsAttributes" :key="index">
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <h3>{{item.name}}属性 </h3>
          <div>
            <el-button v-if="index+1==goodsAttributes.length" type="primary" size="small" @click="handleAdd">添加</el-button>
            <el-button type="danger" size="small" @click="handleDel(index)">删除</el-button>
          </div>
        </div>
        <el-table v-if="item.type==1" :data="item.values" border style="width: 100%">
          <el-table-column type="index" label="分期" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="项目名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="attributeValue" label="项目编号" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.attributeValue" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="starDate" label="出发日期" align="center" width="160">
            <template slot-scope="scope">
              <el-date-picker class="input-width" v-model="scope.row.starDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="endDate" label="返回日期" align="center" width="160">
            <template slot-scope="scope">
              <el-date-picker class="input-width" v-model="scope.row.endDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="sellPrice" label="价格" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sellPrice" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="totalQty" label="库存总量" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.totalQty" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="warnStockQty" label="库存警告" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.warnStockQty" size="small"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="操作" align="center" width="80">
            <template slot-scope="scope" align="center">
              <a @click="handleDelVal(index,item,$event,scope.row,scope.$index)">删除</a>
              <a v-if="scope.$index+1==item.values.length" @click="handleAddVal(index,item,$event,scope.row,scope.$index)">添加</a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 附加属性 -->
        <el-table v-else :data="item.values" border style="width: 100%">
          <el-table-column prop="name" label="项目名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="attributeValue" label="项目编号" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.attributeValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sellPrice" label="价格" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sellPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" align="center">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="medium" @click="handleDelVal(index,item,$event,scope.row,scope.$index)">删除</el-button>
              <el-button type="text" size="medium" v-if="scope.$index+1==item.values.length" @click="handleAddVal(index,item,$event,scope.row,scope.$index)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 多图片上传 -->
      <div style="margin-top:30px;">
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <h3>上传商品图 </h3>
        </div>
        <div>
          <editorImage :message="message" @func="getMsgFormSon"></editorImage>
        </div>

        <div data-v-02d73824="" style="overflow:hidden;">
          <ul class="el-upload-list el-upload-list--picture-card" style="overflow:hidden;float:left;padding:3px;">
            <div style="width:148px;float:left;margin-right: 15px;" v-for="(item,index) in fileArry" :key="index">
              <li tabindex="0" class="el-upload-list__item is-ready">
                <img :src="item.logoFile.originalFile" alt="" class="el-upload-list__item-thumbnail">
                <span class="el-upload-list__item-actions"><span class="el-upload-list__item-preview" @click="PreviewItemImg(item.logoFile.originalFile)"><i class="el-icon-zoom-in"></i></span><span class="el-upload-list__item-delete" @click="delItemImg(index)"><i class="el-icon-delete"></i></span></span>
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
            <div class="wl_input_module" @click="message = true">
              <i class="el-icon-plus"></i>
            </div>
          </ul>
        </div>
      </div>
      <!-- 父文本编辑器 -->
      <div style="padding:30px 0 50px 0;">
        <h3>详情介绍</h3>
        <vue-ueditor-wrap v-model="value.detailHtml" :destroy="true" :config="myConfig"></vue-ueditor-wrap>
        <!-- <vue-ueditor-wrap v-model="msg" :destroy="true" :config="myConfig"></vue-ueditor-wrap> -->
      </div>
      <div style="padding: 30px 0;text-align:center;">
        <el-button @click="abcd">上一步,填写商品信息</el-button>
        <el-button type="primary" @click="addGood">完成,提交商品</el-button>
      </div>
      <!-- 属性弹出层 -->
      <el-dialog :title="dialogTitleType" :visible.sync="dialogVisible">
        <el-form :model="formInline" :rules="rules" ref="formInline">
          <el-form-item label="属性名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="formInline.name" autocomplete="off" :style="'width:'+ formInputlWidth"></el-input>
          </el-form-item>
          <!-- 商品属性类型 0:服务 1：营期 2：产品参数 -->
          <el-form-item label="属性类型" :label-width="formLabelWidth" prop="type">
            <el-select v-model="formInline.type" placeholder="请选择" :style="'width:'+ formInputlWidth">
              <el-option label="服务" value="0"> </el-option>
              <!-- <el-option label="营期" value="1"> </el-option> -->
              <el-option label="产品参数" value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否必填" :label-width="formLabelWidth" prop="selectType">
            <el-select v-model="formInline.selectType" placeholder="请选择" :style="'width:'+ formInputlWidth">
              <el-option label="必选其一" value="0"> </el-option>
              <el-option label="非必选" value="1"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="operation">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 图片预览 -->
      <el-dialog :visible.sync="imgDialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module 
import { validUsername, validDeptId, validPhone, sharchReset } from "@/utils/validate";

import tinymce from "@/components/Tinymce";
import editorImage from '../../../../components/editorImage'
export default {
  components: { tinymce, editorImage, VueUeditorWrap },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    }
    return {
      value: { type: String, default: '' },
      msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/'
      },
      message: false,
      name: '',
      edit: true,
      globalIndex: 0,
      fileArry: [],     //文件列表
      fileIdArry: [],   //文件id
      // 校验
      rules: {
        name: [{ required: true, trigger: "blur", validator: validateUsername }],
        type: [{ required: true, trigger: "blur", validator: validateUsername }],
        selectType: [{ required: true, trigger: "blur", validator: validateUsername }]
      },
      formInline: {},
      formLabelWidth: '120px',
      formInputlWidth: '350px',
      dialogImageUrl: "",
      dialogVisible: false,
      imgDialogVisible: false,
      dialogTitleType: "添加属性",
      goodsAttributes: [{
        name: "营期",
        selectType: 0,
        type: 1,
        remark: "备注信息",
        isTop: false,
        isBest: false,
        isNew: false,
        isHot: false,
        isPromote: false,
        values: [{}]
      }],
      galleries: [{
        fileId: "",
        isCover: true,
        isSlide: true,
        isGallery: false
      }
      ],
    }
  },
  mounted() {

    if (this.$route.query.Id) {
      this.goodsAttributes = this.$store.state.productBaseData.goodsAttributes
      this.fileArry = this.$store.state.productBaseData.galleries
      this.value.detailHtml = this.$store.state.productBaseData.goodsDesc
    }
  },
  methods: {
   
    getMsgFormSon(array, flag) {
      this.message = flag;
      console.log(this.fileIdArry)
      array.forEach(element => {
        let obj = {
          fileId: element.fileId,
          id: null,
          isCover: false,
          isGallery: false,
          isSlide: false,
          linkId: null,
          logoFile: {
            fileId: element.fileId,
            originalFile: element.url,
          },
          status: 1,
          type: 1
        }
        this.fileArry.push(obj)
      });
      console.log(this.fileArry)
    },
    // 添加属性类
    handleAdd() {
      this.dialogVisible = true;
    },
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

    // 添加属性
    operation() {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          let goodAttribute = {
            name: this.formInline.name,
            selectType: this.formInline.selectType,
            type: this.formInline.type,
            remark: "备注信息",
            values: [
              {
                name: null,
                attributeValue: null,
                // "unit": 1,
                sellPrice: null,
                remark: null,
                brief: "简介",
                valueDesc: "商品属性详情",              }
            ]
          }
          this.goodsAttributes.push(goodAttribute)
          this.dialogVisible = false;
        }
      })
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
      let item = this.fileArry[index]
      this.axios.delete(this.Global.BASE_URL + `/gallery/${item.id}?type=1`).then(response => {
        if (response.data.status == 200) {
          console.log(response)
          this.fileArry.splice(index, 1)
          this.$message({ type: 'success', message: '操作成功!' });
        }
      })
    },
    // 获取图片参数
    getGalleries() {
      if (this.fileArry.length == 0) {
        this.$message.error('至少提交1张商品图片');
        return false
      }
      let galleries = []
      this.fileArry.forEach(element => {
        if (element.id) {
          galleries.push(element)
        } else {
          let obj = {
            fileId: element.fileId,
            isCover: element.isCover,
            isSlide: element.isSlide,
            isGallery: element.isGallery
          }
          galleries.push(obj)
        }
      });
      return galleries
    },
    abcd() {
      this.$parent.tabChange('ProductBase')
      this.$destroy()
    },
    //添加商品
    addGood() {
      this.$store.state.productBaseData.goodsDesc = this.value.detailHtml
      // this.$store.state.productBaseData.goodsDesc = this.msg
      this.$store.state.productBaseData.goodsAttributes = this.goodsAttributes
      this.$store.state.productBaseData.galleries = this.getGalleries()

      if (this.$route.query.Id) {
        this.$store.state.productBaseData.goodsId = this.$route.query.Id
      }
      this.$confirm('您确定添加此商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        console.log(this.$store.state.productBaseData)
        this.axios.post(this.Global.BASE_URL + "/goods", this.$store.state.productBaseData).then(response => {
          if (response.data.status == 200) {
            console.log(response)
            this.$message({ type: 'success', message: '操作成功!' });
            setTimeout(() => {
              this.$router.push({ path: "/pms/product" });
            }, 600)
          }
        })
      })
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
  width: 135px;
}
</style>

<style>
.edui-button.edui-for-135editor .edui-button-wrap .edui-button-body .edui-icon {
  background-image: url("https://static.135editor.com/img/icons/editor-135-icon.png") !important;
  background-size: 85%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>