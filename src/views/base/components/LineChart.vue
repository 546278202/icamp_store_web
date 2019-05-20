<template>
  <div style="overflow:hidden;margin-bottom:35px;">
    <h3>订单统计</h3>
    <div style="overflow:hidden;">
      <div style="background:#fff;height:400px;padding: 84px 0px 84px 30px;width:20%;float:left;">
        <div style="margin-bottom:30px;">
          <div style="color: #989898;font-size: 16px;margin-bottom:8px;">本周订单总数</div>
          <div style="color: r#666666;margin-bottom:8px;font-size:28px;">1233</div>
          <div style="color: #ccc;font-size: 14px;">
            <span style="color:#00A950;">+10%</span> 同比上周
          </div>
        </div>
        <div>
          <div style="color: #989898;font-size: 16px;margin-bottom:8px;">本月订单总数</div>
          <div style="color: r#666666;margin-bottom:8px;font-size:28px;">1233</div>
          <div style="color: #ccc;font-size: 14px;">
            <span style="color:rgb(240, 72, 68);">-18%</span> 同比上周
          </div>
        </div>
      </div>
      <div
        id="main"
        style="background:#fff;height:400px;padding:30px 20px 30px 0px;width:80%;float:left;"
      />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {},
  mounted() {
    this.test()
  },
  beforeDestroy() {},
  methods: {
    test() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      console.log(myChart)
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: "折线图堆叠"
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今日', '本周', '本月']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          //   boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },

        series: [
          {
            name: '今日',
            type: 'line',
            stack: '总量',
            data: [720, 2, 101, 34, 330, 20, 610]
          },
          {
            name: '本周',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '本月',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      })
    }
  }
}
</script>
