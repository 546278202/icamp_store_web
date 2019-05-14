
<template>
  <div class="dashboard-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="营会主标题:" prop="name">
        <el-input v-model="ruleForm.title" placeholder="请输入主标题"></el-input>
      </el-form-item>
      <el-form-item label="营会副标题:" prop="name">
        <el-input v-model="ruleForm.title" placeholder="请输入副标题"></el-input>
      </el-form-item>
      <el-form-item label="营会类型" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="国内营" name="type"></el-checkbox>
          <el-checkbox label="海外营" name="type"></el-checkbox>
          <el-checkbox label="亲子营" name="type"></el-checkbox>
          <el-checkbox label="研学营" name="type"></el-checkbox>
          <el-checkbox label="科技营" name="type"></el-checkbox>
          <el-checkbox label="线下活动" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label=" 营会地点:" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择区域">
          <el-option label="北京" value="shanghai"></el-option>
          <el-option label="上海" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=" 招生对象:" prop="old">
        <el-input v-model="ruleForm.minOld" style="width:180px;" placeholder="请输入最小年龄"></el-input>～
        <el-input v-model="ruleForm.maxOld" style="width:180px;" placeholder="请输入最大年龄"></el-input>
      </el-form-item>

      <el-form-item label=" 项目标签:" prop="region">
        <el-tag type="success" style="margin-right:10px;">亲子营</el-tag>
        <el-tag type="success" style="margin-right:10px;">综合营</el-tag>
        <el-tag type="info">科技营</el-tag>
      </el-form-item>

      <el-form-item label=" 家长陪同:" prop="parent">
        <el-switch v-model="ruleForm.parent"></el-switch>
      </el-form-item>
      <el-form-item label=" 是否上架:" prop="parent">
        <el-switch v-model="ruleForm.uppershelf"></el-switch>
      </el-form-item>
      <el-form-item label=" 是否置顶:" prop="parent">
        <el-switch v-model="ruleForm.isTop"></el-switch>
      </el-form-item>

      <el-form-item label="模块展示" prop="parent">
        <el-checkbox-group v-model="ruleForm.checkList">
          <el-checkbox label="热门" name="type"></el-checkbox>
          <el-checkbox label="推荐" name="type"></el-checkbox>
          <el-checkbox label="新品" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="排序吗:" prop="sortnumber">
        <el-input v-model="ruleForm.sortnumber" style="width:180px;"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        minOld: "",
        maxOld: "",
        parent: true,
        uppershelf: false,
        isTop: true,
        checkList: ["热门", "推荐"],
        sortnumber: "ewrtyyjhgbv222",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [true, false, false],
        resource: "",
        desc: ""
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        old: [{ required: true }],
        parent: [{ required: true }],
        sortnumber: [
          { required: true, message: "请输入排序吗", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入备注名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],

        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$router.push({ path: "/shop/addshop2" });
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       alert("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
      // },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  position: relative;
}
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

