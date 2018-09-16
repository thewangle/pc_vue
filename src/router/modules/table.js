/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/activity',
  id: 2,
  component: Layout,
  redirect: '/activity/activity-manage',
  name: 'Activity',
  meta: {
    title: '活动管理',
    icon: 'table'
  },
  hidden: true,
  children: [
    {
      id: 6,
      path: 'activity-manage',
      component: () => import('@/views/activity/activityManage'),
      name: 'ActivityManage',
      meta: { title: '我的活动', icon: 'documentation' },
      hidden: true
    },
    {
      id: 7,
      path: 'activity-record',
      component: () => import('@/views/activity/activityRecord'),
      name: 'AtivityRecord',
      meta: { title: '活动记录', icon: 'documentation' },
      hidden: true
    },
    {
      id: 8,
      path: 'activity-subkectlib',
      component: () => import('@/views/activity/subjectLib'),
      name: 'SubkectLib',
      meta: { title: '题库管理', icon: 'documentation' },
      hidden: true
    }
  ]
}
export default tableRouter
