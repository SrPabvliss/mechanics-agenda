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
