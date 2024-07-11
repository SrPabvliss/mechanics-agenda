import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IEvents } from '@/shared/interfaces/IEvents'
import dayjs from 'dayjs'
import { useState } from 'react'

import { reviewMonthAdapter } from '../../adapters/reviewAdapter'
import { reviewData } from '../../models/IApiReview'

const ReviewMonth = () => {
  const [events, setEvents] = useState<IEvents>({})
  const updateQueryParam = useUpdateQueryParam()

  const onChange = async (month: number, year: number) => {
    await new Promise((resolve) => setTimeout(resolve, 250))

    const filter = reviewData.filter((review) => {
      const reviewDate = dayjs(review.date)
      return reviewDate.month() + 1 === month && reviewDate.year() === year
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
