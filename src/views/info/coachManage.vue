<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" placeholder="请输入手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.agent_name" placeholder="请输入运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增教练</el-button>
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
      <el-table-column label="用户名" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_id | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商名称" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.agent_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateCoach(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelCoach(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose">
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
  </div>
</template>

<script>
import { fetchCoachList, addCoach, delCoach, updateCoach } from './../../service/info'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'CoachManage',
  directives: {
    waves
  },
  filters: {
    roleFilter(id) {
      if (id === '6') {
        return '教练'
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
      listLoading: false,
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10,
        agent_name: null,
        name: null,
        phone: null
      },
      dialogFormVisible: false,
      dialogTitle: '',
      dialogType: '',
      agentInfo: {
        contacts: null,
        username: null,
        phone: null
      },
      coachId: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchCoachList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchCoachList()
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this._fetchCoachList()
    },
    handleCreate() {
      this.dialogTitle = '创建教练'
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },
    handleClose() {
      this.dialogFormVisible = false
      this.dialogTitle = ''
      this.dialogType = ''
      this._resetForm()
    },
    handleUpdateCoach(row) {
      this.dialogTitle = '修改教练'
      this.dialogType = 'update'
      this.dialogFormVisible = true
      const { name, username, phone } = row
      const data = { contacts: name, username, phone }
      this.agentInfo = data
      this.coachId = row.id
    },
    handleDelCoach(row) {
      this.$confirm('确认删除该教练？')
        .then(async _ => {
          await delCoach({ id: row.id })
          await this._fetchCoachList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(_ => {})
    },
    // 创建教练
    async handleCreateCoach() {
      try {
        if (this.dialogType === 'create') {
          const res = await addCoach(this.agentInfo)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        if (this.dialogType === 'update') {
          const res = await updateCoach({ 
            id: this.coachId,
            contacts: this.agentInfo.contacts,
            phone: this.agentInfo.phone,
            username: this.agentInfo.username
          })
        }
        this.handleClose()
        this._fetchCoachList()
      } catch (e) {
        console.log(e)
      }
    },
    // 重置对话框列表
    _resetForm() {
      this.agentInfo = {
        contacts: null,
        username: null,
        phone: null
      }
    },
    // 获取教练列表
    async _fetchCoachList() {
      this.listLoading = true
      try {
        const res = await fetchCoachList(this.listQuery)
        const { data } = res
        this.list = data.list
        this.total = data.total
        this.listLoading = false
      } catch (e) {
        this.listLoading = false
      }
    },
    init() {
      this._fetchCoachList()
    }
  }
}
</script>
