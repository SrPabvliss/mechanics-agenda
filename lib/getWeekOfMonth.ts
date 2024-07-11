import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

export const getWeekOfMonth = (date: string | Date): string => {
  const inputDate = dayjs(date)
  const startOfMonth = inputDate.startOf('month')
  const weekNumber = inputDate.week() - startOfMonth.week() + 1

  return `Semana ${weekNumber}`
}
