import request from '@/utils/request'

export function fetchCountList(data) {
  return request({
    url: '/i/topteam/admin/getuseracountlist',
    method: 'post',
    data
  })
}
