import request from "./../utils/request.js";

// 列表
export function newsList(data) {
  return request.post('/news', data)
}
// 详情
export function newsInfo(data) {
  return request.post('/news/newinfo', data)
}
// 点赞
export function give(data) {
  return request.post('/news/give', data)
}
//  类别列表
export function categoryList(data) {
  return request.get('/news_category/list', data)
}

// 搜索
export function search(data) {
  return request.post('/news/search', data)
}