<template>
  <div class="dashboard-container">
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <el-form-item label="资讯标题">
        <el-input v-model="formInline.user" placeholder="资讯标题："></el-input>
      </el-form-item>
      <el-form-item label="资讯分类">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="onSubmit">发布专题</el-button>
        <el-button type="primary" size="medium" icon="el-icon-search" @click="changeState">分类管理</el-button>
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
      <el-table-column prop="number" label="编号" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center" width=180>
        <img
          style="width:120px;"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558003772084&di=83a492ede7559df3548bd24ee3bf5ea6&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201410%2F29%2F20141029170557_B4ZBS.jpeg"
        >
      </el-table-column>
      <el-table-column prop="url" label="微信URL" width="120" align="center"></el-table-column>
      <el-table-column prop="type" label="分类" align="center"></el-table-column>
      <el-table-column prop="recommend" label="推荐单品" align="center"></el-table-column>
      <el-table-column prop label="推荐" align="center">
        >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isrecommend"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="relation" label="相关" align="center" width="180px">
        <div>收藏：1000</div>
        <div>阅读：1000</div>
        <div>评论：1000</div>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="180px">
        <a>查看</a>
        <a>编辑</a>
        <a>删除</a>
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
      value1: "",
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
          number: 0,
          title: "null",
          url: "www.baidu.com",
          type: "厨师专题",
          recommend: 2,
          isrecommend: true,
          date: "2016-05-03",
          relation: "relation",
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
