<template>
  <div class="dashboard-container">
    <div class="margins">
      <el-tag>功能一：点选顺序</el-tag>
      <div style="margin:0 10px;font-size:13px;">推荐指数：</div>
      <el-rate
        v-model="starts.start1"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </div>
    <div class="team-info-item">
        <div>
          <span class="name">队伍名称：乐享悦动</span>
        </div>
        <el-button type="primary" @click="SetTaskBatchSeq">确定答题顺序</el-button>
    </div>
    <div class="batch_wrap">
      <div class="batch_h">选中任务批次</div>
      <ul class="batch_ul">
        <li v-for="(item,index) in batch_li" class="batch_li" @click="is_Sign(index,item)">{{ item.index }}
          <div class="batch_order" v-if="item.is_Sign">{{ item.Sign }}</div>
        </li>
      </ul>
    </div>
    <div class="batch_show_biao">
      <div class="batch_show">答题顺序</div>
      <div class="batch_show">任务批次</div>
    </div>
    <div class="batch_show_biao" v-for="(item,index) in batch_nums">
      <div class="batch_show">{{ index + 1 }}</div>
      <div class="batch_show">{{ item }}</div>
    </div>
    <div class="bar"></div>
    <div class="margins">
      <el-tag>功能二：富文本</el-tag>
      <div style="margin:0 10px;font-size:13px;">推荐指数：</div>
      <el-rate
        v-model="starts.start2"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </div>
    <div style="width:50%;padding:10px;">
      <quill-editor v-model="quill" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"/>
    </div>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      starts: {
        start1: 3.5,
        start2: 2,
      },
      info: {},
      Sign: 0,
      batch_li: [],
      batch_num: [1,2,3,4,5],
      batch_nums: [],
      editorOption: {
        modules: {
          toolbar: [
            ['bold','italic','clean','strike','code-block','formula','video','image']
          ]
        }
      },
      quill: '欢迎使用quill'
    }
  },
  mounted () {
    // this.getTeamInfo()
    // this.getactivitybatch()
    this.batch_Rendering()
  },
  methods: {
    batch_Rendering () {
      this.batch_num.forEach((item, index) => {
        this.batch_li.push({ is_Sign: false, index: item, Sign: '', batch_id: index + 1 })
      })
    },
    // getactivitybatch () { //动态从后端获取的数据
    //   let data = {
    //     params: {
    //       act_id: this.$route.query.id
    //     }
    //   }
    //   this.$axios.get(url.getactivitybatch, data).then(res => {
    //     this.batch_num = res.batch_list
    //     this.batch_Rendering()
    //   })
    // },
    // getTeamInfo () {
    //   let data = {
    //     params: {
    //       act_id: this.$route.query.id,
    //       team_id: this.$route.query.team_id
    //     }
    //   }
    //   this.$axios.get(url.getteaminfo, data).then(res => {
    //     this.info = res
    //     console.log(res)
    //   })
    // },
    SetTaskBatchSeq () {
      // let data = {
      //   params: {
      //     act_id: this.$route.query.id,
      //     team_id: this.$route.query.team_id,
      //     batch_seq: this.batch_nums.join(',')
      //   }
      // }
      // this.$axios.get(url.SetTaskBatchSeq, data).then(res => {
      //   this.$Toast('修改成功')
      // })
      Message({
        message: '修改成功',
        type: 'success',
        duration: 5 * 1000
      })
    },
    is_Sign (index, item) {
      let length = this.batch_li.length
      if (index + 1 == item.batch_id) {
        item.is_Sign = !item.is_Sign
        if (item.is_Sign == true) {
          this.Sign += 1
          item.Sign = this.Sign
          this.batch_nums.push(item.index)
        } else {
          this.Sign -= 1
          for (let i = 0; i < length; i++) {
            if (Number(this.batch_li[i].Sign) > Number(item.Sign)) {
              this.batch_li[i].Sign -= 1
            }
          }
          this.batch_nums.splice(item.Sign - 1, 1)
        }
      }
    },
    //quill失去焦点时触发
    onEditorBlur(val) {
      console.log(val)
    },
    //quill获得焦点时触发
    onEditorFocus(val) {
      console.log(val)
    },
    //quill改变时触发
    onEditorChange(val) {
      console.log(val)
    },
  },
}
</script>
<style scope>
.bar {
  width: 100%;
  height: 2px;
  background: #DCDFE6;
  border-radius: 10px;
}
.margins {
  display: flex;
  align-items: center;
  /*justify-content: space-between;*/
  padding: 10px;
}
.team-info-item {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 2px solid rgb(220,220,220);
}
.name {
  margin-right: 30px;
}
.change-name {
  background: #598afb;
  color: #fff;
  font-size: 15px;
  border-radius: 30px;
  padding: 5px 10px;
}
.batch_wrap {
  width: 100%;
}
.batch_h {
  font-size: 15px;
  width: 100%;
  padding: 5px 10px;
}
.batch_ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px 0 15px 5px;
}
.batch_li {
  width: 23%;
  background: #598afb;
  height: 60px;
  line-height: 60px;
  text-align: center;
  position: relative;
  margin-top: 10px;
  margin-right: 2%;
  color: #fff;
  border-radius: 5px;
}
.batch_li:hover {
  background: #67C23A;
  cursor: pointer;
}
.batch_order {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: orange;
  border-radius: 50%;
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 13px;
}
.batch_show_biao{
  width: 100%;
  height: 50px;
  display: flex;
  font-size: 15px;
}
.batch_show{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
