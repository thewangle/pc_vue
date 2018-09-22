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
      <el-table-column label="编号" width="70px" align="center">
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
      <el-table-column label="联系电话" width="120px">
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
      <el-table-column label="所在地区" class-name="status-col" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.id === compareId" type="primary" size="mini" @click="handleUpdateAgent(scope.row)">修改</el-button>
          <el-button :disabled="scope.row.id === compareId" size="mini" type="success" @click="handleListTrans(scope.row)">转移</el-button>
          <el-button :disabled="scope.row.id === compareId" size="mini" type="danger" @click="handleDeleteAgent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="agentInfo" label-position="right" label-width="120px">
        <el-form-item label="代理商名称">
          <el-input v-model="agentInfo.name" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="agentInfo.username"/>
        </el-form-item>
        <el-form-item label="代理级别">
          <el-select v-if="dialogType === 'add'" v-model="agentInfo.level" clearable>
            <el-option
              v-for="item in allDaili"
              v-if="(dialogType === 'add' && (+compareLevel + 1 === +item.key))"
              :key="item.key"
              :label="item.label"
              :value="item.key"/>
          </el-select>
          <el-select v-if="dialogType === 'edit'" v-model="agentInfo.level" clearable disabled="">
            <el-option
              v-for="item in allDaili"
              :key="item.key"
              :label="item.label"
              :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="agentInfo.contacts" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="agentInfo.phone" />
        </el-form-item>
        <el-form-item label="活动价">
          <el-input v-model="agentInfo.price" type="number" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57" />
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
        <el-button @click="handleClose">取消</el-button>
        <el-button v-if="dialogType === 'add'" type="primary" @click="handleCreateAgent">保存</el-button>
        <el-button v-if="dialogType === 'edit'" type="primary" @click="handleEditAgent">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="transTitle" :visible.sync="dialogTransVisible" class="transDialog" @close="handleTransClose">
      <div class="clearfix">
        <div style="float:left; width: 40%;">
          <el-form label-position="left">
            <el-form-item label="代理商编号" label-width="100px">
              <span>{{ rowInfo.id }}</span>
            </el-form-item>
            <el-form-item label="代理商名称" label-width="100px">
              <span>{{ rowInfo.name }}</span>
            </el-form-item>
            <el-form-item label="联系人" label-width="100px">
              <span>{{ rowInfo.contacts }}</span>
            </el-form-item>
            <el-form-item label="联系电话" label-width="100px">
              <span>{{ rowInfo.phone }}</span>
            </el-form-item>
            <el-form-item label="代理级别" label-width="100px">
              <span>{{ rowInfo.level | statusFilter }}</span>
            </el-form-item>
            <el-form-item label="活动价" label-width="100px">
              <span>{{ rowInfo.price / 100 }}</span>
            </el-form-item>
            <el-form-item label="所在地区" label-width="100px">
              <span>{{ rowInfo.address }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div style="float: left; width: 18%; margin-top: 16%;">
          <div>
            <i class="el-icon-d-arrow-right" style="font-size: 36px; color: #409EFF;"/>
            <p style="color: #409EFF;">转移</p>
          </div>
        </div>
        <div style="float: right; width: 40%; margin-top: 16%;">
          <el-form>
            <el-form-item label="选择代理商" label-width="100px">
              <el-select v-model="superAgentId" clearable>
                <el-option v-for="item in supList" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="button-area" style="text-align: center">
        <el-button type="primary" @click="handleTransAgent">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createAgent, editAgent, deleteAgent, fetchAgentList, transAgent, transSubordinateAgent, getSubordinateAgent } from './../../service/info'
import { fetchCityList } from './../../service/common'
import { getLevel, getAgentId } from '@/utils/auth'
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
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10,
        level: null,
        agent_name: null,
        province_id: null
      },
      allDaili: [{ label: '一级代理', key: '2' }, { label: '二级代理', key: '3' }, { label: '三级代理', key: '4' }], // 代理商等级
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
      },
      transTitle: '', // 转移对话框标题
      dialogTransVisible: false, // 转移弹窗
      superAgentId: '',
      rowInfo: {},
      supList: [],
      compareLevel: getLevel(),
      compareId: getAgentId(),
      transType: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchAgentList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchAgentList()
    },
    handleFilter() {
      this._fetchAgentList()
    },
    handleClose() {
      // TODO: resetForm
      this.dialogFormVisible = false
      this._resetForm()
    },
    // 关闭转移弹窗
    handleTransClose() {
      this.dialogTransVisible = false
      this.transTitle = ''
      this.superAgentId = ''
      this.rowInfo = {}
      this.supList = []
      this.transType = ''
    },
    // 转移
    async handleTransAgent() {
      if (!this.superAgentId) {
        this.$message({ message: '请选择一个代理商', type: 'error' })
        return
      }
      try {
        console.log(this.transType)
        if (this.transType === 'delete') {
          const res = await transSubordinateAgent({ agent_id: this.rowInfo.id, superior_agent_id: this.superAgentId })
        } else {
          const res = await transAgent({ agent_id: this.rowInfo.id, superior_agent_id: this.superAgentId })
        }
        this.$message({ message: '转移成功', type: 'success' })
      } catch (e) {
      }
      this.handleTransClose()
      this._fetchAgentList()
    },
    // 转移弹窗
    async handleListTrans(row, type) {
      this.transType = type
      this.transTitle = '转移代理信息'
      console.log(row)
      const res = await getSubordinateAgent({ level: type ? row.level : row.level - 1 })
      const { data } = res
      if (!data.length) {
        this.$message({ message: '该用户没有下属机构，不能转移', type: 'error' })
        return
      }
      this.supList = data
      this.rowInfo = row
      this.dialogTransVisible = true
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
    handleDeleteAgent(row) {
      this.$confirm('确认删除该代理商？')
        .then(async _ => {
          try {
            await deleteAgent({ agent_id: row.id })
          } catch (e) {
            if (e.error_code === 60001) {
              this.handleListTrans(row, 'delete')
            }
          }
          await this._fetchAgentList()
        })
        .catch(_ => {})
    },
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
        this.list = data.list
        this.total = data.total
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

<style lang="scss">
.transDialog .el-dialog, .transDialog .el-dialog__body{
  width: 800px;
}
.clearfix::after {
  display: block;
  content: '';
  overflow: hidden;
  height: 0;
  clear: both;
}
</style>
