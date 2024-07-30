import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)
dayjs.tz.setDefault('America/Guayaquil')

export const formatTime = (date: string | Date): string => {
  return dayjs(date).format('HH:mm')
}
