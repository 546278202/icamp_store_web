<template>
  <div class="dashboard-container">
    <!-- <h3>带边框表格</h3> -->
    <template>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="name" label="姓名" />
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [
        {
          date: '服务器操作系统:',
          name: '王小虎',
          date: '服务器操作系统:',
          name: '王小虎'
        },
        {
          date: '服务器操作系统:',
          name: '王小虎',
          date: '服务器操作系统:',
          name: '王小虎'
        },
        {
          date: '服务器操作系统:',
          name: '王小虎',
          date: '服务器操作系统:',
          name: '王小虎'
        }
      ]
    }
  },
  methods: {}
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
</style>
