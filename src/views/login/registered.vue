<template>
  <div class="wrap">
    <div class="tab">
      <div class="biao">新用户注册</div>
      <el-input
        placeholder="请输入用户名"
        v-model="username"
        class="biao">
        <i slot="prefix" class="el-icon-user-solid"></i>
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        class="biao">
        <i slot="prefix" class="el-icon-s-goods"></i>
      </el-input>
      <el-select v-model="member" placeholder="请选择会员级别" class="biao">
        <el-option
          v-for="item in members"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- <el-select v-model="user" placeholder="请选择上级会员" class="biao">
        <el-option
          v-for="item in users"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <el-button class="submit" :loading="loading" type="primary" @click.native.prevent="handleLogin">注 册</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'registered',
  data() {
    return{
      username: '',
      password: '',
      member: '',
      user: '',
      loading: false,
      members: [{
          value: '0',
          label: '至尊会员'
        }, {
          value: '1',
          label: '钻石会员'
        }, {
          value: '2',
          label: '黄金会员'
      }],
      users: [],
    }
  },
  mounted() {
    // this._fetchUserList()
  },
  methods: {
    //注册新会员
    handleLogin() {
      if (this.username == '' || this.password == '' || this.member == '') {
        this.$message('请您填写正确信息')
      }
      let self = this
      let url = 'http://localhost/yii2/frontend/web/?r=login/adduser'
      let data = {
        username: this.username,
        password: this.password,
        role: this.member
      }
      axios.post(url,data).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.$message('恭喜您！注册成功！')
          this.$router.push({ path: '/login' })
        } else if(data.code == 202){
          this.$message('对不起！该用户已存在！')
        } else {
          this.$message('对不起！注册失败！')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取所有用户信息数据函数
    // async _fetchUserList() {
    //   let url = 'http://localhost/yii2/frontend/web/?r=login/getalluser'
    //   axios.post(url,this.listQuery).then(res => {
    //     let { data } = res
    //     if (data.code == 200) {
    //       console.log(data)
    //       data.data.forEach((item,index) => {
    //         this.users.push({value: item.partantid,label: item.username})
    //       })
    //     }
    //     if (data.code == 201) {
    //       console.log('获取失败')
    //     }
    //   }).catch(error => {
    //     console.log('获取失败')
    //   })
    // },
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
}
.biao {
  width: 60%;
  text-align: center;
  padding: 20px 0;
}
.submit {
  width: 60%;
  text-align: center;
  margin-top: 30px;
}
</style>
