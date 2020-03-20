//设置基准路径
//加载提示
//引入axios 
import axios from 'axios';
//提示
import {Toast} from 'antd-mobile'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
   //使用Toast轻提示
   Toast.loading("加载中...",0)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
      //取消提示
      Toast.hide()
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


//基准路径
export const baseURL ='http://157.122.54.189:9060'
axios.defaults.baseURL = baseURL

export default axios 