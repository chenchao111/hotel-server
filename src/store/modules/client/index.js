const SET_USER_INFO = 'set_user_info'
const SET_USER_ORDERS = 'set_user_orders'
const SET_SEARCH_ORDERS = 'set_search_orders'

import Storage from '@/utils/storage'
const lStorage = new Storage('localStorage')

import { loginApi } from '@/api'

const state = {
  users: [],
  orderHotel: [],
  orderShop: []
}

const mutations = {
  [SET_USER_INFO](state, {users}) {
    state.users = users
  },
  [SET_USER_ORDERS](state, {orderHotel, orderShop}) {
    state.orderHotel = orderHotel
    state.orderShop = orderShop
  },
  [SET_SEARCH_ORDERS](state, {orders, type}) {
    if (type === 1) {
      state.orderHotel = orders
    } else {
      state.orderShop = orders
    }
  }
}

const actions = {
  async queryUserInfo ({ commit, state }) {
    try {
      console.log('---------nihao')
      const users = await loginApi.queryUserInfo()
      console.log('user: ', users)
      commit(SET_USER_INFO, {users})
      return Promise.resolve(users)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async editUserContact ({ commit, state }, {name, tel}) {
    try {
      const { openid } = state
      const user = await loginApi.editUserContact({openid, name, tel})
      console.log('user----edit: ', user)
      commit(SET_USER_INFO, {user})
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async createUserOrder ({ commit, state }, {contacts, order, type = 1}) { // type 1 酒店订单 2 商品订单
    try {
      const { openid } = state
      const user = await loginApi.createUserOrder({contacts, order, openid, type})
      console.log('user----edit: ', user)
      commit(SET_USER_INFO, {user})
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async queryUserOrder ({ commit, state }, {} = {}) {
    try {
      const { openid } = state
      const {orderHotel, orderShop} = await loginApi.queryUserOrder({openid})
      commit(SET_USER_ORDERS, {orderHotel, orderShop})
      return Promise.resolve({orderHotel, orderShop})
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async queryOrders ({ commit, state }, {search = {}, type}) { // type 1 酒店订单 2 商品订单
    try {
      const orders = await loginApi.queryOrders(search, type)
      commit(SET_SEARCH_ORDERS, {orders, type})
      return Promise.resolve({orders, type})
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
