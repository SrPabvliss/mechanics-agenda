'use client'
import CalendarDay from '@/shared/components/calendar-day/calendar-day'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { QuotesAdapter } from '../../adapters/quotes-adapter'
import useQuotesQuery from '../../hooks/use-quotes-query'

interface QuotesDayProps {
  date: string
}

const QuotesDay = ({ date }: QuotesDayProps) => {
  const [schedule, setSchedule] = useState<IDailySchedule[]>([])

  const [dates, setDates] = useState<{ date1: string; date2: string }>({ date1: '', date2: '' })
  const { data } = useQuotesQuery({
    date1: formatDateTime(dates.date1, '00:00'),
    date2: formatDateTime(dates.date2, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setSchedule(QuotesAdapter.quotesDayAdapter(data))
    }
  }, [data])

  const onChange = (newDate: string) => {
    setSchedule([])
    setDates({ date1: newDate, date2: newDate })
  }

  const onClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }
  return <CalendarDay onChange={onChange} onClick={onClick} schedule={schedule} date={date} />
}

export default QuotesDay
