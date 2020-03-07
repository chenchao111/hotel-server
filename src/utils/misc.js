var Misc = {
  getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  queryUrl(url) {
    var reg = /([^#$?&]+)=([^#$?&]+)/g
    var obj = {}
    url.replace(reg, function (item, attr, val) {
      obj[attr] = val
    })
    return obj
  },
  deleteUrlQuery(url) {
    var reg = /([#$?&]?[^#$?&]+)=([^#$?&]+)/g
    // var obj = {}
    const result = url.replace(reg, function (item, attr, val) {
      // obj[attr] = val

      if (attr.slice(1, attr.length) === 'code' || attr.slice(1, attr.length)  === 'state' || attr.slice(1, attr.length)  === 'openId') {
        return ''
      } else {
        return `${attr}=${val}`
      }
    })
    return result
  },
  mul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  significantFigure(value, figure=2, isRound=false) {
    var arr=(value+'').split('.');//将拿到的值转换成字符串 然后用小数点进行切割
    let symbol = null
    if ((arr[0][0] === '-')) {
      arr[0] = arr[0].slice(1)
      symbol = '-'
    }
    arr[0]=parseFloat(arr[0]);//将切割后的数组 第一个值转换成浮点值
    arr[1]='0.'+arr[1];    //将切割后的数组的 第二个值转换成小数点形式的字符串
    if (isRound) {
      console.log('isRound: ', isRound)
      arr[1]=parseFloat(arr[1]).toPrecision(figure)
    } else {
      arr[1]=parseFloat(arr[1])
    }
    //判断处理后的数组第一个值是否有. 有判断其长度，如果长度小于不够精确位数，加0---【注 字符串拼凑】
    arr[1]+=(RegExp('[.]').test(value))?(arr[1].length==figure+1?'0':''):'.00';
    
    //判断处理后的arr[1]中是否有1有1 则给arr[0]加1
    arr[0]+=RegExp('^1').test(arr[1])?1:0;
    
    //将处理后的arr[0]+arr[1]拼凑回value值
    value=arr[0]+RegExp("[.]\\d{"+figure+"}").exec(arr[1]);
    //返回value
    return symbol === '-' ? symbol + value : value;
  }
}

module.exports = Misc
