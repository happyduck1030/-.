"use strict";
function getTimeDifference(timestamp) {
  const ONE_MINUTE = 60 * 1e3;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_MONTH = 30 * ONE_DAY;
  const THREE_MONTHS = 3 * ONE_MONTH;
  const currentTime = Date.now();
  const difference = currentTime - timestamp;
  if (difference < ONE_HOUR) {
    const minutes = Math.floor(difference / ONE_MINUTE);
    return `${minutes}分钟`;
  } else if (difference < ONE_DAY) {
    const hours = Math.floor(difference / ONE_HOUR);
    return `${hours}小时`;
  } else if (difference < ONE_MONTH) {
    const days = Math.floor(difference / ONE_DAY);
    return `${days}天`;
  } else if (difference < THREE_MONTHS) {
    const months = Math.floor(difference / ONE_MONTH);
    return `${months}月`;
  } else {
    return "三个月前";
  }
}
exports.getTimeDifference = getTimeDifference;
