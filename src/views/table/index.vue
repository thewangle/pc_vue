<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-input v-model="listQuery.agent_name" placeholder="请输入运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" placeholder="请输入活动名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="请选择活动类型" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in activities" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      max-height="400"
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agent_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏类型" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.set_start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.set_stop_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="玩家数量" class-name="status-col" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.player_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleShowDetial(scope.row)">查看</el-button>
          <el-button type="primary" size="small" @click="copyTask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" :close="dialog_close" title="提示">
      <div class="dialog_div">运营商：{{ table_info.agent_name }}</div>
      <div class="dialog_div">活动名称：{{ table_info.name }}</div>
      <div class="dialog_div">游戏类型：{{ table_info.type }}</div>
      <div class="dialog_div">开始时间：{{ table_info.set_start_time }}</div>
      <div class="dialog_div">结束时间：{{ table_info.set_stop_time }}</div>
      <div class="dialog_div">活动人数：{{ table_info.player_num }}</div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchActivityList } from './../../service/activity'
export default {
  name: 'Dashboard',
  data() {
    return {
      listLoading: false,//table加载的时候loading
      list: [//table的数据
        {
          agent_name: '中国',
          name: '山东',
          type: '中国第一',
          set_start_time: '2019-01-01',
          set_stop_time: '无限期',
          player_num: '108',
        },
        {
          agent_name: '中国',
          name: '北京',
          type: '世界第一',
          set_start_time: '2019-01-01',
          set_stop_time: '无限期',
          player_num: '98',
        },
      ],
      listQuery: { //动态请求table数据时传递的参数
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        type: null,
        agent_name: null,
        name: null
      },
      total: 1,//table一共多少条数据
      activities: [
        {key: 1,label: '中国'},
        {key: 2,label: '美国'},
        {key: 3,label: '日本'},
        {key: 4,label: '欧盟'},
      ],
      dialogVisible: false,//dialog是否显示
      table_info: {//用于dialog展示
        agent_name: '',
        name: '',
        set_start_time: '',
        set_stop_time: '',
        type: '',
        player_num: '',
      },
    }
  },
  methods: {
    //点击查看
    handleShowDetial(row_data) {
      console.log(row_data)
      this.table_info = row_data
      this.dialogVisible = true
    },
    //点击删除
    copyTask(row_data) {
      console.log(row_data)
    },
    //显示条数改变时触发
    handleSizeChange(size) {
      this.listQuery.page_size = size
      // this._fetchActivityList()//重新获取数据
    },
    //当前页码改变时触发
    handleCurrentChange(current) {
      this.listQuery.page_no = current //将当前页改变为改变后的页码
      // this._fetchActivityList() //重新获取数据
    },
    // 获取table数据函数
    async _fetchActivityList() {
      this.listLoading = true //加载动画
      try {
        const res = await fetchActivityList(val)//调用serve里封装好的asiox请求函数来获取数据，传的参数跟后端去协调
        const { data } = res
        this.listLoading = false
        this.list = data.list //list是table挂在的数据model
      } catch (e) {
        this.listLoading = false //请求不成功则关闭加载动画
      }
    },
    //顶部搜索框搜索功能
    handleFilter() {
      this.listQuery.page_no = 1 //将当前页归1
      // this._fetchActivityList() //重新获取数据
    },
    //dialog关闭函数
    dialog_close() {
      this.table_info = ''
    }
  },
}
</script>
<style scope>
  .filter-container {
    padding: 10px;
  }
  .dialog_div {
    padding: 20px 0;
    font-size: 15px;
    color: orange;
  }
</style>
