<template>
  <div class="dashboard-editor-container">
    <panel-group :info="info"/>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table @timeChange="handleGetNum" :num="teamNum"/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table type="player" @timeChange="handleGetNum" :num="playerNum" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
        <box-card @recharge="handleRecharge" :num="info.balance || 0"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'
import BoxCard from './components/BoxCard'
import { getSubAgentNum, getTeamActivityNum, getPersonActivityNum } from './../../../service/dashboard'

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
      playerNum: '0'
    }
  },
  created() {
    this._getSubAgentNum()
  },
  methods: {
    handleRecharge() {
      // TODO:应该是充值弹窗，暂无原型。
    },
    handleGetNum(val) {
      this._getTeamActivityNum(val)
    },
    // 获取首页信息
    async _getSubAgentNum() {
      const res = await getSubAgentNum()
      this.info = res.data
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

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
