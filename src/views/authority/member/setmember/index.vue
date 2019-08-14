<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="changeState">添加部门</el-button>
      </el-form-item>
    </el-form>
    <el-table fit ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="num" label="成员账号" align="center"></el-table-column>
      <el-table-column prop="num" label="姓名" align="center"></el-table-column>
      <el-table-column prop="num" label="邮箱地址" align="center"></el-table-column>
      <el-table-column prop="num" label="所属部门" align="center"></el-table-column>
      <el-table-column prop="num" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="num" label="最后登录" align="center"></el-table-column>
      <el-table-column prop="showmodel" label="是否启用" align="center">
        <template slot-scope="scope" align="center">
          <div style="margin-bottom:5px;" align="center" v-for="(e,index) in scope.row.showmodel" :key="index">
            <el-switch v-model="e.flag"></el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="num" label="操作" align="center">
        <div>
          <router-link to='orderdetail'>查看</router-link>
          <a>编辑</a>
        </div>
      </el-table-column>
    </el-table>

    <!-- 弹出层 -->
    <dialogForm :inputName="dialogFormVisible" v-on:changParent="zidingyi($event)" />
    <div style="overflow:hidden;margin-top:20px;">
      <!-- 分页 -->
      <el-pagination style="float:right;text-align: right;" background :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import dialogForm from "../../../../components/dialogForm";
import { parseTime } from "@/utils";

export default {
  components: {
    dialogForm
  },
  data() {
    return {
      // 导出订单
      downloadLoading: false,
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
          num: 578,
          num: 578,
          num: 578,
          num: 578,
          showmodel: [
            {
              flag: true,
              txt: ""
            }
          ],
          sort: "123"

        }
      ],
      multipleSelection: []
    };
  },

  // beforeMount() {},
  mounted() { },
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
    },


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
