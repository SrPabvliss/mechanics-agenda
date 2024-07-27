import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IReviewEventsMonth } from '@/shared/interfaces/IEvents'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { ReviewAdapter } from '../../adapters/reviewAdapter'
import useReviewsQuery from '../../hooks/use-reviews-query'

const ReviewMonth = () => {
  const [events, setEvents] = useState<IReviewEventsMonth>({})
  const updateQueryParam = useUpdateQueryParam()

  const [dates, setDates] = useState<{ date1: string; date2: string }>({ date1: '', date2: '' })
  const { data } = useReviewsQuery({
    date1: formatDateTime(dates.date1, '00:00'),
    date2: formatDateTime(dates.date2, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setEvents(ReviewAdapter.monthAdapter(data))
    }
  }, [data])

  const handleDateChange = (date1: string, date2: string) => {
    setDates({ date1, date2 })
  }

  const handleClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: 'day' },
    ])
  }

  return <Calendar events={events} onChangeMonth={handleDateChange} onClickDay={handleClick} />
}

export default ReviewMonth
