<template>
  <div class="app-container documentation-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>角色</span>
            <el-button type="primary" style="margin-left: 50px;" @click="handleAddRoleVisible">新增角色</el-button>
          </div>
          <div class="content">
            <div v-for="item in roleList" :key="item.id">
              <el-radio v-model="role" :label="item.id" :disabled="checkDisable(item)" border width="80px">{{ item.role_name }}</el-radio>
              <div style="float: right;">
                <el-button type="primary" round @click="handleOpenRole(item.id)">编辑角色</el-button>
                <el-button type="danger" round style="margin-left: 10px;" @click="handleDeleteRole(item.id)">删除角色</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>权限</span>
            <el-button type="primary" style="margin-left: 50px;" @click="handleChangeRoleMenuList()">修改权限</el-button>
          </div>
          <div class="content">
            <el-tree
              ref="menuTree"
              :data="menuList"
              :props="defaultProps"
              :default-checked-keys="checkedMenuList"
              show-checkbox
              node-key="id"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="addRoleVisible" :title="title" @close="handleClose">
      <el-form>
        <el-form-item label="角色名" label-width="60px">
          <el-input v-model="roleName" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchRoleList, fetchRoleMenulist, addRole, deleteRole, editRole, setRoleMenulist } from './../../service/role'
import { getRoleId } from '@/utils/auth'
export default {
  name: 'RoleManage',
  data() {
    return {
      roleList: [],
      role: '',
      menuList: [],
      allMenuList: [],
      checkedMenuList: [],
      roleName: '',
      title: '',
      id: '',
      addRoleVisible: false,
      defaultProps: {
        children: 'childs',
        label: 'menu_name'
      }
    }
  },
  watch: {
    'role'(newVal) {
      this.role = newVal
      this._initMenuList()
    }
  },
  async created() {
    this._initRoleList()
  },
  methods: {
    checkDisable(item) {
      if (item.id === getRoleId()) {
        return true
      }
      return false
    },
    // 获得选中菜单项
    _getcheckedMenuIds(menuList) {
      menuList.forEach((item) => {
        item.checked && this.checkedMenuList.push(item.id)
        if (item.childs.length > 0) {
          this._getcheckedMenuIds(item.childs)
        }
      })
    },
    // 获取角色列表
    async _initRoleList() {
      const roleList = await fetchRoleList()
      const { data } = roleList
      this.roleList = data
    },
    // 根据角色获取菜单并获得默认选中项
    async _initMenuList() {
      const menuList = await fetchRoleMenulist({ role_id: this.role })
      const { data } = menuList
      this.menuList = data
      this.checkedMenuList = []
      this._getcheckedMenuIds(this.menuList)
    },
    // 添加角色 || 修改角色
    async _addRole() {
      if (!this.roleName) {
        this.$message({
          message: '角色名不能为空',
          type: 'error'
        })
        return
      }
      if (this.id) {
        try {
          await editRole({ role_name: this.roleName, role_id: this.id })
          this.$message({
            message: '角色更新成功',
            type: 'success'
          })
          this._initRoleList()
          this.handleClose()
        } catch (e) {
          this.handleClose()
        }
      } else {
        try {
          await addRole({ role_name: this.roleName })
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this._initRoleList()
          this.handleClose()
        } catch (e) {
          this.handleClose()
        }
      }
    },
    // 删除角色
    async _deleteRole(id) {
      this.$confirm('确认删除该角色？')
        .then(async _ => {
          await deleteRole({ role_id: id })
          await this._initRoleList()
          await this._initMenuList()
        })
        .catch(_ => {})
    },
    // 打开新增角色弹框
    handleAddRoleVisible() {
      this.addRoleVisible = true
      this.title = '新增角色'
    },
    handleAddRole() {
      this._addRole()
    },
    handleOpenRole(id) {
      this.addRoleVisible = true
      this.title = '更新角色'
      this.id = id
    },
    handleDeleteRole(id) {
      this._deleteRole(id)
      this.id = id
    },
    handleClose() {
      this.roleName = ''
      this.addRoleVisible = false
      this.id = ''
    },
    // 更改权限
    handleChangeRoleMenuList() {
      const menu_ids = this.$refs.menuTree.getCheckedKeys().join()
      this.$confirm('确认修改该角色权限吗')
        .then(async _ => {
          await setRoleMenulist({ role_id: this.role, menu_ids: menu_ids })
          await this._initMenuList()
        })
        .catch(async _ => {
          await this._initMenuList()
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.documentation-container {
  margin: 50px;
}
.content div {
    margin-bottom: 5px;
}
.content-item {
  word-break: break-all;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}
.content-item:last-child {
  border-bottom: none;
}
</style>
