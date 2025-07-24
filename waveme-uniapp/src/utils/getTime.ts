export const getFormattedDate = () => {
  const now = new Date() // 获取当前日期和时间

  // 获取年、月、日、时、分
  const year = now.getFullYear() // 年份
  const month = now.getMonth() + 1 // 月份，getMonth() 返回的月份是从0开始的
  const day = now.getDate() // 日
  const hours = now.getHours() // 小时
  const minutes = now.getMinutes() // 分钟

  // 将单个数字格式化为两位数
  const formatNumber = (num) => (num < 10 ? '0' + num : num)

  // 拼接成指定格式的字符串
  const formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hours)}:${formatNumber(minutes)}`

  return formattedDate
}
