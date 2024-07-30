'use client'
import CalendarDay from '@/shared/components/calendar-day/calendar-day'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { QuotesAdapter } from '../../adapters/quotes-adapter'
import useQuotesByFilterQuery from '../../hooks/use-quotes-by-filter-query'

interface QuotesDayProps {
  date: string
}

const QuotesDay = ({ date }: QuotesDayProps) => {
  const [schedule, setSchedule] = useState<IDailySchedule[]>([])

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data } = useQuotesByFilterQuery({
    startDate: formatDateTime(filters.startDate, '00:00'),
    endDate: formatDateTime(filters.endDate, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setSchedule(QuotesAdapter.quotesDayAdapter(data))
    }
  }, [data])

  const onChange = (newDate: string) => {
    setSchedule([])
    setFilters({ startDate: newDate, endDate: newDate })
  }

  const onClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }
  return <CalendarDay onChange={onChange} onClick={onClick} schedule={schedule} date={date} />
}

export default QuotesDay
