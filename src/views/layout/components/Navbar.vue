<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <div class="system-name">五指科技大数据管理系统</div>

    <div class="user-name">{{ name }}</div>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <!-- <error-log class="errLog-container right-menu-item"/>

      <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
        <screenfull class="screenfull right-menu-item"/>
      </el-tooltip>

      <lang-select class="international right-menu-item"/>

      <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"/>
      </el-tooltip> -->

      <div class="tips">
        <el-badge :value="messageNums" :max="9" class="item" :hidden="isMessage">
          <div @click="checkMessage">预警消息</div>
        </el-badge>
      </div>
      <div class="download">
        <router-link to="/documentation">下载中心</router-link>
      </div>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img src="./test.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { getpartantId, getRoleId, getUserid, getUserName } from '@/utils/auth'
import { getUserByuid, changemessage } from '@/api/loginanduser' //请求函数
import { getstockwarning } from '@/api/goods' //请求函数
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  mounted() {
    this.getuserinfo()
  },
  data() {
    return {
      name: getUserName(),
      messageNums: 0,
      isMessage: true,
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
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    getuserinfo() {
      if (getRoleId() == 3) {
        getUserByuid({uid:getUserid()}).then(res => {
          let { data } = res
          if (data.ismessage == 0) {
            getstockwarning(this.listQuery).then(res => {
              let { data } = res
              if (data.code == 200 && Number(data.data.count) > 0) {
                this.messageNums = data.data.count
                this.isMessage = false
              }
              if (data.code == 201) {
                this.isMessage = true
              }
            }).catch(error => {
              this.isMessage = true
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    checkMessage() {
      if (getRoleId() == 3) {
        this.$router.push({ path: '/report/stockwarning' })
        this.isMessage = true
        changemessage({messagetype: 1,uid:getUserid()}).then(res => {
          // console.log(res)
        })
      } else {
        this.$router.push({ path: '/report/stockwarnings' })
      }
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      changemessage({messagetype: 0,uid:getUserid()}).then(res => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }).catch(error => {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .system-name, .user-name, .tips, .download {
    display: inline-block;
    vertical-align: top;
    color: #97a8be;
    margin-left: 20px;
    font-size: 14px;
  }
  .tips, .download {
    margin-left: 10px;
    cursor: pointer;
  }

  .download {
    margin-right: 20px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
