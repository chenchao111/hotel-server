import request from '@/http/request'
import { prefix } from '../prefix'

export const queryFoodsInfo = ({type = 0} = {}) => {
  return request({
    url: `${prefix}/hotel/foods/info`,
    method: 'get',
    params: {
      type
    }
  })
}
