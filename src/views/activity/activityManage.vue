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
      <el-button v-if="showable" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateActivity">新增活动</el-button>
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
          <el-button v-if="(scope.row.activity_status === '2' || scope.row.activity_status === '6') && showable" type="primary" size="mini" @click="handleEditActivity(scope.row)">修改</el-button>
          <el-button v-if="scope.row.activity_status !== '1'" size="mini" type="success" @click="handleShowActivityInfo(scope.row)">查看</el-button>
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
      :title="dialogActivityTitle"
      class="aDialog"
      @close="handleCloseDialog">
      <hr >
      <el-form :inline="true" :model="activityInfo" :disabled="dialogFormDisable" class="demo-form-inline">
        <el-form-item label="运营商名">
          <el-input v-model="activityInfo.agentName" disabled />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="activityInfo.type" @change="handleActivityChange">
            <el-option label="团队-基础版" value="1" />
            <el-option label="个人-基础版" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择教练">
          <el-select v-model="activityInfo.coachId" :disabled="!activityInfo.type || activityInfo.type === '2'">
            <el-option v-for="item in coachList" :label="item.name" :value="item.id" :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="activityInfo.name" />
        </el-form-item>
        <el-form-item label="分值形式">
          <el-select v-model="activityInfo.scoreType">
            <el-option label="积分" value="1" />
            <el-option v-if="activityInfo.type === '1'" label="钻石" value="2" />
            <el-option v-if="activityInfo.type === '1'" label="花瓣" value="3" />
            <el-option v-if="activityInfo.type === '1'" label="游戏币" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="可见分数">
          <el-select v-model="activityInfo.scoreShowType" :disabled="!activityInfo.type || activityInfo.type === '2'">
            <el-option label="否" value="1" />
            <el-option label="是" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="起始分值">
          <el-input v-model="activityInfo.score" :disabled="!activityInfo.type || activityInfo.type === '2'" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57"/>
        </el-form-item>
        <el-form-item label="活动时长">
          <el-input v-model="activityInfo.keepTime" :disabled="checkdisabled" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57">
            <div slot="suffix">
              <el-checkbox v-if="activityInfo.type === '2'" v-model="activityInfo.check" @change="handleCheckedChange">长期</el-checkbox>
              (分钟)
            </div>
          </el-input>
        </el-form-item>
        <el-form-item v-if="activityInfo.type === '2'" label="活动价格">
          <el-input v-model="activityInfo.price" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57"/>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-if="activityInfo.type !== '2'"
            v-model="activityInfo.time"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"/>
          <el-time-picker
            v-if="activityInfo.type === '2'"
            v-model="activityInfo.time"
            is-range
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"/>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="activityInfo.actDesc" :autosize="{ minRows: 1 }" class="act-textarea" type="textarea" maxlength="300"/>
        </el-form-item>
        <div>
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
          <el-form-item v-if="activityInfo.type === '2'" label="活动提示">
            <el-upload
              :http-request="handleUpLoadGifImg"
              :on-preview="handleGifCardPreview"
              :limit="1"
              :action="domain"
              :file-list="gifFileList"
              list-type="picture-card"
            >
              <el-button>上传图片</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button v-if="dialogActivitytype === 'add'" type="primary" @click="handleCreateActivitySubmit">创建活动</el-button>
          <el-button v-if="dialogActivitytype === 'edit'" type="primary" @click="handleUpdateActivitySubmit">修改活动</el-button>
        </el-form-item>
      </el-form>
      <hr >
      <div class="job-list">
        <div class="job-title">
          <h3 style="display: inline-block">任务列表</h3>
          <div :disabled="!activityId" class="filePicker" style="float: right">
            <label>导入任务</label>
            <input
              id="fileInput"
              :disabled="!activityId"
              type="file"
              name="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              @change="handleFileChange">
          </div>
          <div :disabled="!activityId" class="filePicker" style="float: right; margin-right: 20px">
            <label>导入图片</label>
            <input
              id="ImgInput"
              :disabled="!activityId"
              type="file"
              name="file"
              multiple
              @change="handleImgChange">
          </div>
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
                <el-button type="primary" @click="handleUpdateTask(scope.row)">修改</el-button>
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
            <el-option v-if="activityInfo.type === '1' || checkInfo.type === '1'" label="文字题" value="2" />
            <el-option label="图片题" value="3" />
            <el-option v-if="activityInfo.type === '1' || checkInfo.type === '1'" label="视频题" value="4"/>
            <el-option v-if="activityInfo.type === '1' || checkInfo.type === '1'" label="语音题" value="5"/>
            <el-option v-if="activityInfo.type === '1' || checkInfo.type === '1'" label="拍照题" value="6"/>
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
            <el-option v-if="taskInfo.type === '1' || taskInfo.type === '3'" label="关卡题" value="2" />
            <el-option v-if="(activityInfo.type === '1' || checkInfo.type === '1') && (taskInfo.type === '1' || taskInfo.type === '3')" label="团队限时题" value="3" />
            <el-option v-if="(activityInfo.type === '1' || checkInfo.type === '1') && (taskInfo.type === '1' || taskInfo.type === '3')" label="活动抢答题" value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="taskInfo.answer_type === '3'" label="答题时间" label-width="100px">
          <el-input v-model="taskInfo.limit_time" type="number">
            <div slot="suffix">(秒)</div>
          </el-input>
        </el-form-item>
        <el-form-item label="题目顺序" label-width="100px">
          <el-input v-model="taskInfo.seq" type="number" />
        </el-form-item>
        <el-form-item label="答题人数" label-width="100px">
          <el-input v-model="taskInfo.answer_limit" :disabled="activityInfo.type === '2' || taskInfo.answer_type === '4' || (taskInfo.type !== '1' && taskInfo.type !== '3')" type="number" />
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
      :visible.sync="dialogCheckVisible"
      class="activityDialog"
      fullscreen
      @close="handleCloseCheckDialog">
      <hr >
      <div slot="title">
        <h3>
          {{ dialogTitle }}
          <el-button v-if="dialogType === 'check'" @click="handelAuditact">不通过</el-button>
          <el-button v-if="dialogType === 'check'" type="primary" @click="handleCheckPass">通过</el-button>
        </h3>
      </div>
      <div class="info clearfix">
        <div class="info-tab-left" style="width: 50%;float: left;">
          <h4>活动信息</h4>
          <el-form v-model="checkInfo">
            <el-form-item label="活动名称" label-width="100px">
              <span>{{ checkInfo.name }}</span>
            </el-form-item>
            <el-form-item label="活动类型" label-width="100px">
              <span>{{ checkInfo.type | activityFilter }}</span>
            </el-form-item>
            <el-form-item label="开始时间" label-width="100px">
              <span>{{ checkInfo.set_start_time | timeFilter }}</span>
            </el-form-item>
            <el-form-item label="结束时间" label-width="100px">
              <span>{{ checkInfo.set_stop_time | timeFilter }}</span>
              <el-button v-if="dialogType === 'edit'" type="primary" @click="handleUpdateActivity">修改活动</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="info-tab-right" style="width: 50%; float: right;">
          <h4>活动二维码</h4>
          <div class="er-img" style="width: 160px; height: 160px; margin: 0 auto; border: 1px solid #ccc; margin-top: 20px;">
            <span v-if="!checkInfo.qcode_url" style="color: red; font-size: 18px;">活动审批完成后创建二维码</span>
            <img :src="checkInfo.qcode_url" alt="" style="height: 158px; width: 158px;">
            <p style="text-align: center; color: red;font-weight: 500;">{{ checkInfo.name }}</p>
          </div>
        </div>
      </div>
      <hr >
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
            <el-table-column v-if="dialogType == 'edit' " label="操作" align="center" min-width="130" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleUpdateTask(scope.row)">修改</el-button>
                <el-button type="danger" @click="handleClickTask(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <!-- 审批不通过弹窗 -->
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
    <!-- 审批不通过弹窗 -->

    <!-- 审批通过弹窗 -->
    <el-dialog
      :visible.sync="dialogPayVisible"
      class="activityDialog"
      title="活动付费(点击确定扫描右侧二维码)"
      @close="handleClosePayDialog">
      <hr >
      <div class="clearfix">
        <div style="float: left">
          <el-form v-model="checkInfo">
            <el-form-item label="支付方式" label-width="100px">
              <el-radio v-model="payType" label="1">微信支付</el-radio>
              <el-radio v-model="payType" label="4">余额支付</el-radio>
            </el-form-item>
            <el-form-item label="活动名称" label-width="100px">
              <span>{{ checkInfo.name }}</span>
            </el-form-item>
            <el-form-item label="活动类型" label-width="100px">
              <span>{{ checkInfo.type | activityFilter }}</span>
            </el-form-item>
            <el-form-item label="活动金额" label-width="100px">
              <span style="color: red">{{ payMoney }}元</span>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button type="primary" @click="handleGetPayEr">确定</el-button>
            <el-button type="primary" @click="handleGobackActivityList">支付完成返回列表</el-button>
          </div>
        </div>
        <div style="float:right; width: 50%;">
          <div class="er" style="height: 180px; width: 180px; margin: 0 auto; margin-top: 40px">
            <img :src="pay_er_img" alt="">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCoachList,
  addActivity,
  fetchActivityList,
  deleteActivity,
  fetchTaskList,
  addTask,
  fetchActivityInfo,
  auditact,
  creatOrder,
  getPayInfo,
  updateActivity,
  delTask,
  editTask } from './../../service/activity'
