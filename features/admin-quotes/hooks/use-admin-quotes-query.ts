import queryClient from '@/core/infrastructure/react-query/query-client'
import { QUERY_KEY } from '@/shared/api/query-key'
import { IAdminQuoteFilter } from '@/shared/interfaces/IFilters'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { AdminQuotesDatasourceImpl } from '../services/datasource'

export const useAdminQuotesByFilterQuery = ({ startDate, endDate }: IAdminQuoteFilter) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.REMINDERS, startDate, endDate],
    queryFn: async () =>
      await AdminQuotesDatasourceImpl.getInstance().getByFilter({
        startDate: startDate,
        endDate: endDate,
      }),
    enabled: !!startDate && !!endDate,
  })

  useEffect(() => {
    return () => {
      const unsubscribe = async () => {
        await queryClient.cancelQueries({ queryKey: [QUERY_KEY.REMINDERS, startDate, endDate] })
      }
      unsubscribe()
    }
  }, [endDate, startDate])

  return query
}

export const useAdminQuoteByIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.REMINDERS, Number(id)],
    queryFn: async () => AdminQuotesDatasourceImpl.getInstance().getById(Number(id)),
    enabled: !!Number(id),
  })

  useEffect(() => {
    return () => {
      const unsubscribe = async () => {
        await queryClient.cancelQueries({ queryKey: [QUERY_KEY.REMINDERS, Number(id)] })
      }
      unsubscribe()
    }
  }, [id])

  return query
}

export const useDeleteAdminQuote = async (id: number) => {
  const data = await AdminQuotesDatasourceImpl.getInstance().delete(id)
  if (!data) return
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REMINDERS] })
}
