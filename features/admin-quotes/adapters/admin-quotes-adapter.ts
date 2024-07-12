import { scheduleDay } from '@/shared/constants/schedule-day'
import { scheduleWeek } from '@/shared/constants/schedule-week'
import { IEvent, IEvents } from '@/shared/interfaces/IEvents'
import { ISchedule, IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { IApiAdminQuotes } from '../models/IApiAdminQuotes'

export const adminQuotesDayAdapter = (data: IApiAdminQuotes[]): ISchedule[] => {
  const schedule = JSON.parse(JSON.stringify(scheduleDay)) as ISchedule[]

  data.forEach((quote) => {
    const event: IEvent = {
      id: quote.id,
      title: quote.title,
      label: quote.description,
      startTime: quote.startTime,
      color: quote.color,
    }

    const startHour = quote.startTime.split(':')[0] + ':00'
    const startMinutes = parseInt(quote.startTime.split(':')[1])

    const scheduleHour = schedule.find((s) => s.hour === startHour)
    if (scheduleHour) {
      if (startMinutes < 30) {
        scheduleHour.activities1.push(event)
      } else {
        scheduleHour.activities2.push(event)
      }
    }
  })

  return schedule
}

export const adminQuotesWeekAdapter = (data: IApiAdminQuotes[]): IScheduleWeek[] => {
  const schedule = JSON.parse(JSON.stringify(scheduleWeek)) as IScheduleWeek[]

  data.forEach((quote) => {
    const event: IEvent = {
      id: quote.id,
      title: quote.title,
      label: quote.description,
      startTime: quote.startTime,
      color: quote.color,
    }

    const startHour = quote.startTime.split(':')[0] + ':00'
    const startMinutes = parseInt(quote.startTime.split(':')[1])

    const date = quote.date

    const scheduleHour = schedule.find((s) => s.hour === startHour)
    if (scheduleHour) {
      if (!scheduleHour.events[date]) {
        scheduleHour.events[date] = { events1: [], events2: [] }
      }

      if (startMinutes < 30) {
        scheduleHour.events[date].events1.push(event)
      } else {
        scheduleHour.events[date].events2.push(event)
      }
    }
  })

  return schedule
}

export const adminQuotesMonthAdapter = (data: IApiAdminQuotes[]): IEvents => {
  const events: IEvents = {}

  data.forEach((quote) => {
    const event: IEvent = {
      id: quote.id,
      title: quote.title,
      label: quote.description,
      startTime: quote.startTime,
      color: quote.color,
    }

    const date = quote.date

    if (!events[date]) {
      events[date] = []
    }

    events[date].push(event)
  })

  return events
}
