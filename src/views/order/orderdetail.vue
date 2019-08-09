<template>
  <div class="dashboard-container">
    <el-alert title="当前订单状态：已支付" type="success" show-icon style="margin-bottom:35px;"></el-alert>
    <el-steps :active="1" align-center style="margin-bottom:35px;">
      <el-step title="提交订单" description="2017-07-19 15:43:23"></el-step>
      <el-step title="支付订单" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="平台发货" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="完成订单" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="完成评价" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>

    <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;">更改信息</h3>
    <div>
      <el-button type="primary" size="medium" icon="el-icon-edit">修改发票信息</el-button>
      <el-button type="primary" size="medium" icon="el-icon-edit">修收货人信息 </el-button>
      <el-button type="primary" size="medium" icon="el-icon-edit">修改商品信息</el-button>
      <el-button type="primary" size="medium" icon="el-icon-edit">修改费用信息</el-button>
      <el-button type="primary" size="medium" icon="el-icon-edit">关闭订单信息</el-button>
    </div>

    <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;">基本信息</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="发货单流水号" width="180"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
    </el-table>

    <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;">发票信息</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="发货单流水号" width="180"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
    </el-table>

    <h3 style="font-weight: 400;color: #1f2f3d;font-size: 22px;">营员信息</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="发货单流水号" width="180"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
      <el-table-column prop="address" label="支付方式"></el-table-column>
    </el-table>
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
      tableData: [{
        name: '201707196398345',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },

  beforeMount() {

  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
#app .main-container {
  background-color: #f0f2f5;
}
.dashboard-container {
  height: 100%;
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
// 分页
.el-pagination {
  margin-top: 5px;
  width: 60%;
}
</style>
