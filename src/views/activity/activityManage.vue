<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.agent_name" placeholder="请输入运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" placeholder="请输入活动名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="请选择活动类型" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in activities" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="请选择活动状态" clearable style="width: 200px" class="filter-item" @change="handleFilter" >
        <el-option v-for="item in status" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateActivity">新增活动</el-button>
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
      <el-table-column label="运营商" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.agent_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" min-width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游戏类型" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status | activityFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动封面" width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="display: block; width: 40px; height: 40px; margin: 0 auto;">
        </template>
      </el-table-column>
      <el-table-column label="活动时间" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.keep_time }}分钟</span>
        </template>
      </el-table-column>
      <el-table-column label="初始分值" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" class-name="status-col" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.activity_status | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="130" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.status === '2' || scope.row.status === '6'">修改</el-button>
          <el-button size="mini" type="success" v-if="scope.row.status !== '1'">查看</el-button>
          <el-button size="mini" v-if="scope.row.status === '1'">去审批</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteActivity(scope.row.id)"
            v-if="scope.row.status === 5 || scope.row.status === '6'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div> -->

    <el-dialog
      :visible.sync="dialogFormVisible"
      title="新增活动"
      fullscreen
      class="activityDialog"
      @close="handleCloseDialog">
      <hr >
      <el-form :inline="true" :model="activityInfo" :disable="dialogFormDisable" class="demo-form-inline">
        <el-form-item label="运营商名">
          <el-input v-model="activityInfo.agentName" disabled />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="activityInfo.type">
            <el-option label="团队-基础版" value="1" />
            <el-option label="团队-精英版" value="2" />
            <el-option label="个人-基础版" value="3" />
            <el-option label="个人-精英版" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择教练">
          <el-select v-model="activityInfo.coachId">
            <el-option v-for="item in coachList" :label="item.name" :value="item.id" :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="activityInfo.name" />
        </el-form-item>
        <el-form-item label="活动时长（分钟）">
          <el-input v-model="activityInfo.keepTime" type="number" min="0" />
        </el-form-item>
        <el-form-item label="起始分值">
          <el-input v-model="activityInfo.score" type="number" min="0" />
        </el-form-item>
        <el-form-item label="分值形式">
          <el-select v-model="activityInfo.scoreType">
            <el-option label="积分" value="1" />
            <el-option label="砖石" value="2" />
            <el-option label="游戏币" value="3" />
            <el-option label="花瓣" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="可见分数">
          <el-select v-model="activityInfo.scoreShowType">
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="activityInfo.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"/>
        </el-form-item>
        <el-form-item label="活动价格">
          <el-input v-model="activityInfo.price" type="number"/>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="activityInfo.actDesc" type="textarea"/>
        </el-form-item>
        <el-form-item label="活动封面">
          <el-upload
            :http-request="handleUpLoadIconImg"
            :on-preview="handleIconCardPreview"
            :limit="1"
            :action="domain"
            list-type="picture-card"
          >
            <el-button>上传图片</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="活动背景">
          <el-upload
            :http-request="handleUpLoadBgImg"
            :on-preview="handleBgCardPreview"
            :limit="1"
            :action="domain"
            list-type="picture-card"
          >
            <el-button>上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreateActivitySubmit">创建活动</el-button>
        </el-form-item>
      </el-form>
      <hr >
    </el-dialog>

  </div>
</template>

