import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IReviewEventsMonth } from '@/shared/interfaces/IEvents'
import dayjs from 'dayjs'
import { useState } from 'react'

import { reviewMonthAdapter } from '../../adapters/reviewAdapter'
import { reviewData } from '../../models/IApiReview'

const ReviewMonth = () => {
  const [events, setEvents] = useState<IReviewEventsMonth>({})
  const updateQueryParam = useUpdateQueryParam()

  const onChange = async (date1: string, date2: string) => {
    const startDate = dayjs(date1).toDate()
    const endDate = dayjs(date2).toDate()
    const filter = reviewData.filter((review) => {
      const reviewDate = dayjs(review.date).toDate()
      return reviewDate >= startDate && reviewDate <= endDate
    })
    setEvents(reviewMonthAdapter(filter))
  }

  const onClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: 'day' },
    ])
  }

  return <Calendar events={events} onChangeMonth={onChange} onClickDay={onClick} />
}

export default ReviewMonth
