<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.agent_name" placeholder="请输入代理商/运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-date-picker
        v-model="listQuery.dateValue"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      />

      <el-select v-model="listQuery.agent_type" placeholder="全部代理" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in status" :key="item.key" :label="item.label" :value="item.key"/>
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
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动场次" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.act_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总计价格(元)" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.total_price / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row, 'info')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogInfoVisible" title="财务统计查看" custom-class="count-dialog" :close-on-click-modal="false">
      <el-table :data="gridData" border fit highlight-current-row>
        <el-table-column label="活动名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动次数">
          <template slot-scope="scope">
            <span>{{ scope.row.act_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="170px">
          <template slot-scope="scope">
            <span>{{ scope.row.set_start_time | timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="170px">
          <template slot-scope="scope">
            <span>{{ scope.row.set_stop_time | timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动价(元)">
          <template slot-scope="scope">
            <span>{{ scope.row.price / 100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_type | payTypeFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="dilogQuery.page_no"
          :total="dialogTotal"
          background
          layout="total, prev, pager, next, jumper"
          @current-change="handledialogCurrentChange"/>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCountList, fetchpayList } from './../../service/count'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Show',
  directives: {
    waves
  },
  filters: {
    timeFilter(timestamp) {
      if (+timestamp === 0) {
        return '无'
      }
      var date = new Date(timestamp * 1000)// 如果date为10位不需要乘1000
      var Y = date.getFullYear() + '-'
      var M = (+date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (+date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      var h = (+date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (+date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (+date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    },
    payTypeFilter(type) {
      if (type === '1') {
        return '微信'
      }
      if (type === '4') {
        return '余额'
      }
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page_no: 1,
        page_size: 20,
        agent_name: '',
        agent_type: '',
        dateValue: [],
        start_time: '',
        end_time: ''
      },
      dialogTotal: null,
      dilogQuery: {
        page_no: 1,
        page_size: 10,
        agent_id: ''
      },
      status: [{ label: '代理商', key: 1 }, { label: '运营商', key: 2 }],
      dialogInfoVisible: false,
      gridData: []
    }
  },
  created() {
    const sTime = (new Date()).getTime() - 30 * 24 * 60 * 60 * 1000
    const eTime = (new Date()).getTime()
    this.listQuery.start_time = sTime
    this.listQuery.end_time = eTime
    this.listQuery.dateValue = [sTime, eTime]
    this._fetchCountList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page_no = 1
      this._fetchCountList()
    },
    handleSizeChange(val) {
      this.listQuery.page_size = val
      this._fetchCountList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchCountList()
    },
    handledialogCurrentChange(val) {
      this.dilogQuery.page_no = val
      this._fetactlist()
    },
    handleUpdate(row, type) {
      this.dilogQuery.agent_id = row.id
      if (type === 'info') {
        this.dialogInfoVisible = true
      }
      this._fetactlist()
    },
    async _fetactlist() {
      const stime = this.listQuery.dateValue[0] || (new Date()).getTime() - 30 * 24 * 60 * 60 * 1000
      const etime = this.listQuery.dateValue[1] || (new Date()).getTime()
      const param = Object.assign({}, this.dilogQuery)
      param.start_time = Math.floor(stime / 1000)
      param.end_time = Math.floor(etime / 1000)
      try {
        const res = await fetchpayList(param)
        this.gridData = res.data.data
        this.dialogTotal = res.data.total
      } catch (e) {}
    },
    async _fetchCountList() {
      const stime = this.listQuery.dateValue[0] || (new Date()).getTime() - 30 * 24 * 60 * 60 * 1000
      const etime = this.listQuery.dateValue[1] || (new Date()).getTime()
      this.listQuery.start_time = Math.floor(stime / 1000)
      this.listQuery.end_time = Math.floor(etime / 1000)
      const param = Object.assign({}, this.listQuery)
      param.agent_type = param.agent_type || 0
      try {
        const res = await fetchCountList(param)
        this.list = res.data.data
        this.total = res.data.total
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss">
.el-date-editor {
  vertical-align: top;
}
.fixed-width .el-button--mini {
  padding: 7px 0;
  text-align: center;
}
// .count-dialog .el-dialog__body {
//   max-height: 600px;
//   overflow-y: auto;
// }
.count-dialog.el-dialog, .count-dialog .el-dialog__body{
  width: 900px;
}
</style>
