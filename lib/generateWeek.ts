import { IDay } from '@/shared/interfaces/ICalendar'
import dayjs from 'dayjs'

export const generateWeek = (date: string): IDay[] => {
  const startOfWeek = dayjs(date).startOf('week')
  const week: IDay[] = []

  for (let i = 0; i < 7; i++) {
    const currentDay = startOfWeek.add(i, 'day')
    week.push({
      day: currentDay.date(),
      month: currentDay.month() + 1, // Months in dayjs are 0 indexed, so add 1
      year: currentDay.year(),
      date: currentDay.format('YYYY-MM-DD'),
    })
  }

  return week
}
