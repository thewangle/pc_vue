<template>
  <div class="wrap">
    <div class="tab">
      <div class="addB">新增会员</div>
      <div class="biao">
        <span>会员姓名</span>
        <el-input
          placeholder="请输入会员姓名"
          v-model="name">
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>电话</span>
        <el-input
          placeholder="请输入会员电话"
          v-model="phone">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>会员生日</span>
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="biao">
        <span>会员性别</span>
        <el-radio v-model="sex" label="1">男</el-radio>
        <el-radio v-model="sex" label="2">女</el-radio>
      </div>
      <div class="biao">
        <span>会员描述</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入会员描述"
          v-model="description">
        </el-input>
      </div>
      <el-button class="submit" :loading="loading" type="primary" @click.native.prevent="handleLogin">添加会员</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import moment from 'moment' //日期转换插件
import { addMember, getallUser } from '@/api/member' //请求函数
export default {
  name: 'addMember',
  data() {
    return {
      name: '',
      birthday: '',
      sex: '1',
      description: '',
      phone: '',
      loading: false
    }
  },
  mounted() {
    
  },
  computed: {

  },
  methods: {
    //添加新会员
    handleLogin() {
      //验证表单是否填写完整
      if (this.name == '' || this.birthday == '' || this.description == '' || this.phone == '') {
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
      //验证通过后进行注册
      if (is_by) {
        let self = this
        let age = Math.round(parseInt((new Date()).getTime()/1000 - moment(self.birthday).valueOf()/1000)/31536000)
        let data = {
          name: self.name,
          birthday: moment(self.birthday).format('YYYY-MM-DD'),
          age: age,
          description: self.description,
          sex: self.sex,
          phone: self.phone,
          userid: getUserid(),
          userpartid: getpartantId()
        }
        addMember(data).then(res => {
          let { data } = res
          if (data.code == 200) {
            self.$message({
              message: '恭喜您！注册成功！',
              type: 'success'
            });
            self.$router.push({ path: '/member/memberlist' })
          } else if(data.code == 201){
            self.$message({
              message: '对不起！注册失败！',
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
  width: 100px;
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
