<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入分类名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-if="is_gz" style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-edit" @click="addsort">添加分类</el-button>
    </div>
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
      <el-table-column label="分类名称" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类下产品数" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nums }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleShowDetial(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" @click="copyTask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogaddsort" title="添加分类">
      <div class="dialog_div">
        <span>分类名称</span>
        <el-input v-model="sorts.name" placeholder="请输入分类名称" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>备注</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入分类备注"
          v-model="sorts.remark">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsortsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" :close="dialog_close" title="供应商编辑">
      <div class="dialog_div">
        <span>分类名称</span>
        <el-input v-model="table_info.name" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>备注</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入供应商备注"
          v-model="table_info.remark">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsortinfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import moment from 'moment' //日期转换插件 
import { addSort, getSortinfo, editeSortinfo, deleteSort } from '@/api/sort' //请求函数
export default {
  name: 'Dashboard',
  data() {
    return {
      is_gz: false,
      listLoading: false,//table加载的时候loading
      dialogaddsort: false,
      sorts: {
        name: '',
        remark: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      list: [], //table的数据
      listQuery: { //动态请求table数据时传递的参数
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        name: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      total: 1,//table一共多少条数据
      dialogVisible: false,//dialog是否显示
      table_info: {},//用于dialog展示
    }
  },
  mounted() {
    this.handleFilter()
    if (getRoleId() == 3) {
      this.is_gz = true
    }
  },
  computed: {
    
  },
  methods: {
    //添加分类
    addsort() {
      this.dialogaddsort = true
    },
    addsortsubmit() {
      //验证表单是否填写完整
      if (this.sorts.name == '') {
        this.$message({
          message: '请您填写分类名称',
          type: 'warning'
        });
        return
      }
      addSort(this.sorts).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.$message({
            message: '恭喜您！添加成功！',
            type: 'success'
          });
          this.dialogaddsort = false
        } else {
          this.$message.error('对不起！添加失败！')
          this.dialogaddsort = false
        }
      }).catch(error => {
        this.$message.error('对不起！添加失败！')
        this.dialogaddsort = false
      })
    },
    //点击编辑
    handleShowDetial(row_data) {
      this.table_info = row_data
      this.dialogVisible = true
    },
    //更改供应商信息
    editsortinfo() {
      editeSortinfo(this.table_info).then(res => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info = ''
        this._fetchActivityList()
      }).catch(error => {
        this.$message('编辑分类信息失败!')
      })
    },
    //点击删除
    copyTask(row_data) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          'id': row_data.id
        }
        deleteSort(data).then(res => {
          this.$message({
            type: 'success',
            message: res.data.message
          });
          this._fetchActivityList()
        }).catch(error => {
          this.$message('删除失败')
        })
      }).catch(() => {

      });
    },
    //显示条数改变时触发
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._fetchActivityList()//重新获取数据
    },
    //当前页码改变时触发
    handleCurrentChange(current) {
      this.listQuery.page_no = current //将当前页改变为改变后的页码
      this._fetchActivityList() //重新获取数据
    },
    // 获取table数据函数
    async _fetchActivityList() {
      this.listLoading = true //加载动画
      getSortinfo(this.listQuery).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.listLoading = false
          this.total = data.data.count
          this.list = data.data.data
        }
        if (data.code == 201) {
          this.list = []
          this.listLoading = false
          this.$message('没有更多分类!')
        }
      }).catch(error => {
        this.list = []
        this.listLoading = false
        this.$message('获取分类信息失败！')
      })
    },
    //顶部搜索框搜索功能
    handleFilter() {
      this.listQuery.page_no = 1 //将当前页归1
      this._fetchActivityList() //重新获取数据
    },
    //dialog关闭函数
    dialog_close() {
      this.table_info = ''
    },
    dialogfee_close() {
      this.table_info = ''
      // this.years = ''
      console.log('this.years')
    }
  },
}
</script>
<style scope>
  .filter-container {
    padding: 10px;
  }
  .dialog_div {
    width: 80%;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .dialog_div > span {
    width: 130px;
  }
</style>
