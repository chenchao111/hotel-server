function urlParams(url) {
  var reg = /([^#$?&]+)=([^#$?&]+)/g
  var obj = {}
  url.replace(reg, function (item, attr, val) {
    obj[attr] = val
  })
  return obj
}

function urlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

export {
  urlParams,
  urlParam
}
