'use client'

import CalendarWeek from '@/shared/components/calendar-week/calendar-week'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'
import dayjs from 'dayjs'
import { useState } from 'react'

import { quotesWeekAdapter } from '../../adapters/quotes-adapter'
import { apiQuote } from '../../models/IApiQuote'

const QuotesWeek = () => {
  const [schedule, setSchedule] = useState<IScheduleWeek[]>([])
  const updateQueryParam = useUpdateQueryParam()

  const onChange = async (date1: string, date2: string) => {
    const startDate = dayjs(date1).toDate()
    const endDate = dayjs(date2).toDate()

    const filter = apiQuote.filter((review) => {
      const reviewDate = dayjs(review.date).toDate()
      return reviewDate >= startDate && reviewDate <= endDate
    })

    setSchedule(quotesWeekAdapter(filter))
  }

  const onClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: 'day' },
    ])
  }
  return <CalendarWeek onChange={onChange} onClick={onClick} schedule={schedule} />
}

export default QuotesWeek
