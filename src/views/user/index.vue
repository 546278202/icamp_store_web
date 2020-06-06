<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="overflow:hidden;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">
          查询搜索
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="关键字 ：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="用户名/email/手机号/openId"></el-input>
          </el-form-item>
          <el-form-item label="营员姓名：">
            <el-input v-model="listQuery.camperName" class="input-width" placeholder="营员姓名/营员英文名"></el-input>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-date-picker class="input-width" v-model="listQuery.startDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="人员性别：">
            <el-select v-model="listQuery.sex" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员等级：">
            <el-select v-model="listQuery.levelType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in levelTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册来源：">
            <el-select v-model="listQuery.sourceType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in sourceTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" style="float:right;" @click="handleAddProduct()" size="mini"> 添加</el-button>
    </el-card>

    <div class="table-container">
      <el-table ref="orderTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
       
        <el-table-column prop="name" label="用户名" width="160" align="center"> </el-table-column>
         <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex | sexFilter}}</template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="level" label="等级" align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column label="加入时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.addDateTime}}</template>
        </el-table-column>
        <el-table-column label="手机号" align="center" width="120">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="注册来源" align="center">
          <template slot-scope="scope">{{scope.row.froms | formatSourceType}}</template>
        </el-table-column>
        <!-- <el-table-column label="用户状态" align="center">
          <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
        </el-table-column> -->
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewOrder(scope.$index, scope.row)">查看</el-button>
            <!-- <el-button size="mini" @click="handleSetOrder(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="danger" @click="handleDeleteOrder(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="关闭订单" :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input style="width: 80%" type="textarea" :rows="5" placeholder="请输入内容" v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">

        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
const defaultListQuery = {
  page: 1,
  size: 10,
  keyword: '',
  camperName: '',
  sex: '',
  status: '',
  levelType: '',
  sourceType: '',
  startDate: '',
  endDate: '',

};
export default {
  name: "orderList",
  components: { LogisticsDialog },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      // listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },
      sexOptions: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ],

      levelTypeOptions: [
        {
          label: '普通',
          value: 0
        },
        {
          label: '黄金',
          value: 1
        },
        {
          label: '白金',
          value: 2
        },
        {
          label: '钻石',
          value: 3
        }
      ],

      sourceTypeOptions: [
        {
          label: '小程序',
          value: 0
        },
        {
          label: 'wap',
          value: 1
        },
        {
          label: 'pc',
          value: 2
        },
        {
          label: 'iOS',
          value: 3
        },
        {
          label: 'Android',
          value: 4
        }
      ],
      operateOptions: [
        {
          label: "批量删除",
          value: -1
        },
        {
          label: "取消禁用",
          value: 1
        },
        {
          label: "批量禁用",
          value: 0
        }
      ],
      logisticsDialogVisible: false
    }
  },
  created() {
    this.getList();
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '普通';
      } else if (value === 1) {
        return '黄金';
      } else if (value === 2) {
        return '白金';
      } else if (value === 3) {
        return '钻石';
      }
    },

    sexFilter(value) {
      if (value === 0) {
        return '未知';
      } else if (value === 1) {
        return '男';
      } else if (value === 2) {
        return '女';
      }
    },

    statusFilter(value) {
      if (value === true) {
        return '已启用';
      } else {
        return '已禁用';
      }
    },
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatPayType(value) {
      if (value === 1) {
        return '支付宝';
      } else if (value === 2) {
        return '微信';
      } else {
        return '未支付';
      }
    },
    formatSourceType(value) {
      if (value === 0) {
        return '微信小程序';
      } else if (value === 1) {
        return 'wap';
      } else if (value === 2) {
        return 'pc';
      } else if (value === 3) {
        return 'ios';
      } else if (value === 4) {
        return 'Android';
      }
    },
    formatStatus(value) {
      if (value === 0) {
        return '锁定';
      } else if (value === 1) {
        return '正常';
      }
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.page = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: '/user/userDetail', query: { id: row.id } })
    },

    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
    },
    handleDeliveryOrder(index, row) {
      let listItem = this.covertOrder(row);
      this.$router.push({ path: '/oms/deliverOrderList', query: { list: [listItem] } })
    },
    handleViewLogistics(index, row) {
      this.logisticsDialogVisible = true;
    },

    handleDeleteOrder(index, row) {
      let ids = [];
      ids.push(row.id);
      console.log(ids)
      this.deleteOrder(ids, this.operateType);
    },
    handleBatchOperate() {
      console.log(this.multipleSelection)
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      //批量删除     
      console.log(this.operateType)
      if (this.operateType === -1) {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids, this.operateType);
        //取消禁用    
      } else if (this.operateType === 1) {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids, this.operateType);
        //批量禁用  
      } else if (this.operateType === 0) {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids, this.operateType);
      }
    },

    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val)
      this.page = val;
      this.getList();
    },
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === '') {
        this.$message({
          message: '操作备注不能为空',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      let params = new URLSearchParams();
      params.append('ids', this.closeOrder.orderIds);
      params.append('note', this.closeOrder.content);
      closeOrder(params).then(response => {
        this.closeOrder.orderIds = [];
        this.closeOrder.dialogVisible = false;
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    getList() {
      let data = Object.assign({}, this.listQuery, { page: this.listQuery.page - 1 })
      // let searchStr = `page=${this.listQuery.page}&size=${this.listQuery.size}&status=${this.listQuery.status}&sex=${this.listQuery.sex}&level=${this.listQuery.levelType}&froms=${this.listQuery.sourceType}&keyword=${this.listQuery.keyword}&camperName=${this.listQuery.camperName}&startDate=${this.listQuery.startDate}&endDate=${this.listQuery.endDate}`
      this.axios.get(this.Global.BASE_URL + '/user', { params: data }).then(response => {
        console.log(response.data)
        this.list = response.data.data;
        this.total = response.data.total;
      })
    },
    // 删除订单
    deleteOrder(ids, type) {
      console.log(ids, type)
      this.$confirm('是否要进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '操作成功！',
          type: 'success',
          duration: 1000
        });
        // 0=禁用 1=取消禁用 -1=删除
        // this.axios.patch(this.Global.BASE_URL + `camper/batch/${type}`).then(response => {
        //   console.log(response.data)
        //   this.$message({
        //     message: '删除成功！',
        //     type: 'success',
        //     duration: 1000
        //   });
        //   this.getList()
        // })
      })
    },
    covertOrder(order) {
      let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        keyword: order.keyword,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null
      };
      return listItem;
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
<style>
.el-card__body {
  overflow: hidden;
}
</style>


