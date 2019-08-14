<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="dialogFormVisible = true">添加部门</el-button>
      </el-form-item>
    </el-form>
    <el-table fit ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column prop="deptName" label="部门名称" align="center"></el-table-column>
      <el-table-column prop="deptSno" label="编号" align="center"></el-table-column>
      <el-table-column prop="operator" label="操作人员" align="center"></el-table-column>
      <el-table-column prop="addDateTime" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="status" label="是否启用" align="center">
        <template slot-scope="scope" align="center">
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="操作" align="center">
        <div>
          <a @click="setAuthority">操作权限</a>
          <router-link to='orderdetail'>查看</router-link>
          <a>编辑</a>
        </div>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog title="部门添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div style="overflow:hidden;margin-top:20px;">
      <!-- 分页 -->
      <el-pagination style="float:right;text-align: right;" background :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import dialogForm from "../../../../components/dialogForm";
import { parseTime } from "@/utils";

export default {
  components: {
    // dialogForm
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
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
      formLabelWidth: '120px',
      // 时间
      value1: "true",
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
      tableData: [],

      multipleSelection: []
    };
  },

  beforeMount() {

  },
  mounted() {
    this.getPartmentList()
  },
  methods: {
    // 获取部门数据
    getPartmentList() {
      this.axios.get(this.Global.BASE_URL + "/depart").then(response => {
        if (response.data.status == 200) {
          let datalist = response.data.data
          for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].status == 1) {
              datalist[i].status = true
            } else {
              datalist[i].status = false
            }
          }
          this.tableData = datalist
          console.log(this.tableData)
        }
      }).catch(response => {
        this.loading = false;
        console.log(response);
      });

    },
    // 添加部门
    addPartment() {
      let paramer = {
        "deptId": 10,
        "deptName": "IT",
        "deptSno": "ADMIN",
      }
      this.axios.post(this.Global.BASE_URL + "/depart", paramer).then(response => {
        if (response.data.status == 200) {
          console.log(response.data)
          this.dialogFormVisible = false
        }
      }).catch(response => {
        this.loading = false;
        console.log(response);
      });

    },
    onSubmit() {
      console.log("submit!");
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeState() {
      this.dialogFormVisible = true;
    },

    setAuthority() {
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

.el-input {
  width: 300px !important;
}
// 分页
.el-pagination {
  margin-top: 5px;
  width: 60%;
}
</style>
