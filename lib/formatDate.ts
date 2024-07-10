import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export const formatLongDate = (date: string | Date): string => {
  const formattedDate = dayjs(date).format('dddd, D [de] MMMM [del] YYYY')
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}
