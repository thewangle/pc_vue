<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入会员姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" placeholder="请输入会员手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="toExcle">导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      id="out-table"
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员姓名" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员生日" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }} 岁</span>
        </template>
      </el-table-column>
      <el-table-column label="会员性别" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员描述" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleShowDetial(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" @click="renewalfee(scope.row)">推送</el-button>
          <el-button type="primary" size="small" @click="copyTask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" :close="dialog_close" title="账号编辑">
      <div class="dialog_div">
        <span>会员姓名</span>
        <el-input v-model="table_info.name" :disabled="true" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>电话</span>
        <el-input v-model="table_info.phone" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>会员生日</span>
        <el-input v-model="table_info.birthday" :disabled="true" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>会员性别</span>
        <el-input v-model="table_info.sex" :disabled="true" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>会员描述</span>
        <el-input v-model="table_info.description" autocomplete="off"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituserinfo">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogrenewalfee" :close="dialogfee_close" title="续费">
      <div class="dialog_div">
        <span style="width:100px;">续费年限：</span>
        <div style="width:150px;">
          <el-input v-model="years" autocomplete="off"></el-input>
        </div>
        <div style="margin-left:5px;">年</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogrenewalfee = false">取 消</el-button>
        <el-button type="primary" @click="renewalfeebt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import moment from 'moment' //日期转换插件 
import { getMemberinfo, editeMemberinfo, deleteMemberinfo } from '@/api/member' //请求函数
import XLSX from 'xlsx' //导出excle
export default {
  name: 'Dashboard',
  data() {
    return {
      years: 1, //续费用年限
      listLoading: false,//table加载的时候loading
      list: [], //table的数据
      listQuery: { //动态请求table数据时传递的参数
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        name: '',//会员名
        phone: '',//上级用户名
        role: getRoleId(),
        userid: getUserid(),
        userpartid: getpartantId()
      },
      total: 1,//table一共多少条数据
      dialogVisible: false,//dialog是否显示
      dialogrenewalfee: false,
      table_info: {},//用于dialog展示
    }
  },
  mounted() {
    this.handleFilter()
  },
  computed: {
    
  },
  methods: {
    //导出excle
    toExcle() {
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
      XLSX.writeFile(wb, "会员列表.xlsx")
    },
    //点击编辑
    handleShowDetial(row_data) {
      this.table_info = row_data
      this.dialogVisible = true
    },
    //更改会员信息
    edituserinfo() {
      if(!(/^1[3456789]\d{9}$/.test(this.table_info.phone))){ 
          this.$message({
            message: '请您输入正确的手机号格式！',
            type: 'warning'
          });
          return false; 
      } 
      editeMemberinfo(this.table_info).then(res => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info = ''
        this._fetchActivityList()
      }).catch(error => {
        this.$message('编辑会员信息失败!')
      })
    },
    //点击续费
    renewalfee(row_data) {
      this.table_info = row_data
      this.dialogrenewalfee = true
    },
    //更改续费提交
    renewalfeebt() {
      let addtimes = moment(this.table_info.addtime).add('days',365 * (this.years)).format('YYYY-MM-DD HH:mm:ss')
      let data = {
        username : this.table_info.username,
        addtime : addtimes
      }
      renewalFee(data).then(res => {
        this.dialogrenewalfee = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info = ''
        this.years = 1
        this._fetchActivityList()
      }).catch(error => {
        this.$message(error)
      })
    },
    //点击删除
    copyTask(row_data) {
      this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          'id': row_data.id
        }
        deleteMemberinfo(data).then(res => {
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
      getMemberinfo(this.listQuery).then(res => {
        let { data } = res
        console.log(data)
        if (data.code == 200) {
          this.listLoading = false
          this.total = data.data.count
          data.data.data.forEach((item,index) => {
            if (item.sex == 1) {
              item.sex = '男'
            }
            if (item.sex == 2) {
              item.sex = '女'
            }
          })
          this.list = data.data.data
        }
        if (data.code == 201) {
          this.list = []
          this.listLoading = false
          this.$message('没有更多会员!')
        }
      }).catch(error => {
        this.list = []
        this.listLoading = false
        this.$message('获取会员信息失败')
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
      console.log('11111')
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
