<template>
  <div class="dashboard-editor-container">
    <panel-group :info="info"/>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table :num="teamNum" @timeChange="handleGetNum"/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table :num="playerNum" type="player" @timeChange="handleGetNum" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
        <box-card :num="info.balance || 0" @recharge="handleRecharge"/>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="账户充值" class="payDialog" @close="handleClose">
      <div style="height: 200px">
        <div style="float:left; width: 48%;">
          <el-form label-position="left">
            <el-form-item label="充值金额" label-width="100px">
              <el-input v-model="money" type="number" min="0" step="1" />
            </el-form-item>
            <el-form-item label="充值方式" label-width="100px">
              <el-radio v-model="payType" label="1">微信</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getPayOrder">确 定</el-button>
              <el-button type="success" @click="paySuccess">支付成功返回首页</el-button>
            </el-form-item>
            <el-form-item>
              <span><span>点击确定后扫描右侧二维码</span></span>
            </el-form-item>
          </el-form>
        </div>
        <div style="float: right; width: 50%; height: 100%;">
          <div style="height: 140px; width: 140px; margin: 0 auto;">
            <img :src="pay_er_url" style="height: 138px; width: 138px;" alt="">
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
import { getSubAgentNum, getTeamActivityNum, getPersonActivityNum } from './../../../service/dashboard'
import { creatOrder, getPayInfo } from './../../../service/activity'
import { getAgentId } from '@/utils/auth'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    TransactionTable,
    BoxCard
  },
  data() {
    return {
      info: {},
      teamNum: '0',
      playerNum: '0',
      dialogFormVisible: false,
      money: 0,
      payType: '1',
      pay_er_url: ''
    }
  },
  created() {
    this._getSubAgentNum()
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
      this.money = 0
      this.pay_er_url = ''
    },
    handleRecharge() {
      this.dialogFormVisible = true
    },
    handleGetNum(val) {
      this._getTeamActivityNum(val)
    },
    paySuccess() {
      this.handleClose()
      this._getSubAgentNum()
    },
    async getPayOrder() {
      const param = {}
      param.type_id = getAgentId()
      param.order_type = 'balance'
      param.money = this.money
      const res = await creatOrder(param)
      const { order_sn, order_type } = res.data
      this.pay_er_url = `/i/topteam/api/getpayinfo?order_sn=${order_sn}&pay_type=${this.payType}`
    },
    // 获取首页信息
    async _getSubAgentNum() {
      const res = await getSubAgentNum()
      this.info = res.data
      this.info.balance = this.info.balance / 100
    },
    async _getTeamActivityNum(data) {
      const { type, value } = data
      const param = {}
      param.start_time = Math.floor(value[0] / 1000)
      param.end_time = Math.floor(value[1] / 1000)
      if (type === 'team') {
        const res = await getTeamActivityNum(param)
        this.teamNum = res.data.num
      }
      if (type === 'player') {
        const res = await getPersonActivityNum(param)
        this.playerNum = res.data.num
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.clearfix::after {
  display: block;
  content: '';
  overflow: hidden;
  height: 0;
  clear: both;
}
.payDialog .el-dialog, .payDialog .el-dialog__body{
  width: 700px;
}
</style>
