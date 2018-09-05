import Cookies from 'js-cookie'

const TokenKey = 'PHPSESSID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const RoleKey = 'role_id' // 角色d
// 获取Role_id
export function getRoleId() {
  return Cookies.get(RoleKey)
}
// 设置Role_id
export function setRoleId(roleId) {
  return Cookies.set(RoleKey, roleId)
}

// 删除Role_id
export function removeRoleId() {
  return Cookies.remove(RoleKey)
}

const AgentKey = 'agent_id' // 权限id
export function getAgentId() {
  return Cookies.get(AgentKey)
}

export function setAgentId(agentId) {
  return Cookies.set(AgentKey, agentId)
}

export function removeAgentId() {
  return Cookies.remove(AgentKey)
}

const UserName = 'user_name' // 用户名
export function getUserName() {
  return Cookies.get(UserName)
}

export function setUserName(userName) {
  return Cookies.set(UserName, userName)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}
