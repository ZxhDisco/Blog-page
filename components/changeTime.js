//改变时间格式

  
function changeTimeType(dateStr) {
  let d = new Date(dateStr);
  let resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  return resDate;
}

export default changeTimeType