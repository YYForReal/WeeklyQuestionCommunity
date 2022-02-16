// 封装网络请求

import request from "./request";

const http = {
  get(url, params) {
    let config = {
      method: "get",
      url: url,
    };
    if (params) config.params = params;
    return request(config);
  },
  post(url, data,headers) {
    let config = {
      method: "post",
      url: url,
    };
    if (data) config.data = data;
    if (headers) config.headers = headers;
    return request(config);
  },
  put(url, params) {
    const config = {
      method: "put",
      url: url,
    };
    if (params) config.params = params;
    return request(config);
  },
  delete(url, params) {
    const config = {
      method: "delete",
      url: url,
    };
    if (params) config.params = params;
    return request(config);
  },
};

export default http;
