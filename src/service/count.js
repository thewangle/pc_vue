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
