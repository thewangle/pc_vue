<template>
  <div class="dashboard-editor-container">
    <div class="top_tab"><span>{{name}}</span> 组织架构图</div>
    <div ref="pie" style="width: 100%;height:400px;margin:20px 0;"></div>
    <div class="bottom_tab">
      <div><span>{{name}}</span> 下共有 <span>{{allnum}}</span> 个账号</div>
      <div class="margin_div">其中 <span>{{bumennum}}</span> 个部门级账号</div>
      <div><span>{{guizunum}}</span> 个柜组级账号</div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getpartantId, getRoleId, getUserid, getUserName, getdepartmentName } from '@/utils/auth'
import { getallUserByid, getallUserByidmain } from '@/api/loginanduser' //请求函数
export default {
  name: 'organization',
  mounted() {
    this.getallUserbyid()
  },
  components: {
    
  },
  data() {
    return {
      allnum: 0,
      bumennum: 0,
      guizunum: 0,
      organization: [],
      neworganization: [],
      name: ''
    }
  },
  created() {
    
  },
  methods: {
    //根据id和role请求获取相关组织架构
    getallUserbyid() {
      let self = this
      let params = {
        role: getRoleId(),
        id: getUserid(),
        partantid: getpartantId()
      }
      if (params.role == 1) {
        this.name = getdepartmentName()
      }
      if (params.role == 2) {
        getallUserByidmain(params).then(res => {
          let {data} = res
          self.name = data.department
        })
      }
      getallUserByid(params).then(res => {
        let {data} = res
        self.allnum = data.length
        data.forEach((item) => {
          if (item.role == 2) {
            self.organization.push({partant: item,children: []})
            self.bumennum += 1
          } else {
            self.guizunum += 1
          }
          self.organization.forEach((items,indexs) => {
            if (item.role == 3 && item.partantid == items.partant.id) {
              self.organization[indexs].children.push(item)
            }
          })
        })
        self.organization.forEach((item) => {
          item.children.forEach((items) => {
            self.neworganization.push({name:item.partant.department,children: [{name: items.department}]})
          })
        })
        setTimeout(this.pie_show(),800)
      }).catch(error => {
        console.log(error)
      })
    },
    //组织架构图函数
    pie_show() {
      let self = this
      let pieChart = echarts.init(this.$refs.pie)
      let data = {
        name: self.name,
        children: self.neworganization
      }
      let option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 14,
            label: {
              normal: {
                  position: 'bottom',
                  verticalAlign: 'middle',
                  align: 'center',
                  fontSize: 13
              }
            },
            leaves: {
              label: {
                normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      pieChart.clear()
      pieChart.setOption(option)
    },
  }
}
</script>

<style rel="stylesheet/scss">
.top_tab {
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  border-bottom: 1px solid rgb(220,220,220);
}
.top_tab span,.bottom_tab span {
  color: red;
}
.bottom_tab {
  width: 100%;
  padding: 20px;
  display: flex;
  border-top: 1px solid rgb(220,220,220);
}
.margin_div {
  margin: 0 30px;
}
</style>
