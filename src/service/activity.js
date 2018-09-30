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

/**
 * 删除活动
 * @param {*} id 活动id
 */
export function deleteActivity(id) {
  return request({
    url: `/i/topteam/admin/delactivity?act_id=${id}`,
    method: 'get'
  })
}

/**
 * 获取活动下任务列表
 * @param {Obj} data {activity_id}
 */
export function fetchTaskList(data) {
  return request({
    url: '/i/topteam/admin/GetTaskList',
    method: 'post',
    data
  })
}

/**
 * 创建任务
 * @param {Obj} data
 */
export function addTask(data) {
  return request({
    url: 'i/topteam/admin/addTask',
    method: 'post',
    data
  })
}

/**
 * 获取活动信息
 * @param {*} data
 */
export function fetchActivityInfo(data) {
  return request({
    url: '/i/topteam/admin/getactivityinfo',
    method: 'post',
    data
  })
}

/**
 * 审批活动不通过接口
 */
export function auditact(data) {
  return request({
    url: '/i/topteam/admin/auditact',
    method: 'post',
    data
  })
}

/**
 * 创建订单
 */
export function creatOrder(data) {
  return request({
    url: '/i/topteam/api/createorder',
    method: 'post',
    data
  })
}

/**
 * 获取支付配置
 */
export function getPayInfo(data) {
  return request({
    url: '/i/topteam/api/getpayinfo',
    method: 'post',
    data
  })
}

/**
 * 修改活动
 * @param {*} data
 */
export function updateActivity(data) {
  return request({
    url: '/i/topteam/admin/updateactivity',
    method: 'post',
    data
  })
}

/**
 * 删除任务
 */
export function delTask(id) {
  return request({
    url: `/i/topteam/admin/delTask?id=${id}`,
    method: 'get'
  })
}

/**
 * 修改任务
 */
export function editTask(data) {
  return request({
    url: '/i/topteam/admin/ModifyTask',
    method: 'post',
    data
  })
}

/**
 * 活动记录
 */
export function fetchList(data) {
  return request({
    url: '/i/topteam/admin/GetActivityList',
    method: 'post',
    data
  })
}

/**
 * 活动详情查看
 */
export function getActivityDetial(id) {
  return request({
    url: `/i/topteam/admin/getactteamloginfo?act_id=${id}`,
    method: 'get'
  })
}

/**
 * 获取题库列表
 */
export function fetchTaskLibList(data) {
  return request({
    url: '/i/topteam/admin/getTaskLibList',
    method: 'post',
    data
  })
}

/**
 * 删除任务
 * @param {*} id
 */
export function delTaskLib(id) {
  return request({
    url: `/i/topteam/admin/delTaskLib?id=${id}`,
    method: 'get'
  })
}

/**
 * 创建任务
 */
export function addTaskLib(data) {
  return request({
    url: '/i/topteam/admin/addTaskLib',
    method: 'post',
    data
  })
}

/**
 * 修改任务
 */
export function updateTaskLib(data) {
  return request({
    url: '/i/topteam/admin/ModifyTaskLib',
    method: 'post',
    data
  })
}

/**
 * 题库导入题目
 */

export function chooseTasklib(data) {
  return request({
    url: '/i/topteam/admin/ChooseTasklib',
    method: 'post',
    data
  })
}

/**
 * 获取分类
 */
export function getTacskClassifyList(data = { page_no: 1, page_size: 1000 }) {
  return request({
    url: '/i/topteam/admin/getclassifylist',
    method: 'get',
    data
  })
}

/**
 * 添加分类
 */
export function addClassfiy(data) {
  return request({
    url: '/i/topteam/admin/addclassify',
    method: 'post',
    data
  })
}

/**
 * 删除分类
 * @param {*} data
 */
export function delClassify(data) {
  return request({
    url: '/i/topteam/admin/delclassify',
    method: 'post',
    data
  })
}

/**
 * 修改分类
 * @param {*} data
 */
export function updateClassfiy(data) {
  return request({
    url: '/i/topteam/admin/Modifyclassify',
    method: 'post',
    data
  })
}

/**
 * 个人版本查看记录详情
 */
export function getactteamloginfo(data) {
  return request({
    url: '/i/topteam/admin/getactploginfo',
    method: 'post',
    data
  })
}
