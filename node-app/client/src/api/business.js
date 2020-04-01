//商家
import axios from 'axios'
const baseUrl=''
// 添加商家的接口
export const good_add = params => {
    return axios.post(`${baseUrl}/api/business/add`, params) 
}
// 删除商家的接口
export const good_delete = params => {
    return axios.delete(`${baseUrl}/api/business/delete`, params) 
}
// 编辑商家的接口
export const good_edit = params => {
    return axios.post(`${baseUrl}/api/business/edit`, params) 
}
// 获取所有商家的接口
/**
 * page && category
 * true && false , false && false 全部数据
 * false && true ，0 && true 全部符合的类别数据
 * 默认 page=0;查出全部的数据
 */
export const good_list = params => {
    return axios.post(`${baseUrl}/api/business`, params) 
}
//获取单个的数据
export const good_search = params => {
    return axios.post(`${baseUrl}/api/business/search`, params) 
}

// 类别处理
//添加
export const category_add = params => {
    return axios.post(`${baseUrl}/api/business_category/add`, params) 
}
//删除
export const category_delete = params => {
    return axios.delete(`${baseUrl}/api/business_category/delete`, params) 
}
//列表
export const category_list = params => {
    return axios.get(`${baseUrl}/api/business_category/list`, params) 
}
//编辑
export const category_edit = params => {
    return axios.post(`${baseUrl}/api/business_category/edit`, params) 
}
//数据导出表格
export const Excel = params => {
    return axios.get(`${baseUrl}/api/business/exportExcel`, params) 
}
