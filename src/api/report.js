import axios from 'axios'

//添加新商品
export function addGoods(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=goods/addgoods'
  return axios.post(url,params)
}

//根据用户id获取Goodsinfo
export function getGoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=goods/getgoodsinfo'
  return axios.post(url,params)
}

//根据用户id获取Goodsinfo--用于价格变动log
export function getGoodsinfoLog(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=goods/getgoodsinfolog'
  return axios.post(url,params)
}

//编辑Goodsinfo
export function editeGoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=goods/editegoodsinfo'
  return axios.post(url,params)
}

//根据会员id删除商品
export function deletegoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=goods/deletgoods'
  return axios.post(url,params)
}

//获取销售商品info
export function Getsoldgoods(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getsoldgoods'
  return axios.post(url,params)
}

//获取销售商品info并分类--用于象形柱状图
export function GetsoldgoodsByGroup(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getsoldgoodsbygroup'
  return axios.post(url,params)
}

//获取退货商品info
export function Getreturngoods(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getreturngoods'
  return axios.post(url,params)
}

//获取退货商品info并分类--用于饼图
export function GetreturngoodsByGroup(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getreturngoodsbygroup'
  return axios.post(url,params)
}

//获取报损商品info
export function Getlossgoods(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getlossgoods'
  return axios.post(url,params)
}

//获取报损商品info并分类--用于饼图
export function GetlossgoodsByGroup(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getlossgoodsbygroup'
  return axios.post(url,params)
}

//获取新入库商品info
export function Getstoragegoods(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getstoragegoods'
  return axios.post(url,params)
}

//获取新入库商品info并分类--用于饼图
export function GetstoragegoodsByGroup(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getstoragegoodsbygroup'
  return axios.post(url,params)
}

//根据各种条件获取已经售出商品goodsinfo -- 用于销售分析tab列表
export function getsoldGoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getsoldgoodsinfo'
  return axios.post(url,params)
}

//根据各种条件获取新入库商品goodsinfo -- 用于销售分析tab列表
export function getstorageGoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getstoragegoodsinfo'
  return axios.post(url,params)
}

//根据各种条件获取退货商品goodsinfo -- 用于销售分析tab列表
export function getreturnGoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getreturngoodsinfo'
  return axios.post(url,params)
}

//根据各种条件获取报损商品goodsinfo -- 用于销售分析tab列表
export function getlossGoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getlossgoodsinfo'
  return axios.post(url,params)
}

//获取会员信息 -- 用于会员分析页男女比例图例分析
export function getmembers(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=member/getmembers'
  return axios.post(url,params)
}

//获取滞销商品List -- 用于滞销分析所用的list列表
export function getunsalablegoods(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getunsalablegoods'
  return axios.post(url,params)
}

//获取滞销商品info -- 用于滞销分析顶部tab数据渲染
export function getunsalablegoodsinfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getunsalablegoodsinfo'
  return axios.post(url,params)
}

//获取滞销商品info -- 用于滞销分析顶部饼状图数据渲染
export function getunsalablegoodsinfoForzb(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getunsalablegoodsinfoforzb'
  return axios.post(url,params)
}

//获取滞销商品列表 -- 用于滞销分析列表
export function getunsalablegoodslist(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getunsalablegoodslist'
  return axios.post(url,params)
}

//获取今日或昨日经营状况 -- 用于首页经营状况展示
export function getruninfo(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getruninfo'
  return axios.post(url,params)
}

//获取今日或昨日之最 -- 用于首页今日之最
export function getmostone(params) {
  let url = process.env.BASE_API + 'yii2/frontend/web/?r=report/getmostone'
  return axios.post(url,params)
}