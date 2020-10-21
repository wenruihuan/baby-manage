export const formatDate = (date, format) => {
  if (date) {
    let result
    const times = new Date(date)
    const weeks = ['日', '一', '二', '三', '四', '五', '六']
    const YYYY = times.getFullYear()
    const MM = times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1
    const DD = times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
    const hh = times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
    const mm = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
    const ss = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
    const ww = times.getDay()
    const WW = weeks[ww]
    result = `${YYYY}-${MM}-${DD}`
    if (format) {
      result = ''
      const formatList = format.split('')
      formatList.forEach(m => {
        switch (m) {
          case 'Y':
            result = result + `${YYYY}`
            break
          case 'M':
            result = result + `${MM}`
            break
          case 'D':
            result = result + `${DD}`
            break
          case 'h':
            result = result + `${hh}`
            break
          case 'm':
            result = result + `${mm}`
            break
          case 's':
            result = result + `${ss}`
            break
          case 'w':
            result = result + `${ww}`
            break
          case 'W':
            result = result + `${WW}`
            break
          default:
            result = result + m
        }
      })
    }
    return result
  }
  return ''
}