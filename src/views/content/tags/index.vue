<template>
  <div class="dashboard-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddProductCate(1,'')" size="mini"> 添加</el-button>
    </el-card>
    <el-table :data="tableData" row-key="id" border align="center" @selection-change="handleSelectionChange">
      <el-table-column prop="" label="序号" align="center">
        <template slot-scope="scope">
          <span>{{(page) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标签主题" align="center"></el-table-column>
      <el-table-column prop="levelNo" label="管理" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAddProductCate(2,scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleProductCateDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="overflow:hidden;margin-top:20px;">
      <el-pagination style="float:right;text-align: right;" background :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 弹出层 -->
    <dialogForm ref="dialogForm" :inputName="dialogFormVisible" v-on:changParent="zidingyi($event)" />
  </div>
</template>

<script>
import dialogForm from "./components/dialogForm";
export default {
  components: {
    dialogForm
  },
  data() {
    return {
      dialogFormVisible: false,
      // 分页
      total: 0,
      currentPage: 1,
      page: 0,
      pageSize: 10,
      multipleSelection: [],

      tableData: [],
      parentId: 0
    }
  },
  created() {
    this.resetParentId();
    this.getList();

  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    resetParentId() {
      if (this.$route.query.parentId != null) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    handleAddProductCate(type, row) {
      let data = JSON.parse(JSON.stringify(this.tableData))
      let item = JSON.parse(JSON.stringify(row))
      this.$refs.dialogForm.sonTableData(type, item, data)
    },
    zidingyi(msg) {
      console.log(msg);
      this.dialogFormVisible = false;
    },
    getList() {
      this.axios.get(this.Global.BASE_URL + `/category/tags?cid=${this.$route.query.parentId}`).then(response => {
        if (response.data.status == 200) {
          console.log(response.data.data)
          this.tableData = response.data.data
          this.total = response.data.data.length
        }
      })
    },
    // 删除分类
    handleProductCateDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let paramer = {
          tagId: row.tagId,
          status: -1
        }
        console.log(paramer)
        this.axios.put(this.Global.BASE_URL + "/category/tags", paramer).then(response => {
          if (response.data.status == 200) {
            this.getList();
            this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' });
          }
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val - 1
      this.getStaffList()
    },
  },
  filters: {
    levelFilter(value) {
      if (value === 1) {
        return '一级';
      } else if (value === 2) {
        return '二级';
      } else if (value === 3) {
        return '三级';
      }
    },
    disableNextLevel(value) {
      if (value === 3) {
        return true;
      } else {
        return false;
      }
    }
  }
}

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
.operate-container {
  margin-bottom: 20px;
  .btn-add {
    float: right;
  }
}
</style>
