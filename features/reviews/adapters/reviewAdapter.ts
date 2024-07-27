import { IReviewEvent, IReviewEventsDay } from '@/shared/interfaces/IEvents'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'

import { formatTime } from '@/lib/formatTime'

import { formatDate } from '../../../lib/formatDate'
import { scheduleWeek } from '../../../shared/constants/schedule-week'
import { IReviewEventsMonth } from '../../../shared/interfaces/IEvents'
import { IApiReview } from '../models/IApiReview'

export class ReviewAdapter {
  static weekAdapter = (data: IApiReview[]): IScheduleWeek[] => {
    const schedule = JSON.parse(JSON.stringify(scheduleWeek)) as IScheduleWeek[]

    data.forEach((review) => {
      const event: IReviewEvent = {
        id: review.id,
        title: `${review.appointment?.clientName}'s ${review.appointment?.vehicleDescription}`,
        label: review.appointment?.description || review.appointment?.clientName,
        startTime: formatTime(review.startDate),
        endTime: review.endDate ? formatTime(review.endDate) : '',
        color: review.appointment.user.color || 'bg-gray-200',
        status: review.status,
        owner: review.appointment?.clientName,
        description: review.appointment?.description || '',
      }

      const startHour = event.startTime.split(':')[0] + ':00'
      const startMinutes = parseInt(event.startTime.split(':')[1])

      const date = formatDate(review.startDate)

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

  static monthAdapter = (data: IApiReview[]): IReviewEventsMonth => {
    const events: IReviewEventsMonth = {}

    data.forEach((review) => {
      const event: IReviewEvent = {
        id: review.id,
        title: review.appointment?.vehicleDescription,
        label: review.appointment?.clientName,
        startTime: formatDate(review.startDate),
        endTime: review.endDate ? formatDate(review.endDate) : '',
        color: review.appointment.user.color || 'bg-gray-200',
        status: review.status,
        owner: review.appointment?.clientName,
        description: review.appointment?.description || '',
      }

      const date = formatDate(review.startDate)

      if (!events[date]) {
        events[date] = []
      }

      events[date].push(event)
    })
    return events
  }

  static dayAdapter = (data: IApiReview[]): IReviewEventsDay => {
    return data.map((review) => ({
      id: review.id,
      title: review.appointment?.vehicleDescription,
      label: review.appointment?.clientName,
      startTime: formatTime(review.startDate),
      endTime: review.endDate ? formatTime(review.endDate) : '',
      color: review.appointment.user.color || '#000',
      status: review.status,
      owner: review.appointment?.clientName,
      description: review.appointment?.description || '',
    }))
  }
}
