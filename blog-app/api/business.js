import request from "./../utils/request.js";

// 列表
export function business_list(data) {
  return request.post('/business', data)
}

// 类别列表
export function category_list(data) {
  return request.get('/business_category/list', data)
}
// 商家距离
export function distance(data) {
  return request.post('/business/distance', data)
}