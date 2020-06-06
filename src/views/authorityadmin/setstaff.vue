<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="overflow:hidden;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" @click="handleSearchList()" type="primary" size="small">
          查询结果
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>

      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="手机/用户：">
            <el-input class="input-width" v-model="listQuery.username" placeholder="手机/用户"></el-input>
          </el-form-item>
          <el-form-item label="人员姓名：">
            <el-input class="input-width" v-model="listQuery.empname" placeholder="全部"></el-input>
          </el-form-item>
          <el-form-item label="部门名称：">
            <el-select size="small" v-model="listQuery.deptId" placeholder="全部" class="input-width">
              <el-option v-for="item in deplist" :key="item.deptName" :label="item.deptName" :value="item.deptId"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAdd()" size="mini" style="float:right;">
        添加
      </el-button>
    </el-card>

    <div class="table-container">
      <el-table fit ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="department.deptName" label="所属部门" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人员" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="status" label="是否启用" align="center">
          <template slot-scope="scope" align="center">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="toggleStatus($event,scope.row,scope.$index)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="操作" align="center">
          <template slot-scope="scope">
            <a @click="handleEdit($event,scope.$index)" class="color-blue">编辑</a>
            <a @click="editPassword(scope.$index)" class="color-blue">修改密码</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary" size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.page" :page-size="listQuery.size" :page-sizes="[5,10,15]" :total="total">
      </el-pagination>
    </div>
    <!-- 新增/编辑 -->
    <el-dialog :title="dialog.title" :visible.sync="dialogVisible">
      <el-form :model="form" :rules="loginRules" ref="loginForm">
        <el-form-item label="部门" :label-width="formLabelWidth" prop="deptId">
          <el-select v-model="form.deptId" placeholder="请选择" :style="'width:'+ formInputlWidth">
            <el-option v-for="item in deplist" :key="item.deptId" :label="item.deptName" :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth" prop="empName">
          <el-input v-model="form.empName" autocomplete="off" :disabled="dialog.type==1? true :false" :style="'width:'+ formInputlWidth"></el-input>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" :style="'width:'+ formInputlWidth"></el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth" prop="empName">
          <el-input v-model="form.userName" autocomplete="off" :disabled="dialog.type==1? true :false" :style="'width:'+ formInputlWidth"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('loginForm')">取 消</el-button>
        <el-button type="primary" @click="operation">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>

import md5 from "js-md5"; //md5
import { validUsername, validDeptId, validPhone } from "@/utils/validate";
import { formatTime } from "@/utils/index";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
const defaultListQuery = {
  page: 1,
  size: 10,
  username: null,
  empname: null,
  deptId: null
};
export default {
  components: {
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validateDeptId = (rule, value, callback) => {
      if (!validDeptId(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validataPhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    return {
      listQuery: Object.assign({}, defaultListQuery),
      deplist: [],
      total: null,
      operateType: null,
      operates: [
        {
          value: '8',
          label: '批量删除'
        }
      ],
      loginRules: {
        empName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        deptId: [
          { required: true, trigger: "blur", validator: validateDeptId }
        ],
        phone: [
          { required: true, trigger: "blur", validator: validataPhone }
        ],

      },
      // 弹出层
      dialog: {},
      dialogVisible: false,
      list: [],
      form: {},
      formLabelWidth: '120px',
      formInputlWidth: '350px',
      multipleSelection: []
    };

  },

  beforeMount() {

  },
  mounted() {
    this.getList()
    this.getPartmentList()
  },
  methods: {
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },


    //点击新增按钮触发函数
    handleAdd() {
      this.dialog.title = "人员添加";
      this.dialog.type = 0;
      this.dialogVisible = true;
      this.form = {}
    },

    //点击编辑按钮触发函数
    handleEdit(e, index) {
      this.dialog.title = "人员编辑";
      this.dialog.type = 1;
      this.dialogVisible = true;
      let item = this.list[index]
      this.form = item
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择操作列表',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].empId);
        }
        this.handleDel(ids[0].toString())
      });
    },
    // 删除
    handleDel(ids) {
      this.axios.delete(this.Global.BASE_URL + `/emp/${ids}`).then(response => {
        if (response.data.status == 200) {
          this.getList()
          this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' })
        }
      })
    },
    //   修改密码
    editPassword(e) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '密码不正确'
      }).then(({ value }) => {
        if (value) {
          let paramer = md5(this.list[e].userName + md5(value))
          this.axios.patch(this.Global.BASE_URL + "/emp/pwd/" + this.list[e].empId, paramer).then(response => {
            if (response.data.status == 200) {
              this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' })
            }
          })
        }
      })
    },

    // 获取部门数据
    getPartmentList() {
      this.axios.get(this.Global.BASE_URL + "/depart").then(response => {
        if (response.data.status == 200) {
          this.deplist = response.data.data
        }
      })
    },

    // 获取人员数据
    getList() {
      let data = Object.assign({}, this.listQuery, { page: this.listQuery.page - 1 })
      this.axios.get(this.Global.BASE_URL + "/emp", { params: data }).then(response => {
        if (response.data.status == 200) {
          this.list = response.data.data
          this.total = response.data.total;
        }
      })
    },
    // 添加人员|编辑
    operation() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let paramer = {}
          if (this.dialog.type == 1) {
            paramer = {
              deptId: this.form.deptId,
              empId: this.form.empId,
              phone: this.form.phone,
            }
          } else {
            paramer = {
              deptId: this.form.deptId,
              phone: this.form.phone,
              empId: '',
              empName: this.form.empName,
              userName: this.form.userName,
            }
          }
          this.axios.post(this.Global.BASE_URL + "/emp", paramer).then(response => {
            if (response.data.status == 200) {
              this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' })
              this.getList()
              this.dialogVisible = false;
            }
          })
        }
      })
    },
    // 锁定用户
    toggleStatus(data, b, index) {
      let paramer = {
        empId: b.empId,
        status: b.status,
      }
      this.axios.post(this.Global.BASE_URL + "/emp", paramer).then(response => {
        if (response.data.status == 200) {
          this.$message({ message: '恭喜你，这是一条成功消息', type: 'success' })
        }
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
      this.getList()
    },
  }
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
.operate-container {
  margin-top: 20px;
}
.table-container {
  margin-top: 20px;
}
.batch-operate-container,
.pagination-container {
  display: inline-block;
  margin-top: 20px;
}
.pagination-container {
  float: right;
}

.color-blue {
  color: #20a0ff;
}
</style>
<style>
.el-card__body {
  overflow: hidden;
}
</style>
