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
    path: '/registered',
    component: () => import('@/views/login/registered'),
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
  },
  {
    path: '/download',
    component: () => import('@/views/download/index'),
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
    path: '/report',
    id: 20,
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: '经营分析',
      icon: 'tab'
    },
    hidden: true,
    children: [
      {
        id:24,
        path: 'sales',
        component: () => import('@/views/report/sales'),
        name: 'Sales',
        meta: { title: '销售分析', icon: 'component', noCache: true },
        hidden: true
      },
      {
        id:29,
        path: 'unsalable',
        component: () => import('@/views/report/unsalable'),
        name: 'Unsalable',
        meta: { title: '滞销分析', icon: 'lock', noCache: true },
        hidden: true
      },
      {
        id:30,
        path: 'stockwarning',
        component: () => import('@/views/report/stockwarning'),
        name: 'Stockwarning',
        meta: { title: '库存预警', icon: 'eye', noCache: true },
        hidden: true
      },
      {
        id:27,
        path: 'storagegoods',
        component: () => import('@/views/report/storagegoods'),
        name: 'Storagegoods',
        meta: { title: '补货分析', icon: 'chart', noCache: true },
        hidden: true
      },
      {
        id:25,
        path: 'returngoods',
        component: () => import('@/views/report/returngoods'),
        name: 'Returngoods',
        meta: { title: '退货分析', icon: 'eye', noCache: true },
        hidden: true
      },
      {
        id:26,
        path: 'lossgoods',
        component: () => import('@/views/report/lossgoods'),
        name: 'Lossgoods',
        meta: { title: '报损分析', icon: 'dashboard', noCache: true },
        hidden: true
      },
      {
        id:23,
        path: 'pricechange',
        component: () => import('@/views/report/pricechange'),
        name: 'Pricechange',
        meta: { title: '单品分析', icon: 'money', noCache: true },
        hidden: true
      },
      {
        id:22,
        path: 'stock',
        component: () => import('@/views/report/stock'),
        name: 'Stock',
        meta: { title: '库存分析', icon: 'example', noCache: true },
        hidden: true
      },
      {
        id:28,
        path: 'memberanalysis',
        component: () => import('@/views/report/memberanalysis'),
        name: 'Memberanalysis',
        meta: { title: '会员分析', icon: 'peoples', noCache: true },
        hidden: true
      },
      {
        id:21,
        path: 'organization',
        component: () => import('@/views/report/organization'),
        name: 'Organization',
        meta: { title: '组织架构', icon: 'user', noCache: true },
        hidden: true
      },
    ]
  },
  {
    path: '/goods',
    id: 12,
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: '商品管理',
      icon: 'shoppingCard'
    },
    hidden: true,
    children: [
      {
        id: 16,
        path: 'addgoods',
        component: () => import('@/views/goods/addgoods'),
        name: 'Addgoods',
        meta: { title: '添加商品', icon: 'edit' },
        hidden: true
      },
      {
        id: 13,
        path: 'sort',
        component: () => import('@/views/goods/sort'),
        name: 'Sort',
        meta: { title: '分类管理', icon: 'tab' },
        hidden: true
      },
      {
        id: 17,
        path: 'goodslist',
        component: () => import('@/views/goods/goodslist'),
        name: 'Goodslist',
        meta: { title: '商品列表', icon: 'list' },
        hidden: true
      },
      {
        id: 18,
        path: 'pricelog',
        component: () => import('@/views/goods/pricelog'),
        name: 'Pricelog',
        meta: { title: '价格变动记录', icon: 'chart' },
        hidden: true
      },
      {
        id: 19,
        path: 'numslog',
        component: () => import('@/views/goods/numslog'),
        name: 'Numslog',
        meta: { title: '库存变动记录', icon: 'component' },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    id: 2,
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: '账号管理',
      icon: 'peoples'
    },
    hidden: true,
    children: [
      {
        id:4,
        path: 'adduser',
        component: () => import('@/views/user/index'),
        name: 'Adduser',
        meta: { title: '新增账号', icon: 'user', noCache: true }
      },
      {
        id: 5,
        path: 'userlist',
        component: () => import('@/views/user/userlist'),
        name: 'Userlist',
        meta: { title: '账号列表', icon: 'list' },
        hidden: true
      },
    ]
  },
  {
    path: '/member',
    id: 6,
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: '会员管理',
      icon: 'peoples'
    },
    hidden: true,
    children: [
      {
        id:7,
        path: 'member',
        component: () => import('@/views/member/index'),
        name: 'Member',
        meta: { title: '新增会员', icon: 'people', noCache: true },
        hidden: true
      },
      {
        id: 8,
        path: 'memberlist',
        component: () => import('@/views/member/memberlist'),
        name: 'Memberlist',
        meta: { title: '会员列表', icon: 'list' },
        hidden: true
      },
    ]
  },
  {
    path: '/supplier',
    id: 9,
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: '供应商管理',
      icon: 'people'
    },
    hidden: true,
    children: [
      {
        id:10,
        path: 'supplier',
        component: () => import('@/views/supplier/index'),
        name: 'Supplier',
        meta: { title: '新增供应商', icon: 'edit', noCache: true },
        hidden: true
      },
      {
        id: 11,
        path: 'supplierlist',
        component: () => import('@/views/supplier/supplierlist'),
        name: 'Supplierlist',
        meta: { title: '供应商列表', icon: 'list' },
        hidden: true
      },
    ]
  },
  {
    id: 3,
    path: '/count',
    component: Layout,
    redirct: 'dashboard',
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
  {
    id: 31,
    path: '/count',
    component: Layout,
    redirct: 'dashboard',
    name: 'aboutwuhzi',
    meta: {
      title: '关于',
      icon: 'edit'
    },
    hidden: true,
    children: [
      {
        id: 32,
        path: 'dashboard',
        component: () => import('@/views/wuzhiinfo/index'),
        name: 'about',
        meta: { title: '关于五指', icon: 'dashboard' },
        hidden: true
      }
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
