const SET_NAME = 'set_name'
const SET_COVER = 'set_cover'
const SET_IAMGER = 'set_images'
const SET_LOCATION = 'set_location'
const SET_PHONE = 'set_phone'
const SET_ROOMS = 'set_rooms'
const SET_ROOM = 'set_room'
const SET_DATE = 'set_date'

import { hotelApi } from '@/api'

const state = {
  "name": "师范&联大酒店(淮南师范&联合大学店 no1)",
  "cover": "http://sl.jiangedev.com/cnd/home.jpg",
  "images": [
    "http://sl.jiangedev.com/cnd/preview/1.jpg",
    "http://sl.jiangedev.com/cnd/preview/2.jpg",
    "http://sl.jiangedev.com/cnd/preview/3.jpg",
    "http://sl.jiangedev.com/cnd/preview/4.jpg",
    "http://sl.jiangedev.com/cnd/preview/5.jpg",
    "http://sl.jiangedev.com/cnd/preview/6.jpg",
    "http://sl.jiangedev.com/cnd/preview/7.jpg",
    "http://sl.jiangedev.com/cnd/preview/8.jpg",
    "http://sl.jiangedev.com/cnd/preview/9.jpg",
    "http://sl.jiangedev.com/cnd/preview/10.jpg",
    "http://sl.jiangedev.com/cnd/preview/11.jpg",
    "http://sl.jiangedev.com/cnd/preview/12.jpg",
    "http://sl.jiangedev.com/cnd/preview/13.jpg",
    "http://sl.jiangedev.com/cnd/preview/14.jpg",
    "http://sl.jiangedev.com/cnd/preview/15.jpg"
  ],
  "location": "安徽省淮南市田家庵区洞山西路淮南师范学院新区大门正对面向东80米(安徽省淮南市师范&联合大学对面)",
  "phone": "18601136002",
  "rooms": [],
  "room": {},
  "date": {}
}

const mutations = {
  [SET_NAME](state, {name}) {
    state.name = name
  },
  [SET_COVER](state, {cover}) {
    state.cover = cover
  },
  [SET_IAMGER](state, {images}) {
    state.images = images
  },
  [SET_LOCATION](state, {location}) {
    state.location = location
  },
  [SET_PHONE](state, {phone}) {
    state.phone = phone
  },
  [SET_ROOMS](state, {rooms}) {
    state.rooms = rooms
  },
  [SET_ROOM](state, {room}) {
    state.room = room
  },
  [SET_DATE](state, {date}) {
    state.date = date
  }
}

const actions = {
  async queryHotelInfo ({ commit }, data) {
    try {
      const res = await hotelApi.queryHotelInfo()
      const { name, cover, images, location, phone } = res
      commit(SET_NAME, {name})
      commit(SET_COVER, {cover})
      commit(SET_IAMGER, {images})
      commit(SET_LOCATION, {location})
      commit(SET_PHONE, {phone})
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async queryRoomsInfo ({ commit }, {type = 0} = {}) {
    try {
      const rooms = await hotelApi.queryRoomsInfo({type})
      console.log('rooms: ', rooms)
      commit(SET_ROOMS, {rooms})
      return Promise.resolve(rooms)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async queryRoomInfo ({ commit }, { id }) {
    try {
      const room = await hotelApi.queryRoomInfo(id)
      console.log('room: ', room)
      commit(SET_ROOM, {room})
      return Promise.resolve(room)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async createRoomsCategory ({ dispatch, commit }, {type, title} = {}) {
    try {
      const createRoom = await hotelApi.createRoomsCategory({type, title})
      const rooms = await dispatch('queryRoomsInfo')
      console.log('rooms: ', rooms)
      commit(SET_ROOMS, {rooms})
      return Promise.resolve(rooms)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async removeRoomsCategory ({ dispatch, commit }, options) {
    try {
      await hotelApi.removeRoomsCategory(options)
      const rooms = await dispatch('queryRoomsInfo')
      console.log('rooms: ', rooms)
      commit(SET_ROOMS, {rooms})
      return Promise.resolve(rooms)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async editRoomsCategory({ dispatch, commit }, {_id, title}) {
    try {
      await hotelApi.editRoomsCategory({_id, title})
      const rooms = await dispatch('queryRoomsInfo')
      console.log('rooms: ', rooms)
      commit(SET_ROOMS, {rooms})
      return Promise.resolve(rooms)
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
