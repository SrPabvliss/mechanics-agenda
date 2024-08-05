'use client'
import CalendarDay from '@/shared/components/calendar-day/calendar-day'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTimeEC } from '@/lib/formatDate'

import { QuotesAdapter } from '../../adapters/quotes-adapter'
import { useDeleteQuote, useQuotesByFilterQuery } from '../../hooks/use-quotes-query'

interface QuotesDayProps {
  date: string
}

const QuotesDay = ({ date }: QuotesDayProps) => {
  const [schedule, setSchedule] = useState<IDailySchedule[]>([])

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data, isFetching } = useQuotesByFilterQuery({
    startDate: formatDateTimeEC(filters.startDate, '00:00'),
    endDate: formatDateTimeEC(filters.endDate, '23:59'),
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

  const onDelete = (id: number) => {
    useDeleteQuote(id)
  }

  return <CalendarDay onChange={onChange} onDelete={onDelete} schedule={schedule} date={date} isLoading={isFetching} />
}

export default QuotesDay
