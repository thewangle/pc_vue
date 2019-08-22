import Vue from 'vue'
import $ from 'jquery'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data

import * as filters from './filters' // global filters

import  VueQuillEditor from 'vue-quill-editor'  //vue-quill-editor富文本
import 'quill/dist/quill.core.css'  //quill依赖
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import moment from 'moment' //日期转换插件 
import axios from 'axios'
import animate from 'animate.css'

Vue.use(animate)
Vue.use(Element, {
  size: 'medium'
})
Vue.use(VueQuillEditor)
Vue.prototype.$moment = moment

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// request interceptor
axios.interceptors.request.use(
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
axios.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    // if (res.error_code !== 0) {
    //   Message({
    //     // message: res.error_msg,
    //     message: '返回数据出错',
    //     type: 'error',
    //     duration: 2 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.error_code === 10009) {
    //     // 请自行在引入 MessageBox
    //     // import { Message, MessageBox } from 'element-ui'
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject(response.data)
    // } else {
    //   return response
    // }
    if (response.data !== undefined && response.data.status === -1) {
    	//返回接口错误信息
    	return Promise.reject(response.data)
    }
    return response
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

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
