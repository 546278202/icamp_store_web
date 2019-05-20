<template>
  <div class="dashboard-container">
    <!-- 查询 -->
    <div style="margin-bottom:35px;">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="changeState">添加</el-button>
    </div>
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
      <el-table-column prop="number" label="编号" align="center"></el-table-column>
      <el-table-column prop="title" label="分类图标" align="center" width="180">
        <img
          style="width:120px;"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558003772084&di=83a492ede7559df3548bd24ee3bf5ea6&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201410%2F29%2F20141029170557_B4ZBS.jpeg"
        >
      </el-table-column>
      <el-table-column prop="typeName" label="分类名称" width="120" align="center"></el-table-column>
      <el-table-column prop="count" label="专题数量" align="center"></el-table-column>
      <el-table-column prop label="是否显示" align="center">
        >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isrecommend"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="180px">
        <a>编辑</a>
        <a @click="open2">删除</a>
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
      <div class="block">
        <el-pagination
          style="float:right;text-align: right;"
          background
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="slot, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <span>共1000页</span>
        </el-pagination>
      </div>
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
      options: [
        {
          value: "选项1",
          label: "隐藏"
        },
        {
          value: "选项2",
          label: "删除"
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
          number: 1000001,
          title: "null",
          typeName: "厨师专题",
          count: 2,
          isrecommend: true,
          sort: " ",
          operation: ""
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
    },

    // 删除
    open2() {
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
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
