import { scheduleDay } from '@/shared/constants/schedule-day'
import { scheduleWeek } from '@/shared/constants/schedule-week'
import { IQuoteEvent, IQuoteEventsMonth } from '@/shared/interfaces/IEvents'
import { IDailySchedule, IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { IApiQuote } from '../models/IApiQuote'

export const quotesDayAdapter = (data: IApiQuote[]): IDailySchedule[] => {
  const schedule = JSON.parse(JSON.stringify(scheduleDay)) as IDailySchedule[]

  data.forEach((quote) => {
    const event: IQuoteEvent = {
      id: parseInt(quote.id),
      title: quote.car,
      label: quote.client,
      startTime: quote.startTime,
      endTime: quote.endTime,
      color: quote.color,
    }

    const startHour = quote.startTime.split(':')[0] + ':00'
    const startMinutes = parseInt(quote.startTime.split(':')[1])

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

export const quotesWeekAdapter = (data: IApiQuote[]): IScheduleWeek[] => {
  const schedule = JSON.parse(JSON.stringify(scheduleWeek)) as IScheduleWeek[]

  data.forEach((quote) => {
    const event: IQuoteEvent = {
      id: parseInt(quote.id),
      title: quote.car,
      label: quote.client,
      startTime: quote.startTime,
      endTime: quote.endTime,
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

export const quotesMonthAdapter = (data: IApiQuote[]): IQuoteEventsMonth => {
  const events: IQuoteEventsMonth = {}

  data.forEach((review) => {
    const event: IQuoteEvent = {
      id: parseInt(review.id),
      title: review.car,
      label: review.client,
      startTime: review.startTime,
      endTime: review.endTime,
      color: review.color,
    }

    const date = review.date

    if (!events[date]) {
      events[date] = []
    }

    events[date].push(event)
  })

  return events
}
