<template>
  <div class="app-container documentation-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>通知</span>
          </div>
          <div class="content">
            <div class="content-item">11111111111111111111111111111111111111111111111111111111111111111111</div>
            <div class="content-item">21111111111111111111111111111111111111111111111111111111111111111111</div>
            <div class="content-item">31111111111111111111111111111111111111111111111111111111111111111111</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>下载</span>
          </div>
          <div class="content">
            <div class="content-item">模板下载</div>
            <div class="content-item">软件下载</div>
            <div class="content-item">下载</div>
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
