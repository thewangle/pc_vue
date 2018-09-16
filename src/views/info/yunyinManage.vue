<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增运营商</el-button>
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
      <el-table-column label="运营商名称" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理商名称" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.agent_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动价" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在地区" class-name="status-col" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button :disabled="compareId === scope.row.id" type="primary" size="mini" @click="handleEditOperator(scope.row)">修改</el-button>
          <el-button :disabled="compareId === scope.row.id" size="mini" type="success" @click="handleListTrans(scope.row)">转移</el-button>
          <el-button :disabled="compareId === scope.row.id" size="mini" type="danger" @click="handleDeleteOperator(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="handleClose">
      <el-form :model="agentInfo" label-position="right" label-width="120px">
        <el-form-item label="运营商名称">
          <el-input v-model="agentInfo.name" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="agentInfo.username" />
        </el-form-item>
        <el-form-item label="代理级别">
          <el-select v-model="agentInfo.agent_id" clearable>
            <el-option v-for="item in daliList" :key="item.id" :label="item.name" :value="item.id"/>
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
            size="medium"
            change-on-select
            expand-trigger="click"
            @change="handleCityListChange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button v-if="dialotType === 'add'" type="primary" @click="handleCreateAgent">保存</el-button>
        <el-button v-if="dialotType === 'edit'" type="primary" @click="handleEditAgent">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="transTitle" :visible.sync="dialogTransVisible" class="transDialog" @close="handleTransClose">
      <div class="clearfix">
        <div style="float:left; width: 40%;">
          <el-form label-position="left">
            <el-form-item label="运营商编号" label-width="100px">
              <span>{{ rowInfo.id }}</span>
            </el-form-item>
            <el-form-item label="运营商名称" label-width="100px">
              <span>{{ rowInfo.name }}</span>
            </el-form-item>
            <el-form-item label="联系人" label-width="100px">
              <span>{{ rowInfo.contacts }}</span>
            </el-form-item>
            <el-form-item label="联系电话" label-width="100px">
              <span>{{ rowInfo.phone }}</span>
            </el-form-item>
            <el-form-item label="现代理商名称" label-width="100px">
              <span>{{ rowInfo.agent_name }}</span>
            </el-form-item>
            <el-form-item label="活动价" label-width="100px">
              <span>{{ rowInfo.price }}</span>
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
                <el-option v-for="item in supList" v-if="item.level < 5" :key="item.id" :label="item.name" :value="item.id"/>
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
import { getOperatorList, getSubordinateAgent, addOperator, delOperator, editOperator, transAgent } from './../../service/info'
import { fetchCityList } from './../../service/common'
import { getProvinceId, getLevel, getAgentId } from '@/utils/auth'
import waves from '@/directive/waves' // 水波纹指令

const statusMap = {
  2: '一级代理商',
  3: '二级代理商',
  4: '三级代理商'
}

export default {
  name: 'YunYinManage',
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
        name: null
      },
      dialogFormVisible: false,
      cityList: [],
      dialogTitle: '',
      dialotType: '',
      id: '',
      dialogCityList: [],
      daliList: [],
      agentInfo: {
        name: null,
        username: null,
        agent_id: getAgentId(),
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
      compareId: getAgentId()
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleFilter() {
      this._fetchOperatorList()
    },
    handleCreate() {
      this.dialogTitle = '创建运营商'
      this.dialotType = 'add'
      this.dialogFormVisible = true
    },
    // 关闭转移弹窗
    handleTransClose() {
      this.dialogTransVisible = false
      this.transTitle = ''
      this.superAgentId = ''
      this.rowInfo = {}
      this.supList = []
    },
    // 转移
    async handleTransAgent() {
      if (!this.superAgentId) {
        this.$message({ message: '请选择一个代理商', type: 'error' })
        return
      }
      try {
        const res = await transAgent({ agent_id: this.rowInfo.id, superior_agent_id: this.superAgentId })
        this.$message({ message: '转移成功', type: 'success' })
      } catch (e) {
      }
      this.handleTransClose()
      this._fetchOperatorList()
    },
    // 转移弹窗
    async handleListTrans(row) {
      this.transTitle = '转移代理信息'
      console.log(row)
      const res = await getSubordinateAgent({})
      const { data } = res
      if (!data.length) {
        this.$message({ message: '该用户没有下属机构，不能转移', type: 'error' })
        return
      }
      this.supList = data
      this.rowInfo = row
      this.dialogTransVisible = true
    },
    handleEditOperator(row) {
      this.dialogTitle = '修改运营商'
      this.dialotType = 'edit'
      this.dialogFormVisible = true
      this.id = row.id
      this.agentInfo = {
        name: row.name,
        username: row.username,
        agent_id: getAgentId(),
        contacts: row.contacts,
        phone: row.phone,
        price: row.price,
        selectArea: [row.province_id, row.city_id, row.county_id]
      }
    },
    handleClose() {
      this._restForm()
    },
    handleDeleteOperator(id) {
      this.$confirm('确认删除该运营商？')
        .then(async _ => {
          await delOperator({ agent_id: id })
          await this._fetchOperatorList()
        })
        .catch(_ => {})
    },
    // 创建运营商
    async handleCreateAgent() {
      try {
        const res = await addOperator(this.agentInfo)
        this.dialogFormVisible = false
        await this._fetchOperatorList()
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      } catch (e) {
        this.dialogFormVisible = false
        await this._fetchOperatorList()
      }
      this._restForm()
    },
    // 修改运营商
    async handleEditAgent() {
      this.handleCityListChange(this.agentInfo.selectArea)
      const param = Object.assign({}, this.agentInfo, { id: this.id })
      try {
        const res = await editOperator(param)
        this.dialogFormVisible = false
        await this._fetchOperatorList()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } catch (e) {
        this.dialogFormVisible = false
        await this._fetchOperatorList()
      }
      this._restForm()
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
    _restForm() {
      this.agentInfo = {
        name: null,
        username: null,
        agent_id: getAgentId(),
        contacts: null,
        phone: null,
        price: null,
        selectArea: []
      }
      this.id = '',
      this.dialotType = ''
    },
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
    // 获取运营商列表
    async _fetchOperatorList() {
      this.listLoading = true
      try {
        const res = await getOperatorList(this.listQuery)
        const { data } = res
        this.list = data
        this.listLoading = false
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
      this.dialogCityList = this._changeCityList(getProvinceId())
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
    // 处理代理级别
    async _dealLevel() {
      const res = await getSubordinateAgent({ level: getLevel() })
      const { data } = res
      // const list = [{ id: getAgentId(), level: getLevel(), name: statusMap[getLevel()] }]
      this.daliList = data
    },
    init() {
      this._fetchOperatorList()
      this._fetchCityList()
      this._dealLevel()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
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
