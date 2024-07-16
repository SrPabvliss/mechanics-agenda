import { IEvents, IReviewEvent } from '@/shared/interfaces/IEvents'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { scheduleWeek } from '../../../shared/constants/schedule-week'
import { IReviewApi } from '../models/IApiReview'

export const reviewWeekAdapter = (data: IReviewApi[]): IScheduleWeek[] => {
  const schedule = JSON.parse(JSON.stringify(scheduleWeek)) as IScheduleWeek[]

  data.forEach((review) => {
    const event: IReviewEvent = {
      id: parseInt(review.id),
      title: `${review.owner}'s ${review.car}`,
      label: review.plate,
      startTime: review.startTime,
      endTime: review.endTime,
      color: review.color,
      status: review.status,
      owner: review.owner,
      description: review.description || '',
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

export const reviewMonthAdapter = (data: IReviewApi[]): IEvents<IReviewEvent> => {
  const events: IEvents<IReviewEvent> = {}

  data.forEach((review) => {
    const event: IReviewEvent = {
      id: parseInt(review.id),
      title: review.car,
      label: review.plate,
      startTime: review.startTime,
      endTime: review.endTime,
      color: review.color,
      status: review.status,
      owner: review.owner,
      description: review.description || '',
    }

    const date = review.date

    if (!events[date]) {
      events[date] = []
    }

    events[date].push(event)
  })

  return events
}

export const reviewDayAdapter = (data: IReviewApi[]): IEvents<IReviewEvent> => {
  const events: IEvents<IReviewEvent> = {}

  data.forEach((review) => {
    const event: IReviewEvent = {
      id: parseInt(review.id),
      title: review.car,
      label: review.plate,
      startTime: review.startTime,
      endTime: review.endTime,
      color: review.color,
      status: review.status,
      owner: review.owner,
      description: review.description || '',
    }

    const date = review.date

    if (!events[date]) {
      events[date] = []
    }

    events[date].push(event)
  })

  return events
}
