'use client'
import CalendarDay from '@/shared/components/calendar-day/calendar-day'
import { IDailySchedule } from '@/shared/interfaces/ISchedule'
import { useState } from 'react'

import { quotesDayAdapter } from '../../adapters/quotes-adapter'
import { apiQuote } from '../../models/IApiQuote'

interface QuotesDayProps {
  date: string
}

const QuotesDay = ({ date }: QuotesDayProps) => {
  const [schedule, setSchedule] = useState<IDailySchedule[]>([])
  const onChange = async (day: string) => {
    // Filtrar las revisiones que están en el día seleccionado
    const filter = apiQuote.filter((quote) => quote.date === day)
    setSchedule(quotesDayAdapter(filter))

    /* 
      const { data } = useQuery(
      queryKey: ['quotes'], 
      queryFn: async () => {
        const response = await QuotesDatasourceImpl.getInstance().getQuotes()
      }
      onError: (error) => {
        toast.error(error.message)
      }

      const data = useCahche(filters)
    */
  }

  const onClick = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id)
    // Code here
  }
  return <CalendarDay onChange={onChange} onClick={onClick} schedule={schedule} date={date} />
}

export default QuotesDay
