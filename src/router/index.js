import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import infoRouter from './modules/info'
// import nestedRouter from './modules/nested'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]

export const asyncRouterMap = [
  {
    path: '',
    id: 1,
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '文档', icon: 'documentation', noCache: true }
      }
    ]
  },
  tableRouter,
  infoRouter,
  {
    id: 4,
    path: '/count',
    component: Layout,
    redirct: '/count/show',
    name: 'Count',
    meta: {
      title: '财务统计',
      icon: 'money'
    },
    hidden: true,
    children: [
      {
        id: 14,
        path: 'show',
        component: () => import('@/views/count/index'),
        name: 'Show',
        meta: { title: '财务统计', icon: 'money' },
        hidden: true
      },
      {
        id: 54,
        path: 'personCounte',
        component: () => import('@/views/count/personCounte'),
        name: 'PersonCounte',
        meta: { title: '个人版财务统计', icon: 'money' },
        hidden: true
      },
      {
        id: 15,
        path: 'recharge',
        component: () => import('@/views/count/recharge'),
        name: 'Recharge',
        meta: { title: '充值记录', icon: 'money' },
        hidden: true
      }
    ]
  },
  {
    id: 5,
    path: '/system',
    component: Layout,
    redirect: '/system/activitystatusmanage',
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'edit'
    },
    hidden: true,
    children: [
      {
        id: 12,
        path: 'usermanage',
        component: () => import('@/views/system/userManage'),
        name: 'UserManage',
        meta: { title: '用户管理', icon: 'user', noCache: true },
        hidden: true
      },
      {
        id: 13,
        path: 'rolemanage',
        component: () => import('@/views/system/roleManage'),
        name: 'RoleManage',
        meta: { title: '角色管理', icon: 'edit', noCache: true },
        hidden: true
      },
      {
        id: 51,
        path: 'operatorLog',
        component: () => import('@/views/system/operatorLog'),
        name: 'OperatorLog',
        meta: { title: '操作日志', icon: 'edit', noCache: true },
        hidden: true
      },
      {
        id: 55,
        path: 'taskClassify',
        component: () => import('@/views/system/taskClassify'),
        name: 'TaskClassfiy',
        meta: { title: '题目分类', icon: 'edit', noCache: true },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const routes = constantRouterMap.concat(asyncRouterMap)
// console.log(routes)

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
