//设置基准路径
//加载提示
//引入axios 
import axios from 'axios';
//提示
import { Toast } from 'antd-mobile'
//全局变量 当前请求的次数
let frequency = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //请求一次次数加一
  frequency++
  //使用Toast轻提示
  Toast.loading("加载中...", 0)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //请求一次次数减一
  frequency--
  //判断当次数==0时说明这次一起请求最后一个请求完毕了
  if (frequency === 0) {
    //取消提示
    Toast.hide()
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


//基准路径
export const baseURL = 'http://157.122.54.189:9060'
axios.defaults.baseURL = baseURL

export default axios 