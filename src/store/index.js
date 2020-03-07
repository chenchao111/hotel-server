import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import hotel from './modules/hotel'
import food from './modules/food'
import client from './modules/client'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    hotel,
    food,
    client,
    order
  },
  getters
})

export default store
