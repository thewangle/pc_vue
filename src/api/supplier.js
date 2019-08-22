import axios from 'axios'

//添加新供应商
export function addSupplier(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=supplier/addsupplier'
  return axios.post(url,params)
}

//根据用户id获取memberinfo
export function getSupplierinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=supplier/getsupplierinfo'
  return axios.post(url,params)
}

//根据用户id获取memberinfo--用于分类select选择
export function getSupplierall(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getsupplierall'
  return axios.post(url,params)
}

//编辑menmberinfo
export function editeSupplierinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=supplier/editesupplierinfo'
  return axios.post(url,params)
}

//根据会员id删除会员
export function deleteSupplier(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=supplier/deletesupplier'
  return axios.post(url,params)
}

