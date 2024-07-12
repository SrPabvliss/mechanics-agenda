import { IDay } from '@/shared/interfaces/ICalendar'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

/**
 * Generate days from the previous month to complete the first week.
 * @param firstDayOfWeek - The first day of the week.
 * @param firstDayOfMonth - The first day of the month.
 * @returns An array of days from the previous month.
 */
const generateDaysFromPreviousMonth = (firstDayOfWeek: number, firstDayOfMonth: dayjs.Dayjs): IDay[] => {
  const daysArray: IDay[] = []
  const prevMonth = firstDayOfMonth.subtract(1, 'month')
  const prevMonthDays = prevMonth.daysInMonth()

  for (let i = firstDayOfWeek; i > 0; i--) {
    const date = prevMonth.date(prevMonthDays - i + 1)
    daysArray.push({
      day: date.date(),
      month: date.month(),
      year: date.year(),
      date: date.format('YYYY-MM-DD'),
    })
  }

  return daysArray
}

/**
 * Generate days from the current month.
 * @param totalDaysInMonth - The total number of days in the current month.
 * @param year - The year of the current month.
 * @param month - The current month (0-indexed).
 * @returns An array of days in the current month.
 */
const generateDaysFromCurrentMonth = (totalDaysInMonth: number, year: number, month: number): IDay[] => {
  const daysArray: IDay[] = []

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const date = dayjs(new Date(year, month, day))
    daysArray.push({
      day,
      month,
      year,
      date: date.format('YYYY-MM-DD'),
    })
  }

  return daysArray
}

/**
 * Generate days from the next month to complete the last week.
 * @param remainingDays - The number of days remaining to complete the last week.
 * @param firstDayOfMonth - The first day of the current month.
 * @param totalDaysInMonth - The total number of days in the current month.
 * @returns An array of days from the next month.
 */
const generateDaysFromNextMonth = (
  remainingDays: number,
  firstDayOfMonth: dayjs.Dayjs,
  totalDaysInMonth: number,
): IDay[] => {
  const daysArray: IDay[] = []

  for (let i = 1; i <= remainingDays; i++) {
    const date = firstDayOfMonth.add(totalDaysInMonth + i, 'day')
    daysArray.push({
      day: date.date(),
      month: date.month(),
      year: date.year(),
      date: date.format('YYYY-MM-DD'),
    })
  }

  return daysArray
}

/**
 * Generate a calendar for a given year and month.
 * @param year - The year for the calendar.
 * @param month - The month for the calendar (0-indexed).
 * @returns An array of days representing the calendar month, including days from the previous and next months to complete the weeks.
 */
export const generateCalendar = (year: number, month: number): IDay[] => {
  const firstDayOfMonth = dayjs(new Date(year, month, 1))
  const totalDaysInMonth = firstDayOfMonth.daysInMonth()
  const firstDayOfWeek = (firstDayOfMonth.day() + 6) % 7 // Ajuste para que comience el lunes

  const prevMonthDays = generateDaysFromPreviousMonth(firstDayOfWeek, firstDayOfMonth)
  const currentMonthDays = generateDaysFromCurrentMonth(totalDaysInMonth, year, month)
  const remainingDays = (7 - ((prevMonthDays.length + currentMonthDays.length) % 7)) % 7
  const nextMonthDays = generateDaysFromNextMonth(remainingDays, firstDayOfMonth, totalDaysInMonth)

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
}
