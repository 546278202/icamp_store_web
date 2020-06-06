

<template> 
  <div style="margin-top: 20px">
    <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
    <span class="font-small">收获地址</span>
      <el-table ref="orderTable" :data="Data.addresses" style="width: 100%;margin-top: 20px;" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="linkman" label="姓名" width="" align="center"> </el-table-column>
        <el-table-column prop="phone" label="手机号" width="160" align="center"> </el-table-column>
        <el-table-column prop="detailAddress" label="详细地址" width="" align="center"> </el-table-column>
        <el-table-column prop="areaId" label="邮政编码" width="" align="center"> </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  name: 'addressList',
  props: ["Data"],
  data() {
    return {

    }
  },
  methods: {
    
  }
}
</script>
<style scoped>
.table-layout {
  margin-top: 20px;
}</style>