<script>
import { fetchCoachList, addActivity, fetchActivityList, deleteActivity } from './../../service/activity'
import { fetchQiNiuToken } from './../../service/common'
import { getAgentName, getAgentId } from '@/utils/auth'
import { qiniuAddress } from './../../config'
import axios from 'axios'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'ActivityManage',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '待审核',
        2: '准备中审核通过',
        3: '已开始进行中',
        4: '暂停',
        5: '结束已完成 ',
        6: '审核未通过'
      }
      return statusMap[status]
    },
    activityFilter(status) {
      const activityMap = {
        1: '团队-基础版',
        2: '团队-精英版',
        3: '个人-基础版',
        4: '个人-精英版'
      }
      return activityMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      listQuery: {
        type: null,
        agent_name: null,
        name: null,
        status: null
      },
      activities: [{ label: '团队-基础版', key: 1 }, { label: '团队-精英版', key: 2 }, { label: '个人-基础版', key: 3 }, { label: '个人-基础版', key: 4 }],
      status: [{ label: '待审批', key: '1' }, { label: '准备中', key: '2' }, { label: '进行中', key: '3' }, { label: '暂停中', key: '4' }, { label: '已完成', key: '5' }, { label: '未通过', key: '6' }],
      dialogFormVisible: false,
      dialogFormDisable: false,
      activityInfo: {
        agentName: getAgentName(), // 代理商名称
        type: '', // 活动类型
        coachId: '', // 教练id
        name: '', // 活动名称
        keepTime: '', // 活动时长
        score: '', // 起始分值
        scoreType: '', // 分值形式,
        scoreShowType: '', // 是否可见分数
        time: '', // 活动时间
        actDesc: '', // 活动描述
        bgImgUrl: '', // 背景图片URl
        iconUrl: '', // 活动封面Url
        price: '' //活动价格
      },
      dialogImageUrl: '',
      dialogVisible: false,
      coachList: [], // 教练列表
      domain: 'http://upload.qiniup.com/',
      qiniuAddress: qiniuAddress
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleFilter() {
      this._fetchActivityList()
    },
    handleCreateActivity() {
      this.dialogFormVisible = true
    },
    handleBgCardPreview() {
      this.dialogImageUrl = this.activityInfo.bgImgUrl
      this.dialogVisible = true
    },
    handleIconCardPreview() {
      this.dialogImageUrl = this.activityInfo.iconUrl
      this.dialogVisible = true
    },
    handleUpLoadBgImg(req) {
      const type = 'bgImg'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadIconImg(req) {
      const type = 'icon'
      this._uploadQiNiu(req, type)
    },
    handleCreateActivitySubmit() {
      console.log(this.activityInfo)
      this._addActivity()
    },
    handleCloseDialog() {
      this.dialogFormDisable = false
    },
    // 删除活动
    handleDeleteActivity(id) {
      this.$confirm('确认删除该活动？')
        .then(async _ => {
          await deleteActivity(id)
          await this._fetchActivityList()
        })
        .catch(_ => {})
    },
    // 上传七牛云
    async _uploadQiNiu(req, type) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100) + '.' + filetype
      const token = await this._fetchQiNiuToken()
      const formData = new FormData()
      formData.append('file', req.file)
      formData.append('token', token)
      formData.append('key', keyname)
      axios.post(this.domain, formData, config).then(res => {
        const url = this.qiniuAddress + '/' + res.data.key
        if (type === 'bgImg') {
          this.activityInfo.bgImgUrl = url
        }
        if (type === 'icon') {
          this.activityInfo.iconUrl = url
        }
      })
    },
    // 获取教练列表
    async _fetchCoachList() {
      const res = await fetchCoachList()
      const { data } = res
      this.coachList = data
    },
    // 获取七牛云token
    async _fetchQiNiuToken() {
      const res = await fetchQiNiuToken()
      const { data } = res
      return data
    },
    // 创建活动
    async _addActivity() {
      const data = {}
      const {
        time, name, keepTime, score, coachId,
        actDesc, scoreType, scoreShowType, type, bgImgUrl, iconUrl, price
      } = this.activityInfo
      if (!time.length || !name || !keepTime || !score || !coachId || !type || !price) {
        this.$message({ message: '必填项不能为空', type: 'error' })
        return
      }
      // 时间
      data.set_start_time = time[0] / 1000
      data.set_stop_time = time[1] / 1000
      // 代理商Id
      data.agent_id = getAgentId()
      // 活动名称
      data.name = name
      // 活动时长
      data.keep_time = keepTime
      // 起始分值
      data.score = score
      // 教练ID
      data.coach_id = coachId
      // 活动描述
      data.act_desc = actDesc
      // 分值形式
      data.score_type = scoreType
      // 是否显示分数
      data.score_show_type = scoreShowType
      // 活动类型
      data.type = type
      // 背景图片
      data.bg_img = bgImgUrl
      // 封面图片
      data.icon = iconUrl
      // 金额
      data.money = price
      try {
        const res = await addActivity(data)
        // 创建活动成功form禁用
        this.dialogFormDisable = true
      } catch (e) {
        // 添加活动失败隐藏添加弹窗
        this.dialogFormVisible = false
        await this._fetchActivityList()
      }
    },
    async _fetchActivityList() {
      this.listLoading = true
      try {
        const res = await fetchActivityList(this.listQuery)
        const { data } = res
        this.listLoading = false
        this.list = data
      } catch (e) {
        this.listLoading = false
      }
    },
    init() {
      this._fetchCoachList()
      this._fetchActivityList()
    }
  }
}
</script>
<style lang="scss">
.activityDialog .el-dialog__body {
  padding-top: 0;
}
</style>

