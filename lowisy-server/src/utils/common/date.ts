export function getCurrentDate(date: any = null) {
  if (date) return new Date(date).toISOString().slice(0, 19).replace('T', ' ')
  return new Date().toISOString().slice(0, 19).replace('T', ' ')
}

export function addDays(daysToAdd: number) {
  const newDate = new Date()
  return new Date(newDate.setDate(newDate.getDate() + daysToAdd))
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
}

export function addDaysToGivenDate(date: string, daysToAdd: number) {
  const newDate = new Date(date)
  return new Date(newDate.setDate(newDate.getDate() + daysToAdd))
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
}

export function formatTime(time: string) {
  if (time) {
    if (time.split(' ').includes('PM')) {
      const hr = parseInt(time.split(':')[0]) + 12
      const min = parseInt(time.split(':')[1])
      const sec = parseInt(time.split(':')[2])
      time = `${hr}:${min}:${sec}`
    } else {
      const hr = parseInt(time.split(':')[0])
      const min = parseInt(time.split(':')[1])
      const sec = parseInt(time.split(':')[2])
      time = `${hr}:${min}:${sec}`
    }
  }
  return time
}
