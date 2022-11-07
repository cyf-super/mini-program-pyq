const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

export const formatDate = (timer) => {
    if (!timer) return ''
    const date = new Date(timer)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    const week = weeks[date.getDay()]
    
    return `${month}月${day}日 ${hour}:${minute} ${week}`
}