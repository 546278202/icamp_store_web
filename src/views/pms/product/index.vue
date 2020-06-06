<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="overflow:hidden;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" @click="handleSearchList()" type="primary" size="small">
          查询结果
        </el-button>
        <el-button style="float:right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>

      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="商品名称：">
            <el-input class="input-width" v-model="listQuery.goodsName" placeholder="商品名称(主题)"></el-input>
          </el-form-item>
          <el-form-item label="输入搜索：">
            <el-input class="input-width" v-model="listQuery.keyword" placeholder="关键词"></el-input>
          </el-form-item>

          <el-form-item label="项目分类：">
            <el-select v-model="listQuery.cid" placeholder="请选择" class="input-width">
              <el-option v-for="item in treeData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOperates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOperates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddProduct()" size="mini" style="float:right;">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>

        <el-table-column prop="icon" label="图片" align="center">
          <template slot-scope="scope" align="center">
            <el-image style="width: 120px; height: 120px" :src="scope.row.icon" @error='defImg()' fit="cover" class="avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>

        <el-table-column label="期数" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.totalPeriods}}
          </template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <div style="margin-bottom:5px;" align="center">
              <span>热门:</span>
              <el-switch v-model="scope.row.isHot" @change="tabGoodStatus('isHot',scope.row)"></el-switch>
            </div>
            <div style="margin-bottom:5px;" align="center">
              <span>新品:</span>
              <el-switch v-model="scope.row.isNew" @change="tabGoodStatus('isNew',scope.row)"></el-switch>
            </div>
            <div style="margin-bottom:5px;" align="center">
              <span>推荐:</span>
              <el-switch v-model="scope.row.isPromote" @change="tabGoodStatus('isPromote',scope.row)"></el-switch>
            </div>

          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.serialNo}}</template>
        </el-table-column>
        <el-table-column label="属性设置" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="getGoodAttribute(scope.row.id)" circle></el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push({path:'/pms/updateProduct',query:{Id:scope.row.id}})">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
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
    <!-- 属性弹出层 -->
    <el-dialog title="属性更改" :visible.sync="dialogTableVisible" width="60%">
      <el-table :data="goodsAttributes.values" border style="width: 100%">
        <el-table-column type="index" label="分期" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="项目名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="attributeValue" label="项目编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.attributeValue" size="small"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="starDate" label="出发日期" align="center" width="160">
          <template slot-scope="scope">
            <el-date-picker style="width:135px;" v-model="scope.row.starDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" size="small"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="返回日期" align="center" width="160">
          <template slot-scope="scope">
            <el-date-picker style="width:135px;" v-model="scope.row.endDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" size="small"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="totalQty" label="库存总量" align="center" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalQty" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存警告" align="center" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.warnStockQty" size="small"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible=false" size="small">取 消</el-button>
        <el-button type="primary" @click="getGoodAttributeData" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
  name: "productList",
  data() {
    return {
      dialogTableVisible: false,
      goodsAttributes: { values: [] },
      treeData: [],
      typeOperates: [
        { value: '0', label: '打包商品' },
        { value: '1', label: '是否置顶' },
        { value: '2', label: '是否精品' },
        { value: '3', label: '是否新品' },
        { value: '4', label: '是否热销' },
        { value: '5', label: '是否推荐' }
      ],
      operates: [
        {
          value: '0',
          label: '商品下架'
        }, {
          value: '1',
          label: '商品上架'
        }, {
          value: '2',
          label: '是否置顶'
        }, {
          value: '3',
          label: '是否精品'
        }, {
          value: '4',
          label: '是否新品'
        }, {
          value: '5',
          label: '是否热销'
        }, {
          value: '6',
          label: '是否推荐'
        }, {
          value: '7',
          label: '打包商品'
        }, {
          value: '8',
          label: '批量删除'
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      multipleSelection: [],
      statusOperates: [{
        value: 1,
        label: '上架'
      }, {
        value: 0,
        label: '下架'
      }]
    }
  },
  created() {
    this.getList();
    this.getTreeList()
  },
  watch: {

  },
  filters: {
    statusFilter(value) {
      if (value === 1) {
        return '审核通过';
      } else {
        return '未审核';
      }
    }
  },
  methods: {
    //修改状态
    tabGoodStatus(self, item) {
      let paramer = ''
      if (self == "isNew") {
        paramer = { goodsId: item.id, isNew: item.isNew }
      }
      if (self == "isHot") {
        paramer = { goodsId: item.id, isHot: item.isHot }
      }
      if (self == "isPromote") {
        paramer = { goodsId: item.id, isPromote: item.isPromote }
      }
      this.axios.post(this.Global.BASE_URL + "/goods", paramer).then(response => {
        if (response.data.status == 200) {
          this.getList()
          this.$message({ type: 'success', message: '修改成功!' });
        }
      })
    },
    // 图片加载失败
    defImg() {
      let img = event.srcElement;
      console.log(event.srcElement)
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    // 根据商品id获取属性
    getGoodAttribute(id) {

      this.axios.get(this.Global.BASE_URL + `/goods/attribute?goodsId=${id}&type=1`).then(response => {
        if (response.data.status == 200) {
          this.dialogTableVisible = true
          this.goodsAttributes = response.data.data

        }
      })
    },
    //跟据商品id添加/更新属性
    getGoodAttributeData() {
      this.axios.post(this.Global.BASE_URL + `/goods/attribute`, this.goodsAttributes).then(response => {
        if (response.data.status == 200) {
          this.dialogTableVisible = false
          this.$message({ type: 'success', message: '修改成功!' });
        }
      })
    },
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    getList() {
      let data = Object.assign({}, this.listQuery, { page: this.listQuery.page - 1 })
      this.axios.get(this.Global.BASE_URL + "/goods", { params: data }).then(response => {
        console.log(response)
        this.list = response.data.data;
        this.total = response.data.total;
      })
    },
    // tree商品分类
    getTreeList() {
      this.axios.get(this.Global.BASE_URL + "/category/tree/0?type=0").then(response => {
        if (response.data.status == 200) {
          console.log(response.data.data)
          this.treeData = response.data.data
        }
      })
    },

    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleAddProduct() {
      this.$router.push({ path: '/pms/addProduct' });
    },
    handleBatchOperate() {
      console.log(this.multipleSelection)
      if (this.operateType == null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.axios.patch(this.Global.BASE_URL + `/goods/batch/${this.operateType}`, ids).then(response => {
          if (response.data.status == 200) {
            this.getList()
            this.$message({ type: 'success', message: '添加成功!' });
          }
        })
      });
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val)
      this.listQuery.page = val;
      this.getList();
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.operateType = 8
        this.axios.patch(this.Global.BASE_URL + `/goods/batch/${this.operateType}`, ids).then(response => {
          if (response.data.status == 200) {
            this.getList()
            this.$message({ type: 'success', message: '操作成功!' });
          }
        })
      });
    },
    //数据批量操作
    batchOperation() {
      console.log(this.$refs.multipleTable.selection)
      let arr = []
      this.$refs.multipleTable.selection.forEach(element => {
        arr.push(element.id)
      });

      if (arr.length == 0) {
        this.$message({ showClose: true, message: '请选择至少一个商品', type: 'warning' });
        return false
      }
      if (!this.searchForm.value) {
        this.$message({ showClose: true, message: '请选择操作项', type: 'warning' });
        return false
      }

      this.$confirm('您确定修改此商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        this.axios.patch(this.Global.BASE_URL + `/goods/batch/${this.searchForm.value}`, arr).then(response => {
          if (response.data.status == 200) {
            this.getGoodsList()
            this.$message({ type: 'success', message: '添加成功!' });
          }
        })
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




