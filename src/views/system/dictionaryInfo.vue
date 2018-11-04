<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增信息模板</el-button>
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

      <el-table-column label="采集信息模板名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应用场景" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.scence_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleEditTpl(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page_no" :page-sizes="[10,20,30, 50]" :page-size="listQuery.page_size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="handleClose">
      <el-form label-position="right" label-width="140px">
        <el-form-item label="采集信息模板名称">
          <el-input v-model="name"/>
        </el-form-item>
        <el-form-item label="应用场景">
          <el-input v-model="scence_name" />
        </el-form-item>
        <el-form-item v-for="item in tagList" :key="item.id" :label="item.tag_name">
          <div v-if="item.show_type === '1'">
            <el-input disabled style="width: 200px"/>
            <el-checkbox :checked="item.is_show === '1'" @change="(value) => {handleCheckBoxChange(value, item)}">是否展示</el-checkbox>
          </div>
          <div v-if="item.show_type === '2'">
            <el-select placeholder="全部" v-model="item.value" @change="(value) => {handleSelectChange(value, item)}">
              <el-option v-for="option in item.editList" :key="option.id" :label="option.value" :value="option.id" ></el-option>
            </el-select>
            <el-button type="primary" @click="handleOpenEditDialog(item)">编辑</el-button>
            <el-checkbox :checked="item.is_show === '1'" @change="(value) => {handleCheckBoxChange(value, item)}">是否展示</el-checkbox>
          </div>
        </el-form-item>
      </el-form>
      <div style="textAlign: center;">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogEditTitle" :visible.sync="dialogEditVisible" :close-on-click-modal="false" @close="handleEditClose">
      <el-form label-position="right" label-width="140px">
        <el-form-item v-for="item in editList" :key="item.id" :label="item.tag_name">
          <el-input v-model="item.value" style="width: 200px"></el-input>
          <el-button type="primary" v-if="item.childe_btn" @click="handleEditChildBtn(item)">{{item.childe_btn}}</el-button>
          <el-button type="warnning" @click="handelDelEdit(item)">{{item.del_btn}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addNewLine(editList)">新增一行</el-button>
        </el-form-item>
      </el-form>
      <div style="textAlign: center;">
        <el-button type="primary" @click="handleEditSubmit">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogEditChildTitle" :visible.sync="dialogEditChildVisible" :close-on-click-modal="false" @close="handleEditChildClose">
      <el-form label-position="right" label-width="140px">
        <el-form-item v-for="item in childEditList" :key="item.id" :label="item.tag_name">
          <el-input v-model="item.value" style="width: 200px"></el-input>
          <el-button type="primary" v-if="item.childe_btn">{{item.childe_btn}}</el-button>
          <el-button type="warnning" @click="handelDelChildEdit(item)">{{item.del_btn}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addNewChildLine">新增一行</el-button>
        </el-form-item>
      </el-form>
      <div style="textAlign: center;">
        <el-button type="primary" @click="handleEditChildSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTemplateList, getTagList, addTplTag, delTpl, updateTpl } from './../../service/role'
export default {
  name: 'DictionaryInfo',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogTitle: '',
      dialogFormVisible: false,
      dialogType: '',
      dialogEditTitle: '',
      dialogEditVisible: false,
      dialogEditChildTitle: '',
      dialogEditChildVisible: false,
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 10
      },
      name: '',
      scence_name: '',
      tagList: [],
      editList: [],
      childEditList: [],
      selectItem: null,
      childSelectItem: null,
      id: null
    }
  },
  created() {
    this._getDictionaryList()
  },
  methods: {
    // 获取模板列表
    async _getDictionaryList() {
      this.listLoading = true
      const res = await getTemplateList(this.listQuery)
      this.total = res.data.total
      this.list = res.data.list
      this.listLoading = false
    },
    // 获取标签列表
    async _getTagList(id) {
      try {
        const res = await getTagList(id)
        this.tagList = res.data.list
      } catch (e) {
        this.$message({ message: '获取模板标签失败', type: 'error' })
      }
    },
    async handleCreate () {
      await this._getTagList()
      this.dialogTitle = '新增采集信息模板'
      this.dialogFormVisible = true
      this.dialogType = 'add'
    },
    handleClose () {
      this.tagList = []
      this.name = ''
      this.scence_name = ''
      this.id = null
    },
    // 是否选中
    handleCheckBoxChange(value, item) {
      console.log(value)
      console.log(item)
      item.is_show = Number(value)
      console.log(item.is_show)
    },
    //TODO: 待下一步
    handleSelectChange(value, item) {
      let tagTemp = {}
      this.tagList.forEach(tag => {
        if (tag.tag_name === item.children_name) {
          tagTemp = tag
        }
      })
      item.editList.forEach(list => {
        if (list.id === value) {
          tagTemp.editList = list.child_value
          tagTemp.arrValue = value
        }
      })
      this.tagList = JSON.parse(JSON.stringify(this.tagList))
    },
    // 保存tag_list
    async handleSubmit() {
      if (!this.name) {
        this.$message({ message: '请输入模板名称', type: 'error' })
        return
      }
      if (!this.scence_name) {
        this.$message({ message: '请输入应用场景', type: 'error' })
        return
      }
      if (this.dialogType === 'add') {
        await addTplTag({ tag_list: this.tagList, template_name: this.name, scence_name: this.scence_name })
      }
      if (this.dialogType === 'edit') {
        await updateTpl({ tag_list: this.tagList, template_name: this.name, scence_name: this.scence_name, template_id: this.id })
      }
      this.dialogFormVisible = false
      this.handleClose()
      await this._getDictionaryList()
    },
    // 打开下拉框编辑
    handleOpenEditDialog(item) {
      this.dialogEditVisible = true
      this.dialogEditTitle = `${item.tag_name}编辑`
      this.selectItem = item
      this.editList = this.selectItem.editList || []
    },
    // 新增一行
    addNewLine() {
      let obj = {
        tag_name: this.selectItem.tag_name,
        childe_btn: this.selectItem.children_name,
        del_btn: '删除',
        value: null,
        child_value: null
      }
      if (!this.editList.length) {
        obj.id = 1
      } else {
        let oldid = this.editList[this.editList.length - 1].id
        obj.id = ++oldid
      }
      this.editList.push(obj)
    },
    // 删除对应行
    handelDelEdit(item) {
      this.editList = this.editList.filter((list) => {
        return !(list.id === item.id)
      })
    },
    // 编辑下级
    handleEditChildBtn(item) {
      this.editList.forEach(list => {
        if (list.id === item.id) {
          this.childEditList = list.child_value || []
        }
      })
      this.dialogEditChildTitle = `${item.childe_btn}编辑`
      this.dialogEditChildVisible = true
      this.childSelectItem = item
    },
    // 保存编辑信息
    handleEditSubmit() {
      console.log('====>', this.selectItem)
      this.selectItem.editList = this.editList

      // 子节点数据反写
      this.tagList.forEach(item => {
        if (this.selectItem.parent_id > 0 && this.selectItem.parent_id === item.id) {
          item.editList.forEach(list => {
            if (list.id === this.selectItem.arrValue) {
              list.child_value = this.editList
            }
          })
        }
      })
      
      const newTag = []
      this.tagList.forEach(item => {
        if (item.id === this.selectItem.id) {
          const obj = Object.assign({}, this.selectItem)
          newTag.push(obj)
        } else {
          newTag.push(item)
        }
      })

      this.tagList = newTag
      this.dialogEditVisible = false
    },
    // 保存子级编辑信息
    handleEditChildSubmit() {
      this.childSelectItem.child_value = this.childEditList
      this.dialogEditChildVisible = false
    },
    // 父级弹框关闭回调
    handleEditClose() {
      this.editList = [],
      this.selectItem = null
    },
    // 子级弹框关闭回调
    handleEditChildClose() {},
    addNewChildLine() {
      console.log(this.childSelectItem)
      let obj = {
        tag_name: this.childSelectItem.childe_btn,
        childe_btn: this.childSelectItem.children_name,
        del_btn: '删除',
        value: null,
        child_value: null
      }
      if (!this.childEditList.length) {
        obj.id = 1
      } else {
        let oldid = this.childEditList[this.childEditList.length - 1].id
        obj.id = ++oldid
      }
      this.childEditList.push(obj)
    },
    handelDelChildEdit(item) {
      this.childEditList = this.childEditList.filter((list) => {
        return !(list.id === item.id)
      })
    },
    handleSizeChange(size) {
      this.listQuery.page_size = size
      this._getDictionaryList()
    },
    handleCurrentChange(val) {
      this.listQuery.page_no = val
      this._getDictionaryList()
    },
    handleDelete(row) {
      this.$confirm('确认删除该题目模板吗？')
        .then(async _ => {
          await delTpl(row.id)
          this.$message({ message: '删除成功', type: 'success' })
          await this._getDictionaryList()
        })
        .catch(async _ => {
          await this._getDictionaryList()
        })
    },
    async handleEditTpl(row) {
      await this._getTagList(row.id)
      this.id = row.id
      this.name = row.name
      this.scence_name = row.scence_name
      this.dialogTitle = '修改采集信息模板'
      this.dialogFormVisible = true
      this.dialogType = 'edit'
    }
  }
}
</script>
