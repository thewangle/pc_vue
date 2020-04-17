<template>
  <div class="page_wrap animated bounceInLeft">
    <div class="tab_model_wrap">
      <div class="tag1_wrap">
        <el-date-picker
          v-model="time_tab2"
          @change="time_select2"
          type="daterange"
          align="left"
          unlink-panels
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-if="is_zzh" v-model="listQuery2.bm" placeholder="请选择部门" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2(1)">
          <el-option v-for="item in bms" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-if="is_bm" v-model="listQuery2.gz" placeholder="请选择柜组" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2(2)">
          <el-option v-for="item in gzs" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter2">查询</el-button>
      </div>
      <div class="salesTag">
        <div class="salesTagList animated bounceInUp" @click="zeOver">
          <div class="salesTagListBiao" id="zonge">{{tab2name}}销售总额</div>
          <div id="zonge1"><span class="salesTagListnum">{{tab1info.zongnums}}</span>元</div>
        </div>
        <div class="salesTagList animated bounceInDown" @click="zeOver1" style="background-image: linear-gradient(104deg, #ffbb3f, #ff9e47);">
          <div class="salesTagListBiao" id="zonge2">{{tab2name}}进价总额</div>
          <div id="zonge3"><span class="salesTagListnum">{{tab1info.zoninprice}}</span>元</div>
        </div>
        <div class="salesTagList animated bounceInUp" @click="zeOver2" style="background-image: linear-gradient(104deg, #6bb3ff, #58a4ff);">
          <div class="salesTagListBiao" id="zonge4">{{tab2name}}毛利润</div>
          <div id="zonge5"><span class="salesTagListnum">{{tab1info.zonlirun}}</span>元</div>
        </div>
        <div class="salesTagList animated bounceInDown" @click="zeOver3" style="background-image: linear-gradient(104deg, #78d4ae, #57c7e0);">
          <div id="zonge6" class="salesTagListBiao">{{tab2name}}毛利率</div>
          <div id="zonge7"><span class="salesTagListnum">{{tab1info.zonlilv}}</span>%</div>
        </div>
      </div>
      <div class="echartWrap">
        <div class="fengebr" @click="zeOver4" id="zonge8"><h2>销售额趋势图例分析</h2></div>
        <div class="noDate" v-show="!isShowEchart">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="pie_change_qushi" class="echartList" v-show="isShowEchart"></div>
        <div class="fengebr" @click="zeOver5" id="zonge9"><h2>销售额占比图例分析</h2></div>
        <div class="noDate" v-show="!isShowEchart1">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="zbChart" v-show="isShowEchart1" class="echartList"></div>
        <div class="fengebr" @click="zeOver7" id="zonge11"><h2>销售额日期占比图例分析</h2></div>
        <div class="noDate" v-show="!isShowEchart">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="dateChart" v-show="isShowEchart" class="echartList"></div>
        <div class="fengebr" @click="zeOver8" id="zonge12"><h2>销售额时间段占比图例分析</h2></div>
        <div class="noDate" v-show="!isShowEchart">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="timeChart" v-show="isShowEchart" class="echartList"></div>
        <!-- <div class="fengebr" @click="zeOver6" id="zonge10"><h2>销售额完成率图例分析</h2></div>
        <div ref="completeChart" style="width: 100%;height:400px;margin:20px 0;"></div> -->
      </div>
      <div v-if="isgz" class="fengebr" @click="zeOver9" id="zonge13"><h2>销售商品列表</h2></div>
      <!-- 条件搜索 -->
      <div class="filter-container" v-if="isgz">
        <el-date-picker
          v-model="time_tab"
          @change="time_select"
          type="daterange"
          align="left"
          unlink-panels
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-input v-model="listQuery.name" placeholder="请输入商品名称" style="width: 200px;" @keyup.enter.native="handleFilter"/>
        <el-input v-model="listQuery.code" placeholder="请输入商品编码" style="width: 200px;" @keyup.enter.native="handleFilter"/>
        <el-select v-if="isgz" v-model="listQuery.sortid" placeholder="请选择分类" clearable style="width: 200px" @change="handleFilter">
          <el-option v-for="item in sorts" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-if="isgz" v-model="listQuery.supplierid" placeholder="请选择供应商" clearable style="width: 200px" @change="handleFilter">
          <el-option v-for="item in suppliers" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="toExcle">导出</el-button>
      </div>
      <!-- 商品列表table -->
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        stripe
        id="out-table"
        v-if="isgz"
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="序号" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="150px" align="center">
          <template slot-scope="scope">
            <span class="tag_yellow">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品编码" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.format }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售出数量" width="200px" align="center">
          <template slot-scope="scope">
            <span class="tag_blue">{{ scope.row.numbefore - scope.row.numnow}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品进价" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.inprice }} 元</span>
          </template>
        </el-table-column>
        <el-table-column label="商品售价" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.outprice }} 元</span>
          </template>
        </el-table-column>
        <el-table-column label="毛利润" width="200px" align="center">
          <template slot-scope="scope">
            <span class="tag_red">{{ ((scope.row.outprice - scope.row.inprice) * (scope.row.numbefore - scope.row.numnow)).toFixed(2) }} 元</span>
          </template>
        </el-table-column>
        <el-table-column label="毛利率" width="200px" align="center">
          <template slot-scope="scope">
            <span class="tag_red">{{ ((scope.row.outprice - scope.row.inprice) / scope.row.inprice * 100).toFixed(2) }} %</span>
          </template>
        </el-table-column>
        <el-table-column label="售出时间" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addtime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏目 -->
      <div v-if="isgz" class="pagination-container">
        <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
      <!-- 使用说明 -->
      <drawer title="销售分析页 - 使用说明" :visible.sync='dialogVisible' width="500px" close-on-click-modal>
        <div class="smWrap">
          <div class="smB">概述：此页分为销售图例分析和销售商品列表</div>
          <div class="smContent">
            <span class="smContentB">图例分析：</span>
            <div class="smContentC">
              <div>1.包括"销售额趋势图例分析"、"销售额占比图例分析"、"销售额日期占比图例分析"、"销售额时间段占比图例分析"</div>
              <div>2."商场级别"账号可以选择部门来查看所选部门的销售图例分析（默认不选择，展现整个商场的销售图例分析，选择后可去除）</div>
              <div>3."部门级别"账号可以选择柜组来查看所选柜组的销售图例分析（默认不选择，展现整个部门的销售图例分析，选择后可去除）</div>
              <div>4.时间段选择需要选择"开始日期"和"结束日期"，也可选择"最近一周"、"最近一个月"、"最近三个月"的快捷方式（默认最近一周，时间段为必选！）</div>
              <div>5."销售额占比图例分析"、"销售额日期占比图例分析"、"销售额时间段占比图例分析"当"商场级别"账号的时候展示其下面各"部门"的销售额占比，当"部门级别"账号或"商场级别"账号不选择"部门"时展示其下面各柜组的销售额占比，当"柜组级别"账号或"部门级别"账号不选择"柜组"时展示其下面各"分类"的销售额占比</div>
            </div>
          </div>
          <div class="smContent">
            <span class="smContentB">商品列表：</span>
            <div class="smContentC">
              <div>1.只有"柜组级别"的账号有此模块</div>
              <div>2.列表展示选定条件下的商品销售数据</div>
              <div>3.日期条件为必选，默认近一周</div>
              <div>4.支持按"商品名称"、"商品编码"的模糊查询（模糊查询即不用输入全名称，例："李宁运动裤"可输入"李宁"）</div>
              <div>5."分类"条件可选，（默认不选，展示所有分类）</div>
              <div>6."供应商"条件可选，（默认不选，展示所有供应商）</div>
            </div>
          </div>
          <div class="smContent">
            <span class="smContentB">备注：</span>
            <div class="smContentC">
              <div>1."销售额"是按商品销售时的"售价"计算</div>
            </div>
          </div>
        </div>
      </drawer>
      <div class="hellpWrap" @click="dialogVisible = true">
        <div class="hellpWrap1">
          <img src="../../assets/img/hellp.jpg" alt="" class="hellpImg">
          <span class="hellpB">使用帮助</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'
