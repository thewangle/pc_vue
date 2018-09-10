import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
// import { fetchMenuList } from './service/common'
// import { asyncRouterMap } from '@/router'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/authredirect']// no redirect whitelist
// const menuListPromise
router.beforeEach(async(to, from, next) => {
  // const menuList = await fetchMenuList()
  // console.log(menuList)
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    console.log(getToken())
    console.log(to)
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // router.addRoutes(asyncRouterMap) // 动态添加可访问路由表
      // next({ ...to, replace: true })
      store.dispatch('GenerateRoutes')
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
