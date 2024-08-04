'use client'
import CalendarDay from '@/shared/components/calendar-day/calendar-day'
import { scheduleDayFull } from '@/shared/constants/schedule-day'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTimeEC } from '@/lib/formatDate'

import { AdminQuotesAdapter } from '../../adapters/admin-quotes-adapter'
import { useAdminQuotesByFilterQuery } from '../../hooks/use-admin-quotes-query'

interface QuotesDayProps {
  date: string
}

const AdminQuotesDay = ({ date }: QuotesDayProps) => {
  const [schedule, setSchedule] = useState<IDailySchedule[]>(scheduleDayFull)

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data, isFetching } = useAdminQuotesByFilterQuery({
    startDate: formatDateTimeEC(filters.startDate, '00:00'),
    endDate: formatDateTimeEC(filters.endDate, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setSchedule(AdminQuotesAdapter.adminQuotesDayAdapter(data))
    }
  }, [data])

  const onChange = (newDate: string) => {
    setSchedule(scheduleDayFull)
    setFilters({ startDate: newDate, endDate: newDate })
  }

  const onClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
  }
  return (
    <>
      <CalendarDay onChange={onChange} onClick={onClick} schedule={schedule} date={date} isLoading={isFetching} />
    </>
  )
}

export default AdminQuotesDay
