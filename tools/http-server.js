/*
 * @Desc: http server
 * @Author: simbawu
 * @Date: 2018-11-26 19:01:53
 * @LastEditors: simbawu
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
    axiosRetry(error);
  }
);

// axios response 错误拦截器
const interceptorsResponseErr = err => {
  return Promise.reject(err);
};

// axios 失败重试
const axiosRetry = err => {
  const { config, response } = err;

  // retry配置开启检测
  if (!config || !config.retry) {
    return interceptorsResponseErr(err);
  }

  // http code 范围检测
  if (response && response.status) {
    let isInRange = false;
    const retryStatusCodes = config.retryStatusCodes;
    for (const [min, max] of retryStatusCodes) {
      const status = response.status;
      if (status >= min && status <= max) {
        isInRange = true;
        break;
      }
    }
    if (!isInRange) {
      return interceptorsResponseErr(err);
    }
  }

  config.__retryCount = config.__retryCount || 0;

  // retry次数检测
  if (config.__retryCount >= config.retry) {
    return interceptorsResponseErr(err);
  }

  config.__retryCount += 1;

  // 延时时长优化
  const backOffDelay = config.retryDelay
    ? (1 / 2) * (Math.pow(2, config.__retryCount) - 1) * config.retryDelay
    : 1;

  const backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, backOffDelay);
  });

  return backoff.then(function() {
    return axiosRequest(config);
  });
};

// 正确处理
const successState = () => {};

// 错误处理
const errorState = () => {};

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
  const publicOpts = {};

  // http默认配置
  const httpDefaultOpts = {
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
    },
    retry: 3,
    retryStatusCodes: [
      [100, 199],
      [429, 429],
      [500, 599]
    ],
    retryDelay: 1000
  };

  if (opts.method === 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }

  return axiosRequest(httpDefaultOpts);
};

export default httpServer;