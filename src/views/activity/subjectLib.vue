<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入任务名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="请选择任务类型" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option label="选择题" value="1" />
        <el-option label="文字题" value="2" />
        <el-option label="图片题" value="3" />
        <el-option label="视频题" value="4"/>
        <el-option label="语音题" value="5"/>
        <el-option label="拍照题" value="6"/>
      </el-select>
      <el-select v-model="listQuery.answer_type" placeholder="请选择答题类型" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option label="普通题" value="1" />
        <el-option label="关卡题" value="2" />
        <el-option label="团队限时题" value="3" />
        <el-option label="活动抢答题" value="4"/>
      </el-select>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAddTaskLib">添加题目</el-button>
      <div class="filePicker" style="float: right;">
        <label>导入任务</label>
        <input
          id="fileInput"
          type="file"
          name="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          @change="handleFileChange">
      </div>
      <div class="filePicker" style="float: right; margin-right: 10px">
        <label>导入图片</label>
        <input
          id="ImgInput"
          type="file"
          name="file"
          multiple
          @change="handleImgChange">
      </div>
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
      <el-table-column label="题目标题" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="答案" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.answer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目类型" width="110px" align="center">
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
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdateTask(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteTask(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 新增题目对话框 start -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogTaskVisible"
      :title="dialogTaskTitle"
      class="activityDialog"
      @close="handleCloseTaskDialog">
      <el-form :model="taskInfo" class="demo-form-inline">
        <el-form-item label="题目标题" label-width="100px">
          <el-input v-model="taskInfo.name" />
        </el-form-item>
        <el-form-item label="题目类型" label-width="100px">
          <el-select v-model="taskInfo.type" :disabled="dialogTaskType === 'edit'" @change="taskTypeChange">
            <el-option label="选择题" value="1" />
            <el-option label="文字题" value="2" />
            <el-option label="图片题" value="3" />
            <el-option label="视频题" value="4"/>
            <el-option label="语音题" value="5"/>
            <el-option label="拍照题" value="6"/>
          </el-select>
        </el-form-item>
        <el-form-item label="题目描述" label-width="100px">
          <el-input v-model="taskInfo.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="题目分值" label-width="100px">
          <el-input v-model="taskInfo.score" type="number" />
        </el-form-item>
        <el-form-item label="答题类型" label-width="100px">
          <el-select v-model="taskInfo.answer_type" :disabled="dialogTaskType === 'edit'" @change="answerTypeChange">
            <el-option label="普通题" value="1" />
            <el-option v-if="taskInfo.type === '1' || taskInfo.type === '2' || taskInfo.type === '3'" label="关卡题" value="2" />
            <el-option v-if="(taskInfo.type === '1' || taskInfo.type === '2' || taskInfo.type === '3')" label="限时题" value="3" />
            <el-option v-if="(taskInfo.type === '1' || taskInfo.type === '2' || taskInfo.type === '3')" label="抢答题" value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item label="题目顺序" label-width="100px">
          <el-input v-model="taskInfo.seq" type="number" />
        </el-form-item>
        <el-form-item label="答题人数" label-width="100px">
          <el-input v-model="taskInfo.answer_limit" :disabled="taskInfo.answer_type === '4' || (taskInfo.type !== '1' && taskInfo.type !== '2' && taskInfo.type !== '3')" type="number" />
        </el-form-item>
        <el-form-item v-if="taskInfo.answer_type === '3'" label="答题时间" label-width="100px">
          <el-input v-model="taskInfo.limit_time" type="number">
            <div slot="suffix">(秒)</div>
          </el-input>
        </el-form-item>
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

        <!-- 选择题 -->
        <template v-if="taskInfo.type === '1'">
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
        <!-- 文字题目 -->
        <template v-if="taskInfo.type === '2'">
          <el-form-item label="答案" label-width="100px">
            <el-input v-model="taskInfo.answer2" />
          </el-form-item>
        </template>
        <!-- 图片题 -->
        <template v-if="taskInfo.type === '3'">
          <el-form-item label="九宫格图片" label-width="100px">
            <el-upload
              :http-request="handleUpLoadNineImg"
              :on-preview="handleNineImgPreview"
              :on-remove="handleRemove"
              :limit="9"
              :action="domain"
              :file-list="taskAFileList"
              multiple
              list-type="picture"
            >
              <el-button>上传图片</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogNineVisible">
              <img :src="nineImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="答案" label-width="100px">
            <el-checkbox-group v-model="taskInfo.answer">
              <el-checkbox label="1"/>
              <el-checkbox label="2"/>
              <el-checkbox label="3"/>
              <el-checkbox label="4"/>
              <el-checkbox label="5"/>
              <el-checkbox label="6"/>
              <el-checkbox label="7"/>
              <el-checkbox label="8"/>
              <el-checkbox label="9"/>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <!-- 视频题 -->
        <template v-if="taskInfo.type === '4'">
          <el-form-item label="题目视频" label-width="100px">
            <el-upload
              :http-request="handleUpLoadAnswerImg"
              :on-preview="handleAnswerImgPreview"
              :limit="1"
              :action="domain"
              :file-list="taskAFileList"
            >
              <el-button>上传视频</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogAnswerImgVisible">
              <video :src="dialogAnswerImageUrl" controls autoplay width="100%" />
            </el-dialog>
          </el-form-item>
        </template>
        <!-- 语音题 -->
        <template v-if="taskInfo.type === '5'">
          <el-form-item label="题目语音" label-width="100px">
            <el-upload
              :http-request="handleUpLoadAnswerImg"
              :on-preview="handleAnswerImgPreview"
              :limit="1"
              :action="domain"
              :file-list="taskAFileList"
            >
              <el-button>上传音频</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogAnswerImgVisible">
              <video :src="dialogAnswerImageUrl" controls autoplay width="100%" />
            </el-dialog>
          </el-form-item>
        </template>
        <!-- 拍照题 -->
        <template v-if="taskInfo.type === '6'">
          <el-form-item label="拍照图片" label-width="100px">
            <el-upload
              :http-request="handleUpLoadAnswerImg"
              :on-preview="handleAnswerImgPreview"
              :limit="1"
              :action="domain"
              :file-list="taskAFileList"
              list-type="picture-card"
            >
              <el-button>上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-dialog :visible.sync="dialogAnswerImgVisible">
            <img :src="dialogAnswerImageUrl" width="100%" alt="">
          </el-dialog>
        </template>
        <!-- <el-form-item label="定位" label-width="100px">
          <el-button type="primary" @click="handleOpenTenceMap">选择定位</el-button>
        </el-form-item> -->
        <el-form-item>
          <div style="text-align: center">
            <el-button @click="handleCloseTaskDialog">取消</el-button>
            <el-button v-if="dialogTaskType === 'add'" type="primary" @click="handelCreateTaskSubmit">添加题目</el-button>
            <el-button v-if="dialogTaskType === 'edit'" type="primary" @click="handelUpdateTaskSubmit">修改题目</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增题目对话框 end -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogMap"
      title="选择定位"
      class="activityDialog">
      <div id="map-container" style="width: 100%; height: 500px;"/>

    </el-dialog>
  </div>
</template>

<script>
import { fetchTaskLibList, delTaskLib, addTaskLib, updateTaskLib } from './../../service/activity'
import { fetchQiNiuToken } from './../../service/common'
import { qiniuAddress } from './../../config'
import axios from 'axios'
import { Loading } from 'element-ui'
import { getCityName } from '@/utils/auth'
export default {
  name: 'SubkectLib',
  filters: {
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
        3: '限时题',
        4: '抢答题'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10,
        name: null, // 人物名字
        type: null, // 任务类型
        answer_type: null // 答题类型
      },
      list: null,
      listLoading: false,
      domain: 'http://upload.qiniup.com/',
      qiniuAddress: qiniuAddress,
      dialogTaskVisible: false, // 题目弹框
      dialogTaskTitle: '', // 题目弹窗title
      dialogTaskType: '', // 题目弹窗类型
      dialogMap: false, // 地图定位弹窗
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
        answer2: '', // 文字题答案
        answer_url: '',
        score: null,
        answer_limit: 1,
        limit_time: 0
      },
      taskQFileList: [], // 题目问题图片文件列表
      taskAFileList: [], // 题目答案图片文件列表
      dialogTaskImgVisible: false, // 添加任务对话框中图片对话框展示
      dialogTaskImageUrl: '',
      dialogAnswerImageUrl: '',
      dialogAnswerImgVisible: false,
      nineImageUrl: '',
      dialogNineVisible: false
    }
  },
  created() {
    this._fetchList()
  },
  methods: {
    // 打开地图定位
    async handleOpenTenceMap() {
      // const
      this.dialogMap = true
      const cityName = getCityName()
      const vm = this
      this.$nextTick(() => {
        const map = new qq.maps.Map(document.getElementById('map-container'))
        // 通过默认ip获取地址
        const cs = new qq.maps.CityService()
        // 地址和经纬度之间进行转换服务
        const geocoder = new qq.maps.Geocoder()
        // 初始地图显示位置
        if (cityName) {
          geocoder.getLocation(cityName)
        } else {
          cs.setComplete(function(result) {
            console.log(result)
            map.setCenter(result.detail.latLng)
            map.setZoom(13)
          })
          cs.searchLocalCity()
        }
        // 设置标志物
        const marker = new qq.maps.Marker({
          map: map,
          content: '定位地点'
        })
        //设置Marker的可见性，为true时可见,false时不可见，默认属性为true
        marker.setVisible(true)
        //设置Marker的动画属性为从落下
        marker.setAnimation(qq.maps.MarkerAnimation.DOWN)
        // 设置服务请求成功的回调函数
        geocoder.setComplete(function(result) {
          map.setCenter(result.detail.location)
          map.setZoom(13)
          console.log(result)
          //设置标注的名称，当鼠标划过Marker时显示
          let detailAddress = ''
          Object.keys(result.detail.addressComponents).forEach(key => {
            detailAddress += result.detail.addressComponents[key]
          })
          marker.setTitle(detailAddress || result.detail.address)
          marker.setPosition(result.detail.location)
        })
        // 点击地图弹出选择地址
        qq.maps.event.addListener(map, 'click', function(e) {
          const lng = e.latLng.getLng()
          const lat = e.latLng.getLat()
          const coord = new qq.maps.LatLng(lat, lng)
          geocoder.getAddress(coord)
        })
        // 点击marker展示选中的地址
        qq.maps.event.addListener(marker, 'click', function(e) {
          console.log(e)
          vm.$alert(`${e.target.title}`, '定位地点')
        })
      })
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchList()
    },
    taskTypeChange(val) {
      this.taskInfo.answer_type = '1'
      this.taskInfo.answer_limit = 1
    },
    answerTypeChange(value) {
      if (value === '4') {
        this.taskInfo.answer_limit = 1
      }
    },
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchList()
    },
    handleFilter() {
      this._fetchList()
    },
    handleAddTaskLib() {
      this.dialogTaskTitle = '创建题目'
      this.dialogTaskType = 'add'
      this.dialogTaskVisible = true
    },
    handleRemove(file, fileList) {
      this.taskAFileList = fileList
    },
    // 任务图片预览
    handleTaskImgPreview() {
      this.dialogTaskImageUrl = this.taskInfo.question_img
      this.dialogTaskImgVisible = true
    },
    // 答案预览
    handleAnswerImgPreview() {
      this.dialogAnswerImageUrl = this.taskInfo.answer_url
      this.dialogAnswerImgVisible = true
    },
    // 九宫格预览
    handleNineImgPreview(file) {
      this.nineImageUrl = file.url
      this.dialogNineVisible = true
    },
    // 上传任务icon
    handleUpLoadTaksImg(req) {
      const type = 'task'
      this._uploadQiNiu(req, type)
    },
    // 上传answer
    handleUpLoadAnswerImg(req) {
      const type = 'answer'
      this._uploadQiNiu(req, type)
    },
    // 上传九宫格图片
    handleUpLoadNineImg(req) {
      const type = 'nine'
      this._uploadQiNiu(req, type)
    },
    // 关闭题目弹窗
    handleCloseTaskDialog() {
      this.dialogTaskVisible = false
      this._resetTaksForm()
      this._fetchList()
    },
    // 删除题目
    handleDeleteTask(id) {
      this.$confirm('确认删除该题目？')
        .then(async _ => {
          await delTaskLib(id)
          await this._fetchList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(_ => {})
    },
    // 导入题库
    handleFileChange(e) {
      const fileInput = document.querySelector('#fileInput')
      const formData = new FormData()
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      formData.append('file', fileInput.files[0])
      const loadingInstance = Loading.service({ fullscreen: true, text: '导入中' })
      axios.post('/i/topteam/admin/importTaskLib', formData, config).then(res => {
        const data = res.data
        if (data.error_code !== 0) {
          this.$message({ message: data.error_msg, type: 'error' })
        } else {
          this.$message({ message: '导入成功', type: 'success' })
          e.target.value = ''
          this._fetchList()
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      }).catch(e => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      })
    },
    // 导入图片
    handleImgChange(e) {
      const ImgObj = {}
      const ImgInput = document.querySelector('#ImgInput')
      const length = ImgInput.files.length
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      const loadingInstance = Loading.service({ fullscreen: true, text: '导入中' })
      Object.keys(ImgInput.files).forEach(async temp => {
        const item = ImgInput.files[temp]
        const fileType = item.type.split('/')[1]
        const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100) + '.' + fileType
        const token = await this._fetchQiNiuToken()
        const formData = new FormData()
        formData.append('file', item)
        formData.append('token', token)
        formData.append('key', keyname)
        let res = null
        try {
          res = await axios.post(this.domain, formData, config)
        } catch (e) {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close()
          })
        }
        // const res = await axios.post(this.domain, formData, config)
        const url = this.qiniuAddress + '/' + res.data.key
        const name = item.name.split('.')[0]
        ImgObj[name] = url
        if (Object.keys(ImgObj).length === length) {
          const res = await axios.post(
            '/i/topteam/admin/MatchTaskLibPic',
            { match_list: JSON.stringify(ImgObj) }
          )
          if (!res.data.error_code) {
            this.$message({ message: '上传成功', type: 'success' })
            e.target.value = ''
          }
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close()
          })
        }
      })
    },
    // 上传七牛云
    async _uploadQiNiu(req, type) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // 重命名要上传的文件
      const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100) + req.file.name
      const token = await this._fetchQiNiuToken()
      const formData = new FormData()
      formData.append('file', req.file)
      formData.append('token', token)
      formData.append('key', keyname)
      const loadingInstance = Loading.service({ fullscreen: true, text: '上传' })
      axios.post(this.domain, formData, config).then(res => {
        const url = this.qiniuAddress + '/' + res.data.key
        if (type === 'task') {
          this.taskInfo.question_img = url
        }
        if (type === 'answer') {
          this.taskInfo.answer_url = url
        }
        if (type === 'nine') {
          this.taskAFileList.push({
            name: res.data.key.slice(0, 23),
            url: url
          })
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      }).catch(e => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      })
    },
    // 重置任务表单
    _resetTaksForm() {
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
        answer2: '', // 文字题答案
        answer_url: '',
        score: null,
        answer_limit: 1
      }
      this.taskQFileList = []
      this.taskAFileList = []
    },
    // 获取七牛云token
    async _fetchQiNiuToken() {
      const res = await fetchQiNiuToken()
      const { data } = res
      return data
    },
    // 获取题目列表
    async _fetchList() {
      this.listLoading = true
      const res = await fetchTaskLibList(this.listQuery)
      this.total = res.data.total
      this.list = res.data.list
      this.listLoading = false
    },
    // 添加任务
    async handelCreateTaskSubmit() {
      const { name, score, seq } = this.taskInfo
      // 校验必填项
      if (!name || !score || !seq) {
        this.$message({
          message: '必填项不能为空',
          type: 'error'
        })
        return
      }
      const data = Object.assign({}, this.taskInfo)
      data.answer = JSON.stringify(data.answer)
      if (data.type === '1') {
        if (!data.options.A || !data.options.B || !data.options.C || !data.options.D) {
          this.$message({ message: '选项不能为空', type: 'error' })
          return
        }
        if (data.answer === '[]') {
          this.$message({ message: '请填写答案', type: 'error' })
          return
        }
      }
      if (data.type === '3') {
        data.options = []
        this.taskAFileList.forEach(item => {
          data.options.push(item.url)
        })
        if (data.options.length < 9) {
          this.$message({ message: '请上传九张图片', type: 'error' })
          return
        }
        if (data.answer === '[]') {
          this.$message({ message: '请填写答案', type: 'error' })
          return
        }
      }
      data.options = JSON.stringify(data.options)
      if (data.type === '2') {
        if (!data.answer2) {
          this.$message({ message: '答案不能为空', type: 'error' })
          return
        }
        data.answer = data.answer2
      }
      if (data.type === '4') {
        if (!data.answer_url) {
          this.$message({ message: '请上传视频', type: 'error' })
          return
        }
        data.answer = data.answer_url
      }
      if (data.type === '5') {
        if (!data.answer_url) {
          this.$message({ message: '请上传音频', type: 'error' })
          return
        }
        data.answer = data.answer_url
      }
      if (data.type === '6') {
        if (!data.answer_url) {
          this.$message({ message: '请上传拍照图片', type: 'error' })
          return
        }
        data.answer = data.answer_url
      }
      try {
        const res = await addTaskLib(JSON.stringify(data))
        this.$message({ message: '添加成功', type: 'success' })
      } catch (e) {
      }
      this.dialogTaskVisible = false
    },
    // 修改任务字段填充
    handleUpdateTask(row) {
      this.dialogTaskType = 'edit'
      this.dialogTaskTitle = '修改任务'
      this.dialogTaskVisible = true
      // 填充弹窗
      this.taskInfo.id = row.id
      this.taskInfo.name = row.name
      this.taskInfo.type = row.type
      this.taskInfo.desc = row.task_desc
      this.taskInfo.score = row.score
      this.taskInfo.seq = row.seq
      this.taskInfo.answer_limit = row.answer_limit || 1
      this.taskInfo.answer_type = row.answer_type
      if (row.question_img) {
        this.taskInfo.question_img = row.question_img
        this.taskQFileList = [{ name: row.name, url: row.question_img }]
      }
      // 选择题
      if (row.type === '1') {
        this.taskInfo.answer = JSON.parse(row.answer)
        this.taskInfo.options = JSON.parse(row.options)
      }
      // 文字题
      if (row.type === '2') {
        this.taskInfo.answer2 = row.answer
      }
      // 图片题目
      if (row.type === '3') {
        this.taskAFileList = []
        this.taskInfo.answer = JSON.parse(row.answer || '[]')
        this.taskInfo.options = JSON.parse(row.options)
        this.taskInfo.options.forEach((item, index) => {
          this.taskAFileList.push({ name: '图片' + (index + 1), url: item })
        })
      }
      if (row.type === '4' || row.type === '5' || row.type === '6') {
        this.taskInfo.answer_url = row.answer
        this.taskAFileList = [{ name: row.name, url: row.answer }]
      }
    },
    // 修改提交任务
    async handelUpdateTaskSubmit() {
      const { name, score, seq, answer_limit } = this.taskInfo
      if (!name || !score || !seq || !answer_limit) {
        this.$message({ message: '必填项不能为空', type: 'error' })
        return
      }
      const data = Object.assign({}, this.taskInfo)
      if (Array.isArray(data.answer)) {
        data.answer = JSON.stringify(data.answer.sort())
      }
      if (data.type === '1') {
        if (!data.options.A || !data.options.B || !data.options.C || !data.options.D) {
          this.$message({ message: '选项不能为空', type: 'error' })
          return
        }
        if (data.answer === '[]') {
          this.$message({ message: '请填写答案', type: 'error' })
          return
        }
      }
      if (data.type === '3') {
        data.options = []
        this.taskAFileList.forEach(item => {
          data.options.push(item.url)
        })
        console.log(data.options)
        if (data.options.length < 9) {
          this.$message({ message: '请上传九张图片', type: 'error' })
          return
        }
        if (data.answer === '[]') {
          this.$message({ message: '请填写答案', type: 'error' })
          return
        }
      }
      data.options = JSON.stringify(data.options)

      // 文字题
      if (data.type === '2') {
        if (!data.answer2) {
          this.$message({ message: '答案不能为空', type: 'error' })
          return
        }
        data.answer = data.answer2
      }
      if (data.type === '4') {
        if (!data.answer_url) {
          this.$message({ message: '请上传视频', type: 'error' })
          return
        }
        data.answer = data.answer_url
      }
      if (data.type === '5') {
        if (!data.answer_url) {
          this.$message({ message: '请上音频', type: 'error' })
          return
        }
        data.answer = data.answer_url
      }
      // 拍照题
      if (data.type === '6') {
        if (!data.answer_url) {
          this.$message({ message: '请上传拍照图片', type: 'error' })
          return
        }
        data.answer = data.answer_url
      }

      try {
        const res = await updateTaskLib(JSON.stringify(data))
        this.$message({ message: '修改成功', type: 'success' })
      } catch (e) {
      }
      this.dialogTaskVisible = false
    }
  }
}
</script>

<style lang="scss">
.filePicker{
  border-radius: 4px;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background: #00b7ee;
}
.filePicker input[type="file"] {
  position: relative;
  top: -44px;
  left: 0px;
  width: 100px;
  height: 36px;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
  z-index: 0;
}
.filePicker[disabled] {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}

.filePicker input[disabled] {
  cursor: not-allowed;
  background-image: none;
}
.container{
  width: 160px;
  margin: 30px auto;
}
</style>

