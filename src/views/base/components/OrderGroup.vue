<template>
  <div style="margin-bottom:35px;overflow:hidden;">
    <h3>待处理订单</h3>
    <el-row :gutter="60" class="panel-group">
      <el-col :span="8">
        <div class="card-panel-description">
          <span class="card-panel-text">待付款订单</span>
          <div>
            (
            <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num"/>)
          </div>
        </div>
        <div class="card-panel-description">
          <span class="card-panel-text">已完成订单</span>
          <div>
            (
            <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num"/>)
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-panel-description">
          <span class="card-panel-text">待确认退货订单</span>
          <div>
            (
            <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num"/>)
          </div>
        </div>
        <div class="card-panel-description">
          <span class="card-panel-text">已发货订单</span>
          <div>
            (
            <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num"/>)
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card-panel-description">
          <span class="card-panel-text">待处理退货订单</span>
          <div>
            (
            <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num"/>)
          </div>
        </div>
        <div class="card-panel-description">
          <span class="card-panel-text">待付款订单</span>
          <div>
            (
            <count-to :start-val="0" :end-val="10" :duration="2600" class="card-panel-num"/>)
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  height: 108px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  .card-panel-description {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 10px 30px;
    margin-left: 0px;
    .card-panel-num {
      color: rgb(240, 72, 68);
    }
  }
}
</style>
