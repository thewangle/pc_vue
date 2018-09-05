<template>
  <div class="app-container documentation-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>角色</span>
            <el-button type="primary" style="margin-left: 50px;">新增角色</el-button>
          </div>
          <div class="content">
            <div><el-radio v-model="role" label="1" border>超级管理员</el-radio></div>
            <div><el-radio v-model="role" label="2" border>一级代理商</el-radio></div>
            <div><el-radio v-model="role" label="3" border>二级代理商</el-radio></div>
            <div><el-radio v-model="role" label="4" border>三级代理商</el-radio></div>
            <div><el-radio v-model="role" label="5" border>教练</el-radio></div>
            <div><el-radio v-model="role" label="6" border>总部普通员工</el-radio></div>
            <div><el-radio v-model="role" label="7" border>总部渠道员工</el-radio></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>权限</span>
          </div>
          <div class="content">
            <el-tree
              :data="data2"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              show-checkbox
              node-key="id"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'RoleManage',
  data() {
    return {
      role: '1',
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.documentation-container {
  margin: 50px;
}
.content div {
    margin-bottom: 5px;
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
