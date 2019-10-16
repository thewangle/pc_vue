<template>
  <div class="wrap">
    <div class="tab">
      <div class="addB">新增商品</div>
      <div class="biao" style="padding:0;justify-content: space-between;">
        <div class="biao">
          <span>商品名称<span style="color:red;">*</span></span>
          <el-input
            prefix-icon="el-icon-share"
            placeholder="请输入商品名称"
            v-model="name" style="width:60%;">
          </el-input>
        </div>
        <div class="biao">
          <span>商品编码</span>
          <el-input
            placeholder="请输入商品编码"
            prefix-icon="el-icon-share"
            v-model="code" style="width:60%;">
          </el-input>
        </div>
      </div>
      <div class="biao" style="padding:0;">
        <div class="biao">
          <span>商品分类</span>
          <el-select v-model="sort" placeholder="请选择商品分类" style="width:60%;">
            <el-option
              v-for="item in sorts"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="biao">
          <span>供应商</span>
          <el-select v-model="supplier" placeholder="请选择供应商" style="width:60%;">
            <el-option
              v-for="item in suppliers"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="biao" style="padding:0;">
        <div class="biao">
          <span>商品规格</span>
          <el-input
            placeholder="请输入商品规格"
            style="width:60%;"
            prefix-icon="el-icon-edit-outline"
            v-model="format">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </div>
        <div class="biao">
          <span>商品数量</span>
          <el-input
            style="width:60%;"
            placeholder="请输入商品数量"
            prefix-icon="el-icon-edit-outline"
            v-model="nums">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </div>
      </div>
      <div class="biao" style="padding:0;">
        <div class="biao">
          <span>库存上线</span>
          <el-input
            placeholder="请输入商品库存上线"
            style="width:60%;"
            prefix-icon="el-icon-edit"
            v-model="maxnums">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </div>
        <div class="biao">
          <span>库存下线</span>
          <el-input
            placeholder="请输入商品库存下线"
            style="width:60%;"
            prefix-icon="el-icon-edit"
            v-model="minnums">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </div>
      </div>
      <div class="biao" style="padding:0;">
        <div class="biao">
          <span>商品进价</span>
          <el-input
            placeholder="请输入商品进价"
            style="width:60%;"
            prefix-icon="el-icon-edit-outline"
            v-model="inprice">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </div>
        <div class="biao">
          <span>商品售价</span>
          <el-input
            placeholder="请输入商品售价"
            style="width:60%;"
            prefix-icon="el-icon-edit-outline"
            v-model="outprice">
            <i slot="prefix" class="el-icon-s-goods"></i>
          </el-input>
        </div>
      </div>
      <div class="biao">
        <span>商品描述</span>
        <el-input
          type="textarea"
          style="width:80%;"
          :rows="2"
          placeholder="请输入商品描述"
          v-model="remark">
        </el-input>
      </div>
      <el-button class="submit" :loading="loading" type="primary" @click.native.prevent="handleLogin">确 认</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth' //获取角色相关
import moment from 'moment' //日期转换插件
import { getSortinfoall } from '@/api/sort' //获取分类
import { getSupplierall } from '@/api/supplier' //获取供应商
import { addGoods } from '@/api/goods' //商品请求函数
export default {
  name: 'registered',
  data() {
    return{
      inprice: '',
      outprice: '',
      maxnums: '',
      minnums: '',
      nums: '',
      format: '',
      code: '',
      sort: '',
      sorts: [],
      supplier: '',
      suppliers: [],
      name: '',
      remark: '',
      loading: false
    }
  },
  mounted() {
    this.getsortinfoall() //获取该id下分类
    this.getsupplierall() //获取改id下供应商
  },
  computed: {
    
  },
  methods: {
    //根据用户id获取分类
    getsortinfoall() {
      let params = {
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      }
      getSortinfoall(params).then(res => {
        let { data } = res
        data.forEach((item) => {
          this.sorts.push({value: item.id,label: item.name})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //根据用户id获取供应商
    getsupplierall() {
      let params = {
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      }
      getSupplierall(params).then(res => {
        let { data } = res
        data.forEach((item) => {
          this.suppliers.push({value: item.id,label: item.name})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //添加新供应商
    handleLogin() {
      //验证表单是否填写完整
      if (this.name == '' || this.inprice == '' || this.outprice == '' || this.nums == '' || this.format == '' || this.sort == '' || this.supplier == '') {
        this.$message({
          message: '请您填写完整信息',
          type: 'warning'
        });
        return
      }
      let is_num = /^\+?[1-9][0-9]*$/
      if (!is_num.test(this.nums) || !is_num.test(this.maxnums) || !is_num.test(this.minnums)) {
        this.$message({
          message: '请您输入正确的数量',
          type: 'warning'
        });
        return
      }
      if (Number(this.maxnums) < Number(this.minnums)) {
        this.$message({
          message: '库存上线不得小于库存下线',
          type: 'warning'
        });
        return
      }
      if (Number(this.outprice) < Number(this.inprice)) {
        this.$message({
          message: '售价不得小于进价',
          type: 'warning'
        });
        return
      }
      //验证用户是否已经存在
      let is_by = true
      //验证通过后进行注册
      if (is_by) {
        let self = this
        let data = {
          name: self.name,
          inprice: self.inprice,
          outprice: self.outprice,
          remark: self.remark,
          uid: getUserid(),
          pid: getpartantId(),
          maxnums: self.maxnums,
          minnums: self.minnums,
          nums: self.nums,
          format: self.format,
          code: self.code,
          sort: self.sort,
          supplier: self.supplier,
          role: getRoleId(),
          code: self.code
        }
        addGoods(data).then(res => {
          let { data } = res
          if (data.code == 200) {
            self.$message({
              message: '恭喜您！添加商品成功！',
              type: 'success'
            });
            self.$router.push({ path: '/goods/goodslist' })
          } else {
            self.$message.error('对不起！添加商品失败！')
          }
        }).catch(error => {
          self.$message.error('对不起！添加商品失败！')
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
  width: 80%;
  /*height: 70%;*/
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
  align-items: center;
}
.biao span {
  width: 80px;
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
