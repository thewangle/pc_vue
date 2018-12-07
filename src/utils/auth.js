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

const AgentName = 'agent_name'
export function getAgentName() {
  return Cookies.get(AgentName)
}
export function setAgentName(agentName) {
  return Cookies.set(AgentName, agentName)
}
export function removeAgentName() {
  return Cookies.remove(AgentName)
}

const ProvinceId = 'province_id'
export function getProvinceId() {
  return Cookies.get(ProvinceId)
}

export function setProvinceId(provinceId) {
  return Cookies.set(ProvinceId, provinceId)
}

export function removeProvinceId() {
  return Cookies.remove(ProvinceId)
}

const Level = 'level'
export function getLevel() {
  return Cookies.get(Level)
}

export function setLevel(level) {
  return Cookies.set(Level, level)
}

export function removeLevel() {
  return Cookies.remove(Level)
}

const Price = 'price'
export function getPrice() {
  return Cookies.get(Price)
}
export function setPrice(price) {
  return Cookies.set(Price, price)
}
export function removePrice() {
  return Cookies.remove(Price)
}

const CityName = 'city_name'
export function getCityName() {
  return Cookies.get(CityName)
}
export function setCityName(cityName) {
  return Cookies.set(CityName, cityName)
}
export function removeCityName(cityName) {
  return Cookies.remove(CityName)
}

const CityIp = 'city_ip'
export function getCityIp() {
  return Cookies.get(CityIp)
}
export function setCityIp(cityIp) {
  return Cookies.set(CityIp, cityIp)
}
export function removeCityIp() {
  return Cookies.remove(CityIp)
}
// 保存用户信息
export function setUserInfo(user) {
  const { role_id, agent_id, user_name,
    agent_name, province_id, level, price, city_name,
    city_ip
  } = user
  setRoleId(role_id)
  setAgentId(agent_id)
  setUserName(user_name)
  setAgentName(agent_name)
  setProvinceId(province_id)
  setLevel(level)
  setPrice(price / 100)
  setCityName(city_name)
  setCityIp(city_ip)
}

// 清楚用户信息
export function removeUserInfo() {
  removeRoleId()
  removeAgentId()
  removeUserName()
  removeAgentName()
  removeProvinceId()
  removeLevel()
  removePrice()
  removeCityName()
  removeCityIp()
}
