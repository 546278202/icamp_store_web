<template>
  <div class="dashboard-container">
    <div style="margin-bottom:35px;">
      <el-button type="primary">全部12345</el-button>
      <el-button type="primary" plain>代付款 12123</el-button>
      <el-button type="primary" plain>已完成 12123</el-button>
      <el-button type="primary" plain>已关闭 12123</el-button>
      <el-button type="primary" plain>已延期12123</el-button>
      <el-button type="primary" plain>已退费 12123</el-button>
    </div>
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <el-form-item label>
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>

      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间 -->
      <el-form-item label="提交时间">
        <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="changeState">高级查询</el-button>
        <el-button type="primary" size="medium" icon="el-icon-download">导出订单</el-button>
      </el-form-item>
    </el-form>
    <el-table
      fit
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="num" label="订单编号" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="提交时间" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="用户账号" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="用户姓名" width="180px" align="center"></el-table-column>
      <el-table-column prop="num" label="订单金额" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="支付方式" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="订单来源" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="订单状态" width="100px" align="center"></el-table-column>
      <el-table-column prop="num" label="操作" width align="center">
        <div>
          <a>查看</a>
          <a>编辑</a>
        </div>
      </el-table-column>
    </el-table>

    <!-- 弹出层 -->
    <dialogForm :inputName="dialogFormVisible" v-on:changParent="zidingyi($event)"/>
    <div style="overflow:hidden;margin-top:20px;">
      <el-select
        size="medium"
        v-model="value"
        placeholder="请选择"
        style="float:left;margin-right:15px;"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 按钮 -->
      <el-button type="primary" size="medium" style="float:left;">确定</el-button>
      <!-- 分页 -->
      <el-pagination
        style="float:right;text-align: right;"
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
      // 时间
      value1: "",
      // 下拉框
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      // 分页数据
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      dialogFormVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          num: 0,
          img: "null",
          date: "2016-05-03",
          sort: "123"
        }
      ],
      multipleSelection: []
    };
  },

  // beforeMount() {},
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeState() {
      this.dialogFormVisible = true;
    },
    zidingyi(msg) {
      console.log(msg);
      this.dialogFormVisible = false;
    },
    // 分页数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-container {
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
