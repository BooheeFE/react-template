/*
 * @Desc: http server
 * @Author: simbawu
 * @Date: 2018-11-26 19:01:53
 * @LastEditors: simbawu
 * @LastEditTime: 2018-12-05 20:42:23
 */
import axios from 'axios';

axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error.response);
});

function errorState(response) {
  // 错误处理
}

function successState(res) {
  // 正确处理
}
const httpServer = (opts, data, baseURL, token) => {

  // 公共参数
  let publicOpts = {

  };

  // http默认配置
  let httpDefaultOpts = {
    method: opts.method,
    baseURL: baseURL,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(publicOpts, data),
    data: Object.assign(publicOpts, data),
    headers: opts.method === 'get' ? {
      'Authorization': `Bearer ${token}`,
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    } : {
      'Authorization': `Bearer ${token}`,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };

  if (opts.method === 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }

  let promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res);
        resolve(res.data);
      }
    ).catch(
      (response) => {
        errorState(response);
        reject(response);
      }
    );

  });

  return promise;
};

export default httpServer;