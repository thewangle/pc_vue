<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.agent_name" placeholder="请输入代理商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.level" placeholder="全部代理" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in allDaili" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.province_id" placeholder="全部区域" clearable style="width: 200px" class="filter-item" @change="handleFilter" >
        <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增代理商</el-button>
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
      <el-table-column label="编号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商名称" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理级别" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.level | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动价" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.price / 100 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在地区" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateAgent(scope.row)">修改</el-button>
          <el-button size="mini" type="success">转移</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteAgent(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="agentInfo" label-position="right" label-width="120px">
        <el-form-item label="代理商名称">
          <el-input v-model="agentInfo.name" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="agentInfo.username"/>
        </el-form-item>
        <el-form-item label="代理级别">
          <el-select v-model="agentInfo.level" clearable>
            <el-option v-for="item in allDaili" :key="item.key" :label="item.label" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="agentInfo.contacts" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="agentInfo.phone" />
        </el-form-item>
        <el-form-item label="活动价">
          <el-input v-model="agentInfo.price" type="number" />
        </el-form-item>
        <el-form-item label="所在区域">
          <el-cascader
            v-model="agentInfo.selectArea"
            :options="dialogCityList"
            :props="defaultProps"
            change-on-select
            expand-trigger="click"
            @change="handleCityListChange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleCreateAgent" v-if="dialogType === 'add'">保存</el-button>
        <el-button type="primary" @click="handleEditAgent" v-if="dialogType === 'edit'">修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createAgent, editAgent, deleteAgent, fetchAgentList, transAgent, transSubordinateAgent } from './../../service/info'
import { fetchCityList } from './../../service/common'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'DailiManage',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        2: '一级代理商',
        3: '二级代理商',
        4: '三级代理商'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      listQuery: {
        level: null,
        agent_name: null,
        province_id: null
      },
      allDaili: [{ label: '一级代理', key: 2 }, { label: '二级代理', key: 3 }, { label: '三级代理', key: 4 }], // 代理商等级
      dialogFormVisible: false,
      dialogTitle: '',
      dialogType: '',
      cityList: [], // 城市列表
      dialogCityList: [],
      id: '',
      agentInfo: {
        name: null,
        username: null,
        level: null,
        contacts: null,
        phone: null,
        price: null,
        selectArea: []
      },
      defaultProps: {
        value: 'id',
        label: 'name',
        children: 'childs'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleFilter() {
      this._fetchAgentList()
    },
    handleClose() {
      // TODO: resetForm
      this._resetForm()
    },
    _resetForm() {
      this.agentInfo = {
        name: null,
        username: null,
        level: null,
        contacts: null,
        phone: null,
        price: null,
        selectArea: []
      }
      this.dialogType = ''
      this.id = ''
    },
    // 创建代理商
    async handleCreateAgent() {
      try {
        const res = await createAgent(this.agentInfo)
        this.dialogFormVisible = false
        await this._fetchAgentList()
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      } catch (e) {
        this.dialogFormVisible = false
        await this._fetchAgentList()
        this.$message({
          message: '创建失败',
          type: 'error'
        })
      }
    },
    // 修改代理商
    async handleEditAgent() {
      this.handleCityListChange(this.agentInfo.selectArea)
      const param = Object.assign({}, this.agentInfo, { id: this.id })
      try {
        const res = await editAgent(param)
        this.dialogFormVisible = false
        await this._fetchAgentList()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } catch (e) {
        this.dialogFormVisible = false
        await this._fetchAgentList()
        this.$message({
          message: '创建失败',
          type: 'error'
        })
      }
    },
    handleCityListChange(value) {
      this.agentInfo.province_id = value[0]
      this.agentInfo.city_id = value[1] || 0
      this.agentInfo.county_id = value[2] || 0
      const address = this._getAllAdderss()
      let str = ''
      address.forEach(item => {
        str += item
      })
      this.agentInfo.address = str
      console.log(this.agentInfo)
    },
    async handleCreate() {
      this.dialogTitle = '新增代理商'
      this.dialogType = 'add'
      // await this._fetchSubordinateAgent()
      this.dialogFormVisible = true
      this.dialogCityList = this._changeCityList()
    },
    async handleUpdateAgent(row) {
      this.dialogTitle = '修改代理商'
      this.dialogType = 'edit'
      this.id = row.id
      // await this._fetchSubordinateAgent(row.level)
      this.dialogFormVisible = true
      this.agentInfo = {
        name: row.name,
        username: row.username,
        level: row.level,
        contacts: row.contacts,
        phone: row.phone,
        price: row.price / 100,
        selectArea: [row.province_id, row.city_id, row.county_id]
      },
      this.dialogCityList = this._changeCityList(row.province_id)
    },
    // 删除代理商
    handleDeleteAgent(id) {
      this.$confirm('确认删除该代理商？')
        .then(async _ => {
          await deleteAgent({ agent_id: id })
          await this._fetchAgentList()
        })
        .catch(_ => {})
    },
    // 获取当前用户下属机构
    // async _fetchSubordinateAgent(level) {
    //   const param = level ? { level } : {}
    //   const res = fetchSubordinateAgent(param)
    //   const { data } = res
    //   console.log(data)
    // },
    // 处理城市
    _changeCityList(provice) {
      const dialogCityList = []
      this.cityList.forEach(item => {
        if (item.id === provice) {
          dialogCityList.push(item)
        }
      })
      return dialogCityList.length ? dialogCityList : this.cityList
    },
    // 获取代理商列表
    async _fetchAgentList() {
      this.listLoading = true
      try {
        const res = await fetchAgentList(this.listQuery)
        const { data } = res
        this.listLoading = false
        this.list = data
      } catch (e) {
        this.listLoading = false
      }
    },
    // 获取城市列表
    async _fetchCityList() {
      const res = await fetchCityList()
      const { data } = res
      this._dealCityList(data)
      this.cityList = data
    },
    // 处理城市数据
    _dealCityList(list) {
      list.map(item => {
        if (item.childs.length > 0) {
          this._dealCityList(item.childs)
        } else {
          delete item.childs
        }
      })
    },
    // 获取address
    _getAllAdderss() {
      const addressArr = []
      this.agentInfo.selectArea.forEach(item => {
        this._dealAddress(this.dialogCityList, item, addressArr)
      })
      return addressArr
    },
    _dealAddress(list, id, target) {
      list.forEach(item => {
        if (item.id === id) {
          target.push(item.name)
        }
        (item.childs && item.childs.length > 0) && this._dealAddress(item.childs, id, target)
      })
    },
    init() {
      this._fetchAgentList()
      this._fetchCityList()
    }
  }
}
</script>
