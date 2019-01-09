<template>
  <div>
    <header>
      <div class="search">
        <el-input v-model="gameName" placeholder="请输入游戏名称"></el-input>
        <el-button type="primary" @click="gameList">搜索</el-button>
      </div>
      <div>
        <el-button type="primary" @click="addGame">新增游戏</el-button>
      </div>
    </header>
    <div class="table-content">
      <el-table
        :data="tableData"
        stripe
        border
        fit
        highlight-current-row
        style="width: 100%">
         <el-table-column
         label="序号"
          type="index">
        </el-table-column>
        <el-table-column
          prop="game_name"
          label="游戏名称">
        </el-table-column>
        <!-- <el-table-column
          prop="type"
          label="游戏类型"
          width="180">
        </el-table-column> -->
        <!-- <el-table-column
          prop="address"
          label="使用条件">
        </el-table-column> -->
        <!-- <el-table-column
          prop="money"
          label="金额（元）"
          width="180">
        </el-table-column> -->
        <el-table-column
          label="游戏状态">
          <template slot-scope="scope">
            <div>{{Number(scope.row.status) === 1 ? '可用' : '已下架'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="updateGame(scope.row)" type="text" size="small">修改</el-button>
            <el-button v-if="Number(scope.row.status) === 1" @click="pullOff(scope.row, 0)" type="text" size="small">下架</el-button>
            <el-button v-else @click="pullOn(scope.row, 1)" type="text" size="small">上架</el-button>

            <!-- 下架 -->
            <el-button type="text" size="small" @click="delGame(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增游戏 -->
    <el-dialog :title="updateStatus ? '修改游戏' : '新增游戏' " :visible.sync="dialogAddGame">
      <el-form :model="form">
        <el-form-item label="游戏名称：" :label-width="formLabelWidth">
          <el-input v-model="form.game_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="游戏类型：" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="选择题" value="1"></el-option>
            <el-option label="文字题" value="2"></el-option>
            <el-option label="图片题" value="3"></el-option>
            <el-option label="视频题" value="4"></el-option>
            <el-option label="语音题" value="5"></el-option>
            <el-option label="拍照提" value="6"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="使用条件：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="免费" value="shanghai"></el-option>
            <el-option label="付费" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="金额：" :label-width="formLabelWidth">
          <el-input v-model="form.money" autocomplete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="游戏文件：" :label-width="formLabelWidth">
          {{ this.form.uri }}
          <el-upload
            class="upload-demo"
            action="/i/topteam/admin/uploadfile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-success="getGameUri"
            name="game"
            :data="{'id': form.id}">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddGame = false">取 消</el-button>
        <el-button @click="saveGame(0)">保 存</el-button>
        <el-button type="primary" @click="saveGame(1)">保存并上架</el-button>
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
        <el-button type="primary" @click="dialogPullOff">下架</el-button>
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
        <el-button type="primary" @click="dialogPullOff">确 认</el-button>
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
        <el-button type="primary" @click="getDelGame">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delGame2"
      width="30%">
      <span>下架后的游戏才能够删除，请先下架此游戏！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delGame2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogPullOff">下 架</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  addGame,
  changeGame,
  pullOnGame,
  gameList,
  delGame,
  uploadGame } from '../../service/activity'
  import axios from 'axios'
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
      tableData: [],
      form: {
        game_name: '',
        type: '',
        money: '',
        uri: '',
        status: '',
        id: ''
      },
      formLabelWidth: '120px',
      updateStatus: false,
      chooseId: '',
      fileList: []
    }
  },
  mounted() {
    this.gameList()
  },
  methods: {
    getGameUri(res) {
      console.log(res, 'res')
      this.form.uri = ''
      if (res.error_code === 0) {
        this.form.uri = res.data
      } else {
        this.fileList = []
        this.$message(res.error_msg ? res.error_msg : '上传失败')
      }
    },
    // async handleUpLoadGame(file) {
    //   console.log(file)
    //   const config = {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   }
    //   const formData = new FormData()
    //   formData.append('name', 'game')
    //   formData.append('file', file)
    //   let res = await axios.post('/i/topteam/admin/uploadfile', formData, config)
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能上传一个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    addGame() {
      this.updateStatus = false
      this.dialogAddGame = true
      this.form = {
        game_name: '',
        type: '',
        money: '',
        uri: '',
        status: '',
        id: ''
      }
      this.fileList = []
    },
    async gameList() {
      let data = {
        game_name: this.gameName ? this.gameName : '',
        game_id: ''
      }
      let result = await gameList(data)
      this.tableData = result.data ? result.data : []
    },
    async saveGame(status) {
      let data = this.form
      if (!data.game_name) {
        this.$message({
          showClose: true,
          message: '请填写游戏名称',
          type: 'warning'
        })
        return
      }
      if (!data.uri) {
        this.$message({
          showClose: true,
          message: '请上传游戏文件',
          type: 'warning'
        })
        return
      }
      this.dialogFormVisible = false
      data.type = data.type ? data.type : '0'
      data.status = status
      let result
      if (this.updateStatus) {
        result = await changeGame(data)
      } else {
        result = await addGame(data)
      }
      this.gameList()
      this.dialogAddGame = false
    },
    pullOn(item) {
      // 点击上架
      this.chooseId = item.id
      this.onSale(1)
      this.pullOnGame = true
      this.gameList()
    },
    pullOff(item) {
      // 点击下架
      this.chooseId = item.id
      this.pullOfGame1 = true
      // this.onSale(0)
      // this.gameList()
    },
    dialogPullOff() {
      this.changeGame = false
      this.delGame2 = false
      this.pullOfGame1 = false
      this.onSale(0)
      this.gameList()
    },
    async onSale(status) {
      // 0下架 1上架
      let data = {
        status: status,
        id: this.chooseId
      }
      let result = await pullOnGame(data)
    },
    updateGame(item) {
      // 是否非下架状态
      this.chooseId = item.id
      if (Number(item.status) === 0) {
        this.updateStatus = true
        this.dialogAddGame = true
        this.form = item
      } else {
        this.changeGame = true
      }
    },
    delGame(item) {
      this.chooseId = item.id
      if (Number(item.status) === 0) {
        // 下架状态
        this.delGame1 = true
      } else {
        this.delGame2 = true
      }
    },
    async getDelGame(item) {
      this.delGame1 = false
      let data = {
        id: this.chooseId
      }
      let result = await delGame(data)
      this.gameList()
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
