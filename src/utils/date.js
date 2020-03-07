export const formatDate = (date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() > 10 ? '' : '0'}${date.getDate()}日`;
}
export const weekDay = (date) => {
  var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  var myDate = new Date(date)
  return weekDay[myDate.getDay()]
}
export const getDaysBetween = (dateString1, dateString2) => {
  var  startDate = Date.parse(dateString1);
  var  endDate = Date.parse(dateString2);
  var days=(endDate - startDate) / (1*24*60*60*1000)
  return  days;
}
export const getDateStr = (AddDayCount) => {
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  return dd
}