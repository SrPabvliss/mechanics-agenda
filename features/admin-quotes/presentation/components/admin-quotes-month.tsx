'use client'
import Calendar from '@/shared/components/calendar/calendar'
import { useUpdateQueryParam } from '@/shared/hooks/update-query-param'
import dayjs from 'dayjs'
import { useState } from 'react'

import { IEvents } from '../../../../shared/interfaces/IEvents'
import { adminQuotesMonthAdapter } from '../../adapters/admin-quotes-adapter'
import { apiAdminQuotes } from '../../models/IApiAdminQuotes'

const AdminQuotesMonth = () => {
  const [events, setEvents] = useState<IEvents>({})
  const updateQueryParam = useUpdateQueryParam()

  const onChange = async (month: number, year: number) => {
    const filter = apiAdminQuotes.filter((adminQuote) => {
      const adminQuoteDate = dayjs(adminQuote.date)
      return adminQuoteDate.month() + 1 === month && adminQuoteDate.year() === year
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
