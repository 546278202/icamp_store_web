
<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="总期数" prop="name">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="共1期" value="1"></el-option>
          <el-option label="共2期" value="2"></el-option>
          <el-option label="共3期" value="3"></el-option>
          <el-option label="共4期" value="4"></el-option>
          <el-option label="共5期" value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="分期">
        <template slot-scope="scope">
          <el-input v-model="tableData.name" :placeholder="scope.row.name"/>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="主题">
        <template slot-scope="scope">
          <el-input v-model="tableData.name" :placeholder="scope.row.name"/>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="项目编号"></el-table-column>
      <el-table-column prop="date" label="出发日期"></el-table-column>
      <el-table-column prop="date" label="返回日期"></el-table-column>
      <el-table-column prop="date" label="报名截止"></el-table-column>
      <el-table-column prop="date" label="天数"></el-table-column>
      <el-table-column prop="date" label="价格"></el-table-column>
      <el-table-column prop="date" label="剩余名额"></el-table-column>
      <el-table-column prop="date" label="总名额"></el-table-column>
      <el-table-column prop="date" label="操作">
        <a>编辑</a>
      </el-table-column>
    </el-table>

    <!-- 多图片上传 -->
    <div style="margin-top:30px;">
      <h3>上传商品轮播图</h3>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-remove1="handleRemove1"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
    <!-- 多图片上传 -->
    <div style="margin-top:30px;">
      <h3>上传商品图</h3>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>

    <!-- 父文本编辑器 -->
    <div style="padding:30px 0 50px 0;">
      <h3>详情介绍</h3>
      <abc/>
    </div>
    <div style="padding: 30px 0;">
      <!-- 按钮组 -->
      <el-button type="primary">上一步</el-button>
      <el-button type="primary">预览</el-button>
      <el-button type="primary">提交商品</el-button>
    </div>
  </div>
</template>
<script>
import abc from "../components/abc";
export default {
  components: {
    abc
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      form: {
        name: "",
        region: ""
      },
      rules: {
        name: [{ required: true, message: "", trigger: "blur" }]
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  position: relative;
}
.cell {
  text-align: center;
}
.el-table i {
  font-size: 20px;
}
.el-table a {
  color: #409eff;
}

el-upload {
  margin: 20px 0;
}
</style>

