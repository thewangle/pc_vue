<template>
  <section class="demo">
    <header>
      <h1>为了更好的协助各级代理商和运营商进行市场推广，平台提供不同活动类型的演示版本</h1>
      <h4>注：演示版活动可以重复举办，但是演示活动中的题目是平台内置的</h4>
    </header>
    <div class="demo-container">
      <ul class="demo-list">
        <li>
          <div class="img-haeder">
            <h5>团队版演示活动二维码</h5>
          </div>
          <div class="img-div">
            <img :src="list[0] && list[0].qcode_url" alt="">
          </div>
          <div class="btn-div">
            <el-button type="primary" :disabled="!!(list[0] && list[0].qcode_url)" @click="handleCreateDemoAct(1)">获取活动二维码</el-button>
          </div>
          <div class="btn-div" style="margin-top: 20px">
            <a :href="'/i/topteam/admin/downloadqrcode?act_id='+list[0].id" :disabled="!(list[0] && list[0].qcode_url)">导出活动二维码</a>
          </div>
        </li>
        <li>
          <div class="img-haeder">
            <h5>特殊版演示活动二维码</h5>
          </div>
          <div class="img-div">
            <img :src="list[1] && list[1].qcode_url" alt="">
          </div>
          <div class="btn-div">
            <el-button type="primary" :disabled="!!(list[1] && list[1].qcode_url)" @click="handleCreateDemoAct(2)">获取活动二维码</el-button>
          </div>
          <div class="btn-div" style="margin-top: 20px">
            <a :href="'/i/topteam/admin/downloadqrcode?act_id='+list[1].id" :disabled="!(list[1] && list[1].qcode_url)">导出活动二维码</a>
          </div>
        </li>
        <li>
          <div class="img-haeder">
            <h5>个人版演示活动二维码</h5>
          </div>
          <div class="img-div">
            <img :src="list[2] && list[2].qcode_url" alt="">
          </div>
          <div class="btn-div">
            <el-button type="primary" :disabled="!!(list[2] && list[2].qcode_url)" @click="handleCreateDemoAct(3)">获取活动二维码</el-button>
          </div>
          <div class="btn-div" style="margin-top: 20px">
            <a :href="'/i/topteam/admin/downloadqrcode?act_id='+list[2].id" :disabled="!(list[2] && list[2].qcode_url)">导出活动二维码</a>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog :close-on-click-modal="false" title="创建测试教练" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="agentInfo" label-position="right" label-width="120px">
        <el-form-item label="教练姓名">
          <el-input v-model="agentInfo.contacts" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="agentInfo.username" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="agentInfo.phone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateCoach">保存</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getDemoActList, createDemoAct } from './../../service/activity'
import { addCoach } from './../../service/info'
export default {
  data() {
    return {
      list: [],
      agentInfo: {
        contacts: '',
        username: '',
        phone: ''
      },
      coachId: '',
      dialogFormVisible: false
    }
  },
  methods: {
    handleClose() {
      this.agentInfo = {
        contacts: '',
        username: '',
        phone: ''
      }
      this.dialogFormVisible = false
    },
    async handleCreateCoach() {
      try {
        const res = await addCoach(this.agentInfo)
        this.$message({
          message: '创建测试教练成功',
          type: 'success'
        })
        this.coachId = res.data
        this.handleClose()
      } catch (e) {
        console.log(e)
      }
    },
    handleCreateDemoAct(type) {
      this._createDemoAct(type)
    },
    async _createDemoAct(type) {
      if (!this.coachId && type !== 3) {
        this.$message({ message: '请先创建测试教练', type: 'error' })
        this.dialogFormVisible = true
        return
      }
      const res = await createDemoAct({
        coach_id: this.coachId || 0,
        type
      })
      console.log(res)
      this._getDemoActList()
    },
    async _getDemoActList () {
      const list = await getDemoActList()
      this.coachId = list.data.coach_id
      this.list = list.data.list
    }
  },
  mounted() {
    this._getDemoActList()
  },
}
</script>

<style lang="scss">
  .demo h1 {
    margin-top: 40px;
    padding: 0 40px;
    text-align: center;
    font-weight: normal;
    font-size: 22px;
  }
  .demo h4 {
    font-size: 18px;
    color: #ccc;
    text-align: center;
    font-weight: normal;
  }
  .demo-container {
    margin-top: 30px;
  }

  .img-haeder {
    text-align: center;
  }

  .demo-list li {
    width: 33%;
    height: 100px;
    list-style-type: none;
    float: left;
  }
  .img-div {
    text-align: center;
    img {
      display: inline-block;
      margin: 0;
      height: 100px;
      width: 100px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }
  }
  .btn-div {
    text-align: center;
  }
</style>

