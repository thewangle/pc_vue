<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.subjectName" placeholder="请输入题目标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.subjectStatus" placeholder="请选择题目类型" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in subjectStatus" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.answerType" placeholder="请选择答题类型" style="width: 200px" class="filter-item" @change="handleFilter" >
        <el-option v-for="item in answerType" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加题目</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit">导入任务</el-button>
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
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="答案" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目类型" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分值" align="center" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="答题类型" align="center" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" >修改</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils'
export default {
  name: 'SubkectLib',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      listLoading: false,
      listQuery: {
        answerType: undefined,
        subjectName: undefined,
        subjectStatus: undefined
      },
      subjectStatus: [{ label: '选择题', key: 1 }, { label: '文字题', key: 2 }, { label: '图片题', key: 3 }, { label: '视频题', key: 4 }, { label: '语音题', key: 5 }, { label: '拍照题', key: 6 }],
      answerType: [{ label: '光卡题', key: '1' }, { label: '团队内限时题', key: '2' }, { label: '活动内抢答题', key: '3' }]
    }
  },
  created() {
  },
  methods: {
    handleFilter() {
    }
  }
}
</script>
