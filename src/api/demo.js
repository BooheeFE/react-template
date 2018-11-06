export default {
  /**
   * @name 获取cnode最新帖子
   * @returns 帖子列表
   */
  getCnodeList(params) {
    return this.http('cnode', 'get', '/api/v1/topics', params)
      .then((response) => {
        return response;
      });
  }
};