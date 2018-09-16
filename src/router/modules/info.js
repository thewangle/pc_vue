import Layout from '@/views/layout/Layout'

const infoRouter = {
  path: '/info',
  id: 3,
  component: Layout,
  name: 'Info',
  meta: {
    title: '信息管理',
    icon: 'form'
  },
  hidden: true,
  children: [
    {
      id: 9,
      path: 'daili-manage',
      component: () => import('@/views/info/dailiManage'),
      name: 'DailiManage',
      meta: { title: '代理商管理', icon: 'documentation' },
      hidden: true
    },
    {
      id: 10,
      path: 'yunyin-manage',
      component: () => import('@/views/info/yunyinManage'),
      name: 'YunYinManage',
      meta: { title: '运营商管理', icon: 'documentation' },
      hidden: true
    },
    {
      id: 11,
      path: 'coach-manage',
      component: () => import('@/views/info/coachManage'),
      name: 'CoachManage',
      meta: { title: '教练管理', icon: 'documentation' },
      hidden: true
    }
  ]
}
export default infoRouter
