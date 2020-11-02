import axios from 'axios';
import {Message} from 'element-ui'
import token from '../utils/token'

axios.defaults.baseURL = 'http://localhost:8080/'

axios.interceptors.request.use(function (config) {
  if (config.url != 'login') {
    config.headers.Authorization = "Bearer " + token.getToken();
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
/**
 * axios每一次，请求完成之后 都会走这个响应拦截器
 *
 */
axios.interceptors.response.use(function (response) {
  // console.log(response);

  /*每一次访问都经过这里*/
  let {status, message, data} = response.data;
  if (status == 20000) {
    return data;
  } else {

    Message.error(message)
    // return Promise.reject("xxxx")
  }

}, function (error) {
  return Promise.reject(error);
});


export default axios;
