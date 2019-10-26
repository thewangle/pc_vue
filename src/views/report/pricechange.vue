<template>
  <div class="page_wrap animated rotateIn">
    <!-- 单品价格变化趋势 -->
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
        <el-select v-model="listQuery2.goodsid" placeholder="请选择商品" filterable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2(1)">
          <el-option v-for="item in numtypess" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-model="listQuery2.priceinorout" placeholder="请选择变动种类" filterable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2">
          <el-option v-for="item in priceinoroutlist" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter2">查询</el-button>
      </div>
      <div class="fengebr" @click="zeOver" id="zonge"><h2>价格变动趋势图例分析</h2></div>
      <div class="tab1_content_wrap">
        <div class="tab1_content_left">
          <div class="tab1_content_left_tab">{{tab2name}}价格趋势</div>
          <div class="tab1_content_left_list">
            <div><span>最高价格：</span><span>{{priceHigh}}</span> 元</div>
            <div><span>最低价格：</span><span>{{pricelow}}</span> 元</div>
            <div><span>变动次数：</span><span>{{priceci}}</span> 次</div>
          </div>
        </div>
        <div class="noDate" v-show="!isShowEchart" style="width: 80%;">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="pie_change_qushi" v-show="isShowEchart" style="width: 80%;height:400px;margin:20px 0;"></div>
      </div>
    </div>
    <!-- 单品库存变化趋势 -->
    <div class="tab_model_wrap">
      <div class="tag1_wrap">
        <el-date-picker
          v-model="time_tab1"
          @change="time_select2"
          type="daterange"
          align="left"
          unlink-panels
          start-placeholder="开始日期"
          range-separator="至"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-model="listQuery1.goodsid" placeholder="请选择商品" filterable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter1(1)">
          <el-option v-for="item in numtypes" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-model="listQuery1.priceinorout" placeholder="请选择变动种类" filterable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter1(2)">
          <el-option v-for="item in priceinoroutlists" :label="item.label" :value="item.value"/>
        </el-select>
        <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter1">查询</el-button>
      </div>
      <div class="fengebr" @click="zeOvers" id="zonges"><h2>单品库存变动趋势图例分析</h2></div>
      <div class="tab1_content_wrap">
        <div class="tab1_content_left">
          <div class="tab1_content_left_tab">{{tab2names}}库存变化</div>
          <div class="tab1_content_left_list">
            <div><span>类别：</span><span>{{leibie}}</span></div>
            <div><span>柜组：</span><span>{{tab2names}}</span></div>
          </div>
        </div>
        <div class="noDate" v-show="!isShowEchart1" style="width: 80%;">
          <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
          <span class="nodataSpan">暂无数据</span>
        </div>
        <div ref="pie_change_qushi1" v-show="isShowEchart1" style="width: 80%;height:400px;margin:20px 0;"></div>
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
import {  getUserByuid } from '@/api/loginanduser' //请求函数
import { getGoodsinfobyid, getgoodBygoodsid, getpricechangeQushi, getstockbygoodsid } from '@/api/goods' //请求函数
import { getSortinfoone } from '@/api/sort' //请求函数
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      isShowEchart: true,
      isShowEchart1: true,
      changeQushixAxis: [],
      changeQushiseries: [],
      changeQushixAxis1: [],
      changeQushiseries1: [],
      time_tab2: [moment().subtract(7, "days").format(),moment().format()],
      time_tab1: [moment().subtract(7, "days").format(),moment().format()],
      listQuery2: { 
        time: [], 
        goodsid:'',
        priceinorout: 1,
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      listQuery1: { 
        time: [], 
        goodsid:'',
        priceinorout: 1,
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      priceinoroutlist: [
        {label: '进价',value: 1},
        {label: '售价',value: 2}
      ],
      priceinoroutlists: [
        {label: '售出',value: 1},
        {label: '退货',value: 2},
        {label: '报损',value: 3},
        {label: '补货',value: 4}
      ],
      leibie: '售出',
      priceHigh: 0,
      pricelow: 0,
      priceci: 0,
      numtypes: [],
      numtypess: [],
      tab2name: '',
      tab2names: '',
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
    this.GetGoodsinfobyid()
    this.time_select1()
    this.time_select2()
    this.handleFilter2()
    this.handleFilter1()
  },
  created() {
    
  },
  methods: {
    //系列动画函数
    zeOver() {
      $('#zonge').addClass('animated bounce')
      setTimeout(function(){ $('#zonge').removeClass('animated bounce') }, 1000);
    },
    zeOvers() {
      $('#zonges').addClass('animated bounce')
      setTimeout(function(){ $('#zonges').removeClass('animated bounce') }, 1000);
    },
    //根据id获取该用户下的商品信息
    GetGoodsinfobyid() {
      getGoodsinfobyid({uid:getUserid()}).then(res => {
        let {data} = res
        if (data.code == 200) {
          data.data.forEach((item,index) => {
            if (index == 0) {
              this.listQuery2.goodsid = item.id
              this.listQuery1.goodsid = item.id
              this.tab2name = item.name
              this.tab2names = item.name
            }
            this.numtypes.push({label:item.name,value:item.id})
            this.numtypess.push({label:item.name,value:item.id})
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //日期选择函数
    time_select1(query) {
      this.listQuery1.time[0] = moment(this.time_tab1[0]).valueOf()/1000
      this.listQuery1.time[1] = moment(this.time_tab1[1]).valueOf()/1000
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
        getgoodBygoodsid({goodsid:this.listQuery2.goodsid}).then(res => {
          let {data} = res
          this.tab2name = data.data.name
        })
      }
      //获取库存数据和库存变化数据函数
      this._fetchActivityList2()
    },
    handleFilter1(query) {
      //给侧边栏复制
      if (query == 1) {
        getgoodBygoodsid({goodsid:this.listQuery1.goodsid}).then(res => {
          let {data} = res
          this.tab2names = data.data.name
        })
      }
      if (query == 2) {
        if (this.listQuery1.priceinorout == 1) {
          this.leibie = '售出'
        }
        if (this.listQuery1.priceinorout == 2) {
          this.leibie = '退货'
        }
        if (this.listQuery1.priceinorout == 3) {
          this.leibie = '报损'
        }
        if (this.listQuery1.priceinorout == 4) {
          this.leibie = '补货'
        }
      }
      //获取库存数据和库存变化数据函数
      this._fetchActivityList1()
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
    async _fetchActivityList1() {
      if (this.listQuery1.time.length == 0) {
        this.$message({
          message: '请您选择日期！',
          type: 'warning'
        });
        return
      }
      this._fetchGoodsChangeQushi1()
    },
    //获取库存变动趋势数据
    async _fetchGoodsChangeQushi() {
      this.changeQushixAxis = []
      this.changeQushiseries = []
      getpricechangeQushi(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.isShowEchart = false
          this.$message({
            message: '没有更多价格变化信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.isShowEchart = true
          this.priceci = data.data.data.leftdata.length
          if (data.data.data.leftdata[0].priceinnow) {
            this.pricelow = data.data.data.leftdata[0].priceinnow
            data.data.data.leftdata.forEach((item,index) => {
              this.priceHigh > item.priceinnow ? this.priceHigh = this.priceHigh : this.priceHigh = item.priceinnow
              this.pricelow < item.priceinnow ? this.pricelow = this.pricelow : this.pricelow = item.priceinnow
              this.changeQushixAxis.push(item.addtime)
              this.changeQushiseries.push(item.priceinnow)
            })
          } else {
            this.pricelow = data.data.data.leftdata[0].priceoutnow
            data.data.data.leftdata.forEach((item,index) => {
              this.priceHigh > item.priceoutnow ? this.priceHigh = this.priceHigh : this.priceHigh = item.priceoutnow
              this.pricelow < item.priceoutnow ? this.pricelow = this.pricelow : this.pricelow = item.priceoutnow
              this.changeQushixAxis.push(item.addtime)
              this.changeQushiseries.push(item.priceoutnow)
            })
          }
          let self = this
          setTimeout(function() {
             self.pie_kucunChangeQushi()
          },500)
          // this.pie_kucunChangeQushi()
        }
      }).catch(error => {
        this.isShowEchart = false
        console.log(error)
      })
    },
    async _fetchGoodsChangeQushi1() {
      this.changeQushixAxis1 = []
      this.changeQushiseries1 = []
      getstockbygoodsid(this.listQuery1).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.isShowEchart1 = false
          this.$message({
            message: '没有更多库存变化信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.isShowEchart1 = true
          data.data.forEach((item,index) => {
            this.changeQushixAxis1.push(item.addtime)
            this.changeQushiseries1.push(Math.abs(Number(item.numbefore) - Number(item.numnow)))
          })
          let self = this
          setTimeout(function() {
            self.pie_kucunChangeQushi1()
          },500)
        }
      }).catch(error => {
        this.isShowEchart1 = false
        console.log(error)
      })
    },
    //价格变化趋势折线图
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
    },
    //单个商品库存变化趋势折线图
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
