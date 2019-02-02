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
      <el-select v-model="listQuery.person_coach" placeholder="是否指定教练" clearable style="width: 200px" class="filter-item" @change="handleFilter" >
        <el-option key="1" label="是" value="1"/>
        <el-option key="2" label="否" value="2"/>
      </el-select>
      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-if="showable" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreateActivity">新增活动</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      :filter-method="filterMethod"
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
          <el-button v-if="(scope.row.activity_status === '2' || scope.row.activity_status === '6' || scope.row.activity_status === '-1') && showable" type="primary" size="mini" @click="handleEditActivity(scope.row)">修改</el-button>
          <el-button v-if="scope.row.activity_status !== '1'" size="mini" type="success" @click="handleShowActivityInfo(scope.row)">查看</el-button>
          <el-button v-if="scope.row.activity_status === '1' && level === '2'" size="mini" @click="handleCheckActivity(scope.row)">去审批</el-button>
          <el-button v-if="scope.row.activity_status === '1' && (level === '5' || level === '6')" size="mini" @click="handleDismissActivity(scope.row)">撤销</el-button>
          <el-button
            v-if="scope.row.activity_status === 5 || scope.row.activity_status === '6'"
            size="mini"
            type="danger"
            @click="handleDeleteActivity(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 新增活动对话框 start -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogActivityTitle"
      class="aDialog"
      top="8vh"
      @close="handleCloseDialog">
      <hr >
      <el-form :inline="true" :model="activityInfo" :disabled="dialogFormDisable" class="demo-form-inline">
        <el-form-item label="运营商名">
          <el-input v-model="activityInfo.agentName" disabled style="width: 195px"/>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="activityInfo.name" style="width: 195px" />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="activityInfo.type" @change="handleActivityChange" :disabled="dialogActivitytype === 'edit'">
            <el-option label="团队-基础版" value="1" />
            <el-option label="个人-基础版" value="2" />
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="起始分值">
          <el-input v-model="activityInfo.score" :disabled="!activityInfo.type || activityInfo.type === '2'" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57" style="width: 195px"/>
        </el-form-item>
        <el-form-item label="可见分数">
          <el-select v-model="activityInfo.scoreShowType" :disabled="!activityInfo.type || activityInfo.type === '2'">
            <el-option label="否" value="1" />
            <el-option label="是" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="分值形式">
          <el-select v-model="activityInfo.scoreType">
            <el-option label="积分" value="1" />
            <el-option v-if="activityInfo.type === '1'" label="钻石" value="2" />
            <el-option v-if="activityInfo.type === '1'" label="花瓣" value="3" />
            <el-option v-if="activityInfo.type === '1'" label="游戏币" value="4" />
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="需要教练">
          <el-select v-model="needCoach" :disabled="activityInfo.type !== '2'" @change="coachNeed">
            <el-option label="是" value="1"/>
            <el-option label="否" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="选择教练">
          <el-select v-model="activityInfo.coachId" :disabled="needCoach === '2'" :clearable="!(dialogActivitytype === 'edit' && activityInfo.coachId)">
            <el-option v-for="item in coachList" :label="item.name" :value="item.id" :key="item.id" />
          </el-select>
        </el-form-item>
        <br />

        <el-form-item label="长期活动">
          <el-select v-model="longTime" :disabled="activityInfo.type !== '2' || needCoach == 1 || needCoach == 2" @change="activityInfo.keepTime = ''">
            <el-option label="是" value="1"/>
            <el-option label="否" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时长">
          <el-input v-model="activityInfo.keepTime" :disabled="checkdisabled" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57">
            <div slot="suffix">
              (分钟)
            </div>
          </el-input>
        </el-form-item>
        <br />

        <el-form-item label="采集信息" v-if="activityInfo.coachId && activityInfo.type === '2'">
          <el-select v-model="needTpl" :disabled="activityInfo.type !== '2'" @change="activityInfo.tplId = null">
            <el-option label="是" value="1"/>
            <el-option label="否" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="信息模板" v-if="activityInfo.coachId && activityInfo.type === '2'">
          <el-select v-model="activityInfo.tplId" :disabled="needTpl === '2'">
            <el-option v-for="item in tplList" :label="item.name" :value="item.id" :key="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="activityInfo.type === '2'" label="活动价格">
          <el-input v-model="activityInfo.price" onkeypress="return event.keyCode ? event.keyCode>=48 && event.keyCode<=57 : event.which >= 48 && event.which <= 57"/>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-if="activityInfo.type !== '2' || longTime === '2'"
            v-model="activityInfo.time"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"/>
          <el-time-picker
            v-if="activityInfo.type === '2' && longTime === '1'  "
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
        <div style="textAlign: center">
          <el-button v-if="dialogActivitytype === 'add'" type="primary" @click="handleCreateActivitySubmit">创建活动并下一步</el-button>
          <el-button v-if="dialogActivitytype === 'edit'" type="primary" @click="handleUpdateActivitySubmit">修改活动并下一步</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 新增活动对话框 end -->

    <!-- 题目列表添加弹窗 start -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogAddTaskVisible"
      :title="dialogActivityTitle"
      class="aDialog"
      top="8vh"
      @close="handleCloseAddTaskDialog">
      <div class="job-list">
        <div class="job-title">
          <h3 style="display: inline-block">任务列表</h3>

          <div class="filePicker" style="float: right">
            <label>导入任务</label>
            <input
              id="fileInput"
              type="file"
              name="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              @change="handleFileChange">
          </div>
          <div class="filePicker" style="float: right; margin-right: 20px">
            <label>导入图片</label>
            <input
              id="ImgInput"
              type="file"
              name="file"
              multiple
              accept="image/*,vedio/*,audio/*"
              @change="handleImgChange">
          </div>
          <el-button type="primary" style="float: right; margin-right: 20px;" @click="handleOpenTaskDialog">添加任务</el-button>
          <el-button type="success" style="float: right; margin-right: 20px;" @click="handleOpenSubjectList">题库导入</el-button>
        </div>
        <div class="job-table">
          <el-table
            :data="taskList"
            border
            fit
            highlight-current-row
            height="500"
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
                <span v-html="scope.row.task_desc"></span>
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
            <el-table-column label="操作" align="center" min-width="230" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleChangeTaskSort(scope.row, 'up')">上移</el-button>
                <el-button size="mini" @click="handleChangeTaskSort(scope.row, 'down')">下移</el-button>
                <el-button size="mini" type="primary" @click="handleUpdateTask(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="marginTop: 20px; textAlign: center">
          <el-button type="primary" @click="handleSaveTaskList">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 题目列表添加弹窗 end -->

    <!-- 新增题目对话框 start -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogTaskVisible"
      :title="dialogTaskTitle"
      class="activityDialog"
      top="8vh"
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
            <el-option v-if="activityInfo.coachId" label="视频题" value="4"/>
            <el-option v-if="activityInfo.coachId" label="语音题" value="5"/>
            <el-option v-if="activityInfo.coachId" label="拍照题" value="6"/>
            <el-option label="游戏题" value="7" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目选项" label-width="100px" v-if="taskInfo.type === '7'">
          <el-select v-model="taskInfo.game_id" placeholder="请选择">
            <el-option
              v-for="item in gameList"
              :key="item.id"
              :label="item.game_name"
              :value="item.id">
              <span style="float: left">{{ item.game_name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ Number(item.money) === 0 ? '免费' :'¥' + item.money  }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目描述" label-width="100px">
          <!-- <el-input v-model="taskInfo.desc" type="textarea" /> -->
          <quill-editor 
            v-model="taskInfo.desc"
            ref="myQuillEditor"
            :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item v-if="taskClassfiyList.length" label="题目分类" label-width="100px">
          <el-select v-model="taskInfo.classification">
            <el-option label="默认" value="0" />
            <el-option v-for="item in taskClassfiyList" :label="item.name" :value="item.id" :key="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="题目分值" label-width="100px">
          <el-input v-model="taskInfo.score" type="number" />
        </el-form-item>
        <el-form-item label="答题类型" label-width="100px">
          <el-select v-model="taskInfo.answer_type" :disabled="dialogTaskType === 'edit'" @change="answerTypeChange">
            <el-option label="普通题" value="1" />
            <el-option v-if="taskInfo.type === '1' || taskInfo.type === '2' || taskInfo.type === '3'" label="关卡题" value="2" />
            <el-option v-if="(activityInfo.coachId) && (taskInfo.type === '1' || taskInfo.type === '2' || taskInfo.type === '3')" label="限时题" value="3" />
            <el-option v-if="(activityInfo.coachId) && (taskInfo.type === '1' || taskInfo.type === '2' || taskInfo.type === '3')" label="抢答题" value="4"/>
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
        <el-form-item label="题目批次" label-width="100px">
          <el-input v-model="taskInfo.batch_number" type="number" />
        </el-form-item>
        <el-form-item label="答题人数" label-width="100px">
          <el-input v-model="taskInfo.answer_limit" :disabled="activityInfo.type === '2' || taskInfo.answer_type === '4' || checkInfo.type === '2'" type="number" />
        </el-form-item>
        <el-form-item label="题目图片" label-width="100px">
          <el-upload
            :http-request="handleUpLoadTaksImg"
            :on-preview="handleTaskImgPreview"
            :limit="1"
            :action="domain"
            :file-list="taskQFileList"
            list-type="picture-card"
            accept="image/jpeg,image/gif,image/png"
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
            <el-input v-for="(item, index) in taskInfo.options" :key="index" v-model="taskInfo.options[index]" placeholder="请输入选项内容">
              <template slot="prepend" style="width: 51px">{{index}}</template>
              <template slot="suffix">
                <el-button size="mini" type="primary" style="margin-top: 4px" v-if="index === lastKey" @click="handleClickOption(index)">删除</el-button>
              </template>
              <template slot="append">
                <el-checkbox :checked="taskInfo.answer.indexOf(index) !== -1" @change="(value) => {handleCheckBoxChange(value, index)}">是否为正确答案</el-checkbox>
              </template>
            </el-input>
            <!-- <el-input v-model="taskInfo.options.A" placeholder="请输入选项内容">
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
            </el-input> -->
            <el-button @click="handleAddNewLine" style="margin-top:10px">添加一行</el-button>
          </el-form-item>
          <!-- <el-form-item label="答案" label-width="100px">
            <el-checkbox-group v-model="taskInfo.answer">
              <el-checkbox label="A"/>
              <el-checkbox label="B"/>
              <el-checkbox label="C"/>
              <el-checkbox label="D"/>
            </el-checkbox-group>
          </el-form-item> -->
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
              accept="image/jpeg,image/gif,image/png"
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
              accept="video/mp4,video/ogg,video/flv,video/avi,video/wmv,video/rmvb"
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
              accept="audio/*"
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
              accept="image/jpeg,image/gif,image/png"
            >
              <el-button>上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-dialog :visible.sync="dialogAnswerImgVisible">
            <img :src="dialogAnswerImageUrl" width="100%" alt="">
          </el-dialog>
        </template>

        <!-- 选择定位 -->
        <el-form-item label="定位" label-width="100px">
          <span>{{ locationName || locationName1 }}</span>
          <el-button type="primary" @click="handleOpenTenceMap">选择定位</el-button>
          <el-button @click="handleDeleteLocation" v-if="locationName1">删除定位</el-button>
          <p style="color: #f573c1; margin-top: 0;">注：选择定位后，只有到达指定位置才能回答此题</p>
        </el-form-item>

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
      :visible.sync="dialogCheckVisible"
      class="activityDialog"
      fullscreen
      top="8vh"
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
                <span v-html="scope.row.task_desc"></span>
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
      :close-on-click-modal="false"
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
      :close-on-click-modal="false"
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
    <!-- 审批通过弹窗 -->

    <!-- 题库列表弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogTaskList"
      class="taskListDialog"
      title="题库导入"
      @close="handleCloseTaskList">
      <el-table
        :data="tasklistData"
        style="width: 100%"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="题目标题" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="答案" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.answer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="题目类型" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分值" width="95" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column label="答题类型" align="center" width="95">
          <template slot-scope="scope">
            <span>{{ scope.row.answer_type | answerTypeFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination :current-page="taskListQuery.page_no" :page-size="taskListQuery.page_size" :total="taskTotal" background @current-change="handleaTaskCurrentChange"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseTaskList">取 消</el-button>
        <el-button type="primary" @click="handleSubmitLibTask">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 题库列表弹窗 -->

    <!-- 选择定位弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogMap"
      title="选择定位"
      class="activityDialog">
      <div class="search-area">
        <el-input placeholder="请输入地址（如需搜索城市请加上城市所在上级地址）" v-model="searchLocation" style="width: 400px; margin-bottom: 10px;"/>
        <el-button type="primary" @click="handleSearchLocation">搜索</el-button>
      </div>
      <div class="search-area">
        <el-input placeholder="请输入纬度" maxlength="10" v-model="serch_lat" style="width: 198px; margin-bottom: 10px;"/>
        <el-input placeholder="请输入经度" maxlength="10" v-model="serch_lng" style="width: 198px; margin-bottom: 10px;"/>
        <el-button type="primary" @click="handleSearchLocation_byLatLng">定位</el-button>
      </div>
      <div id="map-container" style="width: 100%; height: 500px;"/>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" @click="handleSaveLocation">保存定位</el-button>
      </div>
    </el-dialog>
    <!-- 选择定位弹窗 -->
    <!-- 进度条 -->
    <div id="progress" v-if='is_progress' class="progress_wrap">
      <div class="progress_wraps">
        <div class="progress_bg"></div>
        <div class="progress_content">
          <el-progress  :percentage='jindu' type="circle"></el-progress>
          <div style="text-align: center;">{{ img_num }} / {{ img_nums }}</div>
        </div>
      </div>
    </div>
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
  editTask,
  fetchTaskLibList,
  chooseTasklib,
  getTacskClassifyList,
  cancelact,
  moveTask,
  gameList } from './../../service/activity'
import { getTemplateList } from './../../service/role'
import { fetchQiNiuToken } from './../../service/common'
import { getAgentName, getAgentId,
  getPrice, getLevel, getCityName, getCityIp } from '@/utils/auth'
import { qiniuAddress } from './../../config'
import axios from 'axios'
import waves from '@/directive/waves' // 水波纹指令
import { Loading } from 'element-ui'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'ActivityManage',
  directives: {
    waves
  },
  components: {
      quillEditor
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '-1': '已撤销',
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
        6: '拍照题',
        7: '游戏题'
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
      img_num: 0,
      img_nums: 0,
      editorOption:{
        modules:{
            toolbar:[
              ['bold','italic',{ 'color': [] },'clean']
            ]
        }
      },
      jindu:0,
      is_progress:false,
      needCoach: "1",
      longTime: "2",
      needTpl: "2",
      taskCheckedList: [],
      taskTotal: 0,
      taskListQuery: {
        page_no: 1,
        page_size: 10
      },
      tasklistData: [],
      dialogTaskList: false,
      dialogActivityTitle: '', // 活动对话框标题
      dialogActivitytype: '', // 活动对话框类型
      iconFilelist: [],
      bgFileList: [],
      taskQFileList: [],
      taskAFileList: [],
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10,
        type: null,
        agent_name: null,
        name: null,
        status: null,
        person_coach: null
      },
      activities: [{ label: '团队-基础版', key: 1 }, { label: '个人-基础版', key: 2 }],
      status: [{ label: '已撤销', key: '-1' }, { label: '待审批', key: '1' }, { label: '准备中', key: '2' }, { label: '进行中', key: '3' }, { label: '暂停中', key: '4' }, { label: '已完成', key: '5' }, { label: '未通过', key: '6' }],
      dialogFormVisible: false, // 添加活动对话框展示
      dialogFormDisable: false, // 添加活动对话框表单禁用
      dialogAddTaskVisible: false,
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
        tplId: '',
        check: '' // 是够长期
      },
      activityId: null,
      dialogMap: false, // 地图定位弹窗
      chooseLocation: [], // 选择的经纬度
      locationName1: '',
      taskInfo: {
        name: null,
        type: '1',
        desc: null,
        answer_type: '1',
        seq: null,
        batch_number: 1,
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
        limit_time: '',
        classification: '0',
        location_point: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      dialogAnswerImageUrl: '',
      dialogAnswerImgVisible: false,
      nineImageUrl: '',
      dialogNineVisible: false,
      coachList: [], // 教练列表,
      tplList: [], // 采集信息模板列表
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
      activity: {}, // 活动信息
      level: getLevel(),
      taskClassfiyList: [], // 题目分类
      searchLocation: '', // 搜索地址
      searchService: null,        // 地图实例
      cityService: null, //城市服务实例
      serch_lat: '',
      serch_lng: '',
      gameList: []
    }
  },
  computed: {
    showable() {
      return (+getLevel()) > 4
    },
    checkdisabled() {
      if (this.longTime === '1') {
        return true
      } else {
        return false
      }
    },
    locationName() {
      // 地址和经纬度之间进行转换服务
      const geocoder = new qq.maps.Geocoder()
      const coord = this.taskInfo.location_point ? this.taskInfo.location_point.split(',') : ''
      if (!coord || !coord.length) {
        return '暂无定位'
      }
      const lat = coord[0]
      const lng = coord[1]

      const location = new qq.maps.LatLng(lat, lng)
      geocoder.getAddress(location)

      const vm = this
      geocoder.setComplete(function(result) {
        let detailAddress = ''
        Object.keys(result.detail.addressComponents).forEach(key => {
          detailAddress += result.detail.addressComponents[key]
        })
        vm.locationName1 = detailAddress
      })
      return vm.locationName1
    },
    optionsLength() {
      return Object.keys(this.taskInfo.options).length
    },
    lastKey() {
      return Object.keys(this.taskInfo.options)[this.optionsLength - 1]
    }
  },
  created() {
    this.init()
  },
  methods: {
    filterMethod (value, row, column) {
      console.log(1)
    },
    async getGameList() {
      this.gameList = []
      let data = {}
      let result = await gameList(data)
      let list = result.data ? result.data : []
      list.forEach(item => {
        if (Number(item.status) === 1) {
          this.gameList.push(item)
        }
      })
    },
    coachNeed() {
      this.activityInfo.coachId = null
      this.needCoach === '1' ? this.longTime = '2' : this.longTime = '1'
    },
    // 删除定位
    handleDeleteLocation() {
      this.taskInfo.location_point = ''
      this.chooseLocation = []
      this.locationName1 = ''
    },
    //任务上移下移
    async handleChangeTaskSort(item, type) {
      console.log(item, type)
      const typeNum = 1
      if (type === 'up') {
        type = 1
      }
      if (type === 'down') {
        type = 2
      }
      try {
        await moveTask(item.id, type)
      } catch(e) {
      }
      this._fetchTaskList(this.activityId)
    },
    handleConsole(item) {
      console.log(this.taskInfo.answer)
      return this.taskInfo.answer.indexOf(item) !== -1
    },
    handleAddNewLine() {
      if(this.lastKey === 'Z') {
        this.$message({ message: '不能再增加选项啦~', type: 'error' })
        return
      }
      console.log(typeof this.lastKey)
      let charNum = this.lastKey.charCodeAt()
      ++charNum
      console.log(charNum)
      const newKey = String.fromCharCode(charNum)
      console.log(newKey)
      this.$set(this.taskInfo.options, newKey, null)
      console.log(this.taskInfo.options)
    },
    // 删除最后一行
    handleClickOption(index) {
      if (this.optionsLength === 1) {
        this.$message({message: '不能再删啦~'})
        return
      }
      this.$delete(this.taskInfo.options, index)
      console.log(this.taskInfo.options)
    },
    // 选中答案
    handleCheckBoxChange(value, index) {
      // 选中并且答案不存在
      if (value && !(this.taskInfo.answer.indexOf(index) >= 0)) {
        this.taskInfo.answer.push(index)
      }
      // 未选中，并且答案已存在
      if (!value && this.taskInfo.answer.indexOf(index) >= 0 ) {
        const answer = []
        this.taskInfo.answer.forEach(item => {
          if (item !== index) {
            answer.push(item)
          }
        })
        this.taskInfo.answer = answer
      }
    },
    handleSearchLocation() {
      if (!this.searchLocation.trim()) {
        this.searchLocation = ''
        this.$message({ message: '地址不能为空', type: 'error' })
      }
      this.searchService.search(this.searchLocation)
    },
    //根据经纬度定位
    handleSearchLocation_byLatLng() {
      let reg=/^[0-9]+.?[0-9]*$/
      if(!reg.test(this.serch_lat) || !reg.test(this.serch_lng)) {
          this.$message({ message: '请输入数字经纬度', type: 'error' })
      } else {
        //设置经纬度信息
        let latLng = new qq.maps.LatLng(this.serch_lat, this.serch_lng);
        //调用城市经纬度查询接口实现经纬查询
        this.cityService.searchCityByLatLng(latLng);
      }
    },
    handleSaveLocation() {
      this.$set(this.taskInfo, 'location_point', this.chooseLocation.join())
      // this.taskInfo.location_point = this.chooseLocation.join()
      this.dialogMap = false
    },
    // 打开地图定位
    async handleOpenTenceMap() {
      // 首次打开弹窗清空选择定位
      this.chooseLocation = []
      this.searchLocation = ''

      this.dialogMap = true
      let cityName = getCityName()
      let cityIp = getCityIp()  //获得ip,以ip定位
      const vm = this
      let first = true
      this.$nextTick(() => {
        const map = new qq.maps.Map(document.getElementById('map-container'))

        // 设置搜索服务
        const searchService = new qq.maps.SearchService({
          complete: function(results) {
            if (results.type === 'CITY_LIST' && results.detail.cities.length > 0) {
              vm.$message({message: '请输入详细地址', type: 'error'})
              return
            }
            //设置回调函数参数
            const pois = results.detail.pois;

            const latlngBounds = new qq.maps.LatLngBounds();

            for (var i = 0, l = pois.length; i < l; i++) {
              var poi = pois[i]
              //扩展边界范围，用来包含搜索到的Poi点
              latlngBounds.extend(poi.latLng)
            }
            //调整地图视野
            map.fitBounds(latlngBounds)
            map.setZoom(16)
          },
          //若服务请求失败，则运行以下函数
          error: function() {
            vm.$message({ message: '没有搜索到该位置', type: 'error' })
            vm.searchLocation = ''
          }
        })

        // 设置城市服务
        const vm = this
        const cityService = new qq.maps.CityService({
          map: map,
          complete: function (result) {
            const { lat, lng } = result.detail.latLng
            vm.chooseLocation.push(lat)
            vm.chooseLocation.push(lng)
            map.setZoom(18)
            map.setCenter(result.detail.latLng);
            marker.setPosition(result.detail.latLng)
            console.log(result.detail.latLng)
          }
        })
        // 保存搜索服务实例
        this.searchService = searchService
        // 保存设置城市服务实例
        this.cityService = cityService

        // 地址和经纬度之间进行转换服务
        const geocoder = new qq.maps.Geocoder()
        // 初始地图显示位置
        if (cityIp && !this.taskInfo.location_point) {
          cityService.searchCityByIP(cityIp)
          console.log(cityIp)
        } else if(this.taskInfo.location_point) {
          first = false
          const lat = this.taskInfo.location_point.split(',')[0]
          const lng = this.taskInfo.location_point.split(',')[1]
          this.chooseLocation.push(lat)
          this.chooseLocation.push(lng)
          const location = new qq.maps.LatLng(lat, lng)
          geocoder.getAddress(location)
        } else {
          first = false
          this.$message({
            message: '该运营商没有设置城市',
            type: 'error'
          })
          return
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
          map.setZoom(16)
          //设置标注的名称，当鼠标划过Marker时显示
          let detailAddress = ''
          Object.keys(result.detail.addressComponents).forEach(key => {
            detailAddress += result.detail.addressComponents[key]
          })
          if (!first) {
            marker.setTitle(detailAddress || result.detail.address)
            marker.setPosition(result.detail.location)
          }
        })
        // 点击地图弹出选择地址
        qq.maps.event.addListener(map, 'click', function(e) {
          const lng = e.latLng.getLng()
          const lat = e.latLng.getLat()
          const coord = new qq.maps.LatLng(lat, lng)
          console.log(lat, lng)
          vm.chooseLocation = []
          vm.chooseLocation.push(lat)
          vm.chooseLocation.push(lng)
          first = false
          geocoder.getAddress(coord)
        })
        // 点击marker展示选中的地址
        qq.maps.event.addListener(marker, 'click', function(e) {
          vm.$alert(`${e.target.title}`, '定位地点')
        })
      })
    },
    async handleSubmitLibTask() {
      if (!this.taskCheckedList.length) {
        this.$message({ message: '请选择要导入的题目', type: 'error' })
        return
      }
      try {
        const res = await chooseTasklib({
          activity_id: this.activityId,
          task_lib_ids: JSON.stringify(this.taskCheckedList)
        })
        this.$message({ message: '导入成功', type: 'success' })
        this._fetchTaskList(this.activityId)
        this.handleCloseTaskList()
      } catch (e) {}
    },
    handleaTaskCurrentChange(val) {
      this.taskListQuery.page_no = val
      this._fetchSubTaskList()
    },
    handleSelectionChange(val) {
      this.taskCheckedList = []
      val.forEach((item) => {
        this.taskCheckedList.push(item.id)
      })
    },
    handleSaveTaskList () {
      this.handleCloseDialog()
      this.handleCloseAddTaskDialog()
    },
    // 撤销活动
    handleDismissActivity(row) {
      console.log(row)
      this.$confirm('确认撤销该活动？')
        .then(async _ => {
          await cancelact(row.id)
          await this._fetchActivityList()
          this.$message({
            message: '撤销成功',
            type: 'success'
          })
        })
        .catch(_ => {})
    },
    // 关闭添加题目对话框
    handleCloseAddTaskDialog () {
      this.dialogFormVisible = false
      this.dialogAddTaskVisible = false
    },
    // 关闭
    handleCloseTaskList() {
      this.dialogTaskList = false
      this.taskListQuery = {
        page_no: 1,
        page_size: 10
      }
      this.taskCheckedList = []
    },
    // 题库导入弹窗
    async handleOpenSubjectList() {
      await this._fetchSubTaskList()
      this.dialogTaskList = true
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._fetchActivityList()
    },
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchActivityList()
    },
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
    async handleImgChange(e) {
      this.is_progress=true
      const ImgObj = {}
      const ImgInput = document.querySelector('#ImgInput')
      const length = ImgInput.files.length
      this.img_nums = length
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        // onUploadProgress: progressEvent => {
        //   this.jindu=progressEvent.loaded / progressEvent.total * 100 | 0
        //   console.log(progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        // }
      }
      let count = 0;
      // let loadingInstance = Loading.service({ fullscreen: true, text: `上传中` })
      for(let item of ImgInput.files) {
        this.img_num = this.img_num + 1
        this.jindu = Math.floor(this.img_num / (length) * 100)
        if (this.img_num == this.img_nums) {
          this.is_progress = false
          this.jindu = 0
          this.img_num = 0
        }
        const fileType = item.type.split('/')[1]
        const keyname = 'top-team' + Date.now() + '' + (Math.random() * 100) + '.' + fileType
        const token = await this._fetchQiNiuToken()
        const formData = new FormData()
        formData.append('token', token)
        formData.append('key', keyname)
        let that=this
        if (/image\/\w+/.test(item.type) && item.size > 1024000) {
          this.photoCompress(item, {
              quality: 0.2
          }, function(base64){
              let bl = that.convertBase64UrlToBlob(base64);
              bl.uid=item.uid
              bl.name=item.name
              bl.uid=item.uid
              bl.lastModified=item.lastModified
              bl.lastModifiedDate=item.lastModifiedDate
              bl.webkitRelativePath=item.webkitRelativePath
              formData.append('file', bl); // 文件对象
              axios.post('http://upload.qiniup.com/', formData, config).then(res=>{
                const url = that.qiniuAddress + '/' + res.data.key
                const name = item.name.split('.')[0]
                ImgObj[name] = url
                console.log(Object.keys(ImgObj).length)
                if (Object.keys(ImgObj).length === length) {
                  axios.post(
                    '/i/topteam/admin/MatchTaskPic',
                    { activity_id: that.activityId, match_list: JSON.stringify(ImgObj) }
                  ).then(res=>{
                    if (!res.data.error_code) {
                      that.$message({ message: '上传成功', type: 'success' })
                      that._fetchTaskList(that.activityId)
                    } else {
                      that.$message({ message: res.data.error_msg, type: 'error' })
                    }
                    e.target.value = ''
                  })
                }
              })
          });
        }else{
          formData.append('file', item)
          try {
            await axios.post('http://upload.qiniup.com/', formData, config).then(res=>{
              const url = this.qiniuAddress + '/' + res.data.key
              const name = item.name.split('.')[0]
              ImgObj[name] = url
              console.log(Object.keys(ImgObj).length)
              if (Object.keys(ImgObj).length === length) {
                axios.post(
                  '/i/topteam/admin/MatchTaskPic',
                  { activity_id: this.activityId, match_list: JSON.stringify(ImgObj) }
                ).then(res=>{
                  if (!res.data.error_code) {
                    this.$message({ message: '上传成功', type: 'success' })
                    this._fetchTaskList(this.activityId)
                  } else {
                    this.$message({ message: res.data.error_msg, type: 'error' })
                  }
                  e.target.value = ''
                })
              }
            })
          } catch (error) {
            console.log(error)
            e.target.value = ''
            this.$message({message: '有图片上传失败，请重新上传全部图片', type: 'error'})
          }
        }
      }
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
      } else {
        this.needCoach = '1'
        this.longTime = '2'
        this.needTpl = '2'
      }
      this.activityInfo.check = false
      this.activityInfo.coachId = null
      this.activityInfo.tplId = null
    },
    // 导入任务
    handleFileChange(e) {
      this.is_progress=true
      const activityId = this.activityId
      const fileInput = document.querySelector('#fileInput')
      const formData = new FormData()
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          this.jindu=progressEvent.loaded / progressEvent.total * 100 | 0
          // console.log(progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        }
      }
      formData.append('file', fileInput.files[0])
      formData.append('activity_id', activityId)
      // const loadingInstance = Loading.service({ fullscreen: true, text: '导入中' })
      axios.post('/i/topteam/admin/importTask', formData, config).then(res => {
        const data = res.data
        if (data.error_code !== 0) {
          this.$message({ message: data.error_msg, type: 'error' })
          e.target.value = ''
        } else {
          this.$message({ message: '导入成功', type: 'success' })
          e.target.value = ''
          this._fetchTaskList(activityId)
        }
        this.is_progress=false
        this.jindu=0
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
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
        let flag = false
        Object.keys(data.options).forEach(item => {
          if (!data.options[item]) {
            flag = true
          }
        })
        if (flag) {
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

      if (data.type === '7') {
        if (!data.game_id) {
          this.$message({ message: '请选择游戏题目', type: 'error' })
          return
        }
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
      this.taskInfo.batch_number = row.batch_number || 1
      this.taskInfo.answer_limit = row.answer_limit
      this.taskInfo.answer_type = row.answer_type
      this.taskInfo.limit_time = row.limit_time
      this.getGameList()
      this.$set(this.taskInfo, 'game_id', row.game_id)
      this.$set(this.taskInfo, 'classification', row.classification)
      this.$set(this.taskInfo, 'location_point', row.location_point)
      // this.taskInfo.classification = row.classification
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
        this.taskInfo.answer = JSON.parse(row.answer || '[]')
        this.taskInfo.options = JSON.parse(row.options)
        this.taskInfo.options.forEach((item, index) => {
          this.taskAFileList.push({ name: '图片' + (index + 1), url: item })
        })
      }
      if (row.type === '4' || row.type === '5' || row.type === '6') {
        this.taskInfo.answer_url = row.answer
        if(this.taskInfo.answer_url) {
          this.taskAFileList = [{ name: row.name, url: row.answer }]
        }
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
          this.handleGobackActivityList()
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
        icon, gif_url, template_id
      } = this.activity

      this.activityInfo.score = score
      this.activityInfo.tplId = template_id
      if (template_id !== '0') {
        this.needTpl = '1'
      } else {
        this.activityInfo.tplId = null
      }
      this.activityInfo.agentName = agent_name // 运营商名
      this.activityInfo.type = type
      this.activityInfo.agent_id = agent_id
      this.activityInfo.coachId = coach_id
      this.activityInfo.name = name
      this.activityInfo.scoreType = score_type
      this.activityInfo.scoreShowType = score_show_type
      this.activityInfo.keepTime = keep_time
      if (keep_time === '0') {
        this.longTime = '1'
        this.activityInfo.keepTime = ''
      }
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
        this.activityInfo.scoreShowType = null
      }
      if (this.activityInfo.coachId === '0') {
        this.activityInfo.coachId = null
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
    handleCloseDialog(shouldReturn) {
      this.dialogFormDisable = false
      if (shouldReturn) {
        return
      }
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
      this.taskInfo.options = {
        A: null,
        B: null,
        C: null,
        D: null
      },
      this.getGameList()
    },
    // 关闭添加任务对话框
    handleCloseTaskDialog() {
      this._resetTaskInfo()
      this.dialogTaskVisible = false
      this.locationName1 = ''
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
    // 压缩图片函数
    canvasDataURL(path, obj, callback){
      let img = new Image();
      img.src = path;
      img.onload = function(){
          let that = this;
          let w = that.width,
              h = that.height,
              scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          let quality = 0.7;
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
              quality = obj.quality;
          }
          let base64 = canvas.toDataURL('image/jpeg', quality);
          callback(base64);
      }
    },
    //创建FileReader实例
    photoCompress(file,w,objDiv){
        let ready=new FileReader();
        ready.readAsDataURL(file);
        let that=this
        ready.onload=function(){
            let re=this.result;
            that.canvasDataURL(re,w,objDiv)
        }
    },
    //将以base64的图片url数据转换为Blob
    convertBase64UrlToBlob(urlData){
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    },
    // 上传七牛云
    async _uploadQiNiu(req, type) {
      // const loadingInstance = Loading.service({ fullscreen: true, text: '上传中' })
      this.is_progress=true
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          this.jindu=progressEvent.loaded / progressEvent.total * 100 | 0
        }
      }
      const fileType = req.file.type.split('/')[1]
      // 重命名要上传的文件
      const keyname = 'top-team' + Date.now() + Math.floor(Math.random() * 100) + '.' + fileType
      const token = await this._fetchQiNiuToken()
      const formData = new FormData()
      formData.append('token', token)
      formData.append('key', keyname)
      let that=this
      if(req.file.size/1024 > 1025) { //大于1M，进行压缩上传
          if(req.file.type.indexOf("image/")==-1){
            formData.append('file', req.file)
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
              this.is_progress=false
              this.jindu=0
            })
          } else {
            this.photoCompress(req.file, {
                quality: 0.2
            }, function(base64){
                let bl = that.convertBase64UrlToBlob(base64);
                bl.uid=req.file.uid
                bl.name=req.file.name
                bl.uid=req.file.uid
                bl.lastModified=req.file.lastModified
                bl.lastModifiedDate=req.file.lastModifiedDate
                bl.webkitRelativePath=req.file.webkitRelativePath
                formData.append('file', bl); // 文件对象
                axios.post('http://upload.qiniup.com/', formData, config).then(res => {
                  const url = that.qiniuAddress + '/' + res.data.key
                  if (type === 'bgImg') {
                    that.activityInfo.bgImgUrl = url
                  }
                  if (type === 'icon') {
                    that.activityInfo.iconUrl = url
                  }
                  if (type === 'gif') {
                    that.activityInfo.gif_url = url
                  }
                  if (type === 'task') {
                    that.taskInfo.question_img = url
                  }
                  if (type === 'answer') {
                    that.taskInfo.answer_url = url
                  }
                  if (type === 'nine') {
                    that.taskAFileList.push({
                      name: res.data.key.slice(0, 23),
                      url: url
                    })
                  }
                  that.is_progress=false
                  that.jindu=0
                })
            });
          }
      }else{
        formData.append('file', req.file)
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
          this.is_progress=false
          this.jindu=0
        })
      }
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
        actDesc, scoreType, scoreShowType, type, bgImgUrl, iconUrl, price, check, gif_url, agent_id, tplId
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
      data.coach_id = coachId || 0
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
      if (this.longTime === '1') {
        data.keep_time = 0
      }
      if (tplId) {
        data.template_id = tplId
      } else {
        data.template_id = 0
      }
      // 个人版本
      if (data.type === '2') {
        data.score = 0
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
        this.dialogAddTaskVisible = true
        this.handleCloseDialog(true)
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
        actDesc, scoreType, scoreShowType, type, bgImgUrl, iconUrl, price, check, gif_url, tplId
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
      data.coach_id = coachId || 0
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
      if (this.longTime === '1') {
        data.keep_time = 0
      }
      if (tplId) {
        data.template_id = tplId
      } else {
        data.tplId = 0
      }

      // 个人版本
      if (data.type === '2') {
        data.score = 0
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
        this.handleCloseDialog(true)
        this.dialogAddTaskVisible = true
      } catch (e) {
        // 添加活动失败隐藏添加弹窗
        // this.handleCloseDialog()
        // await this._fetchActivityList()
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
        let flag = false
        Object.keys(data.options).forEach(item => {
          if (!data.options[item]) {
            flag = true
          }
        })
        if (flag) {
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
      if (data.type === '7') {
        if (!data.game_id) {
          this.$message({ message: '请选择游戏题目', type: 'error' })
          return
        }
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
        let param = Object.assign({}, this.listQuery)
        !param.person_coach && (param.person_coach = 0)
        const res = await fetchActivityList(param)
        const { data } = res
        this.listLoading = false
        this.list = data.list.filter((item) => item.act_use !== '3' )
        this.total = data.total
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
        batch_number: 1,
        seq: null,
        question_img: null,
        options: {
        },
        answer: [],
        answer2: '',
        answer_url: '',
        score: null,
        answer_limit: 1,
        limit_time: '',
        classification: '0',
        location_point: ''
      }
      this.chooseLocation = []
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
    // 获取题库题目列表
    async _fetchSubTaskList() {
      const param = Object.assign({}, this.taskListQuery)
      if (this.activityInfo.type === '2') {
        param.activity_type = '1'
      }
      if (this.activityInfo.type === '2' && this.activityInfo.coachId) {
        param.activity_type = '2'
      }
      console.log(param)
      const res = await fetchTaskLibList(param)
      const { data } = res
      this.tasklistData = data.list
      this.taskTotal = data.total
    },
    // 获取题目分类列表
    async _fetchTaskClassify() {
      const res = await getTacskClassifyList()
      this.taskClassfiyList = res.data.list
    },
    // 获取模板信息列表
    async _getTemplateList() {
      const res = await getTemplateList({ page_no: 1, page_size: 1000 })
      this.tplList = res.data.list
    },
    init() {
      this._fetchCoachList()
      this._fetchActivityList()
      this._fetchTaskClassify()
      this._getTemplateList()
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
.taskListDialog .el-dialog, .taskListDialog .el-dialog__body{
  width: 800px;
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
.el-input-group--prepend .el-input-group__prepend {
  width: 51px;
}
.progress_wrap{
  width:100%;height:100%;
  position: absolute;top: 0;left: 0;z-index:9999;
}
.progress_wrap{
  width:100%;height:100%;
  display:flex;justify-content: center;align-items: center;
}
.progress_bg{
  width:100%;height:100%;
  background:black;
  opacity:0;
  position: absolute;top: 0;left: 0;
}
.progress_content{
  position: absolute;top: 15%;left:45%;z-index:9999;
}
</style>

