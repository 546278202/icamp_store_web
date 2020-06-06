<template> 
  <div class="detail-container" ref="productImage">
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table ref="orderItemTable" :data="order" style="width: 100%;margin-top: 20px" border>
        <el-table-column label="人员名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.camper.camperName}}</p>
          </template>
        </el-table-column>

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
      <!-- <div style="float: right;margin: 20px">
        合计：<span class="color-danger">￥{{order[].payAmount}}</span>
      </div> -->
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
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item label="">
                <span class="color-danger">剩余{{currentGoods.totalQty}}人</span>
              </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.attributeValues" style="width:350px;" placeholder="请选择期数" @focus="dialogTableVisible=true"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getformInline">确定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">更改后项目</el-col>
          <el-col class="form-border font-small" :span="18">{{newGoods.goodsName | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">价格</el-col>
          <el-col class="form-border font-small" :span="18">{{newGoods.sellPrice | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">属性</el-col>
          <el-col class="form-border font-small" :span="18">{{newGoods.attributeValues | formatNull}}</el-col>
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
          <el-col class="form-border font-small" :span="18">￥{{order[0].orderGoodsAmount | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">更换后价格</el-col>
          <el-col class="form-border font-small" :span="18">¥{{newGoods.sellPrice | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">需支付</el-col>
          <el-col class="form-border font-small" :span="18">¥{{ newGoods.needPay | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:55px;display:flex;align-items: center;">更换理由</el-col>
          <el-col class="form-border font-small" :span="18" style="height:55px;">
            <el-input v-model="newGoods.cause" style="width:350px;" size="small" placeholder="输入更换理由"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:55px;display:flex;align-items: center;">备注</el-col>
          <el-col class="form-border font-small" :span="18" style="height:55px;">
            <el-input v-model="newGoods.remark" style="width:350px;" size="small" placeholder="输入备注"></el-input>
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
      order: [],
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
      newGoods: {},
      confirmGoods: {},
      formInline: {}
    }
  },

  created() {
    this.order.push(JSON.parse(sessionStorage.getItem("orderExchange")))
    console.log(this.order)
  },
  filters: {
    returnFloat(value) {
      var value = Math.round(parseFloat(value) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    formatNull(value) {
      if (value === undefined || value === null || value === '') {
        return '暂无';
      } else {
        return value;
      }
    }
  },
  methods: {

    getAttributeValues() {
      let attributeValues = []
      this.multipleSelection.forEach(element => {
        attributeValues.push({ attributeValueId: element.attributeValueId })
      });
      return attributeValues
    },
    getItemAmount() {
      let item = this.currentGoods.sellPrice
      this.multipleSelection.forEach(element => {
        item += element.sellPrice
      });
      return item
    },
    getformInline() {
      this.newGoods = {
        goodsName: this.formInline.goodsName,
        attributeValues: this.formInline.attributeValues,
        sellPrice: this.getItemAmount(),
        getAttributeValues: this.getAttributeValues(),
        needPay: this.order[0].orderGoodsAmount - this.getItemAmount()
      }
    },
    getAttribute(id) {
      this.axios.get(this.Global.BASE_URL + `/goods/attribute/${id}`).then(response => {
        this.gridData = response.data.data.values
      })
    },
    handleSelectionChange(val) {
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
        let data = {
          orderGoodsId: this.order[0].orderGoodsId,
          attributeValues: this.getAttributeValues(),
          cause: this.newGoods.cause,
          remark: this.newGoods.remark
        }
        console.log(data)
        this.axios.post(this.Global.BASE_URL + "/order/exchange", data).then(response => {
          this.$message({ type: 'success', message: '修改成功!' });
        })
      });
    },
    handleChange(value) {
      console.log(value);
    },
    handleSelect(item) {
      console.log(item);
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
        currentAmount: item
      }
      this.formInline = Object.assign(this.formInline, data),
        this.dialogTableVisible = false;
    },
    showPostponeDialog() {
      this.showPostponeDialogVisible = true;
      this.postponeInfo = {
        orderGoodsId: this.order[0].orderGoodsId
      }
    }
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
.color-danger {
  color: #f56c6c;
}
</style>


