// 公共接口地址
import request from '@/http/request'

const jrj = 'https://c.jrj.com.cn/wealth/room'
// const itougu = 'https://itougu.jrj.com.cn'
const itougu = 'https://c.jrj.com.cn'

// 获取渠道码
export function queryChannelCode(options) {
  const _default = {
    userId: '' // 投顾id
  }
  for (let attr in options) {
    if (_default.hasOwnProperty(attr)) {
      _default[attr] = options[attr]
    }
  }
  return request({
    url: `${jrj}/getUserChannelCode/${_default.userId}`,
    method: 'get'
  })
}

// 判断登录 种cookie
// itougu.jrj.com.cn/account/getBasicUserInfo2.jspa
export function getBasicUserInfo(options) {
  return request({
    url: `${itougu}/account/getBasicUserInfo2.jspa`,
    method: 'get'
  })
}
