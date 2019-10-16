<template>
  <div class="page_wrap animated fadeInLeft">
    <div class="tab_model_wrap">
      <div class="tag1_wrap">
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
          <div class="salesTagListBiao">{{tab2name}}会员数量</div>
          <div><span class="salesTagListnum">{{tab1info.zongnums}}</span>个</div>
        </div>
        <div class="salesTagList" @click="zeOver1" id="zonge1" style="width:32%;background-image: linear-gradient(104deg, #6bb3ff, #58a4ff);">
          <div class="salesTagListBiao">{{tab2name}}男会员数量</div>
          <div><span class="salesTagListnum">{{tab1info.boynums}}</span>个</div>
        </div>
        <div class="salesTagList" @click="zeOver2" id="zonge2" style="width:32%;background-image: linear-gradient(104deg, #ffbb3f, #ff9e47);">
          <div class="salesTagListBiao">{{tab2name}}女会员数量</div>
          <div><span class="salesTagListnum">{{tab1info.girlnums}}</span>个</div>
        </div>
      </div>
      <div style="width: 100%;padding-right:15px;">
        <div class="fengebr" @click="zeOver3" id="zonge3"><h2>会员男女比例图例分析</h2></div>
        <div ref="pie_change_qushi" style="width: 100%;height:400px;margin:20px 0;">
          <div class="noDate">
            <img src="../../assets/img/nodata.jpg" alt="" class="nodataImg">
            <span class="nodataSpan">暂无数据</span>
          </div>
        </div>
        <div class="fengebr" @click="zeOver4" id="zonge4"><h2>会员年龄段图例分析</h2></div>
        <div ref="zbChart" style="width: 100%;height:400px;margin:20px 0;">
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
import { getmembers } from '@/api/report' //请求函数
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      tab2name: getdepartmentName(),
      series_data: [],
      series_data_change: [],
      changeQushixAxis: [],
      changeQushiseries: [],
      listQuery2: { 
        bm: '',
        gz: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      tab1info: { 
        zongnums: 0, 
        boynums: 0,
        girlnums: 0
      },
      bms: [],
      gzs: [],
      bodyMax: 0,
      itemnums: [],
      itemnames: ['男','女'],
      itemnames1: ['0岁 - 3岁','4岁 - 6岁','7岁 - 12岁','13岁 - 15岁','16岁 - 19岁','20岁 - 25岁','26岁 - 35岁','36岁 - 45岁','46岁以上'],
      itemnums1: [
        {value: 0,name:'0岁 - 3岁'},
        {value: 0,name:'4岁 - 6岁'},
        {value: 0,name:'7岁 - 12岁'},
        {value: 0,name:'13岁 - 15岁'},
        {value: 0,name:'16岁 - 19岁'},
        {value: 0,name:'20岁 - 25岁'},
        {value: 0,name:'26岁 - 35岁'},
        {value: 0,name:'36岁 - 45岁'},
        {value: 0,name:'46岁以上'}
      ],
      is_bm: false,
      is_zzh: false,
      is_gz: false,
    }
  },
  computed: {
  },
  mounted() {
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
    //系列动画函数
    zeOver() {
      $('#zonge').toggleClass('animated wobble')
      setTimeout(function(){ $('#zonge').removeClass('animated wobble') }, 1000);
    },
    zeOver1() {
      $('#zonge1').toggleClass('animated rubberBand')
      setTimeout(function(){ $('#zonge1').removeClass('animated rubberBand') }, 1000);
    },
    zeOver2() {
      $('#zonge2').toggleClass('animated shake')
      setTimeout(function(){ $('#zonge2').removeClass('animated shake') }, 1000);
    },
    zeOver3() {
      $('#zonge3').toggleClass('animated rubberBand')
      setTimeout(function(){ $('#zonge3').removeClass('animated rubberBand') }, 1000);
    },
    zeOver4() {
      $('#zonge4').toggleClass('animated shake')
      setTimeout(function(){ $('#zonge4').removeClass('animated shake') }, 1000);
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
      this._fetchreturnGoodsByGroup()
    },
    //获取商品销售数据--用于象形柱状图
    async _fetchreturnGoodsByGroup() {
      this.itemnums = []
      this.itemnames = []
      this.itemnums1.forEach((item) => {
        item.value = 0
      })
      getmembers(this.listQuery2).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.$message({
            message: '没有更多新入库信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          this.tab1info = data.data.listdata
          let newBoynums = 0
          let newGirlnums = 0
          data.data.leftdata.forEach((item) => {
            //赋值男女比例饼图
            if (item.sex == 1) {
              newBoynums += 1
            }
            if (item.sex == 2) {
              newGirlnums += 1
            }
            //赋值年龄段饼图
            if (item.age >=0 && item.age <=3) {
              this.itemnums1[0].value += 1
            }
            if (item.age >=4 && item.age <=6) {
              this.itemnums1[1].value += 1
            }
            if (item.age >=7 && item.age <=12) {
              this.itemnums1[2].value += 1
            }
            if (item.age >=13 && item.age <=15) {
              this.itemnums1[3].value += 1
            }
            if (item.age >=16 && item.age <=19) {
              this.itemnums1[4].value += 1
            }
            if (item.age >=20 && item.age <=25) {
              this.itemnums1[5].value += 1
            }
            if (item.age >=26 && item.age <=35) {
              this.itemnums1[6].value += 1
            }
            if (item.age >=36 && item.age <=45) {
              this.itemnums1[7].value += 1
            }
            if (item.age >=46) {
              this.itemnums1[8].value += 1
            }
          })
          this.itemnums = [
            {value:newBoynums,name:'男'},
            {value:newGirlnums,name:'女'},
          ]
          this.itemnames = ['男','女']
          let self = this
          setTimeout(function() {
            self.pie_change_qushi()
            self.zbChart()
          },800)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //占比饼图
    pie_change_qushi() {
        let myChart = echarts.init(this.$refs.pie_change_qushi);
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 个 ({d}%)"
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
                    name: '会员男女占比',
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
    //会员年龄段占比饼图
    zbChart() {
        let myChart = echarts.init(this.$refs.zbChart);
        let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} 个 ({d}%)"
            },
            legend: {
                left: 55,
                itemGap: 20,
                formatter: function (a) {
                    return a;
                },
                orient: 'vertical',
                data: this.itemnames1
            },
            series : [
                {
                    name: '会员男女占比',
                    type: 'pie',
                    radius: '80%',
                    roseType: 'angle',
                    center: ['50%', '50%'],
                    label: {
                        formatter: '{b}: {d}%'
                    },
                    data:this.itemnums1
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
