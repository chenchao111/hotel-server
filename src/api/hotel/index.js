import request from '@/http/request'
import { prefix } from '../prefix'

export const queryHotelInfo = () => {
  return request({
    url: `${prefix}/hotel/info`,
    method: 'get'
  })
}

// 查询房间分类
export const queryRoomsInfo = ({type = 0} = {}) => {
  return request({
    url: `${prefix}/hotel/rooms/info?type=${type}`,
    method: 'get'
  })
}

export const queryRoomInfo = (id = 1) => {
  return request({
    url: `${prefix}/hotel/room/info`,
    method: 'get',
    params: {
      id
    }
  })
}
// 添加房间类型分类
export const createRoomsCategory = ({type, title}) => {
  return request({
    url: `${prefix}/hotel-server/hotel/createCategory`,
    method: 'post',
    data: {
      type, title
    }
  })
}
// 删除指定房间分类
export const removeRoomsCategory = options => {
  return request({
    url: `${prefix}/hotel-server/hotel/deleteCategory`,
    method: 'delete',
    data: options
  })
}
// 编辑指定房间分类
export const editRoomsCategory = ({_id, title}) => {
  return request({
    url: `${prefix}/hotel-server/hotel/editCategory`,
    method: 'post',
    params: {
      _id
    },
    data: {
      title
    }
  })
}
