<template>
  <el-card style="width: 100%;padding-top: 15px;" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{ type === 'team' ? '团队版' : '个人版' }}活动场次</span>
      <el-date-picker
        v-model="value"
        class="datePicker-wrapper"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
        @change="handleDateChange"/>
    </div>
    <div class="card-content">
      <h4>一个月内活动场次</h4>
      <p>{{ num }}场</p>
      <span>点击上方日期可查询场次</span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    type: {
      default: 'team',
      type: String
    },
    num: {
      default: 0,
      type: String
    }
  },
  data() {
    return {
      value: []
    }
  },
  created() {
    this.initialDate()
  },
  methods: {
    initialDate() {
      const date = new Date()
      const oldDate = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000))
      this.value = [oldDate, date]
      this.$emit('timeChange', { type: this.type, value: this.value })
    },
    handleDateChange(value) {
      this.value = value
      this.$emit('timeChange', { type: this.type, value: this.value })
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

