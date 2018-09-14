import request from '@/utils/request'

/**
 * 创建代理商
 * @param {*} data
 * @param name str 运营商名字
 * @param username	str 用户名
 * @param contacts	str 联系人姓名
 * @param phone int 手机号
 * @param price int 活动价
 * @param province_id int	省份id
 * @param city_id 否 int 城市id
 * @param county_id 否 int 县id
 * @param address 是 str 地址（省市县组合）
 */
export function createAgent(data) {
  return request({
    url: '/i/topteam/admin/AddAgent',
    method: 'post',
    data
  })
}

/**
 * 修改代理商
 * @param {*} data
 * @param id str 代理商id
 * @param name str 运营商名字
 * @param username	str 用户名
 * @param contacts	str 联系人姓名
 * @param phone int 手机号
 * @param price int 活动价
 * @param city_id 否 int 城市id
 * @param county_id 否 int 县id
 * @param address 是 str 地址（省市县组合）
 */
export function editAgent(data) {
  return request({
    url: '/i/topteam/admin/ModifyAgent',
    method: 'post',
    data
  })
}

/**
 * 删除代理商
 * @param {*} data
 * data： { agent_id: str }
 */
export function deleteAgent(data) {
  return request({
    url: '/i/topteam/admin/DelAgent',
    method: 'post',
    data
  })
}

/**
 * 代理商列表
 * @param {*} data
 * data: {agent_name: str, level: str, province_id: int}
 */
export function fetchAgentList(data) {
  return request({
    url: '/i/topteam/admin/GetAgentList',
    method: 'post',
    data
  })
}

/**
 * 获取当前用户下级代理商列表
 * @param {*} data
 * data: {level: int}
 */
export function fetchSubordinateAgent(data) {
  return request({
    url: '/i/topteam/admin/GetSubordinateAgent',
    method: 'post',
    data
  })
}

/**
 * 删除时转移机构
 * @param {*} data
 * data: { agent_id: int, superior_agent_id: int }
 */
export function transSubordinateAgent(data) {
  return request({
    url: '/i/topteam/admin/TransSubordinateAgent',
    method: 'post',
    data
  })
}

/**
 * 列表中转移机构
 * data: { agent_id: int, superior_agent_id: int }
 */
export function transAgent(data) {
  return request({
    url: '/i/topteam/admin/TransAgent',
    method: 'post',
    data
  })
}

/**
 * 获取用户下属机构
 * @param {Obj} data { level: int }
 */
export function getSubordinateAgent(data) {
  return request({
    url: '/i/topteam/admin/GetSubordinateAgent',
    method: 'post',
    data
  })
}

/**
 * 获取运营商列表
 * @param {Obj} data { name: str }
 */
export function getOperatorList(data) {
  return request({
    url: '/i/topteam/admin/GetOperatorList',
    method: 'post',
    data
  })
}

/**
 * 创建运营商
 * @param {Obj} data
 */
export function addOperator(data) {
  return request({
    url: '/i/topteam/admin/AddOperator',
    method: 'post',
    data
  })
}

/**
 * 修改运营商
 * @param {Obj} data
 */
export function editOperator(data) {
  return request({
    url: '/i/topteam/admin/ModifyOperator',
    method: 'post',
    data
  })
}

/**
 * 删除运营商
 */
export function delOperator(data) {
  return request({
    url: '/i/topteam/admin/DelOperator',
    method: 'post',
    data
  })
}

/**
 * 获取教练列表
 * @param {*} data
 */
export function fetchCoachList(data) {
  return request({
    url: '/i/topteam/admin/SearchCoachList',
    method: 'post',
    data
  })
}

/**
 * 添加教练
 * @param {*} data
 */
export function addCoach(data) {
  return request({
    url: '/i/topteam/admin/AddCoach',
    method: 'post',
    data
  })
}

/**
 * 删除教练
 * @param {*} data
 */
export function delCoach(data) {
  return request({
    url: '/i/topteam/admin/DelCoach',
    method: 'post',
    data
  })
}

/**
 * 更新教练
 * @param {*} data
 */
export function updateCoach(data) {
  return request({
    url: '/i/topteam/admin/ModifyCoach',
    method: 'post',
    data
  })
}
