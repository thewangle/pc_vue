import request from '@/utils/request'

/**
 * 获取七牛云token
 */
export function fetchQiNiuToken() {
  return request({
    url: '/i/topteam/api/uptoken',
    method: 'post'
  })
}

/**
 * 获取siderBar菜单列表
 */
export function fetchMenuList() {
  return request({
    url: '/i/topteam/admin/getmenulist',
    method: 'get'
  })
}

/**
 * 用户登录
 * @param {用户名密码} data
 * data: {username: '', password: ''}
 */
export function login(data) {
  return request({
    url: '/i/topteam/admin/login',
    method: 'post',
    data
  })
}

/**
 * 用户登出
 */
export function logout() {
  return request({
    url: '/i/topteam/admin/logout',
    method: 'get'
  })
}
