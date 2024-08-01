'use client'
import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import { IAdminQuoteEventsMonth } from '@/shared/interfaces/IEvents'
import { useEffect, useState } from 'react'

import { formatDateTime } from '@/lib/formatDate'

import { AdminQuotesAdapter } from '../../adapters/admin-quotes-adapter'
import { useAdminQuotesByFilterQuery } from '../../hooks/use-admin-quotes-query'

const AdminQuotesMonth = () => {
  const [events, setEvents] = useState<IAdminQuoteEventsMonth>({})
  const updateQueryParam = useUpdateQueryParam()

  const [filters, setFilters] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' })
  const { data } = useAdminQuotesByFilterQuery({
    startDate: formatDateTime(filters.startDate, '00:00'),
    endDate: formatDateTime(filters.endDate, '23:59'),
  })

  useEffect(() => {
    if (data) {
      setEvents(AdminQuotesAdapter.adminQuotesMonthAdapter(data))
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
  return <Calendar onChangeMonth={handleDateChange} onClickDay={handleClick} events={events} />
}

export default AdminQuotesMonth
