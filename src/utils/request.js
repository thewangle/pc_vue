import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    //与yii2框架对应好token
    // var token = 'tk'; //这个地方为了测试是写死的，实际情况应该是在cookie中动态获取，来判断时候有了token
    // config.headers.common["Authorization"] = `Bearer ${token}`;
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    console.log('22222222')
    const res = response.data
    if (res.error_code !== 0) {
      Message({
        // message: res.error_msg,
        message: '返回数据出错',
        type: 'error',
        duration: 2 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.error_code === 10009) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(response.data)
    } else {
      return response
    }
  },
  error => {
    const reg = new RegExp(/504|503|500|400/)
    if (reg.test(error.message) || error.message === 'Network Error') {
      Message({
        message: '网络断了，请检查网络！',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        // message: error.message,
        message: '网络断了，请检查网络！',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
