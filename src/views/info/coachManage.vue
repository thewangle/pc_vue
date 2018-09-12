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
      <el-table-column label="手机号" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商名称" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.xxx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="145">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateCoach(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelCoach(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="agentInfo" label-position="right" label-width="120px">
        <el-form-item label="教练姓名">
          <el-input v-model="agentInfo.contacts" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="agentInfo.username" :disabled="dialogType === 'update'" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="agentInfo.phone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
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
  },
  data() {
    return {
      list: null,
      listLoading: false,
      listQuery: {
        agent_name: null,
        name: null,
        phone: null,
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
    handleFilter() {
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
      this.$confirm('确认删除该运营商？')
        .then(async _ => {
          await delCoach({ id: row.id })
          await this._fetchCoachList()
        })
        .catch(_ => {})
    },
    // 创建教练
    async handleCreateCoach() {
      try {
        if (this.dialogType === 'create') {
          const res = await addCoach(this.agentInfo) 
        }
        if (this.dialogType === 'update') {
          const res = await updateCoach({ id: this.coachId, contacts: this.agentInfo.contacts, phone: this.agentInfo.phone })
        }
      } catch (e) {
        console.log(e)
      }
      this.handleClose()
      this._fetchCoachList()
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
        this.list = data
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
