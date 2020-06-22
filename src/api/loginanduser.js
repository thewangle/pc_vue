import axios from 'axios'

//通过username登陆
export function loginByUsername(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/login'
  return axios.post(url,params)
}

//通过username获取userinfo
export function getuserinfoByusername(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getuserinfo'
  return axios.post(url,params)
}


//添加新用户
export function addUser(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/adduser'
  return axios.post(url,params)
}

//删除用户
export function deletUser(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/deleuser'
  return axios.post(url,params)
}

//更新编辑用户信息
export function editeUser(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/editeuser'
  return axios.post(url,params)
}

//更新编辑用户到期时间
export function renewalFee(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/renewalfee'
  return axios.post(url,params)
}

//获取所有用户信息
export function getallUser(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getallusers'
  return axios.get(url)
}

//根据用户id获取主号id下的所有用户信息
export function getallUserByid(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getallusersbyid'
  return axios.post(url,params)
}

//根据用户id获取主号id的用户信息
export function getallUserByidmain(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getallusersbyidmain'
  return axios.post(url,params)
}

//根据用户id获取该id下的所有用户信息
export function getallUserByidthis(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getallusersbyidthis'
  return axios.post(url,params)
}

//根据权限获取用户信息
export function getUserByPermission(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getalluser'
  return axios.post(url,params)
}

//根据用户id获取该用户信息
export function getUserByuid(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getalluserbyuid'
  return axios.post(url,params)
}

//预警信息状态改变
export function changemessage(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/changemessage'
  return axios.post(url,params)
}

//获取山东地图json格式数据
export function getmapforshandong(params) {
  let url = 'https://geo.datav.aliyun.com/areas/bound/370000_full.json'
  return axios.get(url)
}

//商品出入库操作更改用户的成本
export function changecost(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/changecost'
  return axios.post(url,params)
}

//获取用户的成本
export function getcost(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=login/getcost'
  return axios.post(url,params)
}


