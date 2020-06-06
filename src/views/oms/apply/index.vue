<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="overflow:hidden;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">查询搜索 </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.id" class="input-width" placeholder="服务单号"></el-input>
          </el-form-item>
          <el-form-item label="售后类型：">
            <el-select v-model="listQuery.afterSaleType" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker class="input-width" v-model="listQuery.createTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input v-model="listQuery.handleMan" class="input-width" placeholder="全部"></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker class="input-width" v-model="listQuery.handleTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="服务单号" align="center">
          <template slot-scope="scope">{{scope.row.currentAfterSaleId}}</template>
        </el-table-column>
        <el-table-column label="申请时间" align="center">
          <template slot-scope="scope">{{scope.row.addDateTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="订单金额" align="center">
          <template slot-scope="scope">￥{{scope.row.payableAmount}}</template>
        </el-table-column>
        <el-table-column label="售后类型" align="center">
          <template slot-scope="scope">{{scope.row.currentAfterSaleType | formatType}}</template>
        </el-table-column>
        <el-table-column label="申请状态" align="center">
          <template v-show="scope.row.currentAfterSaleType==1" slot-scope="scope">{{scope.row.currentAfterSaleStatus | formatStatus}}</template>
          <template v-show="scope.row.currentAfterSaleType==2" slot-scope="scope">{{scope.row.currentAfterSaleStatus | exchangeStatus}}</template>
          <template v-show="scope.row.currentAfterSaleType==3" slot-scope="scope">{{scope.row.currentAfterSaleStatus | postponeStatus}}</template>
        </el-table-column>
        <el-table-column label="处理时间" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value">
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
  </div>
</template>
<script>
import { formatDate } from '@/utils/date';
const defaultListQuery = {
  page: 1,
  size: 10,
  orderStatus: 6,
  id: null,
  receiverKeyword: null,
  status: null,
  afterSaleType: null,
  createTime: null,
  handleMan: null,
  handleTime: null
};
// 售后类型(在订单状态orderStatus=6时,配合使用) 1=退款 2=更换 3=延期
const defaultTypeOptions = [
  {
    label: '退款',
    value: 1
  },
  {
    label: '更换',
    value: 2
  },
  {
    label: '延期',
    value: 3
  }
];
// 售后状态(在订单状态orderStatus=6时,配合使用) 0=等待审核 1=处理中 2=已完成 3=审核不通过
const defaultStatusOptions = [
  {
    label: '待处理',
    value: 0
  },
  {
    label: '退货中',
    value: 1
  },
  {
    label: '已完成',
    value: 2
  },
  {
    label: '已拒绝',
    value: 3
  }
];
export default {
  name: 'returnApplyList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      statusOptions: Object.assign({}, defaultStatusOptions),
      typeOptions: Object.assign({}, defaultTypeOptions),

      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      operateType: 1,
      operateOptions: [
        {
          label: "批量删除",
          value: 1
        }
      ],
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    /**
   * 延期状态  0:待审核 1:已延期  2:审核不通过 
   */
    postponeStatus(status) {
      if (status == 0) {
        return "待审核"
      } else if (status == 1) {
        return "已延期"
      } else if (status == 2) {
        return "审核不通过"
      }
    },
    /**
 * 更换状态  0:待审核 1:已更换 2:审核不通过  
 */
    exchangeStatus(status) {
      if (status == 0) {
        return "待审核"
      } else if (status == 1) {
        return "已更换"
      } else if (status == 2) {
        return "审核不通过"
      }
    },
    formatStatus(status) {
      if (status == 0) {
        return "等待审核"
      } else if (status == 1) {
        return "处理中"
      } else if (status == 2) {
        return "已完成"
      } else {
        return "审核不通过"
      }
    },
    /**
    * 该订单当前最新申请的售后类型 1=退款 2=更换 3=延期
    */
    formatType(status) {
      if (status == 1) {
        return "退款"
      } else if (status == 2) {
        return "更换"
      } else if (status == 3) {
        return "延期"
      }
    }
    // 该订单当前最新的售后状态   0=等待审核 1=处理中 2=已完成  3=审核不通过
    // formatReturnAmount(row) {
    //   return row.productRealPrice * row.productCount;
    // }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleViewDetail(index, row) {
      console.log(index, row)
      console.log(row.currentAfterSaleStatus)
      /**
      * 该订单当前最新申请的售后类型 1=退款 2=更换 3=延期
      */
      if (row.currentAfterSaleType == 1) {
        this.$router.push({ path: '/oms/returnApplyDetail', query: { id: row.currentLinkId, status: row.currentAfterSaleStatus } })
      }
      if (row.currentAfterSaleType == 2) {
        this.$router.push({ path: '/oms/exchangeApplyDetail', query: { id: row.currentLinkId ,status:row.currentAfterSaleStatus} })
      }
      if (row.currentAfterSaleType == 3) {
        this.$router.push({ path: '/oms/postponeApplyDetail', query: { id: row.currentLinkId, status: row.currentAfterSaleStatus } })
      }
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的申请',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        //批量删除
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].id);
          }
          params.append("ids", ids);
          this.$message({ type: 'success', message: '删除成功!' });
        })
      }
    },
    handleSizeChange(val) {
      console.log(val)
      this.listQuery.page = 1;
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      let data = Object.assign({}, this.listQuery, { page: this.listQuery.page - 1 })
      this.axios.get(this.Global.BASE_URL + `/order?`, { params: data }).then(response => {
        this.list = response.data.data;
        this.total = response.data.total;
      })
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
.operate-container {
  margin-top: 20px;
}
.operate-container .btn-add {
  float: right;
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
</style>


