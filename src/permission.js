import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, getRoleId } from '@/utils/auth' // getToken from cookie
import { fetchRoleMenulist } from './service/role'
import { fetchMenuList } from './service/common'
NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/authredirect']// no redirect whitelist
let menuList = null

// const menuListPromise
router.beforeEach(async(to, from, next) => {
  // const menuList = await fetchMenuList()
  // console.log(menuList)
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // router.addRoutes(asyncRouterMap) // 动态添加可访问路由表
      // next({ ...to, replace: true })
      // if (!menuList) {
      //   const res = await fetchMenuList()
      //   menuList = res.data
      //   store.dispatch('GenerateRoutes', menuList)
      // }
      next()
    }
  } else {
    let menuList = [
      {
        "id": "1",
        "menu_name": "首页",
        "url": "",
        "parent_id": "0",
        "type": "page",
        "childs": []
      },
      {
        "id": "2",
        "menu_name": "表格展示",
        "url": "",
        "parent_id": "0",
        "type": "page",
        "childs": []
      },
      {
        "id": "3",
        "menu_name": "功能集锦",
        "url": "",
        "parent_id": "0",
        "type": "page",
        "childs": [
          {
            "id": "14",
            "menu_name": "功能一",
            "url": "",
            "parent_id": "3",
            "type": "page",
            "childs": []
          },
          {
            "id": "15",
            "menu_name": "上传功能",
            "url": "",
            "parent_id": "3",
            "type": "page",
            "childs": []
          },
        ]
      },
    ]
    store.dispatch('GenerateRoutes', menuList)
    next()
    /* has no token*/
    // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    //   next()
    // } else {
    //   next('/login') // 否则全部重定向到登录页
    //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    // }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
