import axios from 'axios'
const baseUrl=''

export const upload = params => {
    return axios.post(`${baseUrl}/api/upload/addPicture`, params) 
}