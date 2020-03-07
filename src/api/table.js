import request from '@/http/request'

export function getList(params) {
  return request({
    url: '/hotel-server/table/list',
    method: 'get',
    params
  })
}
