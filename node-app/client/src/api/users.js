import axios from 'axios'
const baseUrl = ''
//注册
const register = params => {
    return axios.post(`${baseUrl}/api/users/register`, params) 
}
// 编辑用户信息接口
const edit = params => {
    return axios.post(`${baseUrl}/api/users/edit`, params) 
}
export const register_edit = {
    register,
    edit
}
// 登录
export const login = params => {
    return axios.post(`${baseUrl}/api/users/login`, params) 
}

//根据token查询到用户信息
export const current = params => {
    return axios.get(`${baseUrl}/api/users/current`, params) 
}

//查询出用户信息列表
export const users = params => {
    return axios.get(`${baseUrl}/api/users`, params) 
}


//删除信息接口
export const delete_user = params => {
    return axios.delete(`${baseUrl}/api/users/delete`, params) 
}
//查询信息接口 
export const screen =params => {
    return axios.post(`${baseUrl}/api/users/screen`, params) 
}