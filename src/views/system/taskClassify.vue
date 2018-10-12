<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增题目分类</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="题目分类字典" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleDelete(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="handleClose">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="题目分类名称">
          <el-input v-model="taskClassfiyName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTacskClassifyList, addClassfiy, delClassify, updateClassfiy } from './../../service/activity'
export default {
  name: 'TaskClassfiy',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogTitle: '',
      dialogFormVisible: false,
      dialogType: '',
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10
      },
      taskClassfiyName: '',
      taskClassfiyId: ''
    }
  },
  created() {
    this._getTacskClassifyList()
  },
  methods: {
    async _getTacskClassifyList() {
      this.listLoading = true
      const res = await getTacskClassifyList(this.listQuery)
      this.total = res.data.total
      this.list = res.data.list
      this.listLoading = false
    },
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._getTacskClassifyList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._getTacskClassifyList()
    },
    handleCreate() {
      this.dialogType = 'add'
      this.dialogTitle = '新增题目分类'
      this.dialogFormVisible = true
    },
    handleClose() {
      this.dialogFormVisible = false
      this.dialogTitle = ''
      this.dialogType = ''
      this.taskClassfiyName = ''
      this.taskClassfiyId = ''
    },
    handleUpdate(row) {
      this.dialogType = 'edit'
      this.dialogTitle = '修改题目分类'
      this.taskClassfiyName = row.name
      this.taskClassfiyId = row.id
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除改题目分类吗？')
        .then(async _ => {
          await delClassify({ id: row.id })
          this.$message({ message: '删除成功', type: 'success' })
          await this._getTacskClassifyList()
        })
        .catch(async _ => {
          await this._getTacskClassifyList()
        })
    },
    async handleSubmit() {
      if (!this.taskClassfiyName) {
        this.$message({ message: '请输入题目分类', type: 'success' })
      }
      if (this.dialogType === 'add') {
        try {
          const res = await addClassfiy({ name: this.taskClassfiyName })
          this.$message({ message: '添加题目分类成功', type: 'success' })
          this.handleClose()
          this._getTacskClassifyList()
        } catch (e) {

        }
      }
      if (this.dialogType === 'edit') {
        try {
          const res = await updateClassfiy({ id: this.taskClassfiyId, name: this.taskClassfiyName })
          this.$message({ message: '修改题目分类成功', type: 'success' })
          this.handleClose()
          this._getTacskClassifyList()
        } catch (e) {}
      }
    }
  }
}
</script>
