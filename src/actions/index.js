import httpServer from 'utils/http-server';

const project = {

};

const actions = {
  http(pName, method, url, data) {
    return httpServer({method: method, url: url}, data, ...Object.values(project[pName])).then((res) => {
      return res;
    });
  }
};

export default Object.assign(
  actions
);