<template>
  <div class="dashboard-container">
    <div style="margin-bottom:35px;">
      <el-button :plain="true">全部12345</el-button>
      <el-button :plain="true">已上架 12123</el-button>
      <el-button :plain="true">未上架 12123</el-button>
    </div>
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="changeState">高级查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column prop="num" label="序号" width="55" align="center"/>
      <el-table-column prop="img" label="图片" align="center"/>
      <el-table-column prop="name" label="营会项目名称" width="120" align="center"/>
      <el-table-column prop="price" label="价格/总期数"/>
      <el-table-column prop="showmodel" label="展示模块" width="120">
        <template slot-scope="scope" align="center">
          <div
            style="margin-bottom:5px;"
            align="center"
            v-for="(e,index) in scope.row.showmodel"
            :key="index"
          >
            <span>{{e.txt}}:</span>
            <el-switch v-model="e.flag"></el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序码" width="120" align="center"></el-table-column>
      <el-table-column prop="sort" label="分期设置" width="120" align="center" icon="el-icon-search">
        <template slot-scope="scope">
          <i class="el-icon-edit"></i>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="总名额" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="审核状态" width align="center">
        <template slot-scope="scope">
          <div>已审核</div>
          <a>审核详情</a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="120" align="center">
        <div>
          <a>查看</a>
          <a>编辑</a>
        </div>
        <div>
          <a>日志</a>
          <a>删除</a>
          <a>预览</a>
        </div>
      </el-table-column>
    </el-table>

    <!-- 弹出层 -->
    <dialogForm :inputName="dialogFormVisible" v-on:changParent="zidingyi($event)"/>
    <div style="overflow:hidden;margin-top:20px;">
     
        <el-select v-model="value" placeholder="请选择" style="float:left;margin-right:15px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 按钮 -->
         <el-button type="primary" style="float:left;">确定</el-button>
        <!-- 分页 -->
        <el-pagination style="float:right;text-align: right;"
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
// import dialogForm from "./components/dialogForm";
export default {
  components: {
    // dialogForm
  },
  data() {
    return {
      // 下拉框
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
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
          name: "北戴河营会 ",
          price: "¥29500 总期数：共5期",
          showmodel: [
            {
              flag: true,
              txt: "热门"
            },
            {
              flag: true,
              txt: "新品"
            },
            {
              flag: true,
              txt: "推荐"
            }
          ],
          sort: "123"
        },
        {
          num: 0,
          img: "null",
          date: "2016-05-03",
          name: "北戴河营会 ",
          price: "¥29500 总期数：共5期",
          showmodel: [
            {
              flag: true,
              txt: "热门"
            },
            {
              flag: true,
              txt: "新品"
            },
            {
              flag: true,
              txt: "推荐"
            }
          ],
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
