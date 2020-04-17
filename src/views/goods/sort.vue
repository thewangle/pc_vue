<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入分类名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-if="is_gz" style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-edit" @click="addsort">添加分类</el-button>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="toExcle">导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      id="out-table"
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
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
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
        <el-button @click="dialogaddsort = false">取 消</el-button>
        <el-button type="primary" @click="addsortsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" :close="dialog_close" title="分类编辑" @close="tcclose">
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
    <!-- 使用说明 -->
    <drawer title="分类管理页 - 使用说明" :visible.sync='dialogVisible1' width="500px" close-on-click-modal>
      <div class="smWrap">
        <div class="smB">概述：此页为分类的添加与编辑页</div>
        <div class="smContent">
          <span class="smContentB">分类添加：</span>
          <div class="smContentC">
            <div>1.点击"添加分类"会弹出添加分类对话框</div>
            <div>2."分类名称"为要添加分类的名称</div>
            <div>3."备注"为要添加分类的备注描述</div>
            <div>4.点击"取消"关闭对话框，不会添加分类</div>
            <div>5.点击"确定"添加新分类</div>
          </div>
        </div>
        <div class="smContent">
          <span class="smContentB">分类列表：</span>
          <div class="smContentC">
            <div>1.展示账号下的所有分类</div>
            <div>2.点击"编辑"会弹出"分类编辑"对话框，对该分类进行编辑</div>
            <div>3."分类编辑"时点击"取消"不会提交分类编辑并关闭对话框，点击"确定"提交该分类编辑</div>
            <div>4.点击"删除"会弹出"是否删除该分类"提示框，"取消"将不删除该分类，"确定"会永久删除该分类</div>
          </div>
        </div>
        <div class="smContent">
          <span class="smContentB">备注：</span>
          <div class="smContentC">
            <div>1."部门级别"账号只能编辑/删除分类，不能添加新分类</div>
            <div>2."导出"功能，是导出当前商品列表里的内容，如果想多导出，可把列表每页显示调高（最高每页/50）</div>
          </div>
        </div>
      </div>
    </drawer>
    <div class="hellpWrap" @click="dialogVisible1 = true" style="top:100px;">
      <div class="hellpWrap1">
        <img src="../../assets/img/hellp.jpg" alt="" class="hellpImg">
        <span class="hellpB">使用帮助</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import moment from 'moment' //日期转换插件 
import { addSort, getSortinfo, editeSortinfo, deleteSort } from '@/api/sort' //请求函数
import XLSX from 'xlsx' //导出excle
export default {
  name: 'Dashboard',
  data() {
    return {
      dialogVisible1: false,
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
    //关闭进/售价格更改弹窗回调函数
    tcclose() {
      this._fetchActivityList() //重新获取数据
    },
    //导出excle
    toExcle() {
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
      XLSX.writeFile(wb, "分类列表.xlsx")
    },
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
          this._fetchActivityList()
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
