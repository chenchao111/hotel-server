
export function compareAry(arr1, arr2) {
  return arr1.concat(arr2).filter((v, i, arr) => {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}
export function checkPhone(phone) {
  var myreg = /^[1][3,4,5,7,8,6,9][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}
export function cardCheck(card) { // 身份证
  let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
  return reg.test(card)
}
export function screening(ary, shine) { // 身份证
  return ary && ary.filter(item => item.showFlag === true).map(item => shine[item.attrName])
}
export function screeningResult(ary, shine) { // 身份证
  return Object.keys(shine).map(item => ({
    attrId: shine[item],
    showFlag: ary.includes(item)
  }))
}

export function clearCookie() {
  console.log('清除缓存方法被调用')
  var keys = document.cookie.match(/[^ =;]+(?=(\=))/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=.jrj.com.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=sdc.jrj.com.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .kevis.com
      document.cookie = keys[i] + '=0;path=/;domain=wx.jrj.com.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .kevis.com
      document.cookie = keys[i] + '=0;path=/sso/;domain=sso.jrj.com.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .kevis.com
    }
  }
}
export function calculateTax(money) {
  let tax = 800
  let rate = 0
  let deduct = 0
  if (money <= 800) {
    tax = 800
    rate = 0
    deduct = 0
  } else if (money > 800 && money <= 4000) {
    tax = 800
    rate = 0.2
    deduct = 0
  } else if (money > 4000 && money <= 25000) {
    tax = 0.2
    rate = 0.2
    deduct = 0
  } else if (money > 25000 && money <= 62500) {
    tax = 0.2
    rate = 0.3
    deduct = 2000
  } else if (money > 62500) {
    tax = 0.2
    rate = 0.4
    deduct = 7000
  }
  let taxMoney = 0
  if (tax === 800) {
    taxMoney = (money - tax) * rate - deduct
  } else {
    taxMoney = (1 - tax) * money * rate - deduct
  }
  return {
    hands: parseFloat(money - taxMoney).toFixed(2),
    tax: parseFloat(taxMoney).toFixed(2)
  }
}
