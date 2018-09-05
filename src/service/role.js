import request from '@/utils/request'

/**
 * 根据角色获取权限列表
 * @param {*} data
 * data: {role_id: int}
 */
export function fetchRoleMenulist(data) {
  return request({
    url: '/i/topteam/admin/getmenulistbyrole',
    method: 'post',
    data
  })
}

/**
 * 分配权限
 * @param {*} data
 * data: {role_id: int, menu_ids: string}
 */
export function setRoleMenulist(data) {
  return request({
    url: '/i/topteam/admin/setrolemenu',
    method: 'post',
    data
  })
}

export function fetchRoleList(data) {
  return request({
    url: '/i/topteam/admin/getrolelist',
    method: 'get'
  })
}
