<template>
  <div class="dashboard-container">
    <div style="margin-bottom:35px;">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="changeState">添加</el-button>
    </div>
    <template>
      <el-table :data="tableData" border>
        <el-table-column prop="date" label="标签名称" align="center"/>
        <el-table-column prop="ip" label="会员人数" align="center"/>
        <el-table-column prop="area" label="自动打标签条件" align="center" width="400"/>
        <el-table-column prop="browserype" label="操作" align="center">
          <a>编辑</a>
          <a>删除</a>
        </el-table-column>
      </el-table>
    </template>
    <!-- 弹出层 -->
    <dialogForm :inputName="dialogFormVisible" v-on:changParent="zidingyi($event)"/>
    <!-- 分也 -->
    <div>
      <el-pagination
        background
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import dialogForm from "./components/dialogForm";
export default {
  components: {
    dialogForm
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      dialogFormVisible: false, //弹出层状态
      tableData: [
        {
          date: " 优质用户",
          ip: "1000",
          area: "累计交易成功100笔，累计购买金额：¥2000.00",
          browserype: ""
        },
        {
          date: " 优质用户",
          ip: "1000",
          area: "累计交易成功100笔，累计购买金额：¥2000.00",
          browserype: ""
        }
      ]
    };
  },
  methods: {
    changeState() {
      this.dialogFormVisible = true;
    },
    zidingyi(msg) {
      console.log(msg);
      this.dialogFormVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
    // 设置表格第一行的颜色
    // getRowClass({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex == 0) {
    //     return "background:#EFEFEF";
    //   } else {
    //     return "";
    //   }
    // }
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
.el-pagination {
  margin-top: 10px;
  width: 60%;
}
.el-table a {
  color: #409eff;
}
</style>
