import { scheduleDayFull } from '@/shared/constants/schedule-day'
import { scheduleWeekFull } from '@/shared/constants/schedule-week'
import { IAdminQuoteEvent, IAdminQuoteEventsMonth } from '@/shared/interfaces/IEvents'
import { IDailySchedule, IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { formatDate, formatDateTime } from '@/lib/formatDate'
import { formatTime } from '@/lib/formatTime'

import { AdminQuotesFormValues } from '../hooks/use-admin-quotes-form'
import { IApiAdminQuote, IApiCreateAdminQuote } from '../models/IApiAdminQuotes'

export class AdminQuotesAdapter {
  static adminQuotesDayAdapter = (data: IApiAdminQuote[]): IDailySchedule[] => {
    const schedule = JSON.parse(JSON.stringify(scheduleDayFull)) as IDailySchedule[]

    data.forEach((quote) => {
      const event: IAdminQuoteEvent = {
        id: quote.id,
        title: quote.title,
        label: quote.description,
        startTime: formatTime(quote.reminderDate),
        color: quote.color,
      }

      const startHour = event.startTime.split(':')[0] + ':00'
      const startMinutes = parseInt(event.startTime.split(':')[1])

      const scheduleHour = schedule.find((s) => s.hour === startHour)
      if (scheduleHour) {
        if (startMinutes < 30) {
          scheduleHour.events1.push(event)
        } else {
          scheduleHour.events2.push(event)
        }
      }
    })

    return schedule
  }

  static adminQuotesWeekAdapter = (data: IApiAdminQuote[]): IScheduleWeek[] => {
    const schedule = JSON.parse(JSON.stringify(scheduleWeekFull)) as IScheduleWeek[]

    data.forEach((quote) => {
      const event: IAdminQuoteEvent = {
        id: quote.id,
        title: quote.title,
        label: quote.description,
        startTime: formatTime(quote.reminderDate),
        color: quote.color,
      }

      const startHour = event.startTime.split(':')[0] + ':00'
      const startMinutes = parseInt(event.startTime.split(':')[1])

      const date = formatDate(quote.reminderDate)

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

  static adminQuotesMonthAdapter = (data: IApiAdminQuote[]): IAdminQuoteEventsMonth => {
    const events: IAdminQuoteEventsMonth = {}

    data.forEach((quote) => {
      const event: IAdminQuoteEvent = {
        id: quote.id,
        title: quote.title,
        label: quote.description,
        startTime: formatTime(quote.reminderDate),
        color: quote.color,
      }

      const date = formatDate(quote.reminderDate)

      if (!events[date]) {
        events[date] = []
      }
      events[date].push(event)
    })

    return events
  }

  static createAdminQuoteAdapter = (data: AdminQuotesFormValues): IApiCreateAdminQuote => {
    return {
      title: data.title,
      description: data.description,
      reminderDate: formatDateTime(data.date, data.time),
      color: data.color,
      notificationMinutesBefore: Number(data.notificationMinutesBefore),
      userCI: data.userCI,
    }
  }

  static updateAdminQuoteAdapter = (data: AdminQuotesFormValues): IApiCreateAdminQuote => {
    return {
      title: data.title,
      description: data.description,
      reminderDate: formatDateTime(data.date, data.time),
      color: data.color,
      notificationMinutesBefore: Number(data.notificationMinutesBefore),
      userCI: data.userCI,
    }
  }
}
