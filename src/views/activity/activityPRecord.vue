<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.agent_name" placeholder="请输入运营商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" placeholder="请输入活动名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="请选择活动类型" style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in activities" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.person_coach" placeholder="是否指定教练" clearable style="width: 200px" class="filter-item" @change="handleFilter" >
        <el-option key="1" label="是" value="1"/>
        <el-option key="2" label="否" value="2"/>
      </el-select>
      <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
          <span>{{ scope.row.type | activityFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.set_start_time | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="155">
        <template slot-scope="scope">
          <span>{{ scope.row.set_stop_time | timeFilter }}</span>
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
          <el-button size="small">
            <a :href="'/i/topteam/admin/exporttask?activity_id='+scope.row.id">下载任务</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="dialogInfoVisible" title="活动详情查看" custom-class="detaildialog" @close="handleClose">
      <div class="filter-container">
        <el-select v-model="item.value"
          clearable style="width: 200px" class="filter-item"
          :placeholder="`请选择${item.tag_name}`"
          @change="(value) => {handleSelectChange(value, item)}"
          v-for="item in tagList" :key="item.id" v-if="item.is_show === '1' && item.show_type === '2'"
        >
          <el-option v-for="option in item.editList" :key="option.id" :label="option.value" :value="option.value" ></el-option>
        </el-select>
        <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handledialogFilter">查询</el-button>
        <el-button v-waves style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="analysis">统计分析</el-button>
      </div>
      <div v-if="!specialCharts">
        <el-table :data="gridData" border fit highlight-current-row>
          <el-table-column label="序号">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动名称" width="140px">
            <template slot-scope="scope">
              <span>{{ scope.row.act_name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="_filterName(item.id)" width="140px" v-for="item in filterList" :key="item.id">
            <template slot-scope="scope">
              <span>{{ scope.row[item.id] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="玩家昵称">
            <template slot-scope="scope">
              <span>{{ scope.row.user_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务用时" width="170px">
            <template slot-scope="scope">
              <span>{{ scope.row.use_time | filterTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="完成任务数" width="170px">
            <template slot-scope="scope">
              <span>{{ scope.row.task_num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="完成任务百分比" width="130px">
            <template slot-scope="scope">
              <span>{{ scope.row.task_rate }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="得分">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column label="统计" v-if="template_id > 0">
            <template slot-scope="scope">
              <el-button size="mini" @click="showPerResult(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="dilogQuery.page_no"
          :total="dialogTotal"
          background
          layout="total, prev, pager, next, jumper"
          @current-change="handledialogCurrentChange"/>
      </div>
      <div v-else>
        <div class="pie-item">
          <div ref="pieChart" style="width: 400px;height:300px;"></div>
          <div>123</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogPerResult" title="个人答题信息" width="70%">
      <el-tabs v-model="activeName2" type="card" @tab-click="tabClick">
        <el-tab-pane label="答题结果" name="first">
          <el-table
            :data="tableResultData"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="task_name"
              label="题目标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="task_desc"
              label="题目描述"
              width="180">
            </el-table-column>
            <el-table-column
              prop="Classify"
              label="题目分类">
            </el-table-column>
            <el-table-column
              prop="task_score"
              label="题目分值">
            </el-table-column>
            <el-table-column
              prop="score"
              label="题目得分">
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="统计分析" name="second">
          <div>
            <div class="pie-item">
              <div ref="pieChart" style="width: 400px;height:300px;"></div>
              <div>123</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  getactteamloginfo,
  getPTloginfo,
  getAnalysis,
  getPerResult,
  getPerResultAnalysis
} from "./../../service/activity";
import { getTagList } from "./../../service/role";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import echarts from 'echarts';
export default {
  name: "AtivityPRecord",
  directives: {
    waves
  },
  filters: {
    activityFilter(status) {
      const activityMap = {
        1: "团队-基础版",
        2: "个人-基础版"
      };
      return activityMap[status];
    },
    timeFilter(timestamp) {
      var date = new Date(timestamp * 1000); // 如果date为10位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (+date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (+date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (+date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (+date.getMinutes() < 10
          ? "0" + date.getMinutes()
          : date.getMinutes()) + ":";
      var s =
        +date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    filterTime(time) {
      let h = parseInt(time / 3600);
      if (h < 10) h = "0" + h;
      let m = parseInt((time / 60) % 60);
      if (m < 10) m = "0" + m;
      let s = parseInt(time % 60);
      if (s < 10) s = "0" + s;
      return h + ":" + m + ":" + s;
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
        type: 2,
        agent_name: undefined,
        name: undefined,
        status: 5,
        act_log: 1,
        person_coach: null
      },
      activities: [{ label: "个人-基础版", key: 2 }],
      dialogInfoVisible: false,
      gridData: [],
      dialogTotal: 0,
      dilogQuery: {
        page_no: 1,
        page_size: 10,
        act_id: ""
      },
      filterList: [],
      tagList: [],
      template_id: 0,
      dialogPerResult: false, // 特殊活动统计分析
      specialCharts: false,
      activeName2: 'first',
      tableResultData: [],
      perInfoParams: {}
    };
  },
  created() {
    this._fetchList();
  },
  methods: {
    async handledialogFilter() {
      this.specialCharts = false
      const taglist = [];
      this.tagList.forEach(item => {
        if (item.value) {
          const obj = { [item.id]: item.value };
          taglist.push(obj);
        }
      });
      this.dilogQuery.tagList = taglist;
      const res = await getPTloginfo(this.dilogQuery);
      const { data } = res;
      this.gridData = data.list;
    },
    handleSelectChange(value, item) {
      let tagTemp = {};
      this.tagList.forEach(tag => {
        if (tag.tag_name === item.children_name) {
          tagTemp = tag;
        }
      });
      item.editList.forEach(list => {
        if (list.id === value) {
          tagTemp.editList = list.child_value;
          tagTemp.arrValue = value;
        }
      });
      this.tagList = JSON.parse(JSON.stringify(this.tagList));
    },
    handleClose() {
      this.tagList = [];
      this.filterList = [];
      (this.template_id = 0),
        (this.dilogQuery = {
          page_no: 1,
          page_size: 10,
          act_id: ""
        });
    },
    _filterName(id) {
      let name = "";
      this.filterList.forEach(item => {
        if (item.id === id) {
          name = item.tag_name;
        }
      });
      return name;
    },
    handledialogCurrentChange(val) {
      this.dilogQuery.page_no = val;
      this._fetchDetial();
    },
    handleSizeChange(size) {
      this.listQuery.page_size = size;
      this._fetchList();
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val;
      this._fetchList();
    },
    handleFilter() {
      this.listQuery.page_no = 1;
      this._fetchList();
    },
    handleShowDetial(row) {
      this.dialogInfoVisible = true;
      this.gridData = [];
      this._fetchDetial(row);
    },
    async _fetchDetial(row) {
      row.id && (this.dilogQuery.act_id = row.id);
      let res = null;
      if (row.template_id > 0) {
        this.template_id = row.template_id;
        const list = await getTagList(row.template_id);
        this.tagList = list.data.list;
        res = await getPTloginfo(this.dilogQuery);
      } else {
        res = await getactteamloginfo(this.dilogQuery);
      }
      const { data } = res;
      this.gridData = data.list;
      this.dialogTotal = +data.total;
      this.filterList = data.head;
    },
    async _fetchList() {
      this.listLoading = true;
      try {
        const res = await fetchList(this.listQuery);
        const { data } = res;
        this.list = data.list;
        this.total = data.total;
      } catch (e) {}
      this.listLoading = false;
    },
    async analysis() {
      // 统计分析
      const taglist = [];
      this.tagList.forEach(item => {
        if (item.value) {
          const obj = { [item.id]: item.value };
          taglist.push(obj);
        }
      });
      this.dilogQuery.tagList = taglist;
      const res = await getAnalysis(this.dilogQuery);
      const { data } = res;
      console.log(res)
      this.specialCharts = true;
      this.$nextTick(() => {
        this.pieCharts();
      })
    },
    // 饼图~
    pieCharts() {
      console.log(this.$refs)
      let pieChart = echarts.init(this.$refs.pieChart);
      let option = {
        title: {
          text: "天气情况统计",
          left: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "幽州"
              },
              { value: 535, name: "荆州" },
              { value: 510, name: "兖州" },
              { value: 634, name: "益州" },
              { value: 735, name: "西凉" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      pieChart.setOption(option);
    },
    async showPerResult (data) {
      this.perInfoParams = {
        activity_id: this.dilogQuery.act_id,
        openid: data.user_id
      }
      const res = await getPerResult(this.perInfoParams);
      this.tableResultData = res.data
      this.dialogPerResult = true
    },
    async tabClick (tab, event) {
      console.log(tab, event);
      if (tab.name === 'second') {
        const res = await getPerResultAnalysis(this.perInfoParams);
        console.log(res)
      }
    }
  }
};
</script>

<style lang="scss">
.detaildialog.el-dialog,
.detaildialog .el-dialog__body {
  width: 900px;
}
.pie-item {
  display: flex;
  flex-direction: row;
}
</style>

