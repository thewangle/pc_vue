<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.content" placeholder="操作名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
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
      <el-table-column label="操作名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operator_type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operator_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | timeFilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { getOperatorLog } from './../../service/role'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'OperatorLog',
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
    typeFilter(val) {
      const typeMap = {
        1: '增加',
        2: '删除',
        3: '修改',
        4: '审核'
      }
      return typeMap[val]
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
        content: ''
      },
    }
  },
  created() {
    this._fetchLogList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page_no = 1
      this._fetchLogList()
    },
    handleSizeChange(val) {
      this.listQuery.page_size = val
      this._fetchLogList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchLogList()
    },
    async _fetchLogList() {
      this.listLoading = true
      try {
        const res = await getOperatorLog(this.listQuery)
        console.log(res)
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
      } catch(e) {}
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
