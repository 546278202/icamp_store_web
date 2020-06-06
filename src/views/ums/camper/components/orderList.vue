

<template> 
  <div style="margin-top: 20px">
    <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
    <span class="font-small">订单记录</span>
    <div class="table-container">
      <el-table ref="orderTable" :data="list" style="width: 100%;" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.addDateTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="用户账号" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.payableAmount}}</template>
        </el-table-column>
        <!-- <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
        </el-table-column> -->
        <el-table-column label="订单来源" align="center">
          <template slot-scope="scope">{{scope.row.froms | formatSourceType}}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">{{scope.row.orderStatus | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewOrder(scope.$index, scope.row)">查看订单</el-button>
            <el-button size="mini" @click="handleCloseOrder(scope.$index, scope.row)" v-show="scope.row.orderStatus===0">关闭订单</el-button>
            <el-button size="mini" @click="handleDeliveryOrder(scope.$index, scope.row)" v-show="scope.row.orderStatus===1">订单发货</el-button>
            <el-button size="mini" @click="handleViewLogistics(scope.$index, scope.row)" v-show="scope.row.orderStatus===2||scope.row.orderStatus===3">订单跟踪</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteOrder(scope.$index, scope.row)" v-show="scope.row.orderStatus===4">删除订单</el-button>
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
  orderSn: null,
  user: null,
  orderStatus: null,
  orderType: null,
  froms: null,
  startPayTime: null,
};
export default {
  name: 'orderList',
  props: ["Data"],
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },
      // 订单状态  0=已取消 1=待支付 2=待完善营员报名信息 3=待发货 4=待收货 5=订单完成
      statusOptions: [
        {
          label: '已取消',
          value: 0
        },
        {
          label: '待支付',
          value: 1
        },
        {
          label: '待完善营员报名信息',
          value: 2
        },
        {
          label: '待发货',
          value: 3
        },
        {
          label: '待收货',
          value: 4
        },
        {
          label: '订单完成',
          value: 5
        }
      ],
      orderTypeOptions: [
        {
          label: '正常订单',
          value: 0
        },
        {
          label: '营会订单',
          value: 1
        }
      ],
      // 订单来源  0=微信小程序 1=wap 2=pc 3=iOS 4=Android
      fromsOptions: [
        {
          label: '微信小程序订单',
          value: 0
        },
        {
          label: 'wap订单',
          value: 1
        },
        {
          label: 'pc订单',
          value: 2
        },
        {
          label: 'iOS订单',
          value: 3
        },
        {
          label: 'Android订单',
          value: 4
        }
      ],
      operateOptions: [
        {
          label: "批量发货",
          value: 1
        },
        {
          label: "关闭订单",
          value: 2
        },
        {
          label: "删除订单",
          value: 3
        }
      ],
      logisticsDialogVisible: false
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    // formatPayType(value) {
    //   if (value === 1) {
    //     return '支付宝';
    //   } else if (value === 2) {
    //     return '微信';
    //   } else {
    //     return '未支付';
    //   }
    // },
    // 订单来源  0=微信小程序 1=wap 2=pc 3=iOS 4=Android
    formatSourceType(value) {
      if (value === 0) {
        return '微信小程序';
      } else if (value === 1) {
        return 'wap';
      } else if (value === 2) {
        return 'pc';
      } else if (value === 3) {
        return 'iOS';
      } else if (value === 4) {
        return 'Android';
      }
    },
    // 订单状态  0=已取消 1=待支付 2=待完善营员报名信息 3=待发货 4=待收货 5=订单完成
    formatStatus(value) {
      if (value === 0) {
        return '已取消';
      } else if (value === 1) {
        return '待支付';
      } else if (value === 2) {
        return '待完善信息';
      } else if (value === 3) {
        return '待发货';
      } else if (value === 4) {
        return '待收货';
      } else if (value === 5) {
        return '订单完成';
      } else {
        return '无效订单';
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
      this.$router.push({ path: '/oms/orderDetail', query: { id: row.orderId } })
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
      this.deleteOrder(ids);
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        //批量发货
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].orderStatus === 1) {
            list.push(this.covertOrder(this.multipleSelection[i]));
          }
        }
        if (list.length === 0) {
          this.$message({
            message: '选中订单中没有可以发货的订单',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$router.push({ path: '/oms/deliverOrderList', query: { list: list } })
      } else if (this.operateType === 2) {
        //关闭订单
        this.closeOrder.orderIds = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].id);
        }
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType === 3) {
        //删除订单
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteOrder(ids);
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
      this.axios.get(this.Global.BASE_URL + "/order", { params: data }).then(response => {
        console.log(response)
        this.list = response.data.data;
        this.total = response.data.total;
      })
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteOrder(params).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      })
    },
    covertOrder(order) {
      let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress;
      let listItem = {
        orderId: order.id,
        orderSn: order.orderSn,
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
.table-layout {
  margin-top: 20px;
}
</style>
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



