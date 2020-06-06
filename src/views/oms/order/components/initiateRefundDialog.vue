<template> 
  <el-dialog title="订单跟踪" :visible.sync="visible" :before-close="handleClose" width="40%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>
<script>
const defaultLogisticsList = [
  { name: '订单已提交，等待付款', time: '2017-04-01 12:00:00 ' },
  { name: '订单付款成功', time: '2017-04-01 12:00:00 ' },
  { name: '在北京市进行下级地点扫描，等待付款', time: '2017-04-01 12:00:00 ' },
  { name: '在分拨中心广东深圳公司进行卸车扫描，等待付款', time: '2017-04-01 12:00:00 ' },
  { name: '在广东深圳公司进行发出扫描', time: '2017-04-01 12:00:00 ' },
  { name: '到达目的地网点广东深圳公司，快件将很快进行派送', time: '2017-04-01 12:00:00 ' },
  { name: '订单已签收，期待再次为您服务', time: '2017-04-01 12:00:00 ' }
];
export default {
  name: 'logisticsDialog',
  props: {
    order: Object,
    value: Boolean
  },
  computed: {
   
  },
  data() {
    return {
      visible:true,
      switchStatusData: this.order,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      logisticsList: Object.assign({}, defaultLogisticsList)
    }
  },
  computed: {
    switchStatus: function () {
      return this.switchStatusData  
    }
  },
  watch: {
    order(newV, oldV) { 
      console.log(newV, oldV)
      this.switchStatusData = newV
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleClose() {
      this.emitInput(false);
    },
    switchHandleClick() {
      this.switchStatusData = !this.switchStatusData
      this.$emit('switchHandleClick', this.switchStatusData)
    },
    onSubmit() {
      console.log(this.props)
      let data = {
        orderGoodsId: 93,
        accountType: 1,
        accountNumber: 88888888888,
        refundAmount: 10000,
        remark: "申请退款"
      }
      console.log('submit!');
    },

  }
}
</script>
<style></style>


