import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { QuotesDatasourceImpl } from '../services/datasource'

interface IQuotesQuery {
  startDate: string
  endDate: string
}

export const useQuotesByFilterQuery = ({ startDate, endDate }: IQuotesQuery) => {
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

export const useQuotesByIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUOTES, Number(id)],
    queryFn: async () => QuotesDatasourceImpl.getInstance().getById(Number(id)),
    enabled: !!id,
  })

  useEffect(() => {
    const unsubscribe = async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.QUOTES, Number(id)] })
    }
    return () => {
      unsubscribe()
    }
  }, [id])

  return query
}

export const useDeleteQuote = async (id: number) => {
  const data = await QuotesDatasourceImpl.getInstance().delete(id)
  if (!data) return
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY.QUOTES] })
}
