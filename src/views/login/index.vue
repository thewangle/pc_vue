<template>
  <div class="login-container">
    <canvas id="cas" position="absolute" z-index="-1"></canvas>
    <section class="login_Img">
      <div class="form-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username" class="animated bounceInLeft">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              @focus="btHover"
              @blur="btblur"
              id="usernameInp"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password" class="animated bounceInRight">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              @focus="btHover1"
              @blur="btblur1"
              id="usernameInp1"
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

          <el-checkbox v-model="user_record" class="animated bounceInUp" style="margin-bottom:20px;">记住密码</el-checkbox>

          <el-button :loading="loading" type="primary" class="animated bounceInDown" style="width:100%;background: transparent;" @click.native.prevent="handleLogin">{{ logins }}</el-button>
          <!-- <div class="add_new_user" @click="add_new_users">注册新用户</div> -->

        </el-form>
      </div>
    </section>

  </div>
</template>

<script>
import $ from 'jquery'
import { login } from './../../service/common'
import axios from 'axios'
import { fetchRoleMenulist } from './../../service/role'
import moment from 'moment' //日期转换插件
import { loginByUsername, getuserinfoByusername} from '@/api/loginanduser' //请求函数
import { setUserInfo, getRoleId, setPassword, getPassword, setUserName, getUserName, removeUserName, removePassword } from '@/utils/auth'

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
      user_record: true,
      logins:'登录',
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
    this.getCookie()
    // this.getuser_name_pass()
    //背景粒子动画开始 ----------------------------------------------------------
    var canvas = document.getElementById("cas");
    var ctx = canvas.getContext("2d");
    resize();
    window.onresize = resize;
    function resize() {
        canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
    var RAF = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    // 鼠标活动时，获取鼠标坐标
    var warea = {x: null, y: null, max: 20000};
    window.onmousemove = function(e) {
        e = e || window.event;
        warea.x = e.clientX;
        warea.y = e.clientY;
    };
    window.onmouseout = function(e) {
        warea.x = null;
        warea.y = null;
    };
    // 添加粒子
    // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
    var dots = [];
    for (var i = 0; i < 100; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var xa = Math.random() * 2 - 1;
        var ya = Math.random() * 2 - 1;
        dots.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 6000
        })
    }
    // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
    setTimeout(function() {
        animate();
    }, 100);
    // 每一帧循环的逻辑
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
        var ndots = [warea].concat(dots);
        dots.forEach(function(dot) {
            // 粒子位移
            dot.x += dot.xa;
            dot.y += dot.ya;
            // 遇到边界将加速度反向
            dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
            dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
            // 绘制点
            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
            // 循环比对粒子间的距离
            for (var i = 0; i < ndots.length; i++) {
                var d2 = ndots[i];
                if (dot === d2 || d2.x === null || d2.y === null) continue;
                var xc = dot.x - d2.x;
                var yc = dot.y - d2.y;
                // 两个粒子之间的距离
                var dis = xc * xc + yc * yc;
                // 距离比
                var ratio;
                // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                if (dis < d2.max) {
                    // 如果是鼠标，则让粒子向鼠标的位置移动
                    if (d2 === warea && dis > (d2.max / 2)) {
                        dot.x -= xc * 0.03;
                        dot.y -= yc * 0.03;
                    }
                    // 计算距离比
                    ratio = (d2.max - dis) / d2.max;
                    // 画线
                    ctx.beginPath();
                    ctx.lineWidth = ratio / 2;
                    ctx.strokeStyle = 'rgba(255,255,255,' + (ratio + 0.2) + ')';
                    ctx.moveTo(dot.x, dot.y);
                    ctx.lineTo(d2.x, d2.y);
                    ctx.stroke();
                }
            }
            // 将已经计算过的粒子从数组中删除
            ndots.splice(ndots.indexOf(dot), 1);
        });
        RAF(animate);
    }
    //背景粒子动画结束 ----------------------------------------------------------
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    //动画特效
    btHover() {
      $('#usernameInp').addClass('animated jello')
    },
    btblur() {
      $('#usernameInp').removeClass('animated jello')
    },
    btHover1() {
      $('#usernameInp1').addClass('animated jello')
    },
    btblur1() {
      $('#usernameInp1').removeClass('animated jello')
    },
    //通过cookie.js的方式获取username和password
    getuser_name_pass() {
      this.loginForm.username = this.getUserName()
      this.loginForm.password = this.getPassword()
    },
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
    //注册新用户
    add_new_users() {
      this.$router.push({ path: '/registered' })
    },
    //登陆
    handleLogin() {
      if (this.user_record) {
        this.setCookie(this.loginForm.username, this.loginForm.password, 7);
        //利用cookie.js的方式
        // this.setUserName(this.loginForm.username)
        // this.setPassword(this.loginForm.password)
      }else{
        this.clearCookie();
        //利用cookie.js的方式
        // this.removeUserName()
        // this.removePassword()
      }
      this.$refs.loginForm.validate(async valid => {
        let self = this
        if (valid) {
          let user = {
            username: this.loginForm.username
          }
          getuserinfoByusername(user).then(res => {
            let { data } = res
            if (data.code == 200) {
              let nowtime = moment(new Date()).valueOf()
              let usertime = moment(data.data.addtime).valueOf()
              if (data.data.role != 0 && usertime < nowtime) {
                this.$message({
                  type: 'warning',
                  message: '您的账号已经到期，请联系管理员！'
                });
              } else {
                this.loading = true
                this.logins='登录中...'
                const { username, password } = this.loginForm
                let data = {
                  username: username,
                  password: password
                }
                loginByUsername(data).then(res => {
                  let { data } = res
                  if (data.code == 200) {
                    setUserInfo(data.data)
                    this.loading = false
                    this.logins='登录'
                    this.$router.push({ path: '/' })
                  }
                  if (data.code == 201) {
                    self.$message(data.message)
                    setTimeout(function() {
                      self.loading = false
                      self.logins='登录'
                    },3000)
                  }
                  
                }).catch(error => {
                  this.$message(error.message)
                })
              }
            }
            if (data.code == 201) {
              this.$message({
                message: '账号名或密码错误！',
                type: 'warning'
              });
            }
          }).catch(error => {
            this.$message(error.message)
          })
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
        caret-color: white;
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
.add_new_user {
  color:#1a6ceb;
  text-align:center;
  padding: 5px 0;
  font-size: 14px;
  cursor:pointer;
}
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("./img/bg1.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  .login_Img {
    position: absolute;
    width: 754px;
    height: 535px;
    background:rgba(0,0,0,0);
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
      background: #35394a;
      background: linear-gradient(230deg, rgba(53, 57, 74, 0) 0%, rgb(0, 0, 0) 100%);
      box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
      position: absolute;
      left: 200px;
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
