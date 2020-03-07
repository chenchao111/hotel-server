import request from '@/http/request'
import { prefix } from '@/api/prefix' 

// 获取用户openId
export const queryOpenId = ({appid, code}) => {
  return request({
    url: `${prefix}/user/queryOpenId`,
    method: 'get',
    params: {
      appid, code
    }
  })
}

export const queryUserInfo = () => {
  return request({
    url: `${prefix}/user/queryUserInfo`,
    method: 'get',
  })
}

export const editUserContact = ({openid, name, tel}) => {
  return request({
    url: `${prefix}/user/editContacts`,
    method: 'post',
    params: {
      openid
    },
    data: {
      name, tel
    }
  })
}

export const createUserOrder = ({contacts, order, openid, type = 1}) => {
  return request({
    url: `${prefix}/user/createUserOrder`,
    method: 'post',
    params: {
      openid,
      type
    },
    data: {
      contacts, order
    }
  })
}

export const queryUserOrder = ({openid}) => {
  return request({
    url: `${prefix}/user/queryUserOrder`,
    method: 'get',
    params: {
      openid
    }
  })
}

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
