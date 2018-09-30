import request from '@/utils/request'

/**
 * 获取财务列表
 * @param {*} data
 */
export function fetchCountList(data) {
  return request({
    url: '/i/topteam/admin/getuseracountlist',
    method: 'post',
    data
  })
}

/**
 * 获取财务详情
 */

export function fetchpayList(data) {
  return request({
    url: '/i/topteam/admin/getactpaylist',
    method: 'post',
    data
  })
}

/**
 * 获取充值记录
 * @param {*} data
 */
export function fetchChargeList(data) {
  return request({
    url: '/i/topteam/admin/getchargelist',
    method: 'post',
    data
  })
}

// 个人版本财务统计列表
export function getPcounteList(data) {
  return request({
    url: '/i/topteam/admin/getpaccountlist',
    method: 'post',
    data
  })
}

// 个人版财务统计详情
export function getJoinList(data) {
  return request({
    url: '/i/topteam/admin/getpjoinlist',
    method: 'post',
    data
  })
}
