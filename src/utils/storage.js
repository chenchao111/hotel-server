/*
 sessionStorage & localStorage 封装
 @param storageName [String] // 默认sessionStorage
*/
export default class {
  constructor (storageName) {
    this.storage = storageName || 'sessionStorage'
  }
  setItem (key, val) {
    const storage = window[this.storage]
    storage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : val)
  }
  getItem (key) {
    const storage = window[this.storage]
    const val = storage.getItem(key)
    let rst
    try {
      rst = JSON.parse(val)
    } catch (err) {
      rst = val
    }
    return rst
  }
  removeItem (key) {
    const storage = window[this.storage]
    storage.removeItem(key)
  }
  clear () {
    const storage = window[this.storage]
    storage.clear()
  }
}
