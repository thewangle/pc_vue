<template>
  <div class="page_wrap animated bounceInUp">
    <div class="tab_model_wrap">
      <div class="tag1_wrap">
        <el-date-picker
          v-model="time"
          @change="time_select"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-if="is_zzh" v-model="listQuery.bm" placeholder="请选择部门" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter(1)">
          <el-option v-for="item in bms" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-if="is_bm" v-model="listQuery.gz" placeholder="请选择柜组" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter(2)">
          <el-option v-for="item in gzs" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
      <div class="fengebr" @click="zeOver" id="zonge"><h2>库存总数量及占比图例分析</h2></div>
      <div class="tab1_content_wrap">
        <div class="tab1_content_left">
          <div class="tab1_content_left_tab">{{tab1name}}库存</div>
          <div class="tab1_content_left_list">
            <div><span>总库存：</span><span>{{tab1info.zongnums}}</span></div>
            <div><span>总进价：</span><span>{{tab1info.zoninprice}}</span> 元</div>
            <div><span>预销售额：</span><span>{{tab1info.zonoutprice}}</span> 元</div>
            <div><span>总毛利润：</span><span>{{tab1info.zonlirun}}</span> 元</div>
            <div><span>总毛利率：</span><span>{{tab1info.zonlilv}}</span> %</div>
          </div>
        </div>
        <div ref="pie" style="width: 80%;height:400px;margin:20px 0;">
          <div class="noDate">
            <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
            <span class="nodataSpan">暂无数据</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_model_wrap">
      <div class="fengebr" @click="zeOver1" id="zonge1"><h2>库存数量变化及占比图例分析</h2></div>
      <div class="tab1_content_wrap">
        <div class="tab1_content_left">
          <div class="tab1_content_left_tab">{{tab1name}}库存变化</div>
          <div class="tab1_content_left_list">
            <div><span>总变化：</span><span>{{tab1change.zongnchange}}</span></div>
            <div><span>售出：</span><span>{{tab1change.changeout}}</span> </div>
            <div><span>退货：</span><span>{{tab1change.changetui}}</span> </div>
            <div><span>报损：</span><span>{{tab1change.changesun}}</span> </div>
            <div><span>新入库：</span><span>{{tab1change.changein}}</span> </div>
          </div>
        </div>
        <div ref="ku_change_pie" style="width: 80%;height:400px;margin:20px 0;">
          <div class="noDate">
            <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
            <span class="nodataSpan">暂无数据</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_model_wrap">
      <div class="tag1_wrap">
        <el-date-picker
          v-model="time_tab2"
          @change="time_select2"
          type="daterange"
          align="right"
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
      <div class="fengebr" @click="zeOver2" id="zonge2"><h2>库存数量趋势图例分析</h2></div>
      <div class="tab1_content_wrap">
        <div class="tab1_content_left">
          <div class="tab1_content_left_tab">{{tab2name}}库存趋势</div>
          <div class="tab1_content_left_list">
            <div><span>类别：</span><span>全部类别</span></div>
            <div><span>趋势所属：</span><span>{{tab2name}}</span></div>
          </div>
        </div>
        <div ref="pie_change_qushi" style="width: 80%;height:400px;margin:20px 0;">
          <div class="noDate">
            <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
            <span class="nodataSpan">暂无数据</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tab_model_wrap" v-if="is_gz">
      <div class="tag1_wrap">
        <el-date-picker
          v-model="time_tab3"
          @change="time_select3"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-model="listQuery3.numtype" placeholder="请选择出入库类别" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter3(3)">
          <el-option v-for="item in numtypes" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter3">查询</el-button>
      </div>
      <div class="fengebr" @click="zeOver3" id="zonge3"><h2>库存变化趋势图例分析--按种类</h2></div>
      <div class="tab1_content_wrap">
        <div class="tab1_content_left">
          <div class="tab1_content_left_tab">{{tab2name}}库存趋势</div>
          <div class="tab1_content_left_list">
            <div><span>类别：</span><span>{{qushiSort}}</span></div>
            <div><span>趋势所属：</span><span>{{tab2name}}</span></div>
          </div>
        </div>
        <div ref="pie_change_qushi1" style="width: 80%;height:400px;margin:20px 0;">
          <div class="noDate">
            <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
            <span class="nodataSpan">暂无数据</span>
          </div>
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
import { getgoodsinfofortab1, getgoodschangefortab1, getgoodschangeQushi, getgoodschangeQushiSort } from '@/api/goods' //请求函数
import { getSortinfoone } from '@/api/sort' //请求函数
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      tab1name: getdepartmentName(),
      tab2name: getdepartmentName(),
      series_data: [],
      series_data_change: [],
      changeQushixAxis: [],
      changeQushiseries: [],
      changeQushixAxis1: [],
      changeQushiseries1: [],
      time: [moment().subtract(7, "days").format(),moment().format()],
      time_tab2: [moment().subtract(7, "days").format(),moment().format()],
      time_tab3: [moment().subtract(7, "days").format(),moment().format()],
      listQuery: { 
        time: [], 
        bm: '',
        gz: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      listQuery2: { 
        time: [],
        bm: '',
        gz: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      listQuery3: { 
        time: [], 
        numtype:'',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      numtypes: [
        {value: 1,label: '售出'},
        {value: 2,label: '退货'},
        {value: 3,label: '报损'},
        {value: 4,label: '新入库'},
      ],
      tab1info: { 
        zongnums: 0, 
        zoninprice: 0,
        zonlilv: 0,
        zonlirun: 0,
        zonoutprice: 0
      },
      tab1change: { 
        zongnchange: 0, 
        changeout: 0,
        changein: 0,
        changetui: 0,
        changesun: 0
      },
      bms: [],
      gzs: [],
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
    qushiSort: function() {
      if (this.listQuery3.numtype == '') {
        return '全部类别'
      }
      if (this.listQuery3.numtype == 1) {
        return '售出'
      }
      if (this.listQuery3.numtype == 2) {
        return '退货'
      }
      if (this.listQuery3.numtype == 3) {
        return '破损'
      }
      if (this.listQuery3.numtype == 4) {
        return '新入库'
      }
    }
  },
  mounted() {
    this.time_select()
    this.time_select2()
    this.time_select3()
    this.handleFilter()
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
      this.handleFilter3()
    }
  },
  created() {
    
  },
  methods: {
    //系列动画函数
    zeOver() {
      $('#zonge').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge').removeClass('animated bounce') }, 1000);
    },
    zeOver1() {
      $('#zonge1').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge1').removeClass('animated bounce') }, 1000);
    },
    zeOver2() {
      $('#zonge2').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge2').removeClass('animated bounce') }, 1000);
    },
    zeOver3() {
      $('#zonge3').toggleClass('animated bounce')
      setTimeout(function(){ $('#zonge3').removeClass('animated bounce') }, 1000);
    },
    //根据用户id获取该id下的所有用户信息
    getAllUserByidthis() {
      getallUserByidthis(this.listQuery).then(res => {
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
      this.listQuery.time[0] = moment(this.time[0]).valueOf()/1000
      this.listQuery.time[1] = moment(this.time[1]).valueOf()/1000
    },
    //日期选择函数
    time_select2(query) {
      this.listQuery2.time[0] = moment(this.time_tab2[0]).valueOf()/1000
      this.listQuery2.time[1] = moment(this.time_tab2[1]).valueOf()/1000
    },
    //日期选择函数
    time_select3(query) {
      this.listQuery3.time[0] = moment(this.time_tab3[0]).valueOf()/1000
      this.listQuery3.time[1] = moment(this.time_tab3[1]).valueOf()/1000
    },
    //tab1选择函数
    handleFilter(query) {
      //给侧边栏复制
      if (query == 1) {
        if (this.listQuery.bm == '') {
          this.tab1name = getdepartmentName()
        } else {
          getUserByuid({uid:this.listQuery.bm}).then(res => {
            let {data} = res
            this.tab1name = data.department
          })
        }
      }
      if (query == 2) {
        if (this.listQuery.gz == '') {
          this.tab1name = getdepartmentName()
        } else {
          getUserByuid({uid:this.listQuery.gz}).then(res => {
            let {data} = res
            this.tab1name = data.department
          })
        }
      }
      //获取库存数据和库存变化数据函数
      this._fetchActivityList()
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
    //tab3选择函数
    handleFilter3(query) {
      //获取库存数据和库存变化数据函数
      this._fetchActivityList3()
    },
    async _fetchActivityList() {
      if (this.listQuery.time.length == 0) {
        this.$message({
          message: '请您选择日期！',
          type: 'warning'
        });
        return
      }
      this.series_data = [] //清空图表数据
      this._fetchGoodsnums() //获取库存数据函数
      this._fetchGoodsChange() //获取库存变动数据
    },
    async _fetchActivityList2() {
      if (this.listQuery2.time.length == 0) {
        this.$message({
          message: '请您选择日期！',
          type: 'warning'
        });
        return
      }
      this._fetchGoodsChangeQushi()
    },
    async _fetchActivityList3() {
      if (this.listQuery3.time.length == 0) {
        this.$message({
          message: '请您选择日期！',
          type: 'warning'
        });
        return
      }
      this._fetchGoodsChangeQushi1()
    },
    //获取库存数据函数
    async _fetchGoodsnums() {
      getgoodsinfofortab1(this.listQuery).then(res => {
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
          this.$message({
            message: '没有更多库存信息！',
            type: 'warning'
          });
        } else {
          this.tab1info.zongnums = data.data.data.zongnums
          this.tab1info.zoninprice = data.data.data.zoninprice
          this.tab1info.zonoutprice = data.data.data.zonoutprice
          this.tab1info.zonlilv = data.data.data.zonlilv
          this.tab1info.zonlirun = data.data.data.zonlirun
          if (getRoleId() == 1 && this.listQuery.bm == '') {
            data.data.data.eachartsdata.forEach((item) => {
              getUserByuid({uid:item.pid}).then(res => {
                let {data} = res
                item.uid = data.department
                this.series_data.push({value:item.number,name:item.uid})
              })
            })
          }
          if (getRoleId() == 1 && this.listQuery.bm != '') {
            data.data.data.eachartsdata.forEach((item) => {
              getUserByuid({uid:item.uid}).then(res => {
                let {data} = res
                item.uid = data.department
                this.series_data.push({value:item.number,name:item.uid})
              })
            })
          }
          if (getRoleId() == 2 && this.listQuery.gz == '') {
            data.data.data.eachartsdata.forEach((item) => {
              getUserByuid({uid:item.uid}).then(res => {
                let {data} = res
                item.uid = data.department
                this.series_data.push({value:item.number,name:item.uid})
              })
            })
          }
          if (getRoleId() == 3 || this.listQuery.gz != '') {
            //对数组进行按sortid重新分组
            let nameContainer = {}; 
            data.data.data.eachartsdata.forEach(item => {
              nameContainer[item.sortid] = nameContainer[item.sortid] || [];
              nameContainer[item.sortid].push(item);
            });
            let fruitName = Object.keys(nameContainer)
            fruitName.forEach(sortid => {
              let count = 0;
              nameContainer[sortid].forEach(item => {
                count += Number(item.nums); 
              });
              this.series_data.push({'name': sortid, 'value': count});
            });
            this.series_data.forEach((item) => {
              getSortinfoone({id:item.name}).then(res => {
                let {data} =res
                item.name = data[0].name
              })
            })
          }
          let self = this
          setTimeout(function() {
            self.pie_show()
            // loading.close()
          },2000)
        }
      }).catch(error => {
        this.$message({
          message: '没有更多库存信息！',
          type: 'warning'
        });
        console.log(error)
      })
    },
    //获取库存变动数据
    async _fetchGoodsChange() {
      this.series_data_change = [] //清空图表数据
      this.tab1change.changeout = 0
      this.tab1change.changetui = 0
      this.tab1change.changesun = 0
      this.tab1change.changein = 0
      this.tab1change.zongnchange = 0
      getgoodschangefortab1(this.listQuery).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.$message({
            message: '没有更多库存变化信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          data.data.data.leftdata.forEach((item,index) => {
            this.tab1change.zongnchange += Math.abs(Number(item.numbefore - item.numnow))
            if (item.numtype == 1) {
              this.tab1change.changeout = Math.abs(item.numbefore - item.numnow)
              this.series_data_change.push({name:'售出',value:Math.abs(item.numbefore - item.numnow)})
            }
            if (item.numtype == 2) {
              this.tab1change.changetui = Math.abs(item.numbefore - item.numnow)
              this.series_data_change.push({name:'退货',value:Math.abs(item.numbefore - item.numnow)})
            }
            if (item.numtype == 3) {
              this.tab1change.changesun = Math.abs(item.numbefore - item.numnow)
              this.series_data_change.push({name:'报损',value:Math.abs(item.numbefore - item.numnow)})
            }
            if (item.numtype == 4) {
              this.tab1change.changein = Math.abs(item.numbefore - item.numnow)
              this.series_data_change.push({name:'新入库',value:Math.abs(item.numbefore - item.numnow)})
            }
          })
        }
        this.pie_kucunChange()
      }).catch(error => {
        console.log(error)
      })
    },
    //获取库存变动趋势数据
    async _fetchGoodsChangeQushi() {
      this.changeQushixAxis = []
      this.changeQushiseries = []
      getgoodschangeQushi(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.$message({
            message: '没有更多库存变化信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          data.data.data.leftdata.forEach((item,index) => {
            this.changeQushixAxis.push(item.addtime)
            this.changeQushiseries.push(item.nums)
          })
          this.pie_kucunChangeQushi()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //获取库存变动趋势数据
    async _fetchGoodsChangeQushi1() {
      this.changeQushixAxis1 = []
      this.changeQushiseries1 = []
      getgoodschangeQushiSort(this.listQuery3).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.$message({
            message: '没有更多库存变化信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          data.data.data.leftdata.forEach((item,index) => {
            let nums = item.numnow - item.numbefore
            if (item.numtype) {
              nums = Math.abs(item.numnow - item.numbefore)
            }
            this.changeQushixAxis1.push(item.addtime)
            this.changeQushiseries1.push(nums)
          })
          this.pie_kucunChangeQushi1()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //库存饼图
    pie_show() {
      let pieChart = echarts.init(this.$refs.pie)
      let option = {
        toolbox: {
          feature: {
            saveAsImage: {
              title: '下载'
            }
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            data: this.series_data,
            label: {
              formatter: '{b}: {d}%'
            },
          }
        ]
      }
      pieChart.clear()  
      pieChart.setOption(option)
      window.addEventListener('resize',function() {
        pieChart.resize()
      })
    },
    //库存变化饼图
    pie_kucunChange() {
      let pieChart = echarts.init(this.$refs.ku_change_pie)
      let option = {
        toolbox: {
          feature: {
            saveAsImage: {
              title: '下载'
            }
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            data: this.series_data_change,
            label: {
              formatter: '{b}: {d}%'
            },
          }
        ]
      }
      pieChart.clear()  
      pieChart.setOption(option)
      window.addEventListener('resize',function() {
        pieChart.resize()
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
    //库存变化趋势折线图2--按库存变化分类
    pie_kucunChangeQushi1() {
      let pieChart = echarts.init(this.$refs.pie_change_qushi1)
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
          data: this.changeQushixAxis1
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.changeQushiseries1,
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
  }
}
</script>

<style rel="stylesheet/scss" scoped>
.fengebr {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
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
.tab1_content_wrap {
  width: 100%;
  display: flex;
  padding: 20px;
}
.tab1_content_left {
  width: 20%;
  border: 1px solid rgb(220,220,220);
  border-radius: 7px;
  padding: 15px;
}
.tab1_content_left_tab {
  width: 100%;
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid rgb(220,220,220);
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.tab1_content_left_list {
  width: 100%;
  color: rgb(100,100,100);
}
.tab1_content_left_list>div{
  width: 100%;
  padding: 15px 0;
}
.tab1_content_left_list>div>span:first-child {
  display: inline-block;
  width: 100px;
  text-align: left;
}
.tab1_content_left_list>div>span:last-child {
  color: #409EFF;
}
</style>
