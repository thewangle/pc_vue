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

const RoleKey = 'role' // 角色id
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

const AgentKey = 'partantid' // 上级账号id
export function getpartantId() {
  return Cookies.get(AgentKey)
}

export function setpartantId(partantId) {
  return Cookies.set(AgentKey, partantId)
}

export function removepartantId() {
  return Cookies.remove(AgentKey)
}

//用户名和密码
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

const PassWord = 'password' // 密码
export function getPassword() {
  return Cookies.get(PassWord)
}

export function setPassword(password) {
  return Cookies.set(PassWord, password)
}

export function removePassword() {
  return Cookies.remove(PassWord)
}

//部门名称
const AgentName = 'department'
export function getdepartmentName() {
  return Cookies.get(AgentName)
}
export function setdepartmentName(departmentName) {
  return Cookies.set(AgentName, departmentName)
}
export function removedepartmentName() {
  return Cookies.remove(AgentName)
}

//管理员名称
const ProvinceId = 'adminname'
export function getadminname() {
  return Cookies.get(ProvinceId)
}

export function setadminname(adminnames) {
  return Cookies.set(ProvinceId, adminnames)
}

export function removeadminname() {
  return Cookies.remove(ProvinceId)
}


//用户id
const userId = 'id'
export function getUserid() {
  return Cookies.get(userId)
}

export function setUserid(id) {
  return Cookies.set(userId, id)
}

export function removeUserid() {
  return Cookies.remove(userId)
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
  const { username, PHPSESSID, role, partantid, department, adminname,id } = user
  setUserName(username)
  setToken(PHPSESSID)
  setRoleId(role)
  setpartantId(partantid)
  setdepartmentName(department)
  setadminname(adminname)
  setUserid(id)
}

// 清楚用户信息
export function removeUserInfo() {
  removeRoleId()
  removeUserName()
  removepartantId()
  removedepartmentName()
  removeadminname()
  removeToken()
  removeUserid()
}
