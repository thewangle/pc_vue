import request from '@/utils/request'

/**
 * 获取代理商，账户余额信息
 */
export function getSubAgentNum() {
  return request({
    url: '/i/topteam/admin/getsubagentnum',
    method: 'get'
  })
}

/**
 * 获取团队活动总数
 * @param {*} data
 */
export function getTeamActivityNum(data) {
  return request({
    url: '/i/topteam/admin/getsubtactnum',
    method: 'post',
    data
  })
}

/**
 * 获取个人活动总数
 * @param {*} data
 */
export function getPersonActivityNum(data) {
  return request({
    url: '/i/topteam/admin/getsubpactnum',
    method: 'post',
    data
  })
}
