<template>
  <div class="dashboard-editor-container animated bounceInLeft">
    <div ref="mapChart" style="width: 100%;height: 700px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getmapforshandong } from '@/api/loginanduser' //请求函数
export default {
  name: 'DashboardAdmin',
  mounted() {
    this.Getmapforshandong()
  },
  components: {
    
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    Getmapforshandong() {
      let mapChart = echarts.init(this.$refs.mapChart)
      getmapforshandong().then(res => {
        let {data} = res
        echarts.registerMap('HK', data);
        let option = {
            title : {
                text: '山东省一目了然会员区域分布图',
                textStyle: {
                    color: 'black',
                },
                x:'center',
                top: 15
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}一目了然会员<br/>{c}个'
            },
            visualMap: {
                text:['High','Low'],
                realtime: false,
                calculable: true,
                right: 30,
                textStyle: {
                    color: 'white',
                },
                inRange: {
                    color: ['lightskyblue','yellow', 'orangered']
                }
            },
            series: [
                {
                    name: '香港18区人口密度',
                    type: 'map',
                    mapType: 'HK', // 自定义扩展图表类型
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name: '济南市', value: 100},
                        {name: '德州市', value: 120},
                        {name: '滨州市', value: 110},
                        {name: '东营市', value: 90},
                        {name: '淄博市', value: 130},
                        {name: '潍坊市', value: 70},
                        {name: '烟台市', value: 20},
                        {name: '青岛市', value: 40},
                        {name: '威海市', value: 150},
                        {name: '日照市', value: 90},
                        {name: '临沂市', value: 160},
                        {name: '枣庄市', value: 60},
                        {name: '济宁市', value: 10},
                        {name: '菏泽市', value: 200},
                        {name: '泰安市', value: 100},
                        {name: '聊城市', value: 80}
                    ],
                }
            ]
        }
        mapChart.clear() 
        mapChart.setOption(option);
        window.addEventListener('resize',function() {
            mapChart.resize()
        })
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" scoped>

</style>
