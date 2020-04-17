<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入供应商名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" placeholder="请输入供应商手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
      <el-table-column label="供应商名称" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商地址" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleShowDetial(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" @click="copyTask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" :close="dialog_close" title="供应商编辑" @close="tcclose">
      <div class="dialog_div">
        <span>供应商名称</span>
        <el-input v-model="table_info.name" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>电话</span>
        <el-input v-model="table_info.phone" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>供应商地址</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入供应商地址"
          v-model="table_info.address">
        </el-input>
      </div>
      <div class="dialog_div">
        <span>联系人</span>
        <el-input v-model="table_info.contact" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="edituserinfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 使用说明 -->
    <drawer title="供应商列表页 - 使用说明" :visible.sync='dialogVisible11' width="500px" close-on-click-modal>
      <div class="smWrap">
        <div class="smB">概述：此页为供应商的展示与编辑页</div>
        <div class="smContent">
          <span class="smContentB">列表：</span>
          <div class="smContentC">
            <div>1.展示账号下的所有供应商</div>
            <div>2.点击"编辑"会弹出"供应商编辑"对话框，对该供应商进行编辑，点击"取消"取消编辑，点击"确定"提交编辑</div>
            <div>3.点击"删除"会弹出"是否删除该供应商"提示框"取消"将不删除该供应商，"确定"会永久删除该供应商</div>
          </div>
        </div>
        <div class="smContent">
          <span class="smContentB">备注：</span>
          <div class="smContentC">
            <div>"导出"功能，是导出当前商品列表里的内容，如果想多导出，可把列表每页显示调高（最高每页/50）</div>
          </div>
        </div>
      </div>
    </drawer>
    <div class="hellpWrap" @click="dialogVisible11 = true" style="top:100px;">
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
import { getSupplierinfo, editeSupplierinfo, deleteSupplier } from '@/api/supplier' //请求函数
import XLSX from 'xlsx' //导出excle
export default {
  name: 'Dashboard',
  data() {
    return {
      dialogVisible11: false,
      listLoading: false,//table加载的时候loading
      list: [], //table的数据
      listQuery: { //动态请求table数据时传递的参数
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        name: '',
        phone: '',
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
      XLSX.writeFile(wb, "供应商列表.xlsx")
    },
    //点击编辑
    handleShowDetial(row_data) {
      this.table_info = row_data
      this.dialogVisible = true
    },
    //更改供应商信息
    edituserinfo() {
      if(!(/^1[3456789]\d{9}$/.test(this.table_info.phone))){ 
          this.$message({
            message: '请您输入正确的手机号格式！',
            type: 'warning'
          });
          return false; 
      }
      editeSupplierinfo(this.table_info).then(res => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info = ''
        this._fetchActivityList()
      }).catch(error => {
        this.$message('编辑供应商信息失败!')
      })
    },
    //点击删除
    copyTask(row_data) {
      this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          'id': row_data.id
        }
        deleteSupplier(data).then(res => {
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
      getSupplierinfo(this.listQuery).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.listLoading = false
          this.total = data.data.count
          this.list = data.data.data
        }
        if (data.code == 201) {
          this.list = []
          this.listLoading = false
          this.$message('没有更多供应商!')
        }
      }).catch(error => {
        this.list = []
        this.listLoading = false
        this.$message('获取供应商信息失败！')
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
