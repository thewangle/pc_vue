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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商名称" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="80px">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>
      <el-table-column label="代理商名称" align="center" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="活动价" align="center" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="所在地区" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button size="mini" type="success">转移</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteOperator(scope.row.id)">删除</el-button>
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
        <el-button type="primary" @click="handleCreateAgent">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOperatorList, getSubordinateAgent, addOperator, delOperator } from './../../service/info'
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
      dialogFormVisible: false,
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
      }
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
      this.dialogFormVisible = true
    },
    handleClose() {
      this._restForm()
    },
    handleDeleteOperator(id) {
      this.$confirm('确认删除该运营商？')
        .then(async _ => {
          await deleteAgent({ agent_id: id })
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
      const list = [{ id: getAgentId(), level: getLevel(), name: statusMap[getLevel()] }]
      this.daliList = list.concat(data)
    },
    init() {
      this._fetchOperatorList()
      this._fetchCityList()
      this._dealLevel()
    }
  }
}
</script>
