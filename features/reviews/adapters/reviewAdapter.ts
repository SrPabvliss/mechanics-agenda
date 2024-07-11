import { IEvent, IEvents } from '@/shared/interfaces/IEvents'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { scheduleWeek } from '../../../shared/constants/schedule-week'
import { IReviewApi } from '../models/IApiReview'

export const reviewWeekAdapter = (data: IReviewApi[]): IScheduleWeek[] => {
  // Crear una copia del scheduleWeek para evitar mutaciones
  const schedule = JSON.parse(JSON.stringify(scheduleWeek)) as IScheduleWeek[]

  // Convertir los datos del API en eventos y agrupar por hora
  data.forEach((review) => {
    const event: IEvent = {
      id: parseInt(review.id),
      title: `${review.owner}'s ${review.car}`,
      label: review.plate,
      startTime: review.startTime,
      endTime: review.endTime,
      color: review.color,
    }

    const startHour = review.startTime.split(':')[0] + ':00'
    const startMinutes = parseInt(review.startTime.split(':')[1])

    const date = review.date

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

export const reviewMonthAdapter = (data: IReviewApi[]): IEvents => {
  const events: IEvents = {}

  data.forEach((review) => {
    const event: IEvent = {
      id: parseInt(review.id),
      title: review.car,
      label: review.plate,
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
