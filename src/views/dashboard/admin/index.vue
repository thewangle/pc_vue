<template>
  <div class="dashboard-editor-container">
    <div ref="pie" style="width: 100%;height:400px;margin:20px 0;"></div>
    <el-button style="margin: 10px;" type="primary" icon="el-icon-search" @click="zhu_show">点击出现柱状图</el-button>
    <div ref="zhu" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'DashboardAdmin',
  mounted() {
    this.pie_show()
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
        title: {
          text: '我是一个大大大饼图',
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 200,
                name: '中国',
              },
              { value: 100,
                name: '美国',
              },
              { value: 50,
                name: '欧盟',
              },
              { value: 20,
                name: '日本',
              }
            ],
          }
        ]
      }
      pieChart.clear()  
      pieChart.setOption(option)
    },
    zhu_show() {
      let zhuChart = echarts.init(this.$refs.zhu)
      let option = {
          toolbox: {
            feature: {
              saveAsImage: {
                title: '保存'
              }
            },
          },
          title: {
            text: '中小学安全教育总体分析表'
          },
          grid: {left:'2%',right:'2%',bottom:'10%',containLabel:true},
          tooltip: {},
          xAxis: {
            data: ['中国','美国','日本'],
            axisLabel:{
              formatter: (value) => {
                return value.split("").join("\n")
              }
            }
          },
          yAxis: {},
          series: [{
            name: '占比',
            type: 'bar',
            data: [10, 20, 36]
          }]
        }
      zhuChart.clear()  
      zhuChart.setOption(option)
    },
  }
}
</script>

<style rel="stylesheet/scss">

</style>
