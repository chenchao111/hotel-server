const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  hotelname: state => state.hotel.name,
  images: state => state.hotel.images,
  location: state => state.hotel.location,
  phone: state => state.hotel.phone,
  cover: state => state.hotel.cover,
  rooms: state => state.hotel.rooms,
  room: state => state.hotel.room,
  date: state => state.hotel.date,
  foods: state => state.food.foods,
  cars: state => state.food.cars,
  users: state => state.client.users,
  orderHotel: state => state.order.orderHotel,
  orderShop: state => state.order.orderShop
}
export default getters
