export function getTimeDifference(timestamp) {
  const ONE_MINUTE = 60 * 1000; // 1分钟的毫秒数
  const ONE_HOUR = 60 * ONE_MINUTE; // 1小时的毫秒数
  const ONE_DAY = 24 * ONE_HOUR; // 1天的毫秒数
  const ONE_MONTH = 30 * ONE_DAY; // 1月的毫秒数
  const THREE_MONTHS = 3 * ONE_MONTH; // 3个月的毫秒数

  const currentTime = Date.now();
  const difference = currentTime - timestamp;

  if (difference < ONE_HOUR) {
    // 不足1小时
    const minutes = Math.floor(difference / ONE_MINUTE);
    return `${minutes}分钟`;
  } else if (difference < ONE_DAY) {
    // 不足1天
    const hours = Math.floor(difference / ONE_HOUR);
    return `${hours}小时`;
  } else if (difference < ONE_MONTH) {
    // 不足1个月
    const days = Math.floor(difference / ONE_DAY);
    return `${days}天`;
  } else if (difference < THREE_MONTHS) {
    // 不足3个月
    const months = Math.floor(difference / ONE_MONTH);
    return `${months}月`;
  } else {
    // 超过3个月
    return "三个月前";
  }
}