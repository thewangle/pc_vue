<template>
  <div class="page_wrap animated bounceInRight">
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
        <div class="salesTagList" style="width:32%;" @click="zeOver" id="zonge">
          <div class="salesTagListBiao">{{tab2name}}报损数量</div>
          <div><span class="salesTagListnum">{{tab1info.zongnums}}</span></div>
        </div>
        <div @click="zeOver1" id="zonge1" class="salesTagList" style="width:32%;background-image: linear-gradient(104deg, #6bb3ff, #58a4ff);">
          <div class="salesTagListBiao">{{tab2name}}报损成本</div>
          <div><span class="salesTagListnum">{{tab1info.zoninprice}}</span>元</div>
        </div>
        <div @click="zeOver2" id="zonge2" class="salesTagList" style="width:32%;background-image: linear-gradient(104deg, #ffbb3f, #ff9e47);">
          <div class="salesTagListBiao">{{tab2name}}报损总额</div>
          <div><span class="salesTagListnum">{{tab1info.zongprice}}</span>元</div>
        </div>
      </div>
      <div class="echartWrap">
        <div class="fengebr" @click="zeOver3" id="zonge3"><h2>报损数量趋势图例分析</h2></div>
        <div class="noDate" v-show="!isShowEchart">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="pie_change_qushi" v-show="isShowEchart" class="echartList"></div>
        <div class="fengebr" @click="zeOver4" id="zonge4"><h2>报损成本占比图例分析</h2></div>
        <div class="noDate" v-show="!isShowEchart1">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="zbChart" v-show="isShowEchart1" class="echartList"></div>
      </div>
      <div v-if="isgz" class="fengebr" @click="zeOver9" id="zonge13"><h2>报损商品列表</h2></div>
      <!-- 条件搜索 -->
      <div class="filter-container" v-if="isgz" style="padding: 20px;">
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
        v-if="isgz"
        id="out-table"
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
        <el-table-column label="报损数量" width="200px" align="center">
          <template slot-scope="scope">
            <span class="tag_red">{{ scope.row.numbefore - scope.row.numnow}}</span>
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
        <el-table-column label="报损时间" width="200px" align="center">
          <template slot-scope="scope">
            <span class="tag_blue">{{ scope.row.addtime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏目 -->
      <div v-if="isgz" class="pagination-container" style="padding: 0 20px;">
        <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
      <!-- 使用说明 -->
      <drawer title="报损分析页 - 使用说明" :visible.sync='dialogVisible' width="500px" close-on-click-modal>
        <div class="smWrap">
          <div class="smB">概述：此页分为报损图例分析和报损商品列表</div>
          <div class="smContent">
            <span class="smContentB">图例分析：</span>
            <div class="smContentC">
              <div>1.包括"报损商品数量趋势图例分析"、"报损成本占比图例分析"</div>
              <div>2."商场级别"账号可以选择部门来查看所选部门的报损图例分析（默认不选择，展现整个商场的报损图例分析，选择后可去除）</div>
              <div>3."部门级别"账号可以选择柜组来查看所选柜组的报损图例分析（默认不选择，展现整个部门的报损图例分析，选择后可去除）</div>
              <div>4.时间段选择需要选择"开始日期"和"结束日期"，也可选择"最近一周"、"最近一个月"、"最近三个月"的快捷方式（默认最近一周，时间段为必选！）</div>
              <div>5."报损成本占比图例分析",当"商场级别"账号的时候展示其下面各"部门"的报损成本占比，当"部门级别"账号或"商场级别"账号不选择"部门"时展示其下面各柜组的报损成本占比，当"柜组级别"账号或"部门级别"账号不选择"柜组"时展示其下面各"分类"的报损成本占比</div>
            </div>
          </div>
          <div class="smContent">
            <span class="smContentB">商品列表：</span>
            <div class="smContentC">
              <div>1.只有"柜组级别"的账号有此模块</div>
              <div>2.列表展示选定条件下的商品报损数据</div>
              <div>3.日期条件为必选，默认近一周</div>
              <div>4.支持按"商品名称"、"商品编码"的模糊查询（模糊查询即不用输入全名称，例："李宁运动裤"可输入"李宁"）</div>
              <div>5."分类"条件可选，（默认不选，展示所有分类）</div>
              <div>6."供应商"条件可选，（默认不选，展示所有供应商）</div>
            </div>
          </div>
          <div class="smContent">
            <span class="smContentB">备注：</span>
            <div class="smContentC">
              <div>1."补货成本"是按商品补货时的"进价"计算</div>
              <div>2."补货数量"为商品的数量而非商品的"成本"</div>
              <div>2."导出"功能，是导出当前商品列表里的内容，如果想多导出，可把列表每页显示调高（最高每页/50）</div>
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
import { getgoodschangeQushi } from '@/api/goods' //请求函数
import { getSortinfoone, getSortinfoall } from '@/api/sort' //请求函数
import { Getlossgoods, GetlossgoodsByGroup, getlossGoodsinfo } from '@/api/report' //请求函数
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
      tab1info: { 
        zongnums: 0, 
        zoninprice: 0,
        zongprice: 0
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
      XLSX.writeFile(wb, "报损商品列表.xlsx")
    },
    //系列动画函数
    zeOver() {
      $('#zonge').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge').removeClass('animated bounce') }, 1000);
    },
    zeOver1() {
      $('#zonge1').toggleClass('animated swing')
      setTimeout(function(){ $('#zonge1').removeClass('animated swing') }, 1000);
    },
    zeOver2() {
      $('#zonge2').toggleClass('animated tada')
      setTimeout(function(){ $('#zonge2').removeClass('animated tada') }, 1000);
    },
    zeOver3() {
      $('#zonge3').toggleClass('animated wobble')
      setTimeout(function(){ $('#zonge3').removeClass('animated wobble') }, 1000);
    },
    zeOver4() {
      $('#zonge4').toggleClass('animated wobble')
      setTimeout(function(){ $('#zonge4').removeClass('animated wobble') }, 1000);
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
      getlossGoodsinfo(this.listQuery).then(res => {
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
      this._fetchreturnGoods()
      this._fetchreturnGoodsByGroup()
    },
    //获取商品报损数据
    async _fetchreturnGoods() {
      this.changeQushixAxis = []
      this.changeQushiseries = []
      Getlossgoods(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.isShowEchart = false
          this.$message({
            message: '没有更多报损信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.isShowEchart = true
          this.tab1info = data.data.listdata
          data.data.leftdata.forEach((item) => {
            this.changeQushixAxis.push(item.addtime)
            this.changeQushiseries.push(item.numbefore - item.numnow)
          })
          this.pie_kucunChangeQushi()
        }
      }).catch(error => {
        this.isShowEchart = false
        this.$message({
          message: '没有更多报损信息！',
          type: 'warning',
          duration:5000
        });
        console.log(error)
      })
    },
    //获取商品销售数据--用于象形柱状图
    async _fetchreturnGoodsByGroup() {
      this.itemnums = []
      this.itemnames = []
      GetlossgoodsByGroup(this.listQuery2).then(res => {
        //全屏loading
        // const loading = this.$loading({
        //   lock: true,
        //   text: '拼命加载中....',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(255, 255, 255, 0.7)'
        // });
        let {data} = res
        if (data.code == 201) {
          // loading.close()
          this.isShowEchart1 = false
          this.$message({
            message: '没有更多报损信息！',
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
            // loading.close()
          },2000)
        }
      }).catch(error => {
        this.isShowEchart = false
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
    //占比饼图
    zbChart() {
        let myChart = echarts.init(this.$refs.zbChart);
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
            },
            legend: {
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
                    name: '报损成本',
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
  }
}
</script>

<style rel="stylesheet/scss">
.fengebr {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
}
.salesTag {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.salesTagList {
  width: 32%;
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
