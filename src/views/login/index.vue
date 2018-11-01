<template>
  <div class="login-container">
    <section class="login_Img">
      <h3 class="title">Mind Tower 印塔管理系统</h3>
      <div class="logo"/>
      <div class="form-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="passwordType"
              v-model="loginForm.password"
              placeholder="请输入密码"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>

          <el-checkbox v-model="user_record" style="margin-bottom:20px;">记住密码</el-checkbox>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ logins }}</el-button>

        </el-form>
      </div>
    </section>

  </div>
</template>

<script>
import { login } from './../../service/common'
import { fetchRoleMenulist } from './../../service/role'
import { setUserInfo, getRoleId } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入6位以上的密码'))
      } else {
        callback()
      }
    }
    return {
      user_record: false,
      logins:'登陆',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  mounted(){
    this.getCookie();
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        document.cookie = "userName=" + c_name + ";path=/;expires=" + exdate.toLocaleString()
        document.cookie = "userPwd=" + c_pwd + ";path=/;expires=" + exdate.toLocaleString()
    },
    //获取cookie
    getCookie: function() {
        if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            // console.log(arr)
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'userName') {
                    this.loginForm.username = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'userPwd') {
                    this.loginForm.password = arr2[1];
                }
            }
        }
    },
    //删除cookie
    clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      if (this.user_record) {
        this.setCookie(this.loginForm.username, this.loginForm.password, 7);
      }else{
        this.clearCookie();
      }
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          this.logins='登录中...'
          const { username, password } = this.loginForm
          try {
            const res = await login({ user_name: username, passwd: password })
            setUserInfo(res.data)
            this.loading = false
            this.logins='登录'
            this.$router.push({ path: '/' })
          } catch (e) {
            this.loading = false
            this.logins='登录'  
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray: #1a6ceb;
  $cursor: #000000;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 75%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #ccc inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: linear-gradient( 153deg, rgb(88,138,251) 0%, rgb(47,55,104) 100%);
  .login_Img {
    position: relative;
    width: 754px;
    height: 535px;
    background-image: url("./img/bg.png");
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      position: absolute;
      top: -50px;
      left: 20px;
      font-size: 26px;
      color: $light_gray;
      text-align: center;
      font-weight: bold;
      text-align: left;
    }
    .logo {
      position: absolute;
      width: 64px;
      height: 72px;
      top: 210px;
      left: 180px;
      background-image: url("./img/logo.png");
    }
    .form-container {
      width: 370px;
      height: 470px;
      background: #fff;
      position: absolute;
      left: 418px;
      top: 30px;
      border-radius: 10px;
    }
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 370px;
    padding: 35px 15px 15px 15px;
    margin: 80px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
}
</style>
