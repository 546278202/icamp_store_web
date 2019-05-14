<template>
  <div class="dashboard-container">
    <el-button type="primary" medium @click="dialogFormVisible = true">添加营会</el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top:30px;">
      <el-table-column prop="date" label="编号"/>
      <el-table-column prop="name" label="分类名称"/>
      <el-table-column prop="sort" label="排序码"></el-table-column>
      <el-table-column prop="name" label="备注"/>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope" >
          <div>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加营会 -->
    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="分类:" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          date: "服务器操作系统:",
          name: "王小虎",
          date: "服务器操作系统:",
          name: "王小虎"
        },
        {
          date: "服务器操作系统:",
          name: "王小虎",
          date: "服务器操作系统:",
          name: "王小虎"
        },
        {
          date: "服务器操作系统:",
          name: "王小虎",
          date: "服务器操作系统:",
          name: "王小虎"
        }
      ],
      // 添加营会
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 添加营会
    handleAddCamp() {}
  }
};
</script>
<style>
.dashboard-container {
  padding: 32px;
  position: relative;
}
h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
}
</style>
