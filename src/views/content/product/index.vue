<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="overflow:hidden;">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="handleSearchList()" type="primary" size="small">
          查询结果
        </el-button>
        <el-button style="float: right;margin-right: 15px" @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="内容名称:">
            <el-input class="input-width" v-model="listQuery.title" placeholder="商品名称(主题)"></el-input>
          </el-form-item>
          <el-form-item label="项目分类:">
            <el-select class="input-width" v-model="listQuery.cids" placeholder="请选择">
              <el-option v-for="item in treeData" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型:">
            <el-select class="input-width" v-model="listQuery.type" placeholder="请选择">
              <el-option v-for="item in typeOperates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间:">
            <el-date-picker class="input-width" v-model="listQuery.startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd:HH:mm:ss"> </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:">
            <el-date-picker class="input-width" v-model="listQuery.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd:HH:mm:ss"> </el-date-picker>
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
            <el-image style="width: 120px; height: 120px" :src="scope.row.coverImg" @error='defImg()' fit="cover" class="avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.title}}</p>
          </template>
        </el-table-column>

        <el-table-column label="简介" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.brief}}
          </template>
        </el-table-column>
      
        <el-table-column label="添加时间" align="center">
          <template slot-scope="scope">{{scope.row.addDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push({path:'/content/addProduct',query:{Id:scope.row.id}})">编辑</el-button>
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
  </div>
</template>
<script>
const defaultListQuery = {
  title: null,
  type: null,
  cids: null,
  startDate: null,
  endDate: null,
  page: 1,
  size: 5,
};
export default {
  name: "productList",
  data() {
    return {
      parentId: 0,
      dialogTableVisible: false,
      goodsAttributes: { values: [] },
      treeData: [],
      typeOperates: [
        { value: '0', label: '文章' },
        { value: '1', label: '外链' },
        { value: '2', label: '视频' },
      ],
      operates: [
        // { value: '0', label: '文章' },
        // { value: '1', label: '外链' },
        // { value: '2', label: '视频' },
      ],
    
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      multipleSelection: []
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
      this.dialogTableVisible = true
      this.axios.get(this.Global.BASE_URL + `/goods/attribute?goodsId=${id}&type=1`).then(response => {
        if (response.data.status == 200) {
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
      this.axios.get(this.Global.BASE_URL + "/discovery", { params: data }).then(response => {
        console.log(response)
        this.list = response.data.data;
        this.total = response.data.total;
      })
    },
    // tree商品分类
    getTreeList() {
      this.axios.get(this.Global.BASE_URL + `/category/${this.parentId}?page=${this.listQuery.page - 1}&size=10&type=2`).then(response => {
        if (response.data.status == 200) {
          console.log(response.data.data)
          this.treeData = response.data.data
        }
      })
    },
    handleSearchList() {
      this.listQuery.page = 1;
      console.log(this.listQuery)
      this.getList();
    },
    handleAddProduct() {
      this.$router.push({ path: '/content/addProduct' });
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
    //数据删除
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        // this.operateType = 1
        this.axios.delete(this.Global.BASE_URL + `/discovery/${row.id}`).then(response => {
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




