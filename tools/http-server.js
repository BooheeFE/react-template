/*
 * @Desc: http server
 * @Author: simbawu
 * @Date: 2018-11-26 19:01:53
 * @LastEditors: simbawu
 * @LastEditTime: 2019-01-22 18:06:56
 */
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);

function errorState(response) {
  // 错误处理
}

function successState(res) {
  // 正确处理
}

const axiosRequest = opts => {
  return axios(opts)
    .then(res => {
      const { data } = res;
      successState(data);
      return data;
    })
    .catch(error => {
      errorState(error);
    });
};

const httpServer = (opts, data, baseURL, token) => {
  // 公共参数
  let publicOpts = {};

  // http默认配置
  let httpDefaultOpts = {
    method: opts.method,
    baseURL: baseURL,
    url: opts.url,
    timeout: 10000,
    params: { ...publicOpts, ...data },
    data: { ...publicOpts, ...data },
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };

  if (opts.method === 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }

  return axiosRequest(httpDefaultOpts);
};

export default httpServer;