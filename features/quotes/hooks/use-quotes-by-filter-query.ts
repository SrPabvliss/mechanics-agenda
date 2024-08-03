import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QuotesDatasourceImpl } from '../services/datasource'

interface IQuotesQuery {
  startDate: string
  endDate: string
}

const useQuotesByFilterQuery = ({ startDate, endDate }: IQuotesQuery) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUOTES, startDate, endDate],
    queryFn: async () =>
      await QuotesDatasourceImpl.getInstance().getByFilter({
        startDate: startDate,
        endDate: endDate,
      }),
    enabled: !!startDate && !!endDate,
  })

  useEffect(() => {
    return () => {
      const unsubscribe = async () => {
        await queryClient.cancelQueries({ queryKey: [QUERY_KEY.QUOTES, startDate, endDate] })
      }
      unsubscribe()
    }
  }, [endDate, startDate])

  return query
}

export default useQuotesByFilterQuery
