<template>
  <div class="app-container documentation-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>下载</span>
          </div>
          <div class="content">
            <div class="content-item">
              <el-button type="primary" size="mini">
                <a href="http://cdnimg.bxunion.com/题库模板.zip">题库模板下载</a>
              </el-button>
            </div>
            <div class="content-item">
              <el-button type="primary" size="mini">
                <a href="http://cdnimg.bxunion.com/图片批量处理工具v7.0.zip">图片处理工具下载</a>
              </el-button>
            </div>
            <div class="content-item">
              <el-button type="primary" size="mini" v-if="is_agent">
                <a href="http://cdnimg.bxunion.com/downagent-inst.pdf">用户使用说明文档下载</a>
              </el-button>
              <el-button type="primary" size="mini" v-if="is_operator">
                <a href="http://cdnimg.bxunion.com/downoperate-inst.pdf">用户使用说明文档下载</a>
              </el-button>
            </div>
            <div class="content-item">
              <el-button type="primary" size="mini">
                <a href="http://cdnimg.bxunion.com/题库模板2.zip">题库管理模板</a>
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Documentation',
  data() {
    return {
      is_operator: false,
      is_agent: false,
      is_admin: false,
      level:'level'
    }
  },
  mounted () {
    this.getCookie(this.level)
  },
  methods: {
    getCookie (cookieName) {
      let strCookie = document.cookie;
      let arrCookie = strCookie.split("; ");
      for(var i = 0; i < arrCookie.length; i++){
          var arr = arrCookie[i].split("=");
          if(cookieName == arr[0]){
              if(arr[1] == 5){
                this.is_operator = true
              }else if(arr[1] == 2 || arr[1] == 3 || arr[1] == 4 || arr[1] == 1){
                this.is_agent = true
              }
          }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.documentation-container {
  margin: 50px;
}
.content-item {
  word-break: break-all;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}
.content-item:last-child {
  border-bottom: none;
}
</style>
