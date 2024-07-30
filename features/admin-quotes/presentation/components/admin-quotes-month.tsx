'use client'
import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import dayjs from 'dayjs'
import { useState } from 'react'

import { IAdminQuoteEventsMonth } from '../../../../shared/interfaces/IEvents'
import { adminQuotesMonthAdapter } from '../../adapters/admin-quotes-adapter'
import { apiAdminQuotes } from '../../models/IApiAdminQuotes'

const AdminQuotesMonth = () => {
  const [events, setEvents] = useState<IAdminQuoteEventsMonth>({})
  const updateQueryParam = useUpdateQueryParam()

  const onChange = async (date1: string, date2: string) => {
    const startDate = dayjs(date1).toDate()
    const endDate = dayjs(date2).toDate()
    const filter = apiAdminQuotes.filter((adminQuote) => {
      const adminQuoteDate = dayjs(adminQuote.date).toDate()
      return adminQuoteDate >= startDate && adminQuoteDate <= endDate
    })
    setEvents(adminQuotesMonthAdapter(filter))
  }

  const onClick = (date: string) => {
    updateQueryParam([
      { param: 'date', value: date },
      { param: 'view', value: 'day' },
    ])
  }
  return <Calendar onChangeMonth={onChange} onClickDay={onClick} events={events} />
}

export default AdminQuotesMonth
