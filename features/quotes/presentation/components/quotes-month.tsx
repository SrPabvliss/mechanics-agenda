'use client'
import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import dayjs from 'dayjs'
import { useState } from 'react'

import { IEvents } from '../../../../shared/interfaces/IEvents'
import { quotesMonthAdapter } from '../../adapters/quotes-adapter'
import { apiQuote } from '../../models/IApiQuote'

const QuotesMonth = () => {
  const [events, setEvents] = useState<IEvents>({})
  const updateQueryParam = useUpdateQueryParam()

  const onChange = async (month: number, year: number) => {
    const filter = apiQuote.filter((review) => {
      const reviewDate = dayjs(review.date)
      return reviewDate.month() + 1 === month && reviewDate.year() === year
    })

    setEvents(quotesMonthAdapter(filter))
  }

  const onClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: 'day' },
    ])
  }
  return <Calendar onChangeMonth={onChange} onClickDay={onClick} events={events} />
}

export default QuotesMonth
