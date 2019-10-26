<template>
  <div class="page_wrap animated fadeInLeft">
    <div class="navBar">经营报表</div>
    <div class="tag1_wrap">
        <el-select v-if="is_zzh" v-model="listQuery2.bm" placeholder="请选择部门" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2">
          <el-option v-for="item in bms" :label="item.label" :value="item.value"/>
        </el-select>
        <el-select v-if="is_bm" v-model="listQuery2.gz" placeholder="请选择柜组" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter2">
          <el-option v-for="item in gzs" :label="item.label" :value="item.value"/>
        </el-select>
        <div class="whichDay">
          <el-radio-group v-model="day" size="medium" @change="handleFilter2">
            <el-radio-button label="今日" ></el-radio-button>
            <el-radio-button label="昨日"></el-radio-button>
          </el-radio-group>
        </div>
    </div>
    <div class="infoWrap">
        <div class="infoList">
            <div class="infoListNum">
                <div class="infoB">销售数量</div>
                <div class="infoC">{{ salenums }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">销售额</div>
                <div class="infoC">¥{{ salemoney }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">利润</div>
                <div class="infoC">¥{{ saleprofit }}</div>
            </div>
        </div>
        <div class="infoList">
            <div class="infoListNum">
                <div class="infoB">退货数量</div>
                <div class="infoC">{{ returnums }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">退货额</div>
                <div class="infoC">¥{{ returnmoney }}</div>
            </div>
        </div>
        <div class="infoList">
            <div class="infoListNum">
                <div class="infoB">报损数量</div>
                <div class="infoC">{{ lossums }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">报损额</div>
                <div class="infoC">¥{{ lossmoney }}</div>
            </div>
        </div>
        <div class="infoList">
            <div class="infoListNum">
                <div class="infoB">补货数量</div>
                <div class="infoC">{{ patchnums }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">补货额</div>
                <div class="infoC">¥{{ patchmoney }}</div>
            </div>
        </div>
        <div class="infoList">
            <div class="infoListNum">
                <div class="infoB">新入库数量</div>
                <div class="infoC">{{ storageums }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">新入库成本</div>
                <div class="infoC">¥{{ storagemoney }}</div>
            </div>
        </div>
        <div class="infoList">
            <div class="infoListNum">
                <div class="infoB">总库存数量</div>
                <div class="infoC">{{ stockums }}</div>
            </div>
            <div class="infoListNum">
                <div class="infoB">总库存额</div>
                <div class="infoC">¥{{ stockmoney }}</div>
            </div>
        </div>
    </div>
    <div class="navBar"><span>{{ istady }}</span>之最</div>
    <div class="tag1_wrap">
        <el-select v-model="listQuery.kind" placeholder="请选择最种类" style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter">
          <el-option v-for="item in zuizl" :label="item.label" :value="item.value"/>
        </el-select>
        <div class="whichDay">
          <el-radio-group v-model="day2" size="medium" @change="handleFilter(1)">
            <el-radio-button label="今日" ></el-radio-button>
            <el-radio-button label="昨日"></el-radio-button>
          </el-radio-group>
        </div>
    </div>
    <div class="infoWrap">
        <div class="zuiList">
            <div class="isStart"><span>{{ istady }}</span>之星</div>
            <div class="zuiListWrap">
                <img src="../../../assets/img/good.png" alt="" class="goodImg">
                <div class="zuiB">{{ startname }}</div>
                <div class="zuiInfo">
                  <div style="margin-right:15px;"><span>数量：</span><span class="zuiInfoNum">{{ startnum }}</span></div>
                  <div><span>额度：</span><span class="zuiInfoNum">¥{{ startmoney }}</span></div>
                </div>
            </div>
        </div>
        <div class="zuiList">
            <div class="isStart" style="background:#909399;">该努力了</div>
            <div class="zuiListWrap">
                <img src="../../../assets/img/nogood.png" alt="" class="goodImg">
                <div class="zuiB">{{ unstartname }}</div>
                <div class="zuiInfo">
                  <div style="margin-right:15px;"><span>数量：</span><span class="zuiInfoNum">{{ unstartnum }}</span></div>
                  <div><span>额度：</span><span class="zuiInfoNum">¥{{ unstartmoney }}</span></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment' //日期转换插件 
import { getpartantId, getRoleId, getUserid, getdepartmentName } from '@/utils/auth'
import { getallUserByidthis } from '@/api/loginanduser' //请求函数
import { getruninfo, getmostone } from '@/api/report' //请求函数
export default {
  name: 'DashboardAdmin',
  components: {
    
  },
  data() {
    return {
      day: '今日',
      day2: '今日',
      is_zzh: false,
      is_bm: false,
      bms: [],
      gzs: [],
      salenums: 0,
      salemoney: 0,
      saleprofit: 0,
      returnums: 0,
      returnmoney: 0,
      lossums: 0,
      lossmoney: 0,
      patchnums: 0,
      patchmoney: 0,
      storageums: 0,
      storagemoney: 0,
      stockums: 0,
      stockmoney: 0,
      startname: '暂无数据',
      unstartname: '暂无数据',
      startnum: 0,
      startmoney: 0,
      unstartnum: 0,
      unstartmoney: 0,
      istady: '今日',
      listQuery: { 
        time: [],
        kind: 1,
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
      zuizl: [
        {value: 1,label: '销售之最'},
        {value: 2,label: '退货之最'},
        {value: 3,label: '报损之最'},
        {value: 4,label: '补货之最'},
        {value: 5,label: '新入库之最'},
        {value: 6,label: '库存之最'},
      ],
    }
  },
  computed: {
  },
  mounted() {
    if (getRoleId() !=3) {
      this.getAllUserByidthis()
    }
    if (getRoleId() == 1) {
      this.is_zzh = true
      this.is_bm = false
    } else if (getRoleId() == 2) {
      this.is_zzh = false
      this.is_bm = true
    } else if (getRoleId() == 3) {
      this.is_zzh = false
      this.is_bm = false
    }
    this.handleFilter2()
    this.handleFilter(1)
  },
  methods: {
    //获取经营报表信息
    handleFilter2() {
      let startTime =moment(new Date(new Date(new Date().toLocaleDateString()).getTime())).valueOf() // 当天0点
      let endTime = startTime + 24 * 60 * 60 * 1000 -1// 当天23:59
      let zuoTime = startTime - 24 * 60 * 60 * 1000// 昨日 24:00
      if (this.day == '今日') {
        this.listQuery2.time = []
        this.listQuery2.time.push(startTime / 1000)
        this.listQuery2.time.push(endTime / 1000)
      }
      if (this.day == '昨日') {
        this.listQuery2.time = []
        this.listQuery2.time.push(zuoTime / 1000)
        this.listQuery2.time.push(startTime / 1000)
      }
      this.salenums = this.salemoney = this.saleprofit = this.returnums = this.returnmoney = this.lossums = this.lossmoney = this.patchnums = this.patchmoney = this.storageums = this.storagemoney = this.stockums = this.stockmoney = 0
      getruninfo(this.listQuery2).then(res => {
        let { data } = res
        if (data.soldgoods) {
          this.salenums = data.soldgoods.zongnums
          this.salemoney = data.soldgoods.zonoutprice
          this.saleprofit = data.soldgoods.zonlirun
        }
        if (data.returngoods) {
          this.returnums = data.returngoods.zongnums
          this.returnmoney = data.returngoods.zonoutprice
        }
        if (data.lossgoods) {
          this.lossums = data.lossgoods.zongnums
          this.lossmoney = data.lossgoods.zonoutprice
        }
        if (data.patchgoods) {
          this.patchnums = data.patchgoods.zongnums
          this.patchmoney = data.patchgoods.zonoutprice
        }
        if (data.storagegoods) {
          this.storageums = data.storagegoods.zongnums
          this.storagemoney = data.storagegoods.zoninprice
        }
        if (data.stockgoods) {
          this.stockums = data.stockgoods.zongnums
          this.stockmoney = data.stockgoods.zoninprice
        }
      }).catch(error => {
        console.log(error)
      })
    },
    //获取今日之最信息
    handleFilter(query) {
      if (query == 1) {
        this.istady = this.day2
      }
      let startTime =moment(new Date(new Date(new Date().toLocaleDateString()).getTime())).valueOf() // 当天0点
      let endTime = startTime + 24 * 60 * 60 * 1000 -1// 当天23:59
      let zuoTime = startTime - 24 * 60 * 60 * 1000// 昨日 24:00
      if (this.day2 == '今日') {
        this.listQuery.time = []
        this.listQuery.time.push(startTime / 1000)
        this.listQuery.time.push(endTime / 1000)
      }
      if (this.day2 == '昨日') {
        this.listQuery.time = []
        this.listQuery.time.push(zuoTime / 1000)
        this.listQuery.time.push(startTime / 1000)
      }
      this.startname = this.unstartname = '暂无数据'
      this.startnum = this.startmoney = this.unstartnum = this.unstartmoney = 0
      getmostone(this.listQuery).then(res => {
        let { data } = res
        if (data.firstname) {
          this.startname = data.firstname
        }
        if (data.lastname) {
          this.unstartname = data.lastname
        }
        if (data.mostinfo.firstone.soldnum) {
          this.startnum = data.mostinfo.firstone.soldnum
        }
        if (data.mostinfo.firstone.soldmonye) {
          this.startmoney = data.mostinfo.firstone.soldmonye
        }
        if (data.mostinfo.lastone.soldnum) {
          this.unstartnum = data.mostinfo.lastone.soldnum
        }
        if (data.mostinfo.lastone.soldmonye) {
          this.unstartmoney = data.mostinfo.lastone.soldmonye
        }
      }).catch(error => {
        console.log(error)
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
  }
}
</script>

<style rel="stylesheet/scss">
.navBar {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  font-size: 25px;
  color: #409EFF;
  border-bottom: 1px solid rgb(230,230,230);
}
.tag1_wrap {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(230,230,230);
}
.whichDay {
    padding: 0 20px;
}
.infoWrap {
    width: 100%;
    padding: 20px 20px 60px 20px;
    border-bottom: 1px solid rgb(230,230,230);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.infoList {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    width: 30%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .42), 0 0 6px rgba(0, 0, 0, .14);
    cursor: pointer;
}
.infoB {
    color: #409EFF;
    font-size: 17px;
    margin-bottom: 20px;
}
.infoC {
    color: #F56C6C;
    font-size: 20px;
    font-weight: bold;
}
.zuiList {
    position: relative;
    width: 400px;
    height: 400px;
}
.isStart {
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    font-size: 12px;
    color: white;
    top: 0px;
    right: 0px;
    width: 80px;
    height: 80px;
    background: #F56C6C;
    text-align: center;
    line-height: 60px;
}
.zuiListWrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .42), 0 0 6px rgba(0, 0, 0, .14);
    margin-top: 40px;
}
.goodImg {
    width: 100px;
    height: 100px;
}
.zuiB {
    color: #409EFF;
    font-weight: bold;
    font-size: 20px;
    margin: 20px 0;
}
.zuiInfo {
    font-size: 16px;
    color: rgb(150,150,150);
    display: flex;
}
.zuiInfoNum {
    color: #F56C6C;
}
</style>
