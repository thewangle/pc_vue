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
          <span>{{ scope.row.type | activityFilter }}</span>
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
          <el-button v-if="scope.row.activity_status === '2' || scope.row.activity_status === '6'" type="primary" size="mini">修改</el-button>
          <el-button v-if="scope.row.activity_status !== '1'" size="mini" type="success">查看</el-button>
          <el-button v-if="scope.row.activity_status === '1'" size="mini" @click="handleCheckActivity(scope.row)">去审批</el-button>
          <el-button
            v-if="scope.row.activity_status === 5 || scope.row.activity_status === '6'"
            size="mini"
            type="danger"
            @click="handleDeleteActivity(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增活动对话框 start -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="新增活动"
      fullscreen
      class="activityDialog"
      @close="handleCloseDialog">
      <hr >
      <el-form :inline="true" :model="activityInfo" :disabled="dialogFormDisable" class="demo-form-inline">
        <el-form-item label="运营商名">
          <el-input v-model="activityInfo.agentName" disabled />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="activityInfo.type">
            <el-option label="团队-基础版" value="1" />
            <el-option label="个人-基础版" value="2" />
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
            :file-list="iconFilelist"
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
            :file-list="bgFileList"
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
      <div class="job-list">
        <div class="job-title">
          <h3 style="display: inline-block">任务列表</h3>
          <el-button :disabled="!activityId" type="success" style="float: right">导入任务</el-button>
          <el-button :disabled="!activityId" type="primary" style="float: right; margin-right: 20px;" @click="handleOpenTaskDialog">添加任务</el-button>
        </div>
        <div class="job-table">
          <el-table
            :data="taskList"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column label="序号" align="center" width="65">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="题目标题" width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" min-width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.task_desc }}</span>
              </template>
            </el-table-column>
            <el-table-column label="答案" width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.answer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="题目类型" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.type | typeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="分值" align="center" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.score }}</span>
              </template>
            </el-table-column>
            <el-table-column label="答题类型" align="center" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.answer_type | answerTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="130" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 新增活动对话框 end -->

    <!-- 新增题目对话框 start -->
    <el-dialog
      :visible.sync="dialogTaskVisible"
      title="新增任务"
      class="activityDialog"
      @close="handleCloseTaskDialog">
      <el-form :model="taskInfo" class="demo-form-inline">
        <el-form-item label="题目标题" label-width="100px">
          <el-input v-model="taskInfo.name" />
        </el-form-item>
        <el-form-item label="题目类型" label-width="100px">
          <el-select v-model="taskInfo.type">
            <el-option label="选择题" value="1" />
            <el-option label="文字题" value="2" />
            <el-option label="图片题" value="3" />
            <el-option label="视频题" value="4" />
            <el-option label="语音题" value="5" />
            <el-option label="拍照题" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目描述" label-width="100px">
          <el-input v-model="taskInfo.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="题目分值" label-width="100px">
          <el-input v-model="taskInfo.score" type="number" />
        </el-form-item>
        <el-form-item label="答题类型" label-width="100px">
          <el-select v-model="taskInfo.answer_type">
            <el-option label="普通题" value="1" />
            <el-option label="关卡题" value="2" />
            <el-option label="团队限时题" value="3" />
            <el-option label="活动抢答题" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目顺序" label-width="100px">
          <el-input v-model="taskInfo.seq" type="number" />
        </el-form-item>
        <el-form-item label="答题人数" label-width="100px">
          <el-input v-model="taskInfo.answer_limit" type="number" />
        </el-form-item>
        <!-- 文字题目 -->
        <template v-if="taskInfo.type === '1'">
          <el-form-item label="题目图片" label-width="100px">
            <el-upload
              :http-request="handleUpLoadTaksImg"
              :on-preview="handleTaskImgPreview"
              :limit="1"
              :action="domain"
              :file-list="taskQFileList"
              list-type="picture-card"
            >
              <el-button>上传图片</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogTaskImgVisible">
              <img :src="dialogTaskImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="题目选项" label-width="100px">
            <el-input v-model="taskInfo.options.A" placeholder="请输入选项内容">
              <template slot="prepend">A</template>
            </el-input>
            <el-input v-model="taskInfo.options.B" placeholder="请输入选项内容">
              <template slot="prepend">B</template>
            </el-input>
            <el-input v-model="taskInfo.options.C" placeholder="请输入选项内容">
              <template slot="prepend">C</template>
            </el-input>
            <el-input v-model="taskInfo.options.D" placeholder="请输入选项内容">
              <template slot="prepend">D</template>
            </el-input>
          </el-form-item>
          <el-form-item label="答案" label-width="100px">
            <el-checkbox-group v-model="taskInfo.answer">
              <el-checkbox label="A"/>
              <el-checkbox label="B"/>
              <el-checkbox label="C"/>
              <el-checkbox label="D"/>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button @click="handleCloseTaskDialog">取消</el-button>
          <el-button type="primary" @click="handelCreateTaskSubmit">添加题目</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增题目对话框 end -->

    <el-dialog
      :visible.sync="dialogCheckVisible"
      class="activityDialog"
      fullscreen
      @close="handleCloseCheckDialog">
      <hr />
      <div slot="title">
        <h3>
          {{ dialogTitle }}
          <el-button @click="handelAuditact" v-if="dialogType === 'check'">不通过</el-button>
          <el-button type="primary" v-if="dialogType === 'check'">通过</el-button>
        </h3>
      </div>
      <div class="info clearfix">
        <div class="info-tab-left" style="width: 50%;float: left;">
          <h4>活动信息</h4>
          <el-form v-model="checkInfo">
            <el-form-item label="活动名称" label-width="100px">
              <span v-if="dialogType === 'check'">{{ checkInfo.name }}</span>  
              <!-- <el-input v-model="checkInfo.name" :disabled="dialogType === 'check'"/> -->
            </el-form-item>
            <el-form-item label="活动类型" label-width="100px">
              <span v-if="dialogType === 'check'">{{ checkInfo.activity_status | activityFilter }}</span>  
              <!-- <el-input v-model="checkInfo.type" :disabled="dialogType === 'check'"/> -->
            </el-form-item>
            <el-form-item label="开始时间" label-width="100px">
              <span v-if="dialogType === 'check'">{{ checkInfo.set_start_time | timeFilter }}</span>
              <!-- <el-input v-model="checkInfo.set_start_time" :disabled="dialogType === 'check'"/> -->
            </el-form-item>
            <el-form-item label="开始时间" label-width="100px">
              <span v-if="dialogType === 'check'">{{ checkInfo.set_stop_time | timeFilter }}</span>
              <!-- <el-input v-model="checkInfo.set_stop_time" :disabled="dialogType === 'check'"/> -->
            </el-form-item>
          </el-form>
        </div>
        <div class="info-tab-right" style="width: 50%; float: right;">
          <h4>活动二维码</h4>
          <div class="er-img" style="width: 140px; height: 140px; margin: 0 auto; border: 1px solid #ccc; margin-top: 40px">
            <span style="color: red; font-size: 18px;">活动审批完成后创建二维码</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="job-list">
        <div class="job-title">
          <h3 style="display: inline-block">任务列表</h3>
        </div>
        <div class="job-table">
          <el-table
            :data="taskList"
            border
            fit
            highlight-current-row
            style="width: 100%;">
            <el-table-column label="序号" align="center" width="65">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="题目标题" width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" min-width="130px">
              <template slot-scope="scope">
                <span>{{ scope.row.task_desc }}</span>
              </template>
            </el-table-column>
            <el-table-column label="答案" width="150px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.answer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="题目类型" width="100px">
              <template slot-scope="scope">
                <span>{{ scope.row.type | typeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="分值" align="center" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.score }}</span>
              </template>
            </el-table-column>
            <el-table-column label="答题类型" align="center" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.answer_type | answerTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="130" class-name="small-padding fixed-width" v-if="dialogType !== 'check'">
              <template slot-scope="scope">
                <el-button type="primary">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <el-dialog 
      :visible.sync="dialogReasonVisible"
      class="activityDialog"
      title="不通过原因"
      @close="handleCloseReasonDialog">
      <el-form>
        <el-form-item>
          <el-input v-model="reason" type="textarea" /> 
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCloseReasonDialog">取消</el-button>
          <el-button type="primary" @click="handleCancelActivity">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCoachList, addActivity, fetchActivityList, deleteActivity, fetchTaskList, addTask, fetchActivityInfo, auditact } from './../../service/activity'
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
        2: '个人-基础版'
      }
      return activityMap[status]
    },
    typeFilter(type) {
      const typeMap = {
        1: '选择题',
        2: '文字题',
        3: '图片题',
        4: '视频题',
        5: '语音题',
        6: '拍照题'
      }
      return typeMap[type]
    },
    answerTypeFilter(type) {
      const typeMap = {
        1: '普通题',
        2: '关卡题',
        3: '团队限时题',
        4: '活动抢答题'
      }
      return typeMap[type]
    },
    timeFilter(timestamp) {
      var date = new Date(timestamp*1000);//如果date为10位不需要乘1000
      var Y = date.getFullYear() + '-'
      var M = (+date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (+date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      var h = (+date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (+date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (+date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y+M+D+h+m+s
    }
  },
  data() {
    return {
      iconFilelist: [],
      bgFileList: [],
      taskQFileList: [],
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
      dialogFormVisible: false, // 添加活动对话框展示
      dialogFormDisable: false, // 添加活动对话框表单禁用
      taskList: [],
      dialogTaskVisible: false, // 添加任务对话框展示
      dialogTaskImgVisible: false, // 添加任务对话框中图片对话框展示
      dialogTaskImageUrl: '',
      dialogCheckVisible: false,   // 活动审批对话框展示
      dialogTitle: '',
      dialogType: '',
      dialogReasonVisible: false, // reason对话框
      reason: '',
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
        price: '' // 活动价格
      },
      activityId: null,
      taskInfo: {
        name: null,
        type: '1',
        desc: null,
        answer_type: '1',
        seq: null,
        question_img: null,
        options: {
          A: null,
          B: null,
          C: null,
          D: null
        },
        answer: [],
        score: null,
        answer_limit: 1
      },
      dialogImageUrl: '',
      dialogVisible: false,
      coachList: [], // 教练列表
      domain: 'http://upload.qiniup.com/',
      qiniuAddress: qiniuAddress,
      checkInfo: {
        name: null,
        activity_status: null,
        set_start_time: null,
        set_stop_time: null,
      }
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
    handleTaskImgPreview() {
      this.dialogTaskImageUrl = this.taskInfo.question_img
      this.dialogTaskImgVisible = true
    },
    handleUpLoadBgImg(req) {
      const type = 'bgImg'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadIconImg(req) {
      const type = 'icon'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadTaksImg(req) {
      const type = 'task'
      this._uploadQiNiu(req, type)
    },
    // 打开审批不通过通过弹窗
    handelAuditact() {
      this.dialogReasonVisible = true
    },
    // 打开审批活动弹窗
    async handleCheckActivity(row) {
      this.activityId = row.id
      const res = await fetchActivityInfo({ act_id: row.id })
      await this._fetchTaskList(row.id)
      const { data } = res
      const { name, activity_status, set_start_time, set_stop_time } = data
      this.checkInfo = { name, activity_status, set_start_time, set_stop_time }
      this.dialogCheckVisible = true
      this.dialogTitle = '活动审批'
      this.dialogType = 'check'
    },
    // 添加活动
    handleCreateActivitySubmit() {
      this._addActivity()
    },
    // 关闭不通关原因对话框
    handleCloseReasonDialog() {
      this.dialogReasonVisible = false
      this.reason = ''
    },
    // 关闭添加活动对话框
    handleCloseDialog() {
      this.dialogFormDisable = false
      this.activityId = null
      this._resetActivityInfo()
    },
    // 打开添加任务对话框
    handleOpenTaskDialog() {
      this.dialogTaskVisible = true
    },
    // 关闭添加任务对话框
    handleCloseTaskDialog() {
      this._resetTaskInfo()
      this.dialogTaskVisible = false
    },
    // 关闭活动审批对话框
    handleCloseCheckDialog() {
      this.dialogCheckVisible = false
      this.activityId = ''
    },
    // 删除活动
    handleDeleteActivity(id) {
      this.$confirm('确认删除该活动？')
        .then(async _ => {
          await deleteActivity(id)
          await this._fetchActivityList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(_ => {})
    },
    // 审批活动不通过
    handleCancelActivity() {
      this.$confirm('确认不通过该活动？')
        .then(async _ => {
          await auditact({ activity_id: this.activityId, reason: this.reason })
          this.handleCloseReasonDialog()
          this.handleCloseCheckDialog()
          await this._fetchActivityList()
          this.$message({
            message: '审批成功',
            type: 'success'
          })
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
        if (type === 'task') {
          this.taskInfo.question_img = url
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
        // 创建活动成功保存活动id
        this.activityId = res.data
        await this._fetchTaskList(res.data)
      } catch (e) {
        // 添加活动失败隐藏添加弹窗
        this.handleCloseDialog()
        await this._fetchActivityList()
      }
    },
    // 添加任务
    async handelCreateTaskSubmit() {
      const { name, score, seq } = this.taskInfo
      if (!name || !score || !seq) {
        this.$message({
          message: '必填项不能为空',
          type: 'error'
        })
        return
      }
      const data = Object.assign({}, this.taskInfo, { activity_id: this.activityId })
      data.answer = JSON.stringify(data.answer)
      data.options = JSON.stringify(data.options)
      try {
        const res = await addTask(JSON.stringify(data))
      } catch (e) {
      }
      this.dialogTaskVisible = false
      this._fetchTaskList(this.activityId)
    },
    // 获取活动列表
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
    // 获取活动下任务列表
    async _fetchTaskList(id) {
      const res = await fetchTaskList({ activity_id: id })
      let { data } = res
      if (!data) data = []
      this.taskList = data
    },
    // 重置创建活动
    _resetActivityInfo() {
      this.activityInfo = {
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
        price: '' // 活动价格
      }
      this.iconFilelist = []
      this.bgFileList = []
    },
    // 重置添加任务
    _resetTaskInfo() {
      this.taskInfo = {
        name: null,
        type: '1',
        desc: null,
        answer_type: '1',
        seq: null,
        question_img: null,
        options: {
          A: null,
          B: null,
          C: null,
          D: null
        },
        answer: [],
        score: null,
        answer_limit: 1
      }
      this.taskQFileList = []
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
.clearfix::after {
  display: block;
  content: '';
  overflow: hidden;
  height: 0;
  clear: both;
}
</style>

