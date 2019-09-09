<template>
  <div class="page_wrap animated rotateIn">
    <div class="tab_model_wrap">
      <div class="tag1_wrap">
        <span class="tabSpan">滞销时间段：</span>
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
        <span class="tabSpan">滞销数量：</span>
        <el-input placeholder="请输入滞销数量" v-model="listQuery2.unsalableNum" style="width: 200px;margin-left:10px;"></el-input>
        <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter2">查询</el-button>
      </div>
      <div class="salesTag">
        <div class="salesTagList" style="width:32%;" @click="zeOver" id="zonge">
          <div class="salesTagListBiao">{{tab2name}} 滞销产品种类</div>
          <div><span class="salesTagListnum">{{tab1info.zongnums}}</span> 种</div>
        </div>
        <div class="salesTagList" @click="zeOver1" id="zonge1" style="width:32%;background-image: linear-gradient(104deg, #6bb3ff, #58a4ff);">
          <div class="salesTagListBiao">{{tab2name}} 滞销成本</div>
          <div><span class="salesTagListnum">{{tab1info.zoninprice}}</span>元</div>
        </div>
        <div class="salesTagList" @click="zeOver2" id="zonge2" style="width:32%;background-image: linear-gradient(104deg, #ffbb3f, #ff9e47);">
          <div class="salesTagListBiao">{{tab2name}} 滞销预售总额</div>
          <div><span class="salesTagListnum">{{tab1info.zongprice}}</span>元</div>
        </div>
      </div>
      <div style="width: 100%;padding-right:15px;">
        <div class="fengebr" @click="zeOver4" id="zonge4"><h2>滞销成本占比图例分析</h2></div>
        <div ref="zbChart" style="width: 100%;height:400px;margin:20px 0;"></div>
      </div>
      <!-- 商品列表table -->
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
        <el-table-column label="商品名称" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品编码" min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="商品分类" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sortid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.supplierid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="商品规格" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.format }}</span>
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
        <el-table-column label="毛利率" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ ((scope.row.outprice - scope.row.inprice) / scope.row.inprice * 100).toFixed(2) }} %</span>
          </template>
        </el-table-column>
        <el-table-column label="入库时间" width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addtime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏目 -->
      <div class="pagination-container" style="padding: 0 20px;">
        <el-pagination :current-page="listQuery2.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery2.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
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
import { getunsalablegoodsinfo, getunsalablegoodsinfoForzb, getunsalablegoodslist, getunsalablegoods } from '@/api/report' //请求函数
import { getSupplierall } from '@/api/supplier' //获取供应商
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      listQuery: { //动态请求table数据时传递的参数
        time: [],
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      isgz: false,
      listLoading: false,
      list: [],
      total: 1,//table一共多少条数据
      tab2name: getdepartmentName(),
      series_data: [],
      series_data_change: [],
      changeQushixAxis: [],
      changeQushiseries: [],
      time_tab2: [moment().subtract(7, "days").format(),moment().format()],
      listQuery2: { 
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        time: [],
        bm: '',
        gz: '',
        unsalableNum: 1,
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
    if (getRoleId() == 3) {
      this.isgz = true
    }
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
    zeOver4() {
      $('#zonge4').toggleClass('animated shake')
      setTimeout(function(){ $('#zonge4').removeClass('animated shake') }, 1000);
    },
    //显示条数改变时触发
    handleSizeChange(size) {
      this.listQuery2.page_size = size
      this._fetchActivityList(this.listQuery2)//重新获取数据
    },
    //当前页码改变时触发
    handleCurrentChange(current) {
      this.listQuery2.page_no = current //将当前页改变为改变后的页码
      this._fetchActivityList(this.listQuery2) //重新获取数据
    },
    // 获取table数据函数
    async _fetchActivityList(query) {
      this.listLoading = true //加载动画
      getunsalablegoodslist(query).then(res => {
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
    time_select2(query) {
      this.listQuery2.time[0] = moment(this.time_tab2[0]).valueOf()/1000
      this.listQuery2.time[1] = moment(this.time_tab2[1]).valueOf()/1000
    },
    //tab2选择函数
    handleFilter2(query) {
      this.listQuery2.page_no = 1
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
      let goodsList = await getunsalablegoods(this.listQuery2)
      let goodsLists = goodsList.data
      this.listQuery2.goodsLists = goodsLists
      this.Getunsalablegoodsinfo(this.listQuery2)
      this._fetchreturnGoodsByGroup(this.listQuery2)
      this._fetchActivityList(this.listQuery2)
    },
    //获取滞销商品info -- 用于滞销分析顶部tab数据渲染
    async Getunsalablegoodsinfo(query) {
      getunsalablegoodsinfo(query).then(res => {
        let {data} = res
        this.tab1info = data
      })
    },
    //获取商品滞销数据--用于滞销占比饼状图
    async _fetchreturnGoodsByGroup(query) {
      this.itemnums = []
      this.itemnames = []
      getunsalablegoodsinfoForzb(query).then(res => {
        let {data} = res
        if (data.code == 201) {
          this.$message({
            message: '没有更多新入库信息！',
            type: 'warning',
            duration:5000
          });
        } else {
          data.forEach((item,index) => {
            let itemnums = 0
            item.forEach((item1,index1) => {
              itemnums += Number(item1.nums)
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
          },2000)
        }
      }).catch(error => {
        console.log(error)
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
  }
}
</script>

<style rel="stylesheet/scss">
.tabSpan {
  margin-left: 10px;
  font-size: 14px;
  color: rgb(120,120,120);
}
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
