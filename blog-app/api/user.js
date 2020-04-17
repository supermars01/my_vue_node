import request from "./../utils/request.js";
export function login(data) {
  return request.post('/wxusers/login', data)
}
export function checkToken(data) {
  return request.post('/wxusers/checkToken', data)
}