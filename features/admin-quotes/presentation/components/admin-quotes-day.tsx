'use client'
import CalendarDay from '@/shared/components/calendar-day/calendar-day'
import { ISchedule } from '@/shared/interfaces/ISchedule'
import { useState } from 'react'

import { adminQuotesDayAdapter } from '../../adapters/admin-quotes-adapter'
import { apiAdminQuotes } from '../../models/IApiAdminQuotes'

interface QuotesDayProps {
  date: string
}

const AdminQuotesDay = ({ date }: QuotesDayProps) => {
  const [schedule, setSchedule] = useState<ISchedule[]>([])
  const onChange = async (day: string) => {
    // Filtrar las revisiones que están en el día seleccionado
    const filter = apiAdminQuotes.filter((quote) => quote.date === day)
    setSchedule(adminQuotesDayAdapter(filter))
  }

  const onClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
    // Code here
  }
  return <CalendarDay onChange={onChange} onClick={onClick} schedule={schedule} date={date} />
}

export default AdminQuotesDay
