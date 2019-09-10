<template>
  <div class="dashboard-container">
    <!-- 条件搜索 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入商品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.code" placeholder="请输入商品编码" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.sortid" placeholder="请选择商品分类" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sorts" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.supplierid" placeholder="请选择供应商" clearable style="width: 200px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in suppliers" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.priceinorout" placeholder="请选择进价/售价" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter">
          <el-option v-for="item in priceinorouts" :label="item.label" :value="item.value"/>
      </el-select>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button style="margin-left: 10px;" class="filter-item" type="primary" icon="el-icon-search" @click="toExcle">导出</el-button>
    </div>
    <!-- 商品列表table -->
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
      <el-table-column label="商品名称" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编码" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品分类" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sortid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplierid }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="商品规格" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.format }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.numnow }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原商品进价" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.priceinbefore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现商品进价" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.priceinnow }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原商品售价" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.priceoutbefore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现商品售价" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.priceoutnow }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更改时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="500" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleShowDetial(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" @click="handleShowprice(scope.row)">进/售价</el-button>
          <el-button type="primary" size="small" @click="handleShownums(scope.row)">出/入库</el-button>
          <el-button type="primary" size="small" @click="copyTask(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页栏目 -->
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 编辑商品弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :close="dialog_close" title="商品编辑">
      <div class="dialog_div">
        <span>商品名称</span>
        <el-input v-model="table_info.name" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>商品编码</span>
        <el-input v-model="table_info.code" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>商品分类</span>
        <el-select v-model="table_info.sortid" placeholder="请选择商品分类">
          <el-option
            v-for="item in sorts"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="dialog_div">
        <span>供应商</span>
        <el-select v-model="table_info.supplierid" placeholder="请选择供应商">
          <el-option
            v-for="item in suppliers"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="dialog_div">
        <span>商品规格</span>
        <el-input v-model="table_info.format" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>库存上线</span>
        <el-input v-model="table_info.maxnums" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>库存下线</span>
        <el-input v-model="table_info.minnums" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>会员描述</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入商品描述"
          v-model="table_info.remark">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editegoodsinfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑商品弹窗 -->
    <el-dialog :visible.sync="dialogVisible1" title="进/售价更改">
      <div class="dialog_div">
        <span>商品进价</span>
        <el-input v-model="table_info1.inprice" autocomplete="off"></el-input>
      </div>
      <div class="dialog_div">
        <span>商品售价</span>
        <el-input v-model="table_info1.outprice" autocomplete="off"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editegoodsinfo1">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑商品弹窗 -->
    <el-dialog :visible.sync="dialogVisible2" title="出入库更改">
      <div class="dialog_div">
        <span>商品数量</span>
        <el-input v-model="table_info2.nums" autocomplete="off"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editegoodsinfo2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import moment from 'moment' //日期转换插件 
import { getGoodsinfoLog, editeGoodsinfo, deletegoodsinfo } from '@/api/goods' //请求函数
import { getSortinfoone, getSortinfoall } from '@/api/sort' //请求函数
import { getSupplierall } from '@/api/supplier' //获取供应商
import XLSX from 'xlsx' //导出excle
export default {
  name: 'Dashboard',
  data() {
    return {
      years: 1,
      sorts: [],
      suppliers: [],
      listLoading: false,//table加载的时候loading
      list: [], //table的数据
      listQuery: { //动态请求table数据时传递的参数
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        name: '',//商品名称
        code: '',//商品编码
        sortid: '',
        supplierid: '',
        type: 1,
        priceinorout: '',
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      priceinorouts: [
        {value: 1,label: '进价'},
        {value: 2,label: '售价'},
      ],
      total: 1,//table一共多少条数据
      dialogVisible: false,//dialog是否显示
      dialogVisible1: false,//dialog是否显示
      dialogVisible2: false,//dialog是否显示
      dialogrenewalfee: false,
      table_info: {},//用于dialog展示
      table_info1: {},//用于dialog展示
      table_info2: {},//用于dialog展示
    }
  },
  mounted() {
    this.handleFilter() //获取商品列表
    this.getsortinfoall() //获取该id下分类
    this.getsupplierall() //获取改id下供应商
  },
  computed: {
    
  },
  methods: {
    //导出excle
    toExcle() {
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
      XLSX.writeFile(wb, "价格变动记录.xlsx")
    },
    //根据用户id获取分类
    getsortinfoall() {
      let params = {
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      }
      getSortinfoall(params).then(res => {
        let { data } = res
        data.forEach((item) => {
          this.sorts.push({value: item.id,label: item.name})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //根据用户id获取供应商
    getsupplierall() {
      let params = {
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      }
      getSupplierall(params).then(res => {
        let { data } = res
        data.forEach((item) => {
          this.suppliers.push({value: item.id,label: item.name})
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //点击编辑
    handleShowDetial(row_data) {
      this.table_info = row_data
      this.dialogVisible = true
    },
    //点击更改进/售价
    handleShowprice(row_data) {
      this.table_info1 = row_data
      this.dialogVisible1 = true
    },
    //点击更改进/售价
    handleShownums(row_data) {
      this.table_info2 = row_data
      this.dialogVisible2 = true
    },
    //更改商品信息
    editegoodsinfo() {
      //验证表单是否填写完整
      if (this.table_info.name == '' || this.table_info.format == '' || this.table_info.sortid == '' || this.table_info.supplierid == '') {
        this.$message({
          message: '请您填写完整信息',
          type: 'warning'
        });
        return
      }
      let is_num = /^\+?[1-9][0-9]*$/
      if (!is_num.test(this.table_info.maxnums) || !is_num.test(this.table_info.minnums)) {
        this.$message({
          message: '请您输入正确的数量',
          type: 'warning'
        });
        return
      }
      if (this.table_info.maxnums < this.table_info.minnums) {
        this.$message({
          message: '库存上线不得小于库存下线',
          type: 'warning'
        });
        return
      }
      this.table_info.type = 0
      editeGoodsinfo(this.table_info).then(res => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info = ''
        this._fetchActivityList()
      }).catch(error => {
        this.$message('编辑商品失败!')
      })
    },
    //更改商品价格
    editegoodsinfo1() {
      //验证表单是否填写完整
      if (this.table_info1.inprice == '' || this.table_info1.outprice == '') {
        this.$message({
          message: '请您填写完整信息',
          type: 'warning'
        });
        return
      }
      if (this.table_info.outprice < this.table_info.inprice) {
        this.$message({
          message: '售价不得小于进价',
          type: 'warning'
        });
        return
      }
      this.table_info1.type = 1
      editeGoodsinfo(this.table_info1).then(res => {
        this.dialogVisible1 = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info1 = ''
        this._fetchActivityList()
      }).catch(error => {
        this.$message('编辑商品失败!')
      })
    },
    //更改商品出入库
    editegoodsinfo2() {
      //验证表单是否填写完整
      if (this.table_info2.nums == '') {
        this.$message({
          message: '请您填写完整信息',
          type: 'warning'
        });
        return
      }
      this.table_info2.type = 2
      editeGoodsinfo(this.table_info2).then(res => {
        this.dialogVisible2 = false
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.table_info2 = ''
        this._fetchActivityList()
      }).catch(error => {
        this.$message('编辑商品失败!')
      })
    },
    //点击续费
    renewalfee(row_data) {
      this.table_info = row_data
      this.dialogrenewalfee = true
    },
    //点击删除
    copyTask(row_data) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          'id': row_data.id
        }
        deletegoodsinfo(data).then(res => {
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
      getGoodsinfoLog(this.listQuery).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.listLoading = false
          this.total = data.data.count
          this.list = data.data.data
          if (this.list == '') {
            this.$message({
              type: 'warning',
              message: '没有更多商品!'
            });
          }
        }
        if (data.code == 201) {
          this.list = []
          this.listLoading = false
          this.$message('没有更多商品!')
        }
      }).catch(error => {
        this.list = []
        this.listLoading = false
        this.$message('获取商品信息失败')
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
