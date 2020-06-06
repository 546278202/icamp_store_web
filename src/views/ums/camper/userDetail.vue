<template> 
  <div class="detail-container">
    <div class="form-container-border" style="display:flex;">
      <div class="form-left-bg form-border font-small" style="width:200px;display:flex; flex-direction: column;align-items: center;justify-content: center;">
        <div style="margin-bottom:15px;"> <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar" /></div>
        <div style="margin-bottom:15px;">{{base.phone}}</div>
        <div>{{ base.level|levelFilter}}</div>
      </div>
      <div style="width:200px;flex:1;">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">用户ID</el-col>
          <el-col class="form-border font-small" :span="18">{{base.userId ? base.userId:"暂无"}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">昵称</el-col>
          <el-col class="form-border font-small" :span="18">{{base.userName ? base.userName:"暂无"}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">性别</el-col>
          <el-col class="form-border font-small" :span="18">{{base.sex | sexFilter}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">生日</el-col>
          <el-col class="form-border font-small" :span="18">未知</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">城市</el-col>
          <el-col class="form-border font-small" :span="18">未知</el-col>
        </el-row>
      </div>
      <div style="width:200px;flex:1;">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">职业</el-col>
          <el-col class="form-border font-small" :span="18">未知</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">个性签名</el-col>
          <el-col class="form-border font-small" :span="18">没有围墙的学校，没有边界的教育 </el-col>
        </el-row>

        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">注册时间</el-col>
          <el-col class="form-border font-small" :span="18">未知</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">用户来源</el-col>
          <el-col class="form-border font-small" :span="18">{{base.froms | formatSourceType}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">用户钱包</el-col>
          <el-col class="form-border font-small color-blue" :span="18" ><a title="查看明细">{{base.balance ? base.balance:"¥0.00"}}</a></el-col>
        </el-row>
      </div>
    </div>
    <el-card shadow="never" style="margin-top:15px;">
      <!-- 地址信息 -->
      <addressList :Data="base"></addressList>
      <!-- 营员信息 -->
      <camperList :Data="base"></camperList>
      <!-- 订单信息 -->
      <orderList :Data="id"></orderList>
    </el-card>
  </div>
</template>
<script>
import addressList from '@/views/user/components/addressList';
import camperList from '@/views/user/components/camperList';
import orderList from '@/views/user/components/orderList';

export default {
  name: 'userDetail',
  components: { addressList, camperList, orderList },
  data() {
    return {
      base: {},
      // orderList:{},
      id: null,
    }
  },
  created() {
    this.id = this.list = this.$route.query.id;
    this.getList()
    // this.getOrderList()
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '普通会员';
      } else if (value === 1) {
        return '黄金会员';
      } else if (value === 2) {
        return '白金会员';
      } else if (value === 3) {
        return '钻石会员';
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
      } else {
        return '无';
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
    // 获取详细信息 
    getList() {
      this.axios.get(this.Global.BASE_URL + `/user/${this.id}?type=1`).then(response => {
        this.base = response.data.data
        console.log(this.base)
      })
    },
  }
}
</script>
<style scoped>
.detail-container {
  /* width: 80%; */
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
}

.form-left-bg {
  background: #f2f6fc;
}

.user-avatar {
  cursor: pointer;
  width: 65px;
  height: 65px;
  border-radius: 65px;
  display: block;
}
.font-small {
  font-size: 14px;
  color: #606266;
}
.color-blue {
  color: #20a0ff;
}
</style>


