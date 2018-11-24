import httpServer from 'tools/http-server';
import pConfig from 'pConfig';

import demo from './demo';

const project = {
  cnode: {
    baseURL: pConfig.CNODE_HOST
  }
};

const actions = {
  http(pName, method, url, data) {
    return httpServer({
      method: method,
      url: url
    }, data, ...Object.values(project[pName])).then((res) => {
      return res;
    });
  }
};

export default Object.assign(
  actions, demo
);