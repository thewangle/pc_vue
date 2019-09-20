<template>
  <div class="wrap">
    <div class="tab">
      <div style="text-align:center;">新增供应商</div>
      <div class="biao">
        <span>供应商名称</span>
        <el-input
          placeholder="请输入供应商名称"
          v-model="name">
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>供应商地址</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入供应商地址"
          v-model="address">
        </el-input>
      </div>
      <div class="biao">
        <span>联系人</span>
        <el-input
          placeholder="请输入联系人"
          v-model="contact">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>电话</span>
        <el-input
          placeholder="请输入管理员电话"
          v-model="phone">
          <i slot="prefix" class="el-icon-s-goods"></i>
        </el-input>
      </div>
      <div class="biao">
        <span>备注</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入供应商备注"
          v-model="remark">
        </el-input>
      </div>
      <el-button class="submit" :loading="loading" type="primary" @click.native.prevent="handleLogin">确 定</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import moment from 'moment' //日期转换插件
import { addSupplier, getallUser } from '@/api/supplier' //请求函数
export default {
  name: 'registered',
  data() {
    return{
      name: '',
      address: '',
      contact: '',
      remark: '',
      loading: false,
      phone: ''
    }
  },
  mounted() {
    
  },
  computed: {
    
  },
  methods: {
    //添加新供应商
    handleLogin() {
      //验证表单是否填写完整
      if (this.name == '' || this.address == '' || this.contact == '' || this.phone == '') {
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
        let data = {
          name: self.name,
          address: self.address,
          contact: self.contact,
          remark: self.remark,
          uid: getUserid(),
          pid: getpartantId(),
          phone: self.phone
        }
        addSupplier(data).then(res => {
          let { data } = res
          if (data.code == 200) {
            self.$message({
              message: '恭喜您！注册成功！',
              type: 'success'
            });
            self.$router.push({ path: '/supplier/supplierlist' })
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
