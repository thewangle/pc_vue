<template>
  <div class="page_wrap animated rotateIn">
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
        <el-select v-model="listQuery2.goodsid" placeholder="请选择商品" filterable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2(1)">
          <el-option v-for="item in numtypes" :label="item.label" :value="item.value"/>
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
        <div ref="pie_change_qushi" style="width: 80%;height:400px;margin:20px 0;"></div>
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
import { getGoodsinfobyid, getgoodBygoodsid, getpricechangeQushi } from '@/api/goods' //请求函数
import { getSortinfoone } from '@/api/sort' //请求函数
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      changeQushixAxis: [],
      changeQushiseries: [],
      time_tab2: [moment().subtract(7, "days").format(),moment().format()],
      listQuery2: { 
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
      priceHigh: 0,
      pricelow: 0,
      priceci: 0,
      numtypes: [],
      tab2name: '',
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
    this.time_select2()
    this.handleFilter2()
  },
  created() {
    
  },
  methods: {
    //系列动画函数
    zeOver() {
      $('#zonge').addClass('animated bounce')
      setTimeout(function(){ $('#zonge').removeClass('animated bounce') }, 1000);
    },
    //根据id获取该用户下的商品信息
    GetGoodsinfobyid() {
      getGoodsinfobyid({uid:getUserid()}).then(res => {
        let {data} = res
        if (data.code == 200) {
          data.data.forEach((item,index) => {
            if (index == 0) {
              this.listQuery2.goodsid = item.id
              this.tab2name = item.name
            }
            this.numtypes.push({label:item.name,value:item.id})
          })
        }
      }).catch(error => {
        console.log(error)
      })
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
    //获取库存变动趋势数据
    async _fetchGoodsChangeQushi() {
      this.changeQushixAxis = []
      this.changeQushiseries = []
      getpricechangeQushi(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.$message({
            message: '没有更多库存变化信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.priceci = data.data.data.leftdata.length
          this.pricelow = data.data.data.leftdata[0].priceinnow
          data.data.data.leftdata.forEach((item,index) => {
            this.priceHigh > item.priceinnow ? this.priceHigh = this.priceHigh : this.priceHigh = item.priceinnow
            this.pricelow < item.priceinnow ? this.pricelow = this.pricelow : this.pricelow = item.priceinnow
            this.changeQushixAxis.push(item.addtime)
            this.changeQushiseries.push(item.priceinnow)
          })
          this.pie_kucunChangeQushi()
        }
      }).catch(error => {
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
