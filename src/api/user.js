import request from '@/http/request'
import { prefix } from '@/api/prefix' 

export function login(data) {
  return request({
    url: `${prefix}/hotel-server/user/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `${prefix}/hotel-server/user/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `${prefix}/hotel-server/user/logout`,
    method: 'post'
  })
}
