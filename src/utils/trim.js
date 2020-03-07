export function trim (str) {
  var result = str.replace(/(^\s+)|(\s+$)/g, '')
  return result.replace(/\s/g, '')
}
