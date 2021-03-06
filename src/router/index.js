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
    path: '/',
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
    path: '/table',
    id: 2,
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [
      {
        path: 'table',
        component: () => import('@/views/table/index'),
        name: 'Table',
        meta: { title: '表格展现', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    id: 3,
    path: '/count',
    component: Layout,
    redirct: '/features/one',
    name: 'Features',
    meta: {
      title: '功能集锦',
      icon: 'edit'
    },
    hidden: true,
    children: [
      {
        id: 14,
        path: 'one',
        component: () => import('@/views/features/one'),
        name: 'One',
        meta: { title: '功能一', icon: 'edit' },
        hidden: true
      },
      {
        id: 15,
        path: 'two',
        component: () => import('@/views/qiniu/upload'),
        name: 'Two',
        meta: { title: '上传功能', icon: 'edit' },
        hidden: true
      },
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: '文档', icon: 'documentation', noCache: true }
  //     }
  //   ]
  // },
  // tableRouter,
  // infoRouter,
  { path: '*', redirect: '/404', hidden: true }
]

const routes = constantRouterMap.concat(asyncRouterMap)
// console.log(routes)

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
