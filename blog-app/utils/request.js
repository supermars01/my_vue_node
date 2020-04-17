import { baseURL, timeout, HEADER, TOKEN} from '../config.js';
export default function request(api,method,data){
  console.log(getApp())
  let header = HEADER
  // if (getApp().globalData.token) header[TOKEN] = getApp().globalData.token;
   return new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + api,
        method: method || 'GET',
        header: header,
        timeout: timeout,
        data: data || {},
        success: function(res) {
          resolve(res.data)
        },
        fail: reject
      }) 
   })
}
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data) => request(api, method, data)
});
