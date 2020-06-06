<template> 
  <div class="detail-container" ref="productImage">
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table ref="orderItemTable" :data="order.orderGoods" style="width: 100%;margin-top: 20px" border>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg.originalFile" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.goodsName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">
            <p>￥{{scope.row.sellPrice}}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            {{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column label="库存" align="center">
          <template slot-scope="scope">
            {{scope.row.num}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.orderGoodsAmount}}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        合计：<span class="color-danger">￥{{order.orderAmount}}</span>
      </div>
    </el-card>
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-title-medium">项目信息</span>
      </div>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:100px;display:flex;align-items: center;">搜索项目</el-col>
          <el-col class="form-border font-small" :span="18" style="height:100px;">
            <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
              <el-form-item label="">
                <el-input v-model="formInline.goodsName" style="width:350px;" placeholder="输入项目名"></el-input>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.attributeValues" style="width:216px;" placeholder="请选择期数" @focus="currentSel"></el-input>
                <el-input-number v-model="formInline.num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                <el-button type="primary" @click="getformInline">确定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">更改后营会项目</el-col>
          <el-col class="form-border font-small" :span="18">{{confirmGoods.goodsName | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">营会价格</el-col>
          <el-col class="form-border font-small" :span="18">{{confirmGoods.amount | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">期数</el-col>
          <el-col class="form-border font-small" :span="18">{{confirmGoods.attributeValues | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">人数</el-col>
          <el-col class="form-border font-small" :span="18">{{confirmGoods.num | formatNull}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-title-medium">价格信息</span>
      </div>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">更换前价格</el-col>
          <el-col class="form-border font-small" :span="18">￥{{order.orderAmount | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">更换后价格</el-col>
          <el-col class="form-border font-small" :span="18">¥{{confirmGoods.amount}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">需支付</el-col>
          <el-col class="form-border font-small" :span="18">¥{{order.orderAmount- confirmGoods.amount*confirmGoods.num}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:55px;display:flex;align-items: center;">更换理由</el-col>
          <el-col class="form-border font-small" :span="18" style="height:55px;">
            <el-input v-model="confirmGoods.cause" style="width:350px;" size="small" placeholder="输入更换理由"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:55px;display:flex;align-items: center;">备注</el-col>
          <el-col class="form-border font-small" :span="18" style="height:55px;">
            <el-input v-model="confirmGoods.remark" style="width:350px;" size="small" placeholder="输入备注"></el-input>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top:15px;text-align: center">

        <el-button type="primary" size="small" @click="handleExchange">确认换货</el-button>
        <el-button type="" size="small">取消换货</el-button>
      </div>
    </el-card>

    <!-- 属性弹出层 -->
    <el-dialog title="商品属性" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" border @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" label="分期" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="项目名称" align="center"> </el-table-column>
        <el-table-column prop="attributeValue" label="项目编号" align="center"></el-table-column>
        <el-table-column prop="starDate" label="出发日期" align="center"></el-table-column>
        <el-table-column prop="endDate" label="返回日期" align="center"></el-table-column>
        <el-table-column prop="totalQty" label="当前库存" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible=false">取 消</el-button>
        <el-button type="primary" @click="showCloseAttributeDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
import { formatDate } from '@/utils/date';
import VDistpicker from 'v-distpicker';
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null
};
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
export default {
  name: 'orderDetail',
  components: { VDistpicker, LogisticsDialog },
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      formLabelWidth: '120px',
      multipleSelection: [],



      listQuery: Object.assign({}, defaultListQuery),
      id: null,
      order: {},
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: { orderId: null, freightAmount: 0, discountAmount: 0, status: null },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      refundInfo: {},
      postponeInfo: {},
      logisticsDialogVisible: false,
      InitiateRefundDialogVisible: false,
      showPostponeDialogVisible: false,
      currentGoods: {},
      confirmGoods: {},
      formInline: {
        options: [],
        amount: "N/A",
        num: 1,
      }
    }
  },

  created() {
    this.id = this.list = this.$route.query.id;
    this.axios.get(this.Global.BASE_URL + `/order/exchange/${this.id}`).then(response => {
      console.log(response.data)
      this.order = response.data.data;
    })
  },
  filters: {
    sexFilter(value) {
      if (value === 0) {
        return '未知';
      } else if (value === 1) {
        return '男';
      } else if (value === 2) {
        return '女';
      }
    },
    formatNull(value) {
      if (value === undefined || value === null || value === '') {
        return '暂无';
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === '') {
        return '暂无';
      } else if (value.length > 8) {
        return value.substr(0, 8) + '...';
      } else {
        return value;
      }
    },
    formatPayType(value) {
     /**
     * 支付方式 0=现金转账 1=微信 2=支付宝 3=银联 4=快钱
     */ if (value === 0) {
        return '现金转账';
      } else if (value === 1) {
        return '微信';
      } else if (value === 2) {
        return '支付宝';
      } else if (value === 3) {
        return '银联';
      } else if (value === 4) {
        return '快钱';
      } else {
        return '未支付';
      }
    },
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
    formatOrderType(value) {
      if (value === 1) {
        return '营会订单';
      } else {
        return '正常订单';
      }
    },
    formatAddress(order) {
      let str = order.receiverProvince;
      if (order.receiverCity != null) {
        str += "  " + order.receiverCity;
      }
      str += "  " + order.receiverRegion;
      str += "  " + order.receiverDetailAddress;
      return str;
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

    formatPayStatus(value) {
      if (value === 0) {
        return '未支付';
      } else if (value === 4) {
        return '已退款';
      } else {
        return '已支付';
      }
    },
    formatDeliverStatus(value) {
      if (value === 0 || value === 1) {
        return '未发货';
      } else {
        return '已发货';
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return '';
      } else {
        let attr = JSON.parse(value);
        let result = '';
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    }
  },
  methods: {
    currentSel(selVal) {
      this.dialogTableVisible = true
      console.log(this.formInline)
      this.formInline.price = selVal.sellPrice + this.currentGoods.sellPrice;
    },
    getformInline() {
      this.confirmGoods = this.formInline

      console.log(this.formInline)
    },
    getAttribute(id) {
      this.axios.get(this.Global.BASE_URL + `/goods/attribute/${id}`).then(response => {
        this.gridData = response.data.data.values
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    // 搜索商品
    getList() {
      // let data = Object.assign({}, this.listQuery, { page: this.listQuery.page - 1 })
      let data = { goodsName: this.formInline.goodsName }
      this.axios.get(this.Global.BASE_URL + "/goods", { params: data }).then(response => {
        this.currentGoods = response.data.data[0]
        this.getAttribute(this.currentGoods.attributeId)
      })
    },
    onSubmit() {
      this.getList()
    },
    handleExchange() {
      this.$confirm('是否要更换商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let attributeValues = []
        this.multipleSelection.forEach(element => {
          attributeValues.push({ attributeValueId: element.attributeValueId })
        });
        let data = {
          orderGoodsId: this.order.orderGoods[0].orderGoodsId,
          attributeValues: attributeValues,
          // goodsId: this.currentGoods.id,
          cause: this.confirmGoods.cause,
          remark: this.confirmGoods.remark
        }
        console.log(data)
        this.axios.post(this.Global.BASE_URL + "/order/exchange", data).then(response => {
          console.log(response)
          this.$message({ type: 'success', message: '修改成功!' });

        })
      });
    },
    handleChange(value) {
      console.log(value);
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    formatTime(time) {
      if (time == null || time === '') {
        return '';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },

    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.order.id,
        receiverName: this.order.receiverName,
        receiverPhone: this.order.receiverPhone,
        receiverPostCode: this.order.receiverPostCode,
        receiverDetailAddress: this.order.receiverDetailAddress,
        receiverProvince: this.order.receiverProvince,
        receiverCity: this.order.receiverCity,
        receiverRegion: this.order.receiverRegion,
        status: this.order.status
      }
    },
    handleUpdateReceiverInfo() {
      this.$confirm('是否要修改收货信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateReceiverInfo(this.receiverInfo).then(response => {
          this.receiverDialogVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderId = this.order.id;
      this.moneyInfo.freightAmount = this.order.freightAmount;
      this.moneyInfo.discountAmount = this.order.discountAmount;
      this.moneyInfo.status = this.order.status;
    },
    handleUpdateMoneyInfo() {
      this.$confirm('是否要修改费用信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateMoneyInfo(this.moneyInfo).then(response => {
          this.moneyDialogVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
    },
    handleSendMessage() {
      this.$confirm('是否要发送站内信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.messageDialogVisible = false;
        this.$message({
          type: 'success',
          message: '发送成功!'
        });
      });
    },
    showCloseAttributeDialog() {
      let item = this.currentGoods.sellPrice
      let arr = []
      this.multipleSelection.forEach(element => {
        arr.push(element.attributeValue)
        item += element.sellPrice
      });
      console.log(item)
      let data = {
        attributeValues: arr.toString(),
        amount: item
      }
      this.formInline = Object.assign(this.formInline, data),
        this.dialogTableVisible = false;
    },

    handleCloseOrder() {
      this.$confirm('是否要关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.closeInfo.id]);
        params.append("note", this.closeInfo.note);
        closeOrder(params).then(response => {
          this.closeDialogVisible = false;
          this.$message({
            type: 'success',
            message: '订单关闭成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.closeOrder.note = null;
    },
    handleMarkOrder() {
      this.$confirm('是否要备注订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", this.markInfo.id);
        params.append("note", this.markInfo.note);
        params.append("status", this.order.status);
        updateOrderNote(params).then(response => {
          this.markOrderDialogVisible = false;
          this.$message({
            type: 'success',
            message: '订单备注成功!'
          });
          getOrderDetail(this.id).then(response => {
            this.order = response.data;
          });
        });
      });
    },
    handleDeleteOrder() {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.id]);
        deleteOrder(params).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.$router.back();
        });
      })
    },
    showLogisticsDialog() {
      this.logisticsDialogVisible = true;
    },
    handleSendRefund() {
      this.$confirm('是否要提交申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.refundInfo)
        this.axios.post(this.Global.BASE_URL + `/order/refund`, this.refundInfo).then(response => {
          if (response.data.status == 200) {
            this.InitiateRefundDialogVisible = false;
            this.$message({ type: 'success', message: '提交成功!' });
          }
        })
      });
    },
    showInitiateRefundDialog() {
      this.InitiateRefundDialogVisible = true;
      this.refundInfo = {
        orderGoodsId: this.order.orderGoods[0].orderGoodsId,
        refundAmount: this.order.payableAmount
      }
    },

    showPostponeDialog() {
      this.showPostponeDialogVisible = true;
      this.postponeInfo = {
        orderGoodsId: this.order.orderGoods[0].orderGoodsId
      }
    },
    covertOrder(order) {
      let listItem = {
        orderId: 1
      }
      return listItem;
    },
    showExchangeApply() {
      let listItem = this.covertOrder(this.order);
      console.log(listItem)
      this.$router.push({ path: '/oms/orderDetail', query: { id: row.orderId } })
    },
    handleSendPostpone() {
      this.$confirm('是否要提交延期?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.postponeInfo)
        this.axios.post(this.Global.BASE_URL + `/order/postpone`, this.postponeInfo).then(response => {
          if (response.data.status == 200) {
            this.showPostponeDialogVisible = false;
            this.$message({ type: 'success', message: '提交成功!' });
          }
        })
      });
    },

  }
}
</script>
<style scoped>
.detail-container {
  left: 0;
  right: 0;
  width: 1080px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}

.standard-margin {
  margin-top: 15px;
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}

.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 15px;
}

.form-left-bg {
  background: #f2f6fc;
}
</style>


