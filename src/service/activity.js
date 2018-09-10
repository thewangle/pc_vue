import request from '@/utils/request'

/**
 * 创建活动
 * @param {*} data
 * {name: 'string', keep_time: int, set_start_time: string}
 * {set_stop_time: string, score: int, score_show_type: int, score_type: int, bg_img: string}
 * {icon: string, type: string, agent_id: 代理商id, act_desc: 活动描述, coach_id: int}
 */
export function addActivity(data) {
  return request({
    url: '/i/topteam/admin/addactivity',
    method: 'post',
    data
  })
}
/**
 * 获取活动列表
 * { agent_name: string, name: string, type: int, status: int }
 */
export function fetchActivityList(data) {
  return request({
    url: '/i/topteam/admin/GetActivityList',
    method: 'post',
    data
  })
}

/**
 * 获取教练列表
 */
export function fetchCoachList() {
  return request({
    url: '/i/topteam/admin/getcoachlist',
    method: 'get'
  })
}
