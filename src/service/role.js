import request from '@/utils/request'

/**
 * 根据角色获取菜单
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
    url: '/i/topteam/admin/modifyrolemenu',
    method: 'post',
    data
  })
}

/**
 * 获取角色列表
 */
export function fetchRoleList() {
  return request({
    url: '/i/topteam/admin/getrolelist',
    method: 'get'
  })
}

/**
 * 添加角色
 * @param {*} data
 * data: {role_name: string}
 */
export function addRole(data) {
  return request({
    url: '/i/topteam/admin/addrole',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 * @param {*} data
 * data: {role_id: int}
 */
export function deleteRole(data) {
  return request({
    url: '/i/topteam/admin/delrole',
    method: 'post',
    data
  })
}

/**
 * 编辑角色
 * @param {*} data
 * data: {role_id: int, role_name: string}
 */
export function editRole(data) {
  return request({
    url: '/i/topteam/admin/updaterole',
    method: 'post',
    data
  })
}

/**
 * 添加员工
 * @param {*} data
 * data: { name: string, phone: int, role_id: int, gender: int, username: string, password: string }
 */
export function addStaff(data) {
  return request({
    url: '/i/topteam/admin/addstaff',
    method: 'post',
    data
  })
}

/**
 * 获取员工列表
 */
export function fetchStaffList() {
  return request({
    url: '/i/topteam/admin/getstafflist',
    method: 'get'
  })
}

/**
 * 更新员工信息
 * @param {*} data
 * { name: string, phone: int, role_id: int, gender: int, admin_id: int }
 */
export function editStaff(data) {
  return request({
    url: '/i/topteam/admin/updatestaff',
    method: 'post',
    data
  })
}

/**
 * 删除员工
 * @param {*} data
 * { admin_id: int }
 */
export function deleteStaff(data) {
  return request({
    url: '/i/topteam/admin/delstaff',
    method: 'post',
    data
  })
}

/**
 * 获取操作日志
 */
export function getOperatorLog(data) {
  return request({
    url: '/i/topteam/admin/getloglist',
    method: 'post',
    data
  })
}

/**
 * 获取采集信息列表
 */
export function getTemplateList(data) {
  return request({
    url: '/i/topteam/admin/gettemplatelist',
    method: 'post',
    data
  })
}

/**
 * 获取标签列表
 */
export function getTagList(id = 0) {
  return request({
    url: `/i/topteam/admin/gettaglist?page_no=1&page_size=1000&template_id=${id}`,
    method: 'get'
  })
}

/**
 * 新增模板
 */
export function addTplTag(data) {
  return request({
    url: '/i/topteam/admin/addtptag',
    method: 'post',
    data
  })
}

/**
 * 删除模板
 */
export function delTpl(id) {
  return request({
    url: `/i/topteam/admin/deltemplate&id=${id}`,
    method: 'get'
  })
}

export function updateTpl(data) {
  return request({
    url: '/i/topteam/admin/updatetemplate',
    method: 'post',
    data
  })
}
