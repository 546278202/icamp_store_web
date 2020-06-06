

<template> 
  <div style="margin-top: 20px">
    <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
    <span class="font-small">营员信息</span>
    <el-table ref="orderTable" :data="Data.campers" style="width: 100%;margin-top: 20px;" border>
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="camperName" label="姓名" width="" align="center"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="160" align="center">
        <template slot-scope="scope">{{scope.row.sex | sexFilter}}</template>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="" align="center"> </el-table-column>
      <el-table-column prop="status" label="状态" width="" align="center">
        <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
      </el-table-column>
      <el-table-column prop="status" label="操作" width="" align="center">
        <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleViewOrder(scope.$index, scope.row)">发起订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="下单信息" :visible.sync="receiverDialogVisible">
      <el-form :model="formInline" size="small" class="demo-form-inline">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-select v-model="currentGood" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" :style="'width:'+ formInputlWidth" @change="handleSelect">
            <el-option v-for="item in currentGoods" :key="item.name" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <span class="color-danger">剩余{{currentGood.totalQty}}人</span>
        </el-form-item>
        <el-form-item label="属性名称" :label-width="formLabelWidth">
          <el-input v-model="formInline.attributeValues" placeholder="请选择期数" @focus="dialogTableVisible=true" :style="'width:'+ formInputlWidth"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input v-model="formInline.currentAmount" :disabled="true" placeholder="确认金额" @focus="dialogTableVisible=true" :style="'width:'+ formInputlWidth"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="onSubmitOrder">立即创建</el-button>
          <el-button @click="receiverDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

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

export default {
  name: 'camperList',
  props: ["Data"],
  data() {
    return {
      camper: {},
      gridData: [],
      receiverDialogVisible: false,
      dialogTableVisible: false,
      formInline: {},
      currentGoods: [],
      currentGood: {},
      multipleSelection: [],
      formLabelWidth: '120px',
      formInputlWidth: '350px',
      loading: false,
    }
  },
  methods: {
    handleSelect(item) {
      this.getAttribute(item.attributeId)
    },
    handleViewOrder(index, item) {
      this.camper = item
      this.receiverDialogVisible = true
    },
    getAttributeValues() {
      let attributeValues = []
      this.multipleSelection.forEach(element => {
        attributeValues.push({ attributeValueId: element.attributeValueId })
      });
      return attributeValues
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    showCloseAttributeDialog() {
      let item = this.currentGood.sellPrice
      let arr = []
      this.multipleSelection.forEach(element => {
        arr.push(element.attributeValue)
        item += element.sellPrice
      });
      let data = {
        attributeValues: arr.toString(),
        currentAmount: "¥" + item
      }
      this.formInline = Object.assign(this.formInline, data),
        this.dialogTableVisible = false;
    },
    getAttribute(id) {
      this.axios.get(this.Global.BASE_URL + `/goods/attribute/${id}`).then(response => {
        this.gridData = response.data.data.values
      })
    },

    onSubmitOrder() {
      let data = {
        camperId: this.camper.camperId,
        goodsId: this.currentGood.id,
        attributeValues: this.getAttributeValues(),
      }
      let settleModels = []
      settleModels.push(data)
      let params = {
        settleModels: settleModels,
        froms: 0,
        orderType: 1,
        userId: this.Data.userId
      }
      this.axios.post(this.Global.BASE_URL + `/order`, params).then(response => {
        if (response.status == 200) {
          this.$message({ message: '修改成功', type: 'success', duration: 1000 });
          this.receiverDialogVisible=false
        }
      })
    },
    remoteMethod(query) {
      console.log(query)
      if (query !== '') {
        this.loading = true;
        let data = { goodsName: query }
        this.axios.get(this.Global.BASE_URL + "/goods", { params: data }).then(response => {
          this.currentGoods = response.data.data
          this.loading = false;
        })
      } else {
        this.currentGoods = [];
      }
    }
  },
  mounted() {

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
      if (value === 1) {
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
}
</script>
<style scoped>
.table-layout {
  margin-top: 20px;
}
.color-danger{
  color: #f56c6c;
}
</style>


