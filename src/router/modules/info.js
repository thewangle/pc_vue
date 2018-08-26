import Layout from '@/views/layout/Layout'

const infoRouter = {
  path: '/info',
  component: Layout,
  redirect: '/info/daili-manage',
  name: 'Info',
  meta: {
    title: '信息管理',
    icon: 'form'
  },
  children: [
    {
      path: 'daili-manage',
      component: () => import('@/views/info/dailiManage'),
      name: 'DailiManage',
      meta: { title: '代理商管理' }
    },
    {
      path: 'yunyin-manage',
      component: () => import('@/views/info/yunyinManage'),
      name: 'YunYinManage',
      meta: { title: '运营商管理' }
    },
    {
      path: 'coach-manage',
      component: () => import('@/views/info/coachManage'),
      name: 'CoachManage',
      meta: { title: '教练管理' }
    }
  ]
}
export default infoRouter
