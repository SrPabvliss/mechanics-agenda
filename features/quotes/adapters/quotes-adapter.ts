import { scheduleDay } from '@/shared/constants/schedule-day'
import { scheduleMechanic } from '@/shared/constants/schedule-mechanic'
import { scheduleWeek } from '@/shared/constants/schedule-week'
import { IQuoteEvent, IQuoteEventsMonth } from '@/shared/interfaces/IEvents'
import { IDailySchedule, IScheduleMechanic, IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { formatDate, formatDateTime } from '@/lib/formatDate'
import { formatTime } from '@/lib/formatTime'

import { QuotesFormValues } from '../hooks/use-quotes-form'
import { IApiCreateQuote, IApiQuote, IApiUpdateQuote } from '../models/IApiQuote'

export class QuotesAdapter {
  static quotesDayAdapter = (data: IApiQuote[]): IDailySchedule[] => {
    const schedule = JSON.parse(JSON.stringify(scheduleDay)) as IDailySchedule[]

    data.forEach((quote) => {
      const event: IQuoteEvent = {
        id: quote.id,
        title: quote.vehicleDescription,
        label: quote.description || quote.clientName,
        startTime: formatTime(quote.date),
        color: quote.user.color || 'bg-gray-200',
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

  static quotesWeekAdapter = (data: IApiQuote[]): IScheduleWeek[] => {
    const schedule = JSON.parse(JSON.stringify(scheduleWeek)) as IScheduleWeek[]

    data.forEach((quote) => {
      const event: IQuoteEvent = {
        id: quote.id,
        title: quote.vehicleDescription,
        label: quote.description,
        startTime: formatTime(quote.date),
        color: quote.user.color || 'bg-gray-200',
      }

      const startHour = event.startTime.split(':')[0] + ':00'
      const startMinutes = parseInt(event.startTime.split(':')[1])

      const date = formatDate(quote.date)

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

  static quotesMonthAdapter = (data: IApiQuote[]): IQuoteEventsMonth => {
    const events: IQuoteEventsMonth = {}

    data.forEach((quote) => {
      const event: IQuoteEvent = {
        id: quote.id,
        title: quote.vehicleDescription,
        label: quote.description,
        startTime: formatTime(quote.date),
        color: quote.user.color || 'bg-gray-200',
      }

      const date = formatDate(quote.date)

      if (!events[date]) {
        events[date] = []
      }

      events[date].push(event)
    })

    return events
  }

  static createQuoteAdapter = (data: QuotesFormValues): IApiCreateQuote => {
    return {
      clientName: data.client,
      vehicleDescription: data.vehicleType,
      description: data.description,
      date: formatDateTime(data.date, data.timeAndResponsible.time),
      status: 'PENDING',
      userCI: data.timeAndResponsible.responsible,
    }
  }

  static updateQuoteAdapter = (data: QuotesFormValues): IApiUpdateQuote => {
    return {
      clientName: data.client,
      vehicleDescription: data.vehicleType,
      description: data.description,
      date: formatDateTime(data.date, data.timeAndResponsible.time),
      status: 'PENDING',
      userCI: data.timeAndResponsible.responsible,
    }
  }

  static quotesMechanicsAdapter = (data: IApiQuote[]): IScheduleMechanic[] => {
    const schedule = JSON.parse(JSON.stringify(scheduleMechanic)) as IScheduleMechanic[]

    data.forEach((quote) => {
      const startHour = formatTime(quote.date).split(':')[0] + ':00'
      const startMinutes = parseInt(formatTime(quote.date).split(':')[1])

      const scheduleHour = schedule.find((s) => s.hour === startHour)
      if (scheduleHour) {
        if (!scheduleHour.events[quote.user.ci]) {
          scheduleHour.events[quote.user.ci] = { events1: false, events2: false }
        }

        if (startMinutes < 30) {
          scheduleHour.events[quote.user.ci].events1 = true
        } else {
          scheduleHour.events[quote.user.ci].events2 = true
        }
      }
    })

    return schedule
  }
}