import axios from 'axios'
import moment from 'moment' //日期转换插件 
import { getpartantId, getRoleId, getUserid, getdepartmentName } from '@/utils/auth'
import { getallUserByidthis, getUserByuid } from '@/api/loginanduser' //请求函数
import { getgoodschangeQushi, getGoodsinfo } from '@/api/goods' //请求函数
import { getSortinfoone, getSortinfoall } from '@/api/sort' //请求函数
import { Getsoldgoods, GetsoldgoodsByGroup, getsoldGoodsinfo } from '@/api/report' //请求函数
import { getSupplierall } from '@/api/supplier' //获取供应商
import XLSX from 'xlsx' //导出excle
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      dialogVisible: false,
      isShowEchart: true,
      isShowEchart1: true,
      listQuery: { //动态请求table数据时传递的参数
        time: [],
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        name: '',//商品名称
        code: '',//商品编码
        sortid: '',
        supplierid: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      sorts: [],
      suppliers: [],
      isgz: false,
      listLoading: false,
      list: [],
      total: 1,//table一共多少条数据
      time_tab: [moment().subtract(7, "days").format(),moment().format()],
      tab2name: getdepartmentName(),
      series_data: [],
      series_data_change: [],
      changeQushixAxis: [],
      changeQushiseries: [],
      time_tab2: [moment().subtract(7, "days").format(),moment().format()],
      listQuery2: { 
        time: [],
        bm: '',
        gz: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      numtypes: [
        {value: 1,label: '售出'},
        {value: 2,label: '退货'},
        {value: 3,label: '报损'},
        {value: 4,label: '补货'},
      ],
      tab1info: { 
        zongnums: 0, 
        zoninprice: 0,
        zonlilv: 0,
        zonlirun: 0,
        zonoutprice: 0
      },
      bms: [],
      gzs: [],
      bodyMax: 0,
      itemnums: [],
      itemnums2: [],
      itemnames: [],
      is_bm: false,
      is_zzh: false,
      is_gz: false,
      Datename: ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
      Datenums: [
        {value: 0,name:'星期一'},
        {value: 0,name:'星期二'},
        {value: 0,name:'星期三'},
        {value: 0,name:'星期四'},
        {value: 0,name:'星期五'},
        {value: 0,name:'星期六'},
        {value: 0,name:'星期天'},
      ],
      Timename: ['01:00 - 08:00','08:00 - 12:00','12:00 - 16:00','16:00 - 20:00','20:00 - 24:00'],
      Timenums: [
        {value: 0,name:'01:00 - 08:00'},
        {value: 0,name:'08:00 - 12:00'},
        {value: 0,name:'12:00 - 16:00'},
        {value: 0,name:'16:00 - 20:00'},
        {value: 0,name:'20:00 - 24:00'}
      ],
      //日期组件的快捷选项设置
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  computed: {
  },
  mounted() {
    $('.echartList').width($('.echartWrap').width())
    if (getRoleId() == 3) {
      this.isgz = true
      this.handleFilter() //获取商品列表
      this.getsortinfoall() //获取该id下分类
      this.getsupplierall() //获取改id下供应商
    }
    this.time_select()
    this.time_select2()
    this.handleFilter2()
    // this.completeChart()
    if (getRoleId() !=3) {
      this.getAllUserByidthis()
    }
    if (getRoleId() == 1) {
      this.is_zzh = true
      this.is_bm = false
      this.is_gz = false
    } else if (getRoleId() == 2) {
      this.is_zzh = false
      this.is_bm = true
      this.is_gz = false
    } else if (getRoleId() == 3) {
      this.is_zzh = false
      this.is_bm = false
      this.is_gz = true
    }
  },
  created() {
    
  },
  methods: {
    //导出excle
    toExcle() {
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
      XLSX.writeFile(wb, "出售商品列表.xlsx")
    },
    //系列动画函数
    zeOver() {
      $('#zonge').toggleClass('animated wobble')
      $('#zonge1').toggleClass('animated wobble')
      setTimeout(function(){ $('#zonge').removeClass('animated wobble')
      $('#zonge1').removeClass('animated wobble') }, 1000);
    },
    zeOver1() {
      $('#zonge2').toggleClass('animated rubberBand')
      $('#zonge3').toggleClass('animated rubberBand')
      setTimeout(function(){ $('#zonge2').removeClass('animated rubberBand')
      $('#zonge3').removeClass('animated rubberBand') }, 1000);
    },
    zeOver2() {
      $('#zonge4').toggleClass('animated shake')
      $('#zonge5').toggleClass('animated shake')
      setTimeout(function(){ $('#zonge4').removeClass('animated shake')
      $('#zonge5').removeClass('animated shake') }, 1000);
    },
    zeOver3() {
      $('#zonge6').toggleClass('animated tada')
      $('#zonge7').toggleClass('animated tada')
      setTimeout(function(){ $('#zonge6').removeClass('animated tada')
      $('#zonge7').removeClass('animated tada') }, 1000);
    },
    zeOver4() {
      $('#zonge8').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge8').removeClass('animated bounce') }, 1000);
    },
    zeOver5() {
      $('#zonge9').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge9').removeClass('animated bounce') }, 1000);
    },
    zeOver7() {
      $('#zonge11').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge11').removeClass('animated bounce') }, 1000);
    },
    zeOver8() {
      $('#zonge12').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge12').removeClass('animated bounce') }, 1000);
    },
    zeOver9() {
      $('#zonge13').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge13').removeClass('animated bounce') }, 1000);
    },
    //根据用户id获取分类
    getsortinfoall() {
      let params = {
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      }
      getSortinfoall(params).then(res => {
        let { data } = res
        data.forEach((item) => {
          this.sorts.push({value: item.id,label: item.name})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //根据用户id获取供应商
    getsupplierall() {
      let params = {
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      }
      getSupplierall(params).then(res => {
        let { data } = res
        data.forEach((item) => {
          this.suppliers.push({value: item.id,label: item.name})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //顶部搜索框搜索功能
    handleFilter() {
      this.listQuery.page_no = 1 //将当前页归1
      this._fetchActivityList() //重新获取数据
    },
    //显示条数改变时触发
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchActivityList()//重新获取数据
    },
    //当前页码改变时触发
    handleCurrentChange(current) {
      this.listQuery.page_no = current //将当前页改变为改变后的页码
      this._fetchActivityList() //重新获取数据
    },
    // 获取table数据函数
    async _fetchActivityList() {
      this.listLoading = true //加载动画
      getsoldGoodsinfo(this.listQuery).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.listLoading = false
          this.total = data.data.count
          this.list = data.data.data
          if (this.list == '') {
            this.$message({
              type: 'warning',
              message: '没有更多商品!'
            });
          }
        }
        if (data.code == 201) {
          this.list = []
          this.listLoading = false
          this.$message('没有更多商品!')
        }
      }).catch(error => {
        this.list = []
        this.listLoading = false
        this.$message('获取商品信息失败')
      })
    },
    //根据用户id获取该id下的所有用户信息
    getAllUserByidthis() {
      getallUserByidthis(this.listQuery2).then(res => {
        let {data} = res
        data.forEach((item) => {
          if (getRoleId() == 1) {
            this.bms.push({label:item.department,value:item.id})
          }
          if (getRoleId() == 2) {
            this.gzs.push({label:item.department,value:item.id})
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //日期选择函数
    time_select(query) {
      this.listQuery.time[0] = moment(this.time_tab[0]).valueOf()/1000
      this.listQuery.time[1] = moment(this.time_tab[1]).valueOf()/1000
    },
    //日期选择函数
    time_select2(query) {
      this.listQuery2.time[0] = moment(this.time_tab2[0]).valueOf()/1000
      this.listQuery2.time[1] = moment(this.time_tab2[1]).valueOf()/1000
    },
    //tab2选择函数
    handleFilter2(query) {
      //给侧边栏复制
      if (query == 1) {
        if (this.listQuery2.bm == '') {
          this.tab2name = getdepartmentName()
        } else {
          getUserByuid({uid:this.listQuery2.bm}).then(res => {
            let {data} = res
            this.tab2name = data.department
          })
        }
      }
      if (query == 2) {
        if (this.listQuery2.gz == '') {
          this.tab2name = getdepartmentName()
        } else {
          getUserByuid({uid:this.listQuery2.gz}).then(res => {
            let {data} = res
            this.tab2name = data.department
          })
        }
      }
      //获取库存数据和库存变化数据函数
      this._fetchActivityList2()
    },
    async _fetchActivityList2() {
      if (this.listQuery2.time.length == 0) {
        this.$message({
          message: '请您选择日期！',
          type: 'warning'
        });
        return
      }
      this._fetchsoldGoods()
      this._fetchsoldGoodsByGroup()
    },
    //获取商品销售数据
    async _fetchsoldGoods() {
      this.changeQushixAxis = []
      this.changeQushiseries = []
      Getsoldgoods(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.isShowEchart = false
          this.$message({
            message: '没有更多商品信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.isShowEchart = true
          this.tab1info = data.data.listdata
          this.Datenums.forEach((item) => {
            item.value = 0
          })
          this.Timenums.forEach((item) => {
            item.value = 0
          })
          data.data.leftdata.forEach((item) => {
            //折线图数据整理
            this.changeQushixAxis.push(item.addtime)
            this.changeQushiseries.push((item.numbefore - item.numnow) * item.outprice)
            //日期饼图数据整理
            if (item.date == 1) {
              this.Datenums[0].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.date == 2) {
              this.Datenums[1].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.date == 3) {
              this.Datenums[2].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.date == 4) {
              this.Datenums[3].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.date == 5) {
              this.Datenums[4].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.date == 6) {
              this.Datenums[5].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.date == 7) {
              this.Datenums[6].value += (item.numbefore - item.numnow) * item.outprice
            }
            //时间饼图数据整理
            if (item.time >= 1 && item.time < 8) {
              this.Timenums[0].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.time >= 8 && item.time < 12) {
              this.Timenums[1].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.time >= 12 && item.time < 16) {
              this.Timenums[2].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.time >= 16 && item.time < 20) {
              this.Timenums[3].value += (item.numbefore - item.numnow) * item.outprice
            }
            if (item.time >= 20 && item.time <= 24) {
              this.Timenums[4].value += (item.numbefore - item.numnow) * item.outprice
            }
          })
          this.pie_kucunChangeQushi()
          this.dateChart()
          this.timeChart()
        }
      }).catch(error => {
        this.isShowEchart = false
        console.log(error)
      })
    },
    //获取商品销售数据--用于象形柱状图
    async _fetchsoldGoodsByGroup() {
      this.itemnums = []
      this.itemnames = []
      this.itemnums2 = []
      this.bodyMax = 0
      GetsoldgoodsByGroup(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.isShowEchart1 = false
          this.$message({
            message: '没有更多商品信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.isShowEchart1 = true
          data.data.leftdata.forEach((item,index) => {
            let itemnums = 0
            item.forEach((item1,index1) => {
              itemnums += item1.nums
            })
            if (this.listQuery2.role == 1 && this.listQuery2.bm == '') {
              getUserByuid({uid:item[0].pid}).then(res => {
                let {data} = res
                this.itemnames.push(data.department)
                this.itemnums.push({value:itemnums,name: data.department})
              })
            }
            if (this.listQuery2.role == 1 && this.listQuery2.bm != '') {
              getUserByuid({uid:item[0].uid}).then(res => {
                let {data} = res
                this.itemnames.push(data.department)
                this.itemnums.push({value:itemnums,name: data.department})
              })
            }
            if (this.listQuery2.role == 2 && this.listQuery2.gz == '') {
              getUserByuid({uid:item[0].uid}).then(res => {
                let {data} = res
                this.itemnames.push(data.department)
                this.itemnums.push({value:itemnums,name: data.department})
              })
            }
            if (this.listQuery2.role == 2 && this.listQuery2.gz != '') {
              getSortinfoone({id:item[0].sortid}).then(res => {
                let {data} = res
                this.itemnames.push(data[0].name)
                this.itemnums.push({value:itemnums,name: data[0].name})
              })
            }
            if (this.listQuery2.role == 3) {
              getSortinfoone({id:item[0].sortid}).then(res => {
                let {data} = res
                this.itemnames.push(data[0].name)
                this.itemnums.push({value:itemnums,name: data[0].name})
              })
            }
          })
          let self = this
          setTimeout(function() {
            self.zbChart()
          },800)
        }
      }).catch(error => {
        this.isShowEchart1 = false
        console.log(error)
      })
    },
    //库存变化趋势折线图
    pie_kucunChangeQushi() {
      let pieChart = echarts.init(this.$refs.pie_change_qushi)
      let option = {
        toolbox: {
          feature: {
            saveAsImage: {
              title: '下载'
            }
          },
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.changeQushixAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.changeQushiseries,
          type: 'line',
          areaStyle: {}
        }]
      }
      pieChart.clear()  
      pieChart.setOption(option)
      window.addEventListener('resize',function() {
        pieChart.resize()
      })
    },
    //日期占比饼图
    zbChart() {
        let myChart = echarts.init(this.$refs.zbChart);
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
            },
            legend: {
                top: 95,
                left: 55,
                itemGap: 20,
                formatter: function (a) {
                    return a;
                },
                orient: 'vertical',
                data: this.itemnames
            },
            series : [
                {
                    name: '销售额占比',
                    type: 'pie',
                    radius: '80%',
                    roseType: 'angle',
                    center: ['50%', '50%'],
                    label: {
                        formatter: '{b}: {d}%'
                    },
                    data:this.itemnums
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear() 
        myChart.setOption(option);
        window.addEventListener('resize',function() {
          myChart.resize()
        })
    },
    //日期占比饼图
    dateChart() {
        let myChart = echarts.init(this.$refs.dateChart);
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
            },
            legend: {
                top: 95,
                left: 55,
                itemGap: 20,
                formatter: function (a) {
                    return a;
                },
                orient: 'vertical',
                data: this.Datename
            },
            series : [
                {
                    name: '销售额占比',
                    type: 'pie',
                    radius: '80%',
                    roseType: 'angle',
                    center: ['50%', '50%'],
                    label: {
                        formatter: '{b}: {d}%'
                    },
                    data:this.Datenums
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear() 
        myChart.setOption(option);
        window.addEventListener('resize',function() {
          myChart.resize()
        })
    },
    //时间段占比饼图
    timeChart() {
        let myChart = echarts.init(this.$refs.timeChart);
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
            },
            legend: {
                top: 95,
                left: 55,
                itemGap: 20,
                formatter: function (a) {
                    return a;
                },
                orient: 'vertical',
                data: this.Timename
            },
            series : [
                {
                    name: '销售额占比',
                    type: 'pie',
                    radius: '80%',
                    roseType: 'angle',
                    center: ['50%', '50%'],
                    label: {
                        formatter: '{b} 占比: {d}%'
                    },
                    data:this.Timenums
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear() 
        myChart.setOption(option);
        window.addEventListener('resize',function() {
          myChart.resize()
        })
    },
    //完成率仪表图
    // completeChart() {
    //   let pieChart = echarts.init(this.$refs.completeChart)
    //   let option = {
    //     tooltip : {
    //       formatter: "{a} <br/>{b} : {c}%"
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {
    //           title: '下载'
    //         }
    //       },
    //     },
    //     series: [
    //       {
    //         name: '业务指标',
    //         axisLabel: {
    //             backgroundColor: 'auto',
    //             borderRadius: 2,
    //             color: '#eee',
    //             padding: 3,
    //             textShadowBlur: 2,
    //             textShadowOffsetX: 1,
    //             textShadowOffsetY: 1,
    //             textShadowColor: '#222'
    //         },
    //         title : {
    //             fontWeight: 'bolder',
    //             fontSize: 20,
    //         },
    //         type: 'gauge',
    //         detail: {formatter:'{value}%'},
    //         data: [{value: 40, name: '完成率'}]
    //       }
    //     ]
    //   };
    //   pieChart.clear()  
    //   pieChart.setOption(option)
    //   window.addEventListener('resize',function() {
    //     pieChart.resize()
    //   })
    // },
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.filter-container {
  padding: 10px;
}
.salesTag {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.salesTagList {
  width: 23%;
  height: 80px;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(104deg, #ff7159, #ff6554);
}
.salesTagList:hover {
  cursor: pointer;
}
.salesTagList>div {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  color: white;
}
.salesTagListnum {
  font-size: 19px;
  font-weight: bold;
  margin-right: 10px;
}
.page_wrap,.tab_model_wrap {
  width: 100%;
  height: 100%;
}
.tab_model_wrap {
  border-bottom: 1px solid rgb(220,220,220);
  padding: 20px 0;
}
.tag1_wrap {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(220,220,220);
}
.el-range-separator {
  width: 8% !important;
}
</style>
