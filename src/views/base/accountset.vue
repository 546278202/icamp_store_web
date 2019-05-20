<template>
  <div class="dashboard-container">
    <div style="display:flex;justify-content: center;align-items: center;margin-bottom:35px;flex-direction: column;color:#969696;">
      <div
        style="height:150px;width:150px;background:#f1f1f1;border-radius:50%;display:flex;justify-content: center;align-items: center;"
      >
        <i class="el-icon-upload" style="font-size:65px;" />
      </div>
      <div style="width:150px;text-align: center;margin-top: 15px;">上传头像</div>
    </div>
    <el-form
      ref="ruleForm2"
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model.number="ruleForm2.account" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model.number="ruleForm2.email" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm2.pass" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm2.checkPass" type="password" auto-complete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '',
      ruleForm2: {
        account: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules2: {
        account: [{ required: true, validator: checkAccount, trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid) {
          console.log(valid)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
.dashboard-container {
  padding: 32px;
  position: relative;
}
</style>
