<template>
  <div class="dashboard-editor-container animated bounceInLeft">
    <div ref="mapChart" style="width: 100%;min-height: 800px;"></div>
    <div class="fengebr">五指科技全国辐射图</div>
    <div ref="chinaMap" style="width: 100%;min-height: 800px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getmapforshandong } from '@/api/loginanduser' //请求函数
import listChina from '@/assets/js/china.json'
import listSd from '@/assets/js/map1.json'

export default {
  name: 'DashboardAdmin',
  mounted() {
    this.Getmapforshandong()
    this.Getmapforchina()
  },
  components: {
    
  },
  data() {
    return {
      //飞线地图所需
      series: [], //地图展现数据
      //24个省市经度纬度
      geoCoordMap: {
        '陕西': [109.503789, 35.860026],
        '西安': [108.946466, 34.347269],
        '济南': [117.000923, 36.675807],
        '甘肃': [103.832478, 36.065465],
        '兰州': [103.84044, 36.067321],
        '新疆': [87.633473, 43.799238],
        '乌鲁木齐': [87.62444, 43.830763],
        '内蒙古': [111.772606, 40.823156],
        '包头': [109.846544, 40.662929],
        '青海': [101.786462, 36.627159],
        '西宁': [101.78443, 36.623393],
        '宁夏': [106.265605, 38.476878],
        '银川': [106.258602, 38.487834],
        '四川': [104.073467, 30.577543],
        '成都': [104.081534, 30.655822],
        '重庆': [106.558434, 29.568996],
        '西藏': [91.124342, 29.652894],
        '拉萨': [91.120789, 29.65005],
        '云南': [101.592952, 24.864213],
        '昆明': [102.852448, 24.873998],
        '贵州': [106.714476, 26.60403],
        '贵阳': [106.636577, 26.653325],
        '广西': [108.924274, 23.552255],
        '南宁': [108.373451, 22.822607],
        '山西': [112.515496, 37.866566],
        '太原': [112.534919, 37.873219],
        '河南': [101.556307, 34.51139],
        '郑州': [113.631419, 34.753439],
        '湖北': [112.410562, 31.209316],
        '武汉': [114.311582, 30.598467],
        '湖南': [111.720664, 27.695864],
        '长沙': [112.945473, 28.234889],
        '江西': [115.676082, 27.757258],
        '南昌': [115.864589, 28.689455],
        '安徽': [117.33054, 31.734294],
        '合肥': [117.233443, 31.826578],
        '上海': [121.480539, 31.235929],
        '浙江': [120.159533, 30.271548],
        '杭州': [120.215503, 30.253087],
        '广东': [113.394818, 23.408004],
        '广州': [113.271431, 23.135336],
        '北京': [116.413384, 39.910925],
        '天津': [117.209523, 39.093668],
        '河北': [117.220297, 39.173149],
        '唐山': [118.186459, 39.636584],
        '黑龙江': [126.642464, 45.756967],
        '吉林': [125.3245, 43.886841],
        '辽宁': [123.429096, 41.796767],
      },
      fromdata: '济南',//默认飞线原点
      //初始化飞线数据
      XAData: [
        [{name: '济南'}, {name: '乌鲁木齐'}],
        [{name: '济南'}, {name: '北京'}],
        [{name: '济南'}, {name: '黑龙江'}],
        [{name: '济南'}, {name: '吉林'}],
        [{name: '济南'}, {name: '包头'}],
        [{name: '济南'}, {name: '辽宁'}],
        [{name: '济南'}, {name: '拉萨'}],
        [{name: '济南'}, {name: '上海'}],
        [{name: '济南'}, {name: '重庆'}],
        [{name: '济南'}, {name: '杭州'}],
        [{name: '济南'}, {name: '合肥'}],
        [{name: '济南'}, {name: '广州'}],
        [{name: '济南'}, {name: '长沙'}],
      ],
    }
  },
  created() {
    
  },
  methods: {
    Getmapforshandong() {
      let mapChart = echarts.init(this.$refs.mapChart)
        echarts.registerMap('HK', listSd[0]);
        let option = {
            title : {
                text: '山东省五指会员区域分布图',
                textStyle: {
                    color: 'black',
                },
                x:'center',
                top: 15
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}五指会员<br/>{c}个'
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
    },
    //中国地图飞线图
    convertData1(data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
            let dataItem = data[i]
            let fromCoord = this.geoCoordMap[dataItem[0].name]
            let toCoord = this.geoCoordMap[dataItem[1].name]
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name, toName: dataItem[1].name, coords: [fromCoord, toCoord]
                })
            }
        }
        return res
    },
    Getmapforchina() {
        let chinaMaps = echarts.init(this.$refs.chinaMap)
        echarts.registerMap('HK1', listChina[0]);
        let self = this
        self.series.push(
            {
                type: 'lines',
                zlevel: 15,
                effect: {
                    show: true, period: 4, trailLength: 0, symbol: 'arrow', symbolSize: 7,
                },
                lineStyle: {
                    normal: {width: 1.2, opacity: 0.6, curveness: 0.2, color: '#F19000'}
                },
                data: self.convertData1(self.XAData)
            },
            //出发点
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 15,
                rippleEffect: {
                    period: 4, brushType: 'stroke', scale: 4
                },
                symbol: 'circle',
                symbolSize: function (val) {
                    return 4 + val[2] / 10;
                },
                itemStyle: {
                    normal: {show: false}
                },
                tooltip: {
                    show: false,
                },
                data: [{
                    name: self.fromdata, value: self.geoCoordMap[self.fromdata].concat([100]),
                }],
            },
                /*到达点*/
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                    period: 4, brushType: 'stroke', scale: 4
                },
                zlevel: 15,
                label: {
                    normal: {
                        show: false
                    }
                },
                tooltip: {
                    show: false,
                },
                symbol: 'circle',
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        color: '#F19000'
                    }
                },
                data: self.XAData.map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: self.geoCoordMap[dataItem[1].name].concat([dataItem[1].name]),
                        tooltip: {
                            formatter: dataItem[0].name + "--" + dataItem[1].name + "：" + dataItem[1].value
                        }
                    }
                }),
            }
        )
        let option = {
            color: ['#fc5353', '#f4fc6c', '#e68b55', '#9a68ff', '#ff60c5'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (params.value) {
                        return params.name + ' : ' + params.value[2];
                    } else {
                        return params.name;
                    }
                }
            },
            legend: {
                orient: 'horizontal',
                left: '27%',
                top: '5%',
                data: ['高线'],
                textStyle: {
                    color: '#ffffff'
                },
                icon: 'circle'
            },
            geo: {
                map: 'HK1',
                zlevel: 10,
                layoutCenter: ['48%', '43%'],
                roam: true,
                layoutSize: "100%",
                zoom: 1.08,
                label: {
                    normal: {
                        show: true,//地图上的省份名称是否显示
                        textStyle:{
                            fontSize:12,
                            color: '#43D0D6'
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#062031',
                        borderWidth: 1.1,
                        borderColor: '#43D0D6'
                    },
                    emphasis: {
                        areaColor: '#43D0D6'
                    }
                }
            },
            series: this.series
        }
        chinaMaps.clear()
        chinaMaps.setOption(option)
      }
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
</style>
