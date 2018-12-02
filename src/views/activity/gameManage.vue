<template>
  <div>
    <header>
      <div class="search">
        <el-input v-model="gameName" placeholder="请输入游戏名称"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <div>
        <el-button type="primary" @click="addGame">新增游戏</el-button>
      </div>
    </header>
    <div class="table-content">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
         <el-table-column
         label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="游戏名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="游戏类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="使用条件">
        </el-table-column>
        <el-table-column
          prop="name"
          label="金额（元）"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="游戏状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button type="text" size="small">上架</el-button>
            <!-- 下架 -->
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    <!-- 新增游戏 -->
    <el-dialog title="新增游戏" :visible.sync="dialogAddGame">
      <el-form :model="form">
        <el-form-item label="游戏名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏类型：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用条件：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="游戏文件：" :label-width="formLabelWidth">
          游戏文件
          <el-button type="primary" size="small">上传游戏文件</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="dialogFormVisible = false">保 存</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保存并上架</el-button>
      </div>
    </el-dialog>
    <!-- 点击修改但为非下架状态 -->
    <el-dialog
      title="提示"
      :visible.sync="changeGame"
      width="30%">
      <span>修改此游戏，需要先将游戏下架。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeGame = false">取 消</el-button>
        <el-button type="primary" @click="changeGame = false">下架</el-button>
      </span>
    </el-dialog>
    <!-- 下架提示 -->
    <el-dialog
      title="提示"
      :visible.sync="pullOfGame1"
      width="30%">
      <span>下架后，运营商将无法调取此游戏。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pullOfGame1 = false">取 消</el-button>
        <el-button type="primary" @click="pullOfGame1 = false">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="pullOfGame2"
      width="30%">
      <span>由于当前正有活动使用此游戏，无法下架</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pullOfGame2 = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 上架提示 -->
    <el-dialog
      title="提示"
      :visible.sync="pullOnGame"
      width="30%">
      <span>游戏上架成功，创建活动时将能够正常使用此游戏。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pullOnGame = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog
      title="提示"
      :visible.sync="delGame1"
      width="30%">
      <span>请确认是否要删除此游戏，删除后将无法恢复！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delGame1 = false">取 消</el-button>
        <el-button type="primary" @click="delGame1 = false">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delGame2"
      width="30%">
      <span>下架后的游戏才能够删除，请先下架此游戏！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delGame2 = false">取 消</el-button>
        <el-button type="primary" @click="delGame2 = false">下 架</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gameName: '',
      dialogAddGame: false,
      changeGame: false,
      pullOfGame1: false,
      pullOfGame2: false,
      pullOnGame: false,
      delGame1: false,
      delGame2: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    addGame() {
      this.dialogAddGame = true
    }
  }
}
</script>
<style lang="scss">
header {
  margin-top: 20px;
  padding: 0 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .search {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.table-content {
  padding: 20px;
}
</style>
