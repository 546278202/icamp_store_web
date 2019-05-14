<template>
  <div class="dashboard-container">
    <PanelGroup />
    <OrderGroup />
    <div style="margin-bottom:35px; overflow: hidden;">
      <h3>运营快捷入口</h3>
      <ul class="icon-list">
        <li>
          <span>
            <i class="el-icon-upload" />
            <span class="icon-name">el-icon-upload</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-zoom-out" />
            <span class="icon-name">el-icon-zoom-out</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-upload" />
            <span class="icon-name">el-icon-upload</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-zoom-out" />
            <span class="icon-name">el-icon-zoom-out</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-upload" />
            <span class="icon-name">el-icon-upload</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-zoom-out" />
            <span class="icon-name">el-icon-zoom-out</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-upload" />
            <span class="icon-name">el-icon-upload</span>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-zoom-out" />
            <span class="icon-name">el-icon-zoom-out</span>
          </span>
        </li>
      </ul>
    </div>

    <div style="margin-bottom:35px;overflow:hidden;">
      <div style="width:50%;padding-right:30px;float:left;">
        <h3>商品总览</h3>
        <ul class="icon-list1">
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
        </ul>
      </div>

      <div style="width:50%;padding-left:30px;float:left;">
        <h3>用户总览</h3>
        <ul class="icon-list1">
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
          <li>
            <div style="height:30px;color:#f04844;">100</div>
            <span>已下架</span>
          </li>
        </ul>
      </div>
    </div>

    <LineChart />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import OrderGroup from './components/OrderGroup'
import LineChart from './components/LineChart'
export default {

  components: {
    PanelGroup,
    OrderGroup,
    LineChart
  },
  data() {
    return {
      name: '12345'
    }
  },

  beforeMount() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.icon-list1 {
  display: flex;
  overflow: hidden;
  list-style: none;
  padding: 0;
  border: 1px solid #eaeefb;
  border-radius: 4px;
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
  margin: 0;
  align-items: center;
}
.icon-list1 li {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  border: 1px solid #eaeefb;
  border-radius: 4px;
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
  margin: 0;
  display: flex;
  align-items: center;
}
.icon-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  height: 120px;
  line-height: 120px;
  color: #666;
  font-size: 13px;
  transition: color 0.15s linear;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
}
.icon-list li span {
  display: inline-block;
  line-height: normal;
  vertical-align: middle;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  color: #99a9bf;
}
.icon-list li i {
  display: block;
  font-size: 32px;
  margin-bottom: 15px;
  color: #606266;
}
</style>
