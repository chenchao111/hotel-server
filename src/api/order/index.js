import request from '@/http/request'
import { prefix } from '@/api/prefix' 

export const queryOrders = ({search = {}, type = 1}) => {
  return request({
    url: `${prefix}/hotel-server/order/queryOrders`,
    method: 'get',
    params: {
      search,
      type
    }
  })
}
