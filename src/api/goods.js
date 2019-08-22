import axios from 'axios'

//添加新商品
export function addGoods(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/addgoods'
  return axios.post(url,params)
}

//根据分类id获取goodsinfo
export function getGoodsinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodsinfo'
  return axios.post(url,params)
}

//根据用户id获取Goodsinfo--用于价格变动log
export function getGoodsinfoLog(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodsinfolog'
  return axios.post(url,params)
}

//根据商品id获取Goodsinfo--用于价格变动报表
export function getgoodBygoodsid(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodbygoodsid'
  return axios.post(url,params)
}

//根据用户id获取Goodsinfo--不传page--用于价格变动报表
export function getGoodsinfobyid(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodsinfobyid'
  return axios.post(url,params)
}

//编辑Goodsinfo
export function editeGoodsinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/editegoodsinfo'
  return axios.post(url,params)
}

//根据会员id删除商品
export function deletegoodsinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/deletgoods'
  return axios.post(url,params)
}

//查询库存占比--用于库存报表--tab1的echorts的展示
export function getgoodsinfofortab1(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodsinfofortab1'
  return axios.post(url,params)
}

//查询库存变化占比--用于库存报表--tab1的echorts的展示
export function getgoodschangefortab1(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodschangefortab1'
  return axios.post(url,params)
}

//查询库存变化趋势--用于库存报表--tab2的echorts的展示
export function getgoodschangeQushi(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getgoodschangequshi'
  return axios.post(url,params)
}

//查询价格变化趋势--用于价格报表--echorts的展示
export function getpricechangeQushi(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getpricechangequshi'
  return axios.post(url,params)
}

//查询价格变化趋势--用于价格报表--echorts的展示--按库存变化分类
export function getgoodschangeQushiSort(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=goods/getpricechangequshisort'
  return axios.post(url,params)
}