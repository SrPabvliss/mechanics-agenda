import { QUERY_KEY } from '@/shared/api/query-key'
import { IAdminQuoteFilter } from '@/shared/interfaces/IFilters'
import { useQuery } from '@tanstack/react-query'

import { AdminQuotesDatasourceImpl } from '../services/datasource'

export const useAdminQuotesByFilterQuery = ({ startDate, endDate }: IAdminQuoteFilter) => {
  return useQuery({
    queryKey: [QUERY_KEY.REMINDERS, startDate, endDate],
    queryFn: async () =>
      await AdminQuotesDatasourceImpl.getInstance().getByFilter({
        startDate: startDate,
        endDate: endDate,
      }),
    enabled: !!startDate && !!endDate,
  })
}

export const useAdminQuoteByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.REMINDERS, Number(id)],
    queryFn: async () => AdminQuotesDatasourceImpl.getInstance().getById(Number(id)),
    enabled: !!Number(id),
  })
}
