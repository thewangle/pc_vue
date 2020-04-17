<template>
  <div class="wrap">
    <div class="tab">
      <div class="addB">新增{{ tab_biao }}</div>
      <div class="biao">
        <span>用户名<span style="color:red;">*</span></span>
        <el-input
          placeholder="请输入用户名"
          v-model="username">
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>密码<span style="color:red;">*</span></span>
        <el-input
          placeholder="请输入密码"
          v-model="password">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>{{ tab_biao }}名称<span style="color:red;">*</span></span>
        <el-input
          :placeholder="'请输入' + tab_biao + '名称'"
          v-model="department">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>管理员<span style="color:red;">*</span></span>
        <el-input
          placeholder="请输入管理员名称"
          v-model="adminname">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>电话<span style="color:red;">*</span></span>
        <el-input
          placeholder="请输入管理员电话"
          v-model="phone">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <el-button class="submit" :loading="loading" type="primary" @click.native.prevent="handleLogin">注 册</el-button>
    </div>
    <!-- 使用说明 -->
    <drawer title="添加账号页 - 使用说明" :visible.sync='dialogVisible' width="500px" close-on-click-modal>
      <div class="smWrap">
        <div class="smB">概述：此页为添加账号功能页</div>
        <div class="smContent">
          <span class="smContentB">字段说明：</span>
          <div class="smContentC">
            <div>1."用户名"：该账号的用户名，用于登录(必填)</div>
            <div>2."名称"：该账号的电话，用于经营分析、列表等的展示(必填)</div>
            <div>3."密码"：该账号的密码，用于登录(必填)</div>
            <div>4."管理员"：该账号的管理员(必填)</div>
            <div>5."电话"：该账号的联系电话(必填)</div>
          </div>
        </div>
        <div class="smContent">
          <span class="smContentB">备注：</span>
          <div class="smContentC">
            <div>1.带"*"均为必填项</div>
            <div>2."商场级别"的账号可以创建"部门级别"的账号，"部门级别"的账号可以创建"柜组级别"的账号</div>
          </div>
        </div>
      </div>
    </drawer>
    <div class="hellpWrap" @click="dialogVisible = true" style="top: 100px;">
      <div class="hellpWrap1">
        <img src="../../assets/img/hellp.jpg" alt="" class="hellpImg">
        <span class="hellpB">使用帮助</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getUserName, getRoleId } from '@/utils/auth'
import moment from 'moment' //日期转换插件
import { addUser, getallUser } from '@/api/loginanduser' //请求函数
export default {
  name: 'registered',
  data() {
    return{
      dialogVisible: false,
      username: '',
      name: '',
      password: '',
      department: '',
      adminname: '',
      loading: false,
      allusers: [],
      phone: '',
      partantuser: getUserName(),
    }
  },
  mounted() {
    // 获取所有用户信息数据函数
    this._fetchUserList()
  },
  computed: {
    tab_biao() {
      if (getRoleId() == 0) {
        return '运营商'
      } else if (getRoleId() == 1) {
        return '部门'
      } else if (getRoleId() == 2) {
        return '柜组'
      }
    }
  },
  methods: {
    //注册新会员
    handleLogin() {
      //验证表单是否填写完整
      if (this.username == '' || this.password == '' || this.department == '' || this.adminname == '' || this.phone == '') {
        this.$message({
          message: '请您填写完整信息',
          type: 'warning'
        });
        return
      }
      if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
          this.$message({
            message: '请您输入正确的手机号格式！',
            type: 'warning'
          });
          return false; 
      } 
      //验证用户是否已经存在
      let is_by = true
      this.allusers.forEach((item,index) => {
        if (item.username == this.username) {
          this.$message({
            message: '对不起！该用户已存在！',
            type: 'warning'
          });
          is_by = false
        }
      })
      //验证通过后进行注册
      if (is_by) {
        let self = this
        let data = {
          username: self.username,
          password: self.password,
          department: self.department,
          adminname: self.adminname,
          partantuser: self.partantuser,
          phone: self.phone,
          addtime: moment(new Date()).add('days',365).format('YYYY-MM-DD HH:mm:ss')
        }
        addUser(data).then(res => {
          let { data } = res
          if (data.code == 200) {
            self.$message({
              message: '恭喜您！注册成功！',
              type: 'success'
            });
            self.$router.push({ path: '/user/userlist' })
          } else if(data.code == 202){
            self.$message({
              message: '该用户名已经存在！',
              type: 'warning'
            });
          } else {
            self.$message.error('对不起！注册失败！')
          }
        }).catch(error => {
          self.$message.error('对不起！注册失败！')
        })
      }
    },
    // 获取所有用户信息数据函数
    async _fetchUserList() {
      getallUser().then(res => {
        let { data } = res
        if (data.code == 200) {
          this.allusers = data.data
          // console.log(this.allusers)
        }
        if (data.code == 201) {
          console.log('获取失败')
        }
      }).catch(error => {
        console.log('获取失败')
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab {
  width: 50%;
  height: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 40px;
}
.biao {
  width: 60%;
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.biao span {
  width: 120px;
  text-align: left;
  font-size: 15px;
}
.submit {
  width: 60%;
  text-align: center;
  margin-top: 30px;
}
.num_tag {
  position: absolute;
  right: 30px;
  top: 40px;
}
</style>
