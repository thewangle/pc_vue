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

      <el-select v-model="listQuery.status" placeholder="全部代理" clearable style="width: 200px" class="filter-item" @change="handleFilter">
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
      <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动场次" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总计价格" width="80px">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
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

    <el-dialog :visible.sync="dialogInfoVisible" title="财务统计查看" custom-class="count-dialog">
      <el-table :data="gridData" border fit highlight-current-row>
        <el-table-column property="id" label="序号" align="center" width="65"/>
        <el-table-column property="name" label="名称" width="150"/>
        <el-table-column property="aname" label="活动名称" width="250"/>
        <el-table-column property="num" label="活动次数"/>
        <el-table-column property="stime" label="开始时间" width="120"/>
        <el-table-column property="etime" label="结束时间" width="120"/>
        <el-table-column property="money" label="活动价"/>
        <el-table-column property="status" label="活动状态"/>
        <el-table-column property="pay" label="支付方式"/>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="dialogRechargeVisible" title="充值记录" custom-class="count-dialog">
      <el-table :data="gridData" border fit highlight-current-row>
        <el-table-column property="id" label="序号" align="center" width="65"/>
        <el-table-column property="name" label="名称" width="150"/>
        <el-table-column property="aname" label="活动名称" width="250"/>
        <el-table-column property="num" label="活动次数"/>
        <el-table-column property="stime" label="开始时间" width="120"/>
        <el-table-column property="etime" label="结束时间" width="120"/>
        <el-table-column property="money" label="活动价"/>
        <el-table-column property="status" label="活动状态"/>
        <el-table-column property="pay" label="支付方式"/>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCountList } from './../../service/count'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Show',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page_no: 1,
        page_size: 20,
        agent_name: undefined,
        agent_type: 0,
        dateValue: [],
        start_time: '',
        end_time: ''
      },
      status: [{ label: '代理商', key: 1 }, { label: '运营商', key: 2 }],
      dialogInfoVisible: false,
      dialogRechargeVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
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
    handleUpdate(rowm, type) {
      if (type === 'info') {
        this.dialogInfoVisible = true
      }
    },
    async _fetchCountList() {
      this.listQuery.start_time
      this.listQuery.end_time
      try{
        const res = await fetchCountList(this.listQuery)
        this.list = res.data
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
.count-dialog .el-dialog__body {
  max-height: 600px;
  overflow-y: auto;
}
</style>
