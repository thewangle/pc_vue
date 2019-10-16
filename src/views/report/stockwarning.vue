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
      <el-select v-model="listQuery.numtype" placeholder="请选择预警类别" clearable style="width: 200px;margin-left:10px;" class="filter-item" @change="handleFilter">
          <el-option v-for="item in numtypes" :label="item.label" :value="item.value"/>
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
      stripe
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
          <span class="tag_yellow">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编码" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品规格" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.format }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" width="200px" align="center">
        <template slot-scope="scope">
          <span class="tag_red">{{ scope.row.nums }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存上线" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.maxnums }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存下线" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.minnums }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警类别" width="200px" align="center">
        <template slot-scope="scope">
          <span class="tag_red">{{ scope.row.numtype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品进价" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品售价" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.outprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏目 -->
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getpartantId, getRoleId, getUserid } from '@/utils/auth'
import { getstockwarning } from '@/api/goods' //请求函数
import { getSortinfoone, getSortinfoall } from '@/api/sort' //请求函数
import { getSupplierall } from '@/api/supplier' //获取供应商
import XLSX from 'xlsx' //导出excle
export default {
  name: 'Dashboard',
  data() {
    return {
      sorts: [],
      suppliers: [],
      listLoading: false,//table加载的时候loading
      list: [], //table的数据
      listQuery: { //动态请求table数据时传递的参数
        numtype: '',
        page_no: 1, //页码
        page_size: 10,//每页显示条数
        name: '',//商品名称
        code: '',//商品编码
        sortid: '',
        supplierid: '',
        type: 2,//goodslog里用于判断是价格变动还是库存变动
        role: getRoleId(),
        uid: getUserid(),
        pid: getpartantId()
      },
      numtypes: [
        {value: 1,label: '低限报警'},
        {value: 2,label: '超限报警'},
      ],
      total: 1,//table一共多少条数据
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
      XLSX.writeFile(wb, "库存预警记录.xlsx")
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
      getstockwarning(this.listQuery).then(res => {
        let { data } = res
        if (data.code == 200) {
          this.listLoading = false
          this.total = data.data.count
          data.data.data.forEach((item) => {
            if (Number(item.nums) < Number(item.minnums)) {
              item.numtype = '低限报警'
            }
            if (Number(item.nums) > Number(item.maxnums)) {
              item.numtype = '超限报警'
            }
          })
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
      // this.table_info = ''
    },
    dialogfee_close() {
      // this.table_info = ''
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