import { fetchQiNiuToken } from './../../service/common'
import { getAgentName, getAgentId, getPrice, getLevel } from '@/utils/auth'
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
      var date = new Date(timestamp * 1000)// 如果date为10位不需要乘1000
      var Y = date.getFullYear() + '-'
      var M = (+date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (+date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      var h = (+date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (+date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (+date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
  },
  data() {
    return {
      dialogActivityTitle: '', // 活动对话框标题
      dialogActivitytype: '', // 活动对话框类型
      iconFilelist: [],
      bgFileList: [],
      taskQFileList: [],
      taskAFileList: [],
      list: null,
      listLoading: false,
      listQuery: {
        type: null,
        agent_name: null,
        name: null,
        status: null
      },
      activities: [{ label: '团队-基础版', key: 1 }, { label: '个人-基础版', key: 2 }],
      status: [{ label: '待审批', key: '1' }, { label: '准备中', key: '2' }, { label: '进行中', key: '3' }, { label: '暂停中', key: '4' }, { label: '已完成', key: '5' }, { label: '未通过', key: '6' }],
      dialogFormVisible: false, // 添加活动对话框展示
      dialogFormDisable: false, // 添加活动对话框表单禁用
      taskList: [],
      dialogTaskVisible: false, // 添加任务对话框展示
      dialogTaskTitle: '',
      dialogTaskType: '',
      dialogTaskImgVisible: false, // 添加任务对话框中图片对话框展示
      dialogTaskImageUrl: '',
      dialogCheckVisible: false, // 活动审批对话框展示
      dialogTitle: '',
      dialogType: '',
      dialogReasonVisible: false, // reason对话框
      reason: '',
      payMoney: getPrice(),
      dialogPayVisible: false, // 支付弹窗
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
        gif_url: '', // 个人版本gifUrl
        price: '', // 活动价格
        check: '' // 是够长期
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
        answer2: '', // 文字题答案
        answer_url: '',
        score: null,
        answer_limit: 1,
        limit_time: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      dialogAnswerImageUrl: '',
      dialogAnswerImgVisible: false,
      nineImageUrl: '',
      dialogNineVisible: false,
      coachList: [], // 教练列表
      domain: 'http://upload.qiniup.com/',
      qiniuAddress: qiniuAddress,
      checkInfo: {
        name: null,
        type: null,
        set_start_time: null,
        set_stop_time: null,
        money: null
      },
      pay_er_img: null,
      set_start_time: '',
      set_stop_time: '',
      payType: '1',
      gifFileList: [],
      activity: {} // 活动信息
    }
  },
  computed: {
    showable() {
      return (+getLevel()) > 4
    },
    checkdisabled() {
      if (this.activityInfo.check) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    taskTypeChange(val) {
      this.taskInfo.answer_type = '1'
      this.taskInfo.answer_limit = 1
    },
    answerTypeChange(value) {
      if (value === '4') {
        this.taskInfo.answer_limit = 1
      }
      this.taskInfo.limit_time = ''
    },
    handleCheckedChange(value) {
      if (value) {
        this.activityInfo.keepTime = ''
      }
    },
    handleImgChange(e) {
      const ImgObj = {}
      const ImgInput = document.querySelector('#ImgInput')
      const length = ImgInput.files.length
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      Object.keys(ImgInput.files).forEach(async temp => {
        const item = ImgInput.files[temp]
        const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100) + item.name
        const token = await this._fetchQiNiuToken()
        const formData = new FormData()
        formData.append('file', item)
        formData.append('token', token)
        formData.append('key', keyname)

        const res = await axios.post(this.domain, formData, config)
        const url = this.qiniuAddress + '/' + res.data.key
        const name = item.name.split('.')[0]
        ImgObj[name] = url
        if (Object.keys(ImgObj).length === length) {
          const res = await axios.post(
            '/i/topteam/admin/MatchTaskPic',
            { activity_id: this.activityId, match_list: JSON.stringify(ImgObj) }
          )
          if (!res.data.error_code) {
            this.$message({ message: '上传成功', type: 'success' })
            e.target.value = ''
            this._fetchTaskList(this.activityId)
          }
        }
      })
    },
    handleRemove(file, fileList) {
      this.taskAFileList = fileList
    },
    // 活动类型修改
    handleActivityChange(val) {
      if (val === '2') {
        this.activityInfo.price = 10
        this.activityInfo.answer_limit = 1
        this.activityInfo.scoreType = '1'
      }
      this.activityInfo.check = false
      this.activityInfo.coachId = null
    },
    // 导入任务
    handleFileChange(e) {
      const activityId = this.activityId
      const fileInput = document.querySelector('#fileInput')
      const formData = new FormData()
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      formData.append('file', fileInput.files[0])
      formData.append('activity_id', activityId)
      axios.post('/i/topteam/admin/importTask', formData, config).then(res => {
        const data = res.data
        if (data.error_code !== 0) {
          this.$message({ message: data.error_msg, type: 'error' })
        } else {
          this.$message({ message: '导入成功', type: 'success' })
          e.target.value = ''
          this._fetchTaskList(activityId)
        }
      })
    },
    handleFilter() {
      this._fetchActivityList()
    },
    handleCreateActivity() {
      this.dialogFormVisible = true
      this.dialogActivityTitle = '新增活动'
      this.dialogActivitytype = 'add'
    },
    handleBgCardPreview() {
      this.dialogImageUrl = this.activityInfo.bgImgUrl
      this.dialogVisible = true
    },
    handleIconCardPreview() {
      this.dialogImageUrl = this.activityInfo.iconUrl
      this.dialogVisible = true
    },
    handleGifCardPreview() {
      this.dialogImageUrl = this.activityInfo.gif_url
      this.dialogVisible = true
    },
    handleTaskImgPreview() {
      this.dialogTaskImageUrl = this.taskInfo.question_img
      this.dialogTaskImgVisible = true
    },
    handleAnswerImgPreview() {
      this.dialogAnswerImageUrl = this.taskInfo.answer_url
      this.dialogAnswerImgVisible = true
    },
    handleNineImgPreview(file) {
      this.nineImageUrl = file.url
      this.dialogNineVisible = true
    },
    handleUpLoadBgImg(req) {
      const type = 'bgImg'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadIconImg(req) {
      const type = 'icon'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadGifImg(req) {
      const type = 'gif'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadTaksImg(req) {
      const type = 'task'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadAnswerImg(req) {
      const type = 'answer'
      this._uploadQiNiu(req, type)
    },
    handleUpLoadNineImg(req) {
      const type = 'nine'
      this._uploadQiNiu(req, type)
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
      if (!data.limit_time) {
        delete data.limit_time
      }
      try {
        const res = await editTask(JSON.stringify(data))
        this.$message({ message: '修改成功', type: 'success' })
        this.dialogTaskVisible = false
        this._fetchTaskList(this.activityId)
      } catch (e) {
      }
      
    },
    // 修改任务
    handleUpdateTask(row) {
      console.log(row)
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
      this.taskInfo.answer_limit = row.answer_limit
      this.taskInfo.answer_type = row.answer_type
      this.taskInfo.limit_time = row.limit_time
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
        console.log(1111111111)
        this.taskInfo.answer = JSON.parse(row.answer || "[]")
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
    // 支付完成返回列表
    handleGobackActivityList() {
      this.handleClosePayDialog()
      this.handleCloseCheckDialog()
    },
    // 获取支付二维码
    async handleGetPayEr() {
      let str
      if (this.checkInfo.type === '1') {
        str = 'team'
      } else if (this.checkInfo.type === '2') {
        str = 'person'
      }
      const res = await creatOrder({ type_id: this.activityId, order_type: str })
      const { data } = res
      if (this.payType === '1') {
        this.pay_er_img = `/i/topteam/api/getpayinfo?order_sn=${data.order_sn}&pay_type=1`
      } else if (this.payType === '4') {
        try {
          const response = await getPayInfo({ order_sn: data.order_sn, pay_type: this.payType })
          this.$message({ message: '支付成功', type: 'success' })
          this.handleClosePayDialog()
        } catch (e) {}
      }
    },
    // 打开活动通过弹窗
    handleCheckPass() {
      this.dialogPayVisible = true
    },
    // 关闭活动付费弹窗
    handleClosePayDialog() {
      this.dialogPayVisible = false
      this.pay_er_img = ''
      this.payType = '1'
    },
    // 打开审批不通过弹窗
    handelAuditact() {
      this.dialogReasonVisible = true
    },
    // 修改活动
    async handleUpdateActivity() {
      this.dialogActivityTitle = '修改活动'
      this.dialogFormVisible = true
      this.dialogActivitytype = 'edit'
      const {
        agent_name, agent_id, act_desc, set_start_time, score,
        set_stop_time, activity_status, type, coach_id, name,
        score_type, score_show_type, keep_time, money, bg_img,
        icon, gif_url
      } = this.activity

      this.activityInfo.score = score
      this.activityInfo.agentName = agent_name // 运营商名
      this.activityInfo.type = type
      this.activityInfo.agent_id = agent_id
      this.activityInfo.coachId = coach_id
      this.activityInfo.name = name
      this.activityInfo.scoreType = score_type
      this.activityInfo.scoreShowType = score_show_type
      this.activityInfo.keepTime = keep_time
      if (keep_time === '0') { this.activityInfo.check = true }
      this.activityInfo.price = money / 100
      this.activityInfo.time = [set_start_time * 1000, set_stop_time * 1000]
      this.activityInfo.actDesc = act_desc
      this.activityInfo.bgImgUrl = bg_img
      bg_img && (this.bgFileList = [{ name: '活动背景图', url: bg_img }])
      this.activityInfo.iconUrl = icon
      icon && (this.iconFilelist = [{ name: '活动封面图', url: icon }])
      this.activityInfo.gif_url = gif_url
      gif_url && (this.gifFileList = [{ name: 'gif', url: gif_url }])

      if (this.activityInfo.type === '2') {
        this.activityInfo.coachId = null
        this.activityInfo.scoreShowType = null
      }

      this.activityInfo = Object.assign({}, this.activityInfo)
    },
    // 打开修改弹窗
    async handleEditActivity(row) {
      this.activityId = row.id
      const res = await fetchActivityInfo({ act_id: row.id })
      await this._fetchTaskList(row.id)
      const { data } = res
      this.activity = data
      const { name, type, set_start_time, set_stop_time, money, qcode_url } = data
      this.checkInfo = { name, type, money, qcode_url }
      this.checkInfo.set_start_time = set_start_time
      this.checkInfo.set_stop_time = set_stop_time
      this.dialogCheckVisible = true
      this.dialogTitle = '活动修改'
      this.dialogType = 'edit'
    },
    // 打开查看弹窗
    async handleShowActivityInfo(row) {
      this.activityId = row.id
      const res = await fetchActivityInfo({ act_id: row.id })
      await this._fetchTaskList(row.id)
      const { data } = res
      const { name, type, set_start_time, set_stop_time, money, qcode_url } = data
      this.checkInfo = { name, type, set_start_time, set_stop_time, money, qcode_url }
      this.dialogCheckVisible = true
      this.dialogTitle = '活动查看'
      this.dialogType = 'show'
    },
    // 打开审批活动弹窗
    async handleCheckActivity(row) {
      this.activityId = row.id
      const res = await fetchActivityInfo({ act_id: row.id })
      await this._fetchTaskList(row.id)
      const { data } = res
      const { name, type, set_start_time, set_stop_time, money } = data
      this.checkInfo = { name, type, set_start_time, set_stop_time, money }
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
      if (this.dialogActivitytype === 'add') {
        this.activityId = null
        this.taskList = []
        this._resetActivityInfo()
        this._fetchActivityList()
      }
      if (this.dialogActivitytype === 'edit') {
        this._resetActivityInfo()
      }
    },
    // 打开添加任务对话框
    handleOpenTaskDialog() {
      this.dialogTaskType = 'add'
      this.dialogTaskTitle = '添加任务'
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
      this.activityId = null
      this.taskList = []
      this._resetActivityInfo()
      this._restCheckInfo()
      this._fetchActivityList()
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
    // 删除任务
    handleClickTask(id) {
      this.$confirm('确认删除该任务？')
        .then(async _ => {
          await delTask(id)
          await this._fetchTaskList(this.activityId)
          this.$message({ message: '删除成功', type: 'success' })
        })
        .catch(_ => {
        })
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
      // 重命名要上传的文件
      const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100)
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
        if (type === 'gif') {
          this.activityInfo.gif_url = url
        }
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
    // 修改活动
    async handleUpdateActivitySubmit() {
      const data = {}
      const {
        time, name, keepTime, score, coachId,
        actDesc, scoreType, scoreShowType, type, bgImgUrl, iconUrl, price, check, gif_url, agent_id
      } = this.activityInfo
      if (type === '1') {
        if (!time.length || !name || !keepTime || !score || !coachId || !type) {
          this.$message({ message: '必填项不能为空', type: 'error' })
          return
        }
      } else {
        if (!time.length || !name || !type || !bgImgUrl || !iconUrl) {
          this.$message({ message: '必填项不能为空', type: 'error' })
          return
        }
        data.gif_url = gif_url
      }

      data.set_start_time = time[0] / 1000
      data.set_stop_time = time[1] / 1000

      data.agent_id = agent_id
      data.act_id = this.activityId

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
      // 长期时间
      if (check) {
        data.keep_time = 0
      }
      // 个人版本
      if (data.type === '2') {
        data.score = 0
        data.coach_id = 0
        data.score_show_type = 0
      }
      // 团队版本
      if (data.type === '1') {
        data.money = 0
      }

      try {
        await updateActivity(data)
        // 创建活动成功form禁用
        this.dialogFormDisable = true
        this.$message({ message: '修改成功', type: 'success' })
        const res = await fetchActivityInfo({ act_id: data.act_id })
        const { name, type, set_start_time, set_stop_time, money, qcode_url } = res.data
        this.checkInfo = { name, type, money, qcode_url }
        this.set_start_time = set_start_time * 1000
        this.set_stop_time = set_stop_time * 1000
        this.checkInfo.set_start_time = set_start_time
        this.checkInfo.set_stop_time = set_stop_time
      } catch (e) {
      }
    },
    // 创建活动
    async _addActivity() {
      const data = {}
      const {
        time, name, keepTime, score, coachId,
        actDesc, scoreType, scoreShowType, type, bgImgUrl, iconUrl, price, check, gif_url
      } = this.activityInfo
      if (type === '1') {
        if (!time.length || !name || !keepTime || !score || !coachId || !type) {
          this.$message({ message: '必填项不能为空', type: 'error' })
          return
        }
      } else {
        if (!time.length || !name || !type || !price || !bgImgUrl || !iconUrl) {
          this.$message({ message: '必填项不能为空', type: 'error' })
          return
        }
        data.gif_url = gif_url
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
      // 长期时间
      if (check) {
        data.keep_time = 0
      }
      // 个人版本
      if (data.type === '2') {
        data.score = 0
        data.coach_id = 0
        data.score_show_type = 0
      }
      // 团队版本
      if (data.type === '1') {
        data.money = 0
      }

      try {
        const res = await addActivity(data)
        // 创建活动成功form禁用
        this.dialogFormDisable = true
        // 创建活动成功保存活动id
        this.activityId = res.data
        await this._fetchTaskList(res.data)
        this.$message({ message: '创建成功', type: 'success' })
      } catch (e) {
        // 添加活动失败隐藏添加弹窗
        this.handleCloseDialog()
        await this._fetchActivityList()
      }
    },
    // 添加任务
    async handelCreateTaskSubmit() {
      const activityId = this.activityId
      const { name, score, seq } = this.taskInfo
      if (!name || !score || !seq) {
        this.$message({
          message: '必填项不能为空',
          type: 'error'
        })
        return
      }
      const data = Object.assign({}, this.taskInfo, { activity_id: activityId })
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
      if (!data.limit_time) {
        delete data.limit_time
      }
      try {
        const res = await addTask(JSON.stringify(data))
        this.$message({ message: '添加成功', type: 'success' })
        this.dialogTaskVisible = false
        this._fetchTaskList(activityId)
      } catch (e) {
      }
      
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
        price: '', // 活动价格
        check: '', // 是够长期
        gif_url: ''
      }
      this.iconFilelist = []
      this.bgFileList = []
      this.gifFileList = []
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
        answer2: '',
        answer_url: '',
        score: null,
        answer_limit: 1,
        limit_time: ''
      }
      this.taskQFileList = []
      this.taskAFileList = []
    },
    _restCheckInfo() {
      this.checkInfo = {
        name: null,
        activity_status: null,
        set_start_time: null,
        set_stop_time: null,
        money: null
      }
      this.set_start_time = ''
      this.set_stop_time = ''
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
.act-textarea .el-textarea__inner{
  width: 400px;
}
.clearfix::after {
  display: block;
  content: '';
  overflow: hidden;
  height: 0;
  clear: both;
}

.aDialog .el-dialog, .aDialog .el-dialog__body{
  width: 900px;
}
.clearfix::after {
  display: block;
  content: '';
  overflow: hidden;
  height: 0;
  clear: both;
}
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

