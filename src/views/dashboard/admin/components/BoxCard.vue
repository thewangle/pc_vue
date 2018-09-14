<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div style="position:relative;">
      <!-- <pan-thumb :image="avatar" class="panThumb"/> -->
      <div style="padding-top:35px;" class="progress-item">
        <h4>账户余额: <span>{{ num }}</span> &yen;
          <el-button class="recharge_btn" @click="handleRecharge">充值</el-button>
        </h4>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    num: {
      default: 0,
      type: Number
    }
  },
  computed: {
  },
  methods: {
    handleRecharge() {
      this.$emit('recharge')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    /deep/ .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 24px;
    text-align: center;
    h4 {
      margin: 0;
    }
    span {
      color: red;
    }
  }
  .recharge_btn {
    vertical-align: middle;
  }
}
</style>
