import CalendarWeek from '@/shared/components/calendar-week/calendar-week'
import { VIEW_TYPES } from '@/shared/constants/view-types'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { ReviewAdapter } from '../../adapters/reviewAdapter'
import { useReviewsQuery } from '../../hooks/use-reviews-query'

const ReviewWeek = ({}: { value?: string }) => {
  const [events, setEvents] = useState<IScheduleWeek[]>([])
  const updateQueryParam = useUpdateQueryParam()

  const [dates, setDates] = useState<{ date1: string; date2: string }>({ date1: '', date2: '' })
  const { data } = useReviewsQuery({
    date1: formatDateTime(dates.date1, '00:00'),
    date2: formatDateTime(dates.date2, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setEvents(ReviewAdapter.weekAdapter(data))
    }
  }, [data])

  const handleDateChange = (date1: string, date2: string) => {
    setDates({ date1, date2 })
  }

  const handleClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: VIEW_TYPES.DAY },
    ])
  }
  return <CalendarWeek onChange={handleDateChange} onClick={handleClick} schedule={events} />
}

export default ReviewWeek
