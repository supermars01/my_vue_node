import axios from 'axios'
const baseUrl=''
// 添加信息的接口
const add = params => {
    return axios.post(`${baseUrl}/api/profile/add`, params) 
}
// 编辑信息的接口
const edit = params => {
    return axios.post(`${baseUrl}/api/profile/edit`, params) 
}
export const add_edit = {
    add,
    edit
}
//获取所有的信息
export const all_profile = params => {
    return axios.get(`${baseUrl}/api/profile`, params) 
}
// 获取单个信息
export const obtain = params => {
    return axios.get(`${baseUrl}/api/profile/:id`, params) 
}

// 删除信息接口
export const delete_profile = params => {
    return axios.delete(`${baseUrl}/api/profile/delete/:id`, params) 
}