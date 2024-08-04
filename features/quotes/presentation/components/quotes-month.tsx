'use client'
import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IQuoteEventsMonth } from '@/shared/interfaces/IEvents'
import { useEffect, useState } from 'react'

import { formatDateTimeEC } from '@/lib/formatDate'

import { QuotesAdapter } from '../../adapters/quotes-adapter'
import useQuotesByFilterQuery from '../../hooks/use-quotes-by-filter-query'

const QuotesMonth = () => {
  const [events, setEvents] = useState<IQuoteEventsMonth>({})
  const updateQueryParam = useUpdateQueryParam()

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data, isFetching } = useQuotesByFilterQuery({
    startDate: formatDateTimeEC(filters.startDate, '00:00'),
    endDate: formatDateTimeEC(filters.endDate, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setEvents(QuotesAdapter.quotesMonthAdapter(data))
    }
  }, [data])

  const handleDateChange = (date1: string, date2: string) => {
    setFilters({ startDate: date1, endDate: date2 })
  }

  const handleClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: 'day' },
    ])
  }

  return <Calendar onChangeMonth={handleDateChange} onClickDay={handleClick} events={events} isLoading={isFetching} />
}

export default QuotesMonth
