<template>
  <div>
    <!-- <el-cascader-panel :options="options"></el-cascader-panel> -->
    <!--动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。-->
    <keep-alive>
      <div :is="currentView"></div>
    </keep-alive>
  </div>
</template>
<script>
// 导入子组件
import ProductBase from './components/ProductBase';
export default {
  data() {
    return {
      ProductBase: 'ProductBase',
      currentView: 'ProductBase', // 默认选中第一项
    }
  },
  methods: {
    tabChange(tabItem) {
      this.currentView = tabItem;
    }
  },
  components: {
    ProductBase
  }
};
</script>