import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.tz.setDefault('America/Guayaquil')

export const formatTime = (date: string | Date): string => {
  if (!date) return ''
  return dayjs(date).format('HH:mm')
}
