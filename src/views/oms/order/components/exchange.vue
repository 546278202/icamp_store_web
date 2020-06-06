<template> 
  <div class="detail-container" ref="productImage">
    <!-- <div>
      <el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
        <el-step title="提交订单" :description="formatTime(order.createTime)"></el-step>
        <el-step title="支付订单" :description="formatTime(order.paymentTime)"></el-step>
        <el-step title="平台发货" :description="formatTime(order.deliveryTime)"></el-step>
        <el-step title="确认收货" :description="formatTime(order.receiveTime)"></el-step>
        <el-step title="完成评价" :description="formatTime(order.commentTime)"></el-step>
      </el-steps>
    </div> -->
    <el-card shadow="never" style="margin-top: 15px">
      <!-- <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前订单状态：{{order.orderStatus | formatStatus}}</span>
        <div class="operate-button-container" v-show="order.orderStatus===0">
          <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
          <el-button size="mini">修改商品信息</el-button>
          <el-button size="mini" @click="showUpdateMoneyDialog">修改费用信息</el-button>
          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
          <el-button size="mini" @click="showCloseOrderDialog">关闭订单</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.orderStatus===1">
          <el-button size="mini" @click="showUpdateReceiverDialog">修改收货人信息</el-button>
          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
          <el-button size="mini">取消订单</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.orderStatus==2||order.status==3">
          <el-button size="mini" @click="showLogisticsDialog">订单跟踪</el-button>
          <el-button size="mini" @click="showMessageDialog">发送站内信</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.orderStatus===4">
          <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
          <el-button size="mini" @click="showMarkOrderDialog">备注订单</el-button>
        </div>

        <div class="operate-button-container" v-show="order.orderStatus===5 && order.orderGoods[0].afterSales==null">
          <el-button size="mini" :order="order" @click="showInitiateRefundDialog">申请退款</el-button>
           <el-button size="mini" :order="order" @click="showPostponeDialog">申请更换</el-button>
          <el-button size="mini" :order="order" @click="showPostponeDialog">申请延期</el-button>
        </div>
      </div> -->
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">发货单流水号</el-col>
          <el-col :span="4" class="table-cell-title">用户账号</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>
          <el-col :span="4" class="table-cell-title">订单来源</el-col>
          <el-col :span="4" class="table-cell-title">订单类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.orderId}}</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">{{order.userId}}</el-col>
          <el-col :span="4" class="table-cell">{{order.payWay | formatPayType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.froms | formatSourceType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.orderType | formatOrderType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">配送方式</el-col>
          <el-col :span="4" class="table-cell-title">物流单号</el-col>
          <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
          <el-col :span="4" class="table-cell-title">订单可得优币</el-col>
          <el-col :span="4" class="table-cell-title">订单可得成长值</el-col>
          <el-col :span="4" class="table-cell-title">活动信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.deliveryCompany | formatNull}}</el-col>
          <el-col :span="4" class="table-cell">{{order.deliverySn | formatNull}}</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">
            <el-popover placement="top-start" title="活动信息" width="200" trigger="hover" :content="order.promotionInfo">
              <span slot="reference">{{order.promotionInfo | formatLongText}}</span>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">发票信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">发票类型</el-col>
          <el-col :span="6" class="table-cell-title">发票抬头</el-col>
          <el-col :span="6" class="table-cell-title">发票内容</el-col>
          <el-col :span="6" class="table-cell-title">收票人信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">暂无</el-col>
          <el-col :span="6" class="table-cell">暂无</el-col>
          <el-col :span="6" class="table-cell">暂无</el-col>
          <el-col :span="6" class="table-cell">暂无</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">营员信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="3" class="table-cell-title">营员</el-col>
          <el-col :span="3" class="table-cell-title">性别</el-col>
          <el-col :span="3" class="table-cell-title">国籍</el-col>
          <el-col :span="3" class="table-cell-title">身份号码</el-col>
          <el-col :span="3" class="table-cell-title">身高(cm)</el-col>
          <el-col :span="3" class="table-cell-title">体重(kg)</el-col>
          <el-col :span="3" class="table-cell-title">紧急联系人</el-col>
          <el-col :span="3" class="table-cell-title">操作</el-col>
        </el-row>
        <el-row v-for="(item,index) in order.orderGoods" :key="index">
          <el-col :span="3" class="table-cell">{{item.camper.camperName}}</el-col>
          <el-col :span="3" class="table-cell">{{item.camper.sex | sexFilter}}</el-col>
          <el-col :span="3" class="table-cell">{{}}</el-col>
          <el-col :span="3" class="table-cell">{{item.camper.identifications[0].idCode}}</el-col>
          <el-col :span="3" class="table-cell">{{item.camper.camperDetails[0].weigth}}cm</el-col>
          <el-col :span="3" class="table-cell">{{item.camper.camperDetails[0].weigth}}kg</el-col>
          <el-col :span="3" class="table-cell">{{}}</el-col>
          <el-col :span="3" class="table-cell"> <a class="color-blue">详情</a></el-col>
        </el-row>
      </div>
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
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">配送运费</el-col>
          <el-col :span="6" class="table-cell-title">平台减免</el-col>
          <el-col :span="6" class="table-cell-title">优惠卷</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.orderAmount}}</el-col>
          <el-col :span="6" class="table-cell">￥{{order.expressAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.platformDiscountAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.couponDiscountAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥0</el-col>
          <el-col :span="6" class="table-cell">-￥0</el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.orderAmount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.payableAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">操作信息</span>
      </div>
      <el-table style="margin-top: 20px;width: 100%" ref="orderHistoryTable" :data="order.historyList" border>
        <el-table-column label="操作者" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.operateMan}}
          </template>
        </el-table-column>
        <el-table-column label="操作时间" width="160" align="center">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatStatus}}
          </template>
        </el-table-column>
        <el-table-column label="付款状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatPayStatus}}
          </template>
        </el-table-column>
        <el-table-column label="发货状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatDeliverStatus}}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{scope.row.note}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改收货人信息" :visible.sync="receiverDialogVisible" width="40%">
      <el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="收货人姓名：">
          <el-input v-model="receiverInfo.receiverName" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input v-model="receiverInfo.receiverPostCode" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label="所在区域：">
          <v-distpicker :province="receiverInfo.receiverProvince" :city="receiverInfo.receiverCity" :area="receiverInfo.receiverRegion" @selected="onSelectRegion"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="receiverInfo.receiverDetailAddress" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="receiverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateReceiverInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改费用信息" :visible.sync="moneyDialogVisible" width="40%">
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.totalAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"><template slot="prepend">￥</template></el-input>
          </el-col>
          <el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.discountAmount" size="mini"><template slot="prepend">-￥</template></el-input>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.totalAmount+moneyInfo.freightAmount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moneyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateMoneyInfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="发送站内信" :visible.sync="messageDialogVisible" width="40%">
      <el-form :model="message" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭订单" :visible.sync="closeDialogVisible" width="40%">
      <el-form :model="closeInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注订单" :visible.sync="markOrderDialogVisible" width="40%">
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="申请退款" :visible.sync="InitiateRefundDialogVisible" width="40%">
      <el-form :model="refundInfo" label-width="80px" size="medium">
        <el-form-item label="收款账号">
          <el-input v-model="refundInfo.accountNumber"></el-input>
        </el-form-item>
        <el-form-item label="收款类型">
          <el-select v-model="refundInfo.accountType" placeholder="请选择">
            <el-option label="银行卡" value="0"></el-option>
            <el-option label="微信" value="1"></el-option>
            <el-option label="支付宝" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" v-model="refundInfo.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSendRefund">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="申请延期" :visible.sync="showPostponeDialogVisible" width="40%">
      <el-form :model="postponeInfo" label-width="80px" size="medium">
        <el-form-item label="延期原因">
          <el-select v-model="postponeInfo.cause" placeholder="请选择">
            <el-option label="时间紧急" value="时间紧急"></el-option>
            <el-option label="最近不想参加" value="最近不想参加"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" v-model="postponeInfo.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSendPostpone">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="关闭订单" :visible.sync="closeDialogVisible" width="40%">
      <el-form :model="closeInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="备注订单" :visible.sync="markOrderDialogVisible" width="40%">
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
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
export default {
  name: 'orderDetail',
  components: { VDistpicker, LogisticsDialog },
  data() {
    return {
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
    }
  },
  created() {
    this.id = this.list = this.$route.query.id;
    this.axios.get(this.Global.BASE_URL + `/order/${this.id}`).then(response => {
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
    showCloseOrderDialog() {
      this.closeDialogVisible = true;
      this.closeInfo.note = null;
      this.closeInfo.id = this.id;
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
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
.color-danger {
  color: #f56c6c;
}
.color-blue {
  color: #20a0ff;
}
</style>


