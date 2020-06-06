
<template>
  <el-card class="form-container" shadow="never">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="营会标题:" prop="goodsName">
        <el-input v-model="ruleForm.goodsName" placeholder="请输入主标题"></el-input>
      </el-form-item>
      <el-form-item label="营会简介:" prop="goodsBrief">
        <el-input v-model="ruleForm.goodsBrief" placeholder="请输入营会简介"></el-input>
      </el-form-item>
      <el-form-item label="关键词:" prop="keyWords">
        <el-input v-model="ruleForm.keyWords" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="营会类型:">
        <el-radio-group v-model="checkList2">
          <el-radio v-for="item in list2" :key="item.id" :label="item.id" @change="getClass2Data(item)">{{item.name}}</el-radio>
        </el-radio-group>

        <el-checkbox-group v-model="checkList3">
          <el-checkbox v-for="item in list3" :key="item.id" :label="item" @change="getClass3Data(item)">{{item.name}}</el-checkbox>
        </el-checkbox-group>

      </el-form-item>
      <el-form-item label="项目标签:">
        <el-checkbox-group v-model="getCheckedTaglist">
          <el-tag @click="$router.push({path:'/pms/productCate'})" style="cursor:pointer;margin-right:30px;" size="small">+新建标签</el-tag>
          <el-checkbox v-for="item in getTaglist" :key="item.id" :label="item">{{item.title}}</el-checkbox>
        </el-checkbox-group>

      </el-form-item>
      <el-form-item label="营会地点:" prop="productionPlace">
        <el-input v-model="ruleForm.productionPlace" placeholder="请输入地点"></el-input>
      </el-form-item>
      <el-form-item label="商品原价:" prop="productionPlace">
        <el-input v-model="ruleForm.goodsPrice" placeholder="销售价格"></el-input>
      </el-form-item>
      <el-form-item label="销售价:" prop="productionPlace">
        <el-input v-model="ruleForm.sellPrice" placeholder="销售价"></el-input>
      </el-form-item>
      <el-form-item label="库存警告:" prop="productionPlace">
        <el-input v-model="ruleForm.warnStockQty" placeholder="输入库存"></el-input>
      </el-form-item>
      <el-form-item label="招生对象" prop="minTargetAge">
        <el-input v-model="ruleForm.maxTargetAge" placeholder="请输入最小年龄" style="width:150px;"></el-input> 一一
        <el-input v-model="ruleForm.minTargetAge" placeholder="请输入最大年龄" style="width:150px;"></el-input>
      </el-form-item>
      <el-form-item label=" 是否上架:">
        <el-switch v-model="ruleForm.isTop"></el-switch>
      </el-form-item>
      <el-form-item label="排序码:">
        <el-input v-model="ruleForm.serialNo"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="submitForm('ProductAttr')">下一步,填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { validUsername } from "@/utils/validate";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const getCheckLength = (rule, value, callback) => {
      if (this.getCheckedClassId().length == 0) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const getCheckTagsLength = (rule, value, callback) => {
      if (this.getCheckedTagsId().length == 0) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    return {
      list2: [],
      checkList2: null,
      list3: [],
      checkList3: [],
      getTaglist: [],
      getCheckedTaglist: [],
      ruleForm: {},
      // 校验
      rules: {
        goodsName: [{ required: true, trigger: "blur", validator: validateUsername }],
        goodsBrief: [{ required: true, trigger: "blur", validator: validateUsername }],
        keyWords: [{ required: true, trigger: "blur", validator: validateUsername }],
        minTargetAge: [{ required: true, trigger: "blur", validator: validateUsername }],

        checkLength: [{ required: true, trigger: "blur", validator: getCheckLength }],
        isTop: [{ required: true, trigger: "blur", validator: validateUsername }],
        sortnumber: [{ required: true, trigger: "blur", validator: validateUsername }],
        productionPlace: [{ required: true, trigger: "blur", validator: validateUsername }],
        checkTagsLength: [{ required: true, trigger: "blur", validator: getCheckTagsLength }],
      }
    };
  },
  mounted() {
    if (this.$route.query.Id) {
      this.getTreeList()

      this.axios.get(this.Global.BASE_URL + `/goods/${this.$route.query.Id}`).then(response => {
        if (response.data.status == 200) {
          this.ruleForm = response.data.data
          let arr3 = []
          this.ruleForm.categories.forEach(element => {
            if (element.levelNo == 2) {
              this.checkList2 = element.id
            }
            if (element.levelNo == 3) {
              arr3.push(element)
            }
          })


          this.list3 = arr3
          this.checkList3 = arr3

          this.getTaglist = this.ruleForm.tags
          this.getCheckedTaglist = this.ruleForm.tags



        }
      })
    } else {
      //新增
      this.getTreeList()
    }
  },
  methods: {
    getTreeList() {
      this.axios.get(this.Global.BASE_URL + "/category/2?page=0&size=10&type=0").then(response => {
        if (response.data.status == 200) {
          this.list2 = response.data.data
        }
      })
    },
    getClass2Data(data) {


      this.checkList3 = []
      this.axios.get(this.Global.BASE_URL + `/category/${data.id}?page=0&size=10&type=0`).then(response => {
        if (response.data.status == 200) {
          this.list3 = response.data.data
        }
      })
    },

    getClass3Data(data) {
      console.log(this.checkList3)

      let list = JSON.parse(JSON.stringify(this.checkList3))
      let arr = []
      list.forEach(element => {
        element.tags.forEach(e => {
          arr.push(e)
        })
      });
      this.getTaglist = arr
    },
    //获取所有选中的类id
    getCheckedClassId() {
      let list = JSON.parse(JSON.stringify(this.checkList3))
      let arr = []
      for (var i = 0; i < list.length; i++) {
        arr.push({ id: list[i].id })
      }
      return arr
    },
    //获取所有选中的标签id
    getCheckedTagsId() {
      var list = this.getCheckedTaglist
      let arr = []
      for (var i = 0; i < list.length; i++) {
        arr.push({ tagId: list[i].tagId })
      }
      return arr
    },

    // 下一步
    submitForm(tabItem) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let goodsParamer = {
            goodsName: this.ruleForm.goodsName,
            goodsBrief: this.ruleForm.goodsBrief,
            keyWords: this.ruleForm.keyWords,
            productionPlace: this.ruleForm.productionPlace,
            sellPrice: this.ruleForm.sellPrice,
            goodsPrice: this.ruleForm.goodsPrice,
            warnStockQty: this.ruleForm.warnStockQty,
            minTargetAge: this.ruleForm.minTargetAge,
            maxTargetAge: this.ruleForm.maxTargetAge,
            serialNo: this.ruleForm.serialNo,
            isTop: this.ruleForm.isTop,
            isBest: true,
            isNew: true,
            isHot: true,
            isPromote: true,
            categories: this.getCheckedClassId(),
            tags: this.getCheckedTagsId(),
            goodsDesc: this.ruleForm.goodsDesc,
            galleries: this.ruleForm.galleries,
            goodsAttributes: this.ruleForm.goodsAttributes,
          }
          this.$store.commit('changeProductBaseData', JSON.stringify(goodsParamer));
          this.$parent.tabChange(tabItem)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.cell {
  text-align: center;
}
.el-table i {
  font-size: 20px;
}
.el-table a {
  color: #409eff;
}
</style>



