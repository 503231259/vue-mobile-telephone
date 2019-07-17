import axios from 'axios' // 引入axios模块
import store from '@/store'

// 自定义配置
const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'// 密码123456
  baseURL: 'http://ttapi.research.itcast.cn/'// 密码246810
})

/*
 * 添加请求拦截器
 */
request.interceptors.request.use(function (config) {
  // 在发送请求之前做一些事情
  const { user } = store.state
  // console.log(user)
  if (user) {
    config.headers.Authorization = `Bearer ${user}`
  }
  return config
}, function (error) {
  // 执行请求错误的操作
  return Promise.reject(error)
})

/**
 * 添加响应拦截器
 */
request.interceptors.response.use(function (response) {
  // 对响应数据做一些事情
  let data = response.data.data || response.data
  return data
}, function (error) {
  // 做一些有响应错误的事情
  return Promise.reject(error)
})
export default request
