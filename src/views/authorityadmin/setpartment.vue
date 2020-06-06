<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="operation(1)" size="mini" style="float:right;"> 添加部门 </el-button>
    </el-card>
    <div class="table-container">
      <el-table fit ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门名称" align="center"></el-table-column>
        <el-table-column prop="deptSno" label="编号" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人员" align="center"></el-table-column>
        <el-table-column prop="addDateTime" :formatter="dateFormat" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="num" label="操作" align="center">
          <template slot-scope="scope">
            <a @click="operation(2,scope.row)" class="color-blue">编辑</a>
            <a @click="deletePartment(scope.row)" class="color-blue">删除</a>
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

    <!-- 添加/编辑 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="numberValidateForm" :rules="loginRules">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
          <el-input v-model="form.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" :label-width="formLabelWidth" prop="deptSno">
          <el-input v-model="form.deptSno" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth" prop="operator">
          <el-input v-model="form.operator" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible= false">取 消</el-button>
        <el-button type="primary" @click="postPartment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const defaultListQuery = {
  keyword: null,
  page: 1,
  size: 5,
  status: null,
  cid: null,
  type: null,
  goodsName: null,
  productCategoryId: null,
};
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { formatTime } from "@/utils/index";
import { validUsername, validDeptId, validPhone } from "@/utils/validate";
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
    return {
      // 校验
      loginRules: {
        deptName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        deptSno: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        operator: [
          { required: true, trigger: "blur", validator: validateUsername }
        ]
      },
      title: "添加部门",
      type: 1,
      dialogFormVisible: false,
      itemData: {},
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      multipleSelection: [],
      operates: [
        {
          value: '0',
          label: '删除'
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      total: null,
    };
  },

  beforeMount() {

  },
  mounted() {
    this.getList()
  },
  methods: {
    //弹出层
    operation(type, item) {
      this.dialogFormVisible = true
      if (type == 1) {
        this.type = 1
        this.title = "添加"
        this.form = {}
      }
      if (type == 2) {
        this.type = 2
        this.title = "编辑"
        this.form = item
      }
      if (this.$refs["numberValidateForm"]) {
        this.$refs["numberValidateForm"].resetFields();
      }
    },
    // 时间过滤
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return formatTime(date);
    },
    // 获取部门数据
    getList() {
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
        }
      })
    },
    // 添加/更新部门
    postPartment() {

      let paramer = ''
      if (this.type == 2) {
        paramer = {
          deptId: this.form.deptId,
          deptName: this.form.deptName,
          deptSno: this.form.deptSno,
          operator: this.form.operator,
        }
      }
      if (this.type == 1) {
        paramer = {
          deptId: '',
          deptName: this.form.deptName,
          deptSno: this.form.deptSno,
          operator: this.form.operator,
        }

      }

      this.$refs.numberValidateForm.validate(valid => {
        if (valid) {
          console.log(paramer)
          this.axios.post(this.Global.BASE_URL + "/depart", paramer).then(response => {
            if (response.data.status == 200) {
              this.dialogFormVisible = false
              this.getList()
              this.$message({ type: 'success', message: '操作成功!' });
            }
          })
        }
      })


    },
    //删除部门
    deletePartment(e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete(this.Global.BASE_URL + "/depart/" + this.tableData[e].deptId).then(response => {
          if (response.data.status == 200) {
            this.getList()
            this.$message({ type: 'success', message: '删除成功!' });
          }
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val)
      this.listQuery.page = val;
      this.getList();
    },
  }
};
</script>
<style lang="scss" scoped>
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
