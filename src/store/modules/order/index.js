const SET_SEARCH_ORDERS = 'set_search_orders'

import { orderApi } from '@/api'

const state = {
  orderHotel: [],
  orderShop: []
}

const mutations = {
  [SET_SEARCH_ORDERS](state, {orders, type}) {
    if (type === 1) {
      state.orderHotel = orders
    } else {
      state.orderShop = orders
    }
  }
}

const actions = {
  async queryOrders ({ commit, state }, {search = {}, type = 1}) { // type 1 酒店订单 2 商品订单
    try {
      const orders = await orderApi.queryOrders(search, type)
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
