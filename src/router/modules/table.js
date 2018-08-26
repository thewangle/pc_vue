/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/activity',
  component: Layout,
  redirect: '/activity/activity-manage',
  name: 'Activity',
  meta: {
    title: '活动管理',
    icon: 'table'
  },
  children: [
    {
      path: 'activity-manage',
      component: () => import('@/views/activity/activityManage'),
      name: 'ActivityManage',
      meta: { title: '我的活动' }
    },
    {
      path: 'activity-record',
      component: () => import('@/views/activity/activityRecord'),
      name: 'AtivityRecord',
      meta: { title: '活动记录' }
    },
    {
      path: 'activity-subkectlib',
      component: () => import('@/views/activity/subjectLib'),
      name: 'SubkectLib',
      meta: { title: '题库管理' }
    }
  ]
}
export default tableRouter
