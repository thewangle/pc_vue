import axios from 'axios'

//添加新会员
export function addMember(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=member/addmember'
  return axios.post(url,params)
}

//根据用户id获取memberinfo
export function getMemberinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=member/getmemberinfo'
  return axios.post(url,params)
}

//编辑menmberinfo
export function editeMemberinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=member/editememberinfo'
  return axios.post(url,params)
}

//根据会员id删除会员
export function deleteMemberinfo(params) {
  let url = 'http://localhost/yii2/frontend/web/?r=member/deletemember'
  return axios.post(url,params)
}
