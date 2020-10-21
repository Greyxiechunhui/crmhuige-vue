import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080/'

axios.interceptors.request.use(function (config) {
  return config;
},function (error) {
  return Promise.reject(error);
});
/**
 * axios每一次，请求完成之后 都会走这个响应拦截器
 *
 *
 *
 */
axios.interceptors.response.use(function (response) {
  console.log(response);

  /*每一次访问都经过这里*/
  let {status, data} = response.data;
  if (status == 20000) {
    return data;
  }else {
    return response
  }
  // return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default axios;
