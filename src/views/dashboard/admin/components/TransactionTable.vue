<template>
  <el-card :data="list" style="width: 100%;padding-top: 15px;" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{ type === 'team' ? '团队版' : '个人版' }}活动场次</span>
      <el-date-picker
        v-model="value"
        class="datePicker-wrapper"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="handleDateChange"/>
    </div>
    <div class="card-content">
      <h4>一个月内活动场次</h4>
      <p>58场</p>
      <span>点击上方日期可查询场次</span>
    </div>
  </el-card>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
  props: {
    type: {
      default: 'team',
      type: String
    }
  },
  data() {
    return {
      list: null,
      value: []
    }
  },
  created() {
    this.fetchData()
    this.initialDate()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    },
    initialDate() {
      const date = new Date()
      const oldDate = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000))
      this.value = [oldDate, date]
    },
    handleDateChange(value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss" scoped>
.datePicker-wrapper {
  margin-left: 40px;
}
.el-card {
  padding-top: 0 !important;
}
.card-content {
  text-align: center;
  >p {
    font-weight: 700;
    color:rgb(209, 89, 89);
  }
  >span {
    font-size: 14px;
    color: #ccc;
  }
}
</style>

