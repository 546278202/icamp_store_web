<template>
  <div class="dashboard-container">
    <template>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="date" label="时间" />
        <el-table-column prop="ip" label="IP" />
        <el-table-column prop="area" label="地区" />
        <el-table-column prop="browserype" label="浏览器" />
      </el-table>
    </template>

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
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          date: ' 2017-07-03 14:36:21',
          ip: '183.14.135.1',
          area: '广东省深圳市',
          browserype: 'Firefox 45'
        },
        {
          date: ' 2017-07-03 14:36:21',
          ip: '183.14.135.1',
          area: '广东省深圳市',
          browserype: 'Firefox 45'
        }
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
}
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
</style>
