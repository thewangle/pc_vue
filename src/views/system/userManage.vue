<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增员工</el-button>
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

      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | genderFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleUpdataStaff(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleDeleteStaff(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="agentInfo" label-position="right" label-width="120px">
        <el-form-item label="员工姓名">
          <el-input v-model="agentInfo.name" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="agentInfo.phone" />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-select v-model="agentInfo.role_id" :placeholder="place" clearable>
            <el-option
              v-for="item in roleList"
              :label="item.role_name"
              :value="item.id"
              :key="item.id"
              :disabled="(dialogType === 'create' && item.id <=6) || (dialogType === 'update' && item.disable_role)" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="agentInfo.gender" clearable>
            <el-option label="女" value="0"/>
            <el-option label="男" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogType === 'create'" label="登录名">
          <el-input v-model="agentInfo.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="agentInfo.password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateStaff">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchStaffList, addStaff, editStaff, deleteStaff, fetchRoleList } from './../../service/role'
export default {
  name: 'UserManage',
  filters: {
    genderFilter(status) {
      const map = {
        0: '女',
        1: '男'
      }
      return map[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      roleList: null,
      dialogFormVisible: false,
      dialogTitle: null,
      dialogType: null,
      admin_id: null,
      place: '',
      agentInfo: {
        name: null,
        phone: null,
        role_id: null,
        gender: null,
        username: null,
        password: null
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleCreate() {
      this.dialogTitle = '新增员工'
      this.dialogFormVisible = true,
      this.dialogType = 'create'
    },
    handleClose() {
      this._resetAgentInfo()
    },
    handleDeleteStaff(row) {
      this.$confirm('确认删除该员工？')
        .then(async _ => {
          await deleteStaff({ admin_id: row.id })
          await this._fetchStaffList()
        })
        .catch(_ => {})
    },
    handleUpdataStaff(row) {
      this.dialogTitle = '修改员工'
      this.dialogFormVisible = true
      this.dialogType = 'update'
      const { name, phone, role_id, gender } = row
      const data = { name, phone, role_id, gender }
      this.agentInfo = data
      this.admin_id = row.id
      let flag = false
      this.roleList.forEach((item) => {
        if (item.id === role_id) {
          flag  = true
        }
      })
      if (!flag) {
        this.place = '没有对应角色'
        this.agentInfo.role_id = ''
      }
    },
    async handleCreateStaff() {
      if (this.dialogType === 'create') {
        try {
          await this._addStaff()
          this._resetAgentInfo()
        } catch (e) {
        }
      } else if (this.dialogType === 'update') {
        try {
          await this._editStaff(this.admin_id)
          this._resetAgentInfo()
        } catch (e) {
        }
      }
      await this._fetchStaffList()
    },
    _resetAgentInfo() {
      this.agentInfo = {
        name: null,
        phone: null,
        role_id: null,
        gender: null,
        username: null,
        password: null
      }
      this.place = ''
    },
    // 修改员工
    async _editStaff(id) {
      const param = Object.assign({}, this.agentInfo, { admin_id: id })
      if (!param.role_id) {
        param.role_id = 0
      }
      if (param.password.length < 6) {
        this.$message({ message: '密码长度最少六位', type: 'error' })
        return
      }
      try {
        const res = await editStaff(param)
        this.dialogFormVisible = false
      } catch (e) {
      }
    },
    // 新增员工
    async _addStaff() {
      try {
        const res = await addStaff(this.agentInfo)
        this.dialogFormVisible = false
      } catch (e) {
        this.dialogFormVisible = false
      }
    },
    // 获取员工列表
    async _fetchStaffList() {
      this.listLoading = true
      try {
        const res = await fetchStaffList()
        const { data } = res
        this.list = data
        this.listLoading = false
      } catch (e) {
        this.listLoading = false
      }
    },
    // 获取权限列表
    async _fetchRoleList() {
      const res = await fetchRoleList()
      const { data } = res
      this.roleList = data
    },
    init() {
      this._fetchStaffList()
      this._fetchRoleList()
    }
  }
}
</script>
