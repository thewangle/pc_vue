<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.dateValue"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
      />
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
      <el-table-column label="充值金额" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.money / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <span>{{ scope.row.pay_type | filteType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pay_time | timeFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchChargeList } from './../../service/count'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Recharge',
  directives: {
    waves
  },
  filters: {
    filteType(type) {
      if (type === '1') {
        return '微信'
      }
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
        dateValue: [],
        start_time: '',
        end_time: ''
      }
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
    handleUpdate(rowm, type) {
      if (type === 'info') {
        this.dialogInfoVisible = true
      }
    },
    async _fetchCountList() {
      this.listQuery.start_time = this.listQuery.dateValue[0]
      this.listQuery.end_time = this.listQuery.dateValue[1]
      this.listQuery.start_time = Math.floor(this.listQuery.start_time / 1000)
      this.listQuery.end_time = Math.floor(this.listQuery.end_time / 1000)
      try {
        const res = await fetchChargeList(this.listQuery)
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
.count-dialog .el-dialog__body {
  max-height: 600px;
  overflow-y: auto;
}
</style>
