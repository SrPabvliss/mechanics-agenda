'use client'

import CalendarWeek from '@/shared/components/calendar-week/calendar-week'
import { scheduleWeekFull } from '@/shared/constants/schedule-week'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IScheduleWeek } from '@/shared/interfaces/ISchedule'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { AdminQuotesAdapter } from '../../adapters/admin-quotes-adapter'
import { useAdminQuotesByFilterQuery } from '../../hooks/use-admin-quotes-query'

const AdminQuotesWeek = () => {
  const [schedule, setSchedule] = useState<IScheduleWeek[]>(scheduleWeekFull)
  const updateQueryParam = useUpdateQueryParam()

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data, isFetching } = useAdminQuotesByFilterQuery({
    startDate: formatDateTime(filters.startDate, '00:00'),
    endDate: formatDateTime(filters.endDate, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setSchedule(AdminQuotesAdapter.adminQuotesWeekAdapter(data))
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
  return <CalendarWeek onChange={handleDateChange} onClick={handleClick} schedule={schedule} isLoading={isFetching} />
}

export default AdminQuotesWeek
