<template>
  <div class="login-container">
    <bg />
    <img v-if="logo" :src="logo" style="width:50px;height:50px;position:absolute;left:15px;top:15px;">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">

      <div class="title-container">

        <h3 class="title">ICAMP</h3>

      </div>
      <el-form-item prop="username">
        <span class="svg-container" style="position: absolute;left: 10px;top: 5px;z-index: 1212;">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="off" clearable/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container" style="position: absolute;left: 10px;top: 5px;z-index: 1212;">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="off" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="getPublicKey">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import icamp from '@/assets/icamp.png'
import bg from "./bg";
import { validUsername } from "@/utils/validate";
import { startLoading } from "@/main";
import JSEncrypt from "jsencrypt/bin/jsencrypt"; //rsa
import md5 from "js-md5"; //md5
export default {
  name: "Login",
  components: {
    bg
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error("The password can not be less than 0digits"));
      } else {
        callback();
      }
    };
    return {
      logo: icamp,
      publicKey: "", //公钥
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    //  rsa加密
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 获取公钥
    getPublicKey() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.axios.get(this.Global.BASE_URL + "/admin/rsa", {            params: { username: this.loginForm.username }, isLoading: false
          }).then(response => {
            if (response.status == 200) {
              console.log(response)
              this.publicKey = response.data.data.public_key
              this.handleLogin()
            }
          }).catch(response => {
            this.loading = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登陆
    handleLogin() {
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(this.publicKey);
      let timestamp = new Date().valueOf();
      let val = md5(this.loginForm.username + md5(this.loginForm.password)) + timestamp
      console.log(md5(this.loginForm.username + md5(this.loginForm.password)))
      let pwd = encryptor.encrypt(val)
      let parameter = {
        "username": this.loginForm.username,
        "password": pwd,
        "remember-me": true
      }
      this.axios.post(this.Global.BASE_URL + "/admin/login", parameter, { isLoading: false }).then(response => {
        console.log(response)
        if (response.data.status == 200) {
          localStorage.setItem("baseUser", JSON.stringify(response.data.data));
          this.$store.commit('changeLogin', JSON.stringify(response.data.data));
          this.loading = false;
          this.$router.push({ path: "/dashboard" });
          } else {
            this.$notify.error({ title: '错误',message: response.data});
            this.loading = false;
        }
      }).catch(response => {
        this.loading = false;
      });

    }
  }
};
</script>

<style lang="scss">
// /* 修复input 背景不协调 和光标变色 */
// /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$cursor: #fff;
$bg: rgb(20, 26, 72);
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
    caret-color: $cursor;
    padding-left: 35px;
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
