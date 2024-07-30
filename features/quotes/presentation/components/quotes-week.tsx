'use client'

import CalendarWeek from '@/shared/components/calendar-week/calendar-week'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { QuotesAdapter } from '../../adapters/quotes-adapter'
import useQuotesByFilterQuery from '../../hooks/use-quotes-by-filter-query'

const QuotesWeek = () => {
  const [events, setEvents] = useState<IScheduleWeek[]>([])
  const updateQueryParam = useUpdateQueryParam()

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data } = useQuotesByFilterQuery({
    startDate: formatDateTime(filters.startDate, '00:00'),
    endDate: formatDateTime(filters.endDate, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setEvents(QuotesAdapter.quotesWeekAdapter(data))
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
  return <CalendarWeek onChange={handleDateChange} onClick={handleClick} schedule={events} />
}

export default QuotesWeek
