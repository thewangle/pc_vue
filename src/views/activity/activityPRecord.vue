<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.agent_name" placeholder="请输入运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" placeholder="请输入活动名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="请选择活动类型" style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in activities" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.person_coach" placeholder="是否指定教练" clearable style="width: 200px" class="filter-item" @change="handleFilter" >
        <el-option key="1" label="是" value="1"/>
        <el-option key="2" label="否" value="2"/>
      </el-select>
      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agent_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏类型" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | activityFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.set_start_time | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.set_stop_time | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="玩家数量" class-name="status-col" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.player_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleShowDetial(scope.row)">查看</el-button>
          <el-button size="small">
            <a :href="'/i/topteam/admin/exporttask?activity_id='+scope.row.id">下载任务</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogInfoVisible" title="活动详情查看" custom-class="detaildialog">
      <el-table :data="gridData" border fit highlight-current-row>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动名称">
          <template slot-scope="scope">
            <span>{{ scope.row.act_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="玩家昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务用时" width="170px">
          <template slot-scope="scope">
            <span>{{ scope.row.use_time | filterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成任务数" width="170px">
          <template slot-scope="scope">
            <span>{{ scope.row.task_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成任务百分比" width="130px">
          <template slot-scope="scope">
            <span>{{ scope.row.task_rate }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="得分">
          <template slot-scope="scope">
            <span>{{ scope.row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="dilogQuery.page_no"
        :total="dialogTotal"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handledialogCurrentChange"/>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, getactteamloginfo } from './../../service/activity'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'AtivityPRecord',
  directives: {
    waves
  },
  filters: {
    activityFilter(status) {
      const activityMap = {
        1: '团队-基础版',
        2: '个人-基础版'
      }
      return activityMap[status]
    },
    timeFilter(timestamp) {
      var date = new Date(timestamp * 1000)// 如果date为10位不需要乘1000
      var Y = date.getFullYear() + '-'
      var M = (+date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (+date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      var h = (+date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (+date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (+date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    },
    filterTime(time) {
      let h = parseInt(time / 3600)
      if (h < 10) h = '0' + h
      let m = parseInt((time / 60) % 60)
      if (m < 10) m = '0' + m
      let s = parseInt(time % 60)
      if (s < 10) s = '0' + s
      return h + ':' + m + ':' + s
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10,
        type: 2,
        agent_name: undefined,
        name: undefined,
        status: 5,
        act_log: 1,
        person_coach: null
      },
      activities: [{ label: '个人-基础版', key: 2 }],
      dialogInfoVisible: false,
      gridData: [],
      dialogTotal: 0,
      dilogQuery: {
        page_no: 1,
        page_size: 10,
        act_id: ''
      }
    }
  },
  created() {
    this._fetchList()
  },
  methods: {
    handledialogCurrentChange(val) {
      this.dilogQuery.page_no = val
      this._fetchDetial()
    },
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchList()
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this._fetchList()
    },
    handleShowDetial(row) {
      this.dialogInfoVisible = true
      this.gridData = []
      this._fetchDetial(row.id)
    },
    async _fetchDetial(id) {
      id && (this.dilogQuery.act_id = id)
      const res = await getactteamloginfo(this.dilogQuery)
      const { data } = res
      this.gridData = data.list
      this.dialogTotal = +data.total
    },
    async _fetchList() {
      this.listLoading = true
      try {
        const res = await fetchList(this.listQuery)
        const { data } = res
        this.list = data.list
        this.total = data.total
      } catch (e) {}
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss">
.detaildialog.el-dialog, .detaildialog .el-dialog__body{
  width: 900px;
}
</style>

