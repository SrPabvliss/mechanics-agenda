import dayjs from 'dayjs'

import 'dayjs/locale/es'

dayjs.locale('es')

export const formatLongDate = (date: string | Date): string => {
  const formattedDate = dayjs(date).format('dddd, D [de] MMMM [del] YYYY')
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}

export const formatMonthYear = (date: string | Date): string => {
  const formattedDate = dayjs(date).format('MMMM YYYY')
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatDateTime = (date: string | Date, time: string): string => {
  if (!date || !time) {
    return ''
  }
  return formatDate(date) + ' ' + time + ':00-05'
}

interface Time12HourFormat {
  hour: string
  min: string
  period: string
}

export const convert24HourTo12Hour = (time: string): Time12HourFormat => {
  if (!time) {
    return {
      hour: '',
      min: '',
      period: '',
    }
  }
  const [hourStr, min] = time.split(':')
  let hour = parseInt(hourStr, 10)
  const period = hour >= 12 ? 'PM' : 'AM'

  if (hour === 0) {
    hour = 12
  } else if (hour > 12) {
    hour -= 12
  }

  return {
    hour: hour.toString(),
    min,
    period,
  }
}

export const convert12HourTo24Hour = (time: Time12HourFormat): string => {
  if (!time.hour || !time.min || !time.period) {
    return ''
  }

  const hour = parseInt(time.hour, 10)
  const period = time.period

  if (period === 'AM' && hour === 12) {
    return `00:${time.min}`
  }

  if (period === 'PM' && hour < 12) {
    return `${hour + 12}:${time.min}`
  }

  return `${hour}:${time.min}`
}
