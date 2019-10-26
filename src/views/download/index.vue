<template>
  <div class="dashboard-container">
    <el-tabs type="border-card">
      <el-tab-pane label="下载">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="五指使用手册下载" name="1">
            <a class="downloadA" href="http://www.wuzhi1688.com/download/wuzhi.pptx"  download="五指使用手册">点我下载</a>
          </el-collapse-item>
          <el-collapse-item title="五指介绍下载" name="2">
            <a class="downloadA" href="http://www.wuzhi1688.com/download/wuzhi.pptx"  download="五指宣传">点我下载</a>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <div class="goBack"><el-button type="primary" @click="$router.go(-1)">返回上一页</el-button></div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'download',
  data() {
    return {
      activeName: '1'
    }
  },
  mounted() {
    
  },
  computed: {
    
  },
  methods: {
    goBack() {
      console.log('go back');
    },
  },
}
</script>
<style scope>
.downloadA, .downloadA:focus {
  color: #409EFF;
}
.downloadA:hover {
  color: #F56C6C;
}
.goBack {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 30px 10px;
}
</style>
